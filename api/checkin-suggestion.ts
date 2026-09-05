import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

// ── Local fallback (copied from your server.ts) ──────────────────────────────
function generateLocalSuggestion({ mood, moodLabel, energyLevel, sleepHours, tags, reflection }: {
  mood?: string; moodLabel?: string; energyLevel?: number;
  sleepHours?: number; tags?: string[]; reflection?: string;
}) {
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
    microActions = ["Tackle your hardest assignment now while focus is sharp.", "Share an encouraging word with a classmate.", "Set a water reminder so you don't burn out."];
    mindsetAffirmation = "I channel my positive energy into purposeful steps.";
    recommendedPractice = { title: "Focus Pomodoro Session", description: "Sustain high productivity.", toolId: "pomodoro-timer" };
  }

  return { supportiveInsight, energyAndSleepAnalysis: energySleepAdvice, microActions, mindsetAffirmation, recommendedPractice };
}

// ── Vercel handler ────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { mood, moodLabel, energyLevel, sleepHours, tags, reflection } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.json(generateLocalSuggestion({ mood, moodLabel, energyLevel, sleepHours, tags, reflection }));
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

    return res.json(generateLocalSuggestion({ mood, moodLabel, energyLevel, sleepHours, tags, reflection }));
  } catch (error) {
    return res.json(generateLocalSuggestion({ mood, moodLabel, energyLevel, sleepHours, tags, reflection }));
  }
}
