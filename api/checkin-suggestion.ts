import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

// ── Rate limiting (Upstash) ───────────────────────────────────────────────────
// If UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN are set, rate limiting
// is enforced: 10 requests per IP per minute. If not set, it is skipped
// (safe for local dev / initial deploy without Upstash).
async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return { allowed: true, remaining: -1 };

  const key = `rl:checkin:${ip}`;
  const windowSecs = 60;
  const maxRequests = 10;

  try {
    // INCR + EXPIRE in a pipeline
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, windowSecs, 'NX'],
      ]),
    });
    const data = await res.json() as Array<{ result: number }>;
    const count = data[0]?.result ?? 1;
    return { allowed: count <= maxRequests, remaining: Math.max(0, maxRequests - count) };
  } catch {
    // If Upstash is unreachable, fail open
    return { allowed: true, remaining: -1 };
  }
}

// ── Input validation ──────────────────────────────────────────────────────────
const VALID_MOODS = ['great', 'good', 'neutral', 'down', 'stressed', 'overwhelmed'];

function validateInput(body: unknown): { valid: true; data: CheckInInput } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a JSON object.' };
  }
  const b = body as Record<string, unknown>;

  // mood — required, must be one of the known values
  if (typeof b.mood !== 'string' || !VALID_MOODS.includes(b.mood)) {
    return { valid: false, error: `mood must be one of: ${VALID_MOODS.join(', ')}.` };
  }

  // moodLabel — optional string, max 50 chars
  if (b.moodLabel !== undefined && (typeof b.moodLabel !== 'string' || b.moodLabel.length > 50)) {
    return { valid: false, error: 'moodLabel must be a string under 50 characters.' };
  }

  // energyLevel — optional number 1–5
  if (b.energyLevel !== undefined) {
    const e = Number(b.energyLevel);
    if (!Number.isInteger(e) || e < 1 || e > 5) {
      return { valid: false, error: 'energyLevel must be an integer between 1 and 5.' };
    }
  }

  // sleepHours — optional number 0–24
  if (b.sleepHours !== undefined) {
    const s = Number(b.sleepHours);
    if (isNaN(s) || s < 0 || s > 24) {
      return { valid: false, error: 'sleepHours must be a number between 0 and 24.' };
    }
  }

  // tags — optional array of strings, max 10 items, each max 30 chars
  if (b.tags !== undefined) {
    if (!Array.isArray(b.tags) || b.tags.length > 10 || b.tags.some(t => typeof t !== 'string' || t.length > 30)) {
      return { valid: false, error: 'tags must be an array of up to 10 strings (max 30 chars each).' };
    }
  }

  // reflection — optional string, max 500 chars
  if (b.reflection !== undefined && (typeof b.reflection !== 'string' || b.reflection.length > 500)) {
    return { valid: false, error: 'reflection must be a string under 500 characters.' };
  }

  return {
    valid: true,
    data: {
      mood: b.mood,
      moodLabel: typeof b.moodLabel === 'string' ? b.moodLabel : undefined,
      energyLevel: b.energyLevel !== undefined ? Number(b.energyLevel) : undefined,
      sleepHours: b.sleepHours !== undefined ? Number(b.sleepHours) : undefined,
      tags: Array.isArray(b.tags) ? (b.tags as string[]) : undefined,
      reflection: typeof b.reflection === 'string' ? b.reflection.trim() : undefined,
    },
  };
}

interface CheckInInput {
  mood: string;
  moodLabel?: string;
  energyLevel?: number;
  sleepHours?: number;
  tags?: string[];
  reflection?: string;
}

