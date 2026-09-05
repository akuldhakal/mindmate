import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper for local fallback suggestions if offline or API key unconfigured
function generateLocalSuggestion({
  mood,
  moodLabel,
  energyLevel,
  sleepHours,
  tags,
  reflection
}: {
  mood?: string;
  moodLabel?: string;
  energyLevel?: number;
  sleepHours?: number;
  tags?: string[];
  reflection?: string;
}) {
  const isLowSleep = (sleepHours || 7) < 6;
  const isHighSleep = (sleepHours || 7) > 9;
  const isLowEnergy = (energyLevel || 3) <= 2;
  const isHighEnergy = (energyLevel || 3) >= 4;

  let supportiveInsight = "Thank you for pausing to check in with yourself. Acknowledging your feelings without judgment is the first step toward balance.";
  let energySleepAdvice = "Your current sleep and energy levels suggest a steady pace. Keep hydrated and take regular breaks during study sessions.";
  let microActions = [
    "Drink a tall glass of cool water to rehydrate your brain.",
    "Step away from screens for 3 minutes and stretch your shoulders.",
    "Write down your single top priority for today and let the rest wait."
  ];
  let mindsetAffirmation = "I give myself permission to progress one step at a time.";
  let recommendedPractice = {
    title: "4-7-8 Calming Breath",
    description: "A gentle diaphragmatic breathing cycle to reset your autonomic nervous system.",
    toolId: "478-breathing"
  };

  if (mood === 'overwhelmed' || mood === 'stressed') {
    supportiveInsight = `Feeling ${moodLabel || 'stressed'} is completely normal during challenging academic phases. Your mind is processing a lot right now.`;
    if (isLowSleep) {
      energySleepAdvice = `With only ${sleepHours} hours of sleep and stress present, your nervous system is operating on low reserves. Prioritize rest over perfection today.`;
      microActions = [
        "Take 5 slow, unhurried deep breaths with a long exhale.",
        "Postpone non-essential tasks until your energy recharges.",
        "Plan a calm, screen-free wind-down 30 minutes before bed tonight."
      ];
      mindsetAffirmation = "Rest is not a reward I have to earn; it is fuel I need to function.";
      recommendedPractice = {
        title: "5-4-3-2-1 Sensory Grounding",
        description: "Anchor your senses in the physical room to release mental spinning.",
        toolId: "grounding-54321"
      };
    } else {
      energySleepAdvice = `You had ${sleepHours} hours of rest, but stress is weighing on your mind. Channel your baseline energy into one small manageable task.`;
      microActions = [
        "Break your next task down into a tiny 10-minute starter chunk.",
        "Take a brisk 5-minute walk outside or around the hallway.",
        "Unclench your jaw and drop your shoulders away from your ears."
      ];
      mindsetAffirmation = "I don't have to solve everything today. Just the next step.";
      recommendedPractice = {
        title: "Box Breathing (4-4-4-4)",
        description: "Equal-ratio breathwork used by professionals to regain mental clarity.",
        toolId: "box-breathing"
      };
    }
  } else if (mood === 'down') {
    supportiveInsight = "Some days feel heavier than others, and that is okay. You don't have to force yourself into high productivity right now.";
    if (isLowEnergy) {
      energySleepAdvice = `With low energy (${energyLevel}/5), treat yourself with gentle kindness. Avoid comparing your output today to your best days.`;
      microActions = [
        "Wrap yourself in a comfortable layer and sip a warm beverage.",
        "Step outside into natural daylight for 5 to 10 minutes.",
        "Send a quick hello to a trusted friend or peer."
      ];
      mindsetAffirmation = "I am worthy of kindness and patience, especially from myself.";
      recommendedPractice = {
        title: "Mindful Body Scan",
        description: "Gently notice sensations in your body without trying to fix or change them.",
        toolId: "body-scan"
      };
    }
  } else if (mood === 'great' || isHighEnergy) {
    supportiveInsight = "It's wonderful to feel this surge of positive energy and clarity! You are in a great position to engage meaningfully with your goals.";
    energySleepAdvice = `Your vibrant energy (${energyLevel}/5) and ${sleepHours} hours of sleep provide strong cognitive focus. Make the most of this flow state while staying grounded.`;
    microActions = [
      "Tackle your most intellectually demanding assignment while your focus is sharp.",
      "Share an encouraging word with a classmate or roommate.",
      "Set a reminder to pause for water so you don't burn through your energy too fast."
    ];
    mindsetAffirmation = "I channel my positive energy into purposeful, meaningful steps.";
    recommendedPractice = {
      title: "Focus Pomodoro Session",
      description: "Structured 25-minute focus intervals to sustain high productivity.",
      toolId: "pomodoro-timer"
    };
  }

  return {
    supportiveInsight,
    energyAndSleepAnalysis: energySleepAdvice,
    microActions,
    mindsetAffirmation,
    recommendedPractice
  };
}