// ── Local fallback ────────────────────────────────────────────────────────────
function generateLocalSuggestion({ mood, moodLabel, energyLevel, sleepHours }: CheckInInput) {
  const isLowSleep = (sleepHours || 7) < 6;
  const isHighEnergy = (energyLevel || 3) >= 4;
  const isLowEnergy = (energyLevel || 3) <= 2;

  let supportiveInsight = "Thank you for pausing to check in with yourself.";
  let energySleepAdvice = "Your current sleep and energy levels suggest a steady pace.";
  let microActions = [
    "Drink a tall glass of cool water.",
    "Step away from screens for 3 minutes.",
    "Write down your single top priority for today."
  ];
  let mindsetAffirmation = "I give myself permission to progress one step at a time.";
  let recommendedPractice = { title: "4-7-8 Calming Breath", description: "Reset your nervous system.", toolId: "478-breathing" };

  if (mood === 'overwhelmed' || mood === 'stressed') {
    supportiveInsight = `Feeling ${moodLabel || 'stressed'} is completely normal during challenging phases.`;
    energySleepAdvice = isLowSleep
      ? `With only ${sleepHours}h sleep, prioritize rest over perfection today.`
      : `Stress is weighing on you — channel energy into one small manageable task.`;
    microActions = ["Take 5 slow deep breaths.", "Break your next task into a 10-minute starter.", "Unclench your jaw and drop your shoulders."];
    mindsetAffirmation = "I don't have to solve everything today. Just the next step.";
    recommendedPractice = { title: "Box Breathing", description: "Regain mental clarity.", toolId: "box-breathing" };
  } else if (mood === 'down' && isLowEnergy) {
    supportiveInsight = "Some days feel heavier. You don't have to force high productivity.";
    energySleepAdvice = `With low energy (${energyLevel}/5), treat yourself with gentle kindness.`;
    microActions = ["Wrap up warm and sip something hot.", "Step into natural daylight for 5 minutes.", "Send a quick hello to a trusted friend."];
    mindsetAffirmation = "I am worthy of kindness, especially from myself.";
    recommendedPractice = { title: "Mindful Body Scan", description: "Notice sensations without judgment.", toolId: "body-scan" };
  } else if (mood === 'great' || isHighEnergy) {
    supportiveInsight = "Wonderful surge of positive energy! You're set up to engage with your goals.";
    energySleepAdvice = `Energy ${energyLevel}/5 and ${sleepHours}h sleep — great cognitive focus today.`;
    microActions = ["Tackle your hardest assignment now.", "Share an encouraging word with a classmate.", "Set a water reminder so you don't burn out."];
    mindsetAffirmation = "I channel my positive energy into purposeful steps.";
    recommendedPractice = { title: "Focus Pomodoro Session", description: "Sustain high productivity.", toolId: "pomodoro-timer" };
  }

  return { supportiveInsight, energyAndSleepAnalysis: energySleepAdvice, microActions, mindsetAffirmation, recommendedPractice };
}

// ── Vercel handler ────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limiting
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
  const { allowed, remaining } = await checkRateLimit(ip);
  if (!allowed) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' });
  }
  if (remaining >= 0) res.setHeader('X-RateLimit-Remaining', remaining);

  // Input validation
  const validation = validateInput(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }
  const { mood, moodLabel, energyLevel, sleepHours, tags, reflection } = validation.data;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.json(generateLocalSuggestion(validation.data));
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are a supportive, warm, non-diagnostic student wellbeing guide on the MindMate college platform.
A college student is checking in:
- Mood: "${moodLabel || mood}"
- Energy: ${energyLevel}/5
- Sleep: ${sleepHours} hours
- Tags: ${Array.isArray(tags) && tags.length > 0 ? tags.join(', ') : 'General'}
- Note: "${reflection || 'None'}"
Provide empathetic, personalized guidance. Avoid clinical diagnosis or medical claims.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        supportiveInsight: { type: Type.STRING },
        energyAndSleepAnalysis: { type: Type.STRING },
        microActions: { type: Type.ARRAY, items: { type: Type.STRING } },
        mindsetAffirmation: { type: Type.STRING },
        recommendedPractice: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            toolId: { type: Type.STRING }
          },
          required: ["title", "description"]
        }
      },
      required: ["supportiveInsight", "energyAndSleepAnalysis", "microActions", "mindsetAffirmation", "recommendedPractice"]
    };

    for (const modelName of ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-1.5-flash"]) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: { responseMimeType: "application/json", responseSchema }
        });
        if (response.text) return res.json(JSON.parse(response.text.trim()));
      } catch (_) { continue; }
    }

    return res.json(generateLocalSuggestion(validation.data));
  } catch {
    return res.json(generateLocalSuggestion(validation.data));
  }
}