// Check-in AI Suggestion Endpoint
app.post("/api/checkin-suggestion", async (req, res) => {
  const { mood, moodLabel, energyLevel, sleepHours, tags, reflection } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.json(generateLocalSuggestion({ mood, moodLabel, energyLevel, sleepHours, tags, reflection }));
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const prompt = `You are a supportive, warm, non-diagnostic student wellbeing guide on the MindMate college platform.
A college student is checking in with the following self-reported parameters:
- Current Mood: "${moodLabel || mood}"
- Energy Level: ${energyLevel} out of 5 (${energyLevel <= 2 ? 'Low energy / exhausted' : energyLevel === 3 ? 'Steady / moderate' : 'High vitality'})
- Sleep Duration (Last Night): ${sleepHours} hours
- Focus / Context Tags: ${Array.isArray(tags) && tags.length > 0 ? tags.join(', ') : 'General student day'}
- Personal Note / Reflection: "${reflection || 'No specific note'}"

TASK:
Provide an empathetic, personalized, holistic suggestion specifically analyzing the interplay between their MOOD, ENERGY LEVEL, and SLEEP DURATION.
Highlight actionable, compassionate guidance for their student day.
Avoid clinical diagnosis, therapy jargon, or medical claims. Keep language encouraging, practical, and grounded.`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        supportiveInsight: {
          type: Type.STRING,
          description: "A 2-3 sentence validating reflection tailored to their current emotional and mental state."
        },
        energyAndSleepAnalysis: {
          type: Type.STRING,
          description: "A direct synthesis of how their sleep duration and energy level are affecting them today, with realistic pacing advice."
        },
        microActions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "3 actionable, low-effort micro-steps (2-5 mins each) the student can do right now to support their wellbeing."
        },
        mindsetAffirmation: {
          type: Type.STRING,
          description: "A grounded, encouraging takeaway phrase or mantra for the day."
        },
        recommendedPractice: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Name of an applicable student mindfulness or wellbeing exercise" },
            description: { type: Type.STRING, description: "Why this practice helps their specific mood and energy right now" },
            toolId: { type: Type.STRING, description: "One of: 'box-breathing', '478-breathing', 'grounding-54321', 'pomodoro-timer', or 'sleep-winddown'" }
          },
          required: ["title", "description"]
        }
      },
      required: ["supportiveInsight", "energyAndSleepAnalysis", "microActions", "mindsetAffirmation", "recommendedPractice"]
    };

    // Model order prioritizing fastest and highest-availability models with retry logic
    const modelsToTry = [
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
      "gemini-3.7-flash",
      "gemini-3.6-flash",
      "gemini-3.1-flash-lite",
      "gemini-3.5-flash-lite"
    ];
    let parsedResult = null;

    for (const modelName of modelsToTry) {
      let retries = 2;
      while (retries > 0 && !parsedResult) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              responseSchema
            }
          });

          if (response.text) {
            const rawText = response.text.trim();
            parsedResult = JSON.parse(rawText);
            break;
          }
        } catch (err: any) {
          retries--;
          const status = err?.status || err?.code || '';
          // If unavailable / 503 spike, briefly pause before retry or fallback
          if (retries > 0 && (status === 503 || status === 'UNAVAILABLE' || err?.message?.includes('demand'))) {
            await new Promise((resolve) => setTimeout(resolve, 800));
          }
        }
      }
      if (parsedResult) {
        break;
      }
    }

    if (parsedResult) {
      return res.json(parsedResult);
    }

    return res.json(generateLocalSuggestion({ mood, moodLabel, energyLevel, sleepHours, tags, reflection }));
  } catch (error) {
    console.error("Gemini API Check-In handled with local fallback:", error);
    return res.json(generateLocalSuggestion({ mood, moodLabel, energyLevel, sleepHours, tags, reflection }));
  }
});

// Vite Middleware & Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MindMate server running on http://localhost:${PORT}`);
  });
}

startServer();
