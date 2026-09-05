import { AiCheckInSuggestion, MoodId } from '../types';

interface SuggestionInput {
  mood: MoodId;
  moodLabel?: string;
  energyLevel: number;
  sleepHours: number;
  tags?: string[];
  reflection?: string;
}

// 1. POOLS OF SUPPORTIVE INSIGHTS (6 Variations per Mood Category)
const MOOD_INSIGHTS: Record<MoodId, string[]> = {
  overwhelmed: [
    "Cognitive overwhelm is a natural biological sign that incoming academic and emotional inputs exceed current bandwidth. Pressing pause right now is an act of intelligence, not delay.",
    "When multiple deadlines, lectures, and social expectations collide, your working memory gets crowded. You don't need to fix everything right now—just ground yourself in this moment.",
    "Feeling overwhelmed is your nervous system asking for a gentler cadence. Allow yourself to drop non-urgent expectations for the rest of today.",
    "Your brain is running too many simultaneous threads. Acknowledge the weight you're carrying, take a slow exhale, and let's narrow your focus to one simple breath.",
    "Academic pressure often feels all-consuming, but your worth and peace exist independent of this week's checklist. Give yourself permission to slow down.",
    "It is completely okay to feel flooded right now. Stepping away from tasks for even ten minutes allows your nervous system to down-regulate from fight-or-flight."
  ],
  stressed: [
    "Stress is your body's attempt to mobilize energy for challenges, but sustained tension drains stamina. Let's redirect that arousal into calm, single-task focus.",
    "Academic and campus demands can create persistent low-grade friction. Acknowledging this tension without judging yourself is the first step toward reclaiming clarity.",
    "You are navigating significant responsibilities right now. Remember that productivity is not a sprint; pacing yourself prevents burnout and preserves focus.",
    "Tension often builds up silently in the shoulders, jaw, and breath during busy college weeks. Pause, soften your posture, and take things one hour at a time.",
    "Stress narrows perspective to worst-case scenarios. Gently remind yourself: you have managed difficult academic chapters before, and you will navigate this one too.",
    "When deadlines pile up, the mind rushes forward into future worries. Bring your attention back to your immediate surroundings—what is one small thing in your control right now?"
  ],
  okay: [
    "A neutral, steady baseline is a great psychological foundation. You don't have to feel ecstatic every day; quiet stability gives you room to build healthy campus routines.",
    "Operating at a calm, steady baseline allows for consistent learning without the volatility of emotional extremes. Enjoy this gentle equilibrium.",
    "Neutral days are underrated gifts in student life. Use this balanced headspace to make quiet progress on projects or simply enjoy your day without hurry.",
    "Checking in while feeling 'okay' is wonderful self-awareness. It's the ideal moment to reinforce nourishing habits like hydration, gentle movement, and sleep routines.",
    "Steady days allow you to navigate lectures, assignments, and campus life with low friction. Keep your pace sustainable and take regular breaks.",
    "A balanced emotional state provides great cognitive clarity. Trust your steady rhythm and embrace the small joys of your daily student routine."
  ],
  good: [
    "You are in a positive, grounded headspace today! This clarity makes complex lecture material and collaborative projects feel much more accessible.",
    "Your grounded sense of wellbeing is a wonderful resource. Use this positive momentum to tackle tasks that require focus, creativity, or group connection.",
    "Feeling good is a great opportunity to reinforce positive habits, connect with friends, and enjoy the rewarding aspects of college learning.",
    "You're experiencing a healthy balance of optimism and focus. Channel this mindset into meaningful progress while maintaining your boundaries.",
    "A positive mood enhances creative problem-solving and memory retention. It's a fantastic day to delve into interesting study topics or explore campus activities.",
    "Your calm, positive outlook creates a reassuring anchor not only for yourself but also for classmates and peers around you."
  ],
  great: [
    "You are radiating high vitality and optimism today! This surge in cognitive energy provides the ideal environment for deep focus, creative breakthroughs, and leadership.",
    "Peak enthusiasm is a powerful asset in college life. Harness this flow state to conquer demanding coursework or dive into projects you care deeply about.",
    "Your enthusiasm and energy are running high! Remember to stay grounded, hydrate, and celebrate the accomplishments that brought you to this headspace.",
    "You're in a prime flow state today. Use this vibrant momentum to tackle challenging problems, and share some of your positive spark with friends and peers.",
    "High motivation and positive mood align perfectly for deep learning today. Make great strides on your goals while keeping an eye on healthy pacing.",
    "Wonderful energy! Take pride in your vitality today. Let your enthusiasm guide your studies, and remember to schedule a peaceful wind-down tonight."
  ]
};

// 2. POOLS OF ENERGY & SLEEP ANALYSIS (6 Nuanced Scenarios)
function getEnergySleepAnalysis(energyLevel: number, sleepHours: number): string {
  const isLowSleep = sleepHours < 6;
  const isOptimalSleep = sleepHours >= 7 && sleepHours <= 9;
  const isHighSleep = sleepHours > 9;
  const isLowEnergy = energyLevel <= 2;
  const isHighEnergy = energyLevel >= 4;

  if (isLowSleep && isLowEnergy) {
    const options = [
      `With only ${sleepHours}h of sleep and low energy (${energyLevel}/5), your prefrontal cortex is running on reserves. Complex analytical tasks will feel harder; prioritize rest and gentle pacing over perfection today.`,
      `Sleep debt (<6h) combined with depleted energy (${energyLevel}/5) means your working memory and emotional regulation need active protection. Limit non-essential commitments and avoid late-night cramming.`,
      `Your body is signaling fatigue after just ${sleepHours} hours of rest. Give yourself permission to operate in low-power mode: stick to basic essentials, drink water, and rest your eyes.`
    ];
    return options[Math.floor(Math.random() * options.length)];
  }

  if (isLowSleep && !isLowEnergy) {
    const options = [
      `You logged ${sleepHours}h of sleep but feel alert (${energyLevel}/5). This is often an adrenaline buffer; be cautious of an afternoon slump and avoid over-relying on excess caffeine.`,
      `Alertness (${energyLevel}/5) despite short sleep (${sleepHours}h) can feel deceptively sharp. Pace your physical exertion and plan an earlier bedtime tonight to settle your circadian rhythm.`,
      `Your current drive (${energyLevel}/5) is compensating for ${sleepHours} hours of rest. Capitalize on morning lecture focus, but schedule quiet downtime around mid-afternoon.`
    ];
    return options[Math.floor(Math.random() * options.length)];
  }

  if (!isLowSleep && isLowEnergy) {
    const options = [
      `You secured ${sleepHours}h of sleep, yet energy is low (${energyLevel}/5). This often points toward cognitive overload, emotional strain, or screen fatigue rather than lack of slumber. Gentle stretching will help.`,
      `Despite getting ${sleepHours} hours of rest, feeling sluggish (${energyLevel}/5) suggests you may need physical movement, hydration, or a quiet mental break from academic pressure.`,
      `Sufficient sleep (${sleepHours}h) paired with low energy (${energyLevel}/5) can mean your mind is emotionally fatigued. Treat yourself with compassion and take micro-breaks between study chunks.`
    ];
    return options[Math.floor(Math.random() * options.length)];
  }

  if (isOptimalSleep && isHighEnergy) {
    const options = [
      `Optimal sleep (${sleepHours}h) and high energy (${energyLevel}/5) create peak cognitive conditions. Your memory encoding, problem-solving, and mood resilience are functioning at their best!`,
      `With ${sleepHours} hours of deep restorative sleep and vibrant energy (${energyLevel}/5), you are primed for high-focus deep work sessions and meaningful campus engagement.`,
      `You have hit the sweet spot: ${sleepHours}h of healthy sleep and level ${energyLevel}/5 vitality. Channel this into your most challenging academic goals.`
    ];
    return options[Math.floor(Math.random() * options.length)];
  }

  if (isHighSleep) {
    const options = [
      `You logged ${sleepHours}h of extended sleep. If you experience mild sleep inertia or grogginess, step into natural sunlight and drink a glass of cool water to activate alertness.`,
      `Extended rest (${sleepHours}h) allows your body to catch up on physical fatigue. Gentle walking or light stretching will help transition your mind into active focus.`,
      `Your body took ${sleepHours} hours of deep restorative time. Wake up your senses gradually with a refreshing splash of water and a nourishing meal.`
    ];
    return options[Math.floor(Math.random() * options.length)];
  }

  // Steady baseline
  const options = [
    `Your ${sleepHours}h of sleep and steady energy (${energyLevel}/5) offer a reliable, sustainable foundation for classes, study sessions, and campus interactions.`,
    `A balanced sleep duration (${sleepHours}h) and steady ${energyLevel}/5 energy keep cognitive fatigue at bay. Maintain this balance with regular hydration and brief study pauses.`,
    `You're operating at a healthy, manageable rhythm with ${sleepHours} hours of sleep and level ${energyLevel}/5 energy. Keep up this steady daily pace.`
  ];
  return options[Math.floor(Math.random() * options.length)];
}

// 3. POOLS OF DYNAMIC MICRO-ACTIONS
function getMicroActions(mood: MoodId, energyLevel: number, sleepHours: number, tags: string[], reflection: string): string[] {
  const isLowSleep = sleepHours < 6;
  const isLowEnergy = energyLevel <= 2;
  const isHighEnergy = energyLevel >= 4;
  const lower = reflection.toLowerCase();

  const actions: string[] = [];

  // Energy & Sleep focused micro-step
  if (isLowSleep || isLowEnergy) {
    const lowEnergyActions = [
      "Drink a full tall glass of water with a pinch of electrolytes or lemon to rehydrate brain cells.",
      "Take a 10–15 minute quiet eye-rest break in a quiet campus corner or library armchair.",
      "Do 5 gentle shoulder rolls and stretch your neck to relieve somatic fatigue."
    ];
    actions.push(lowEnergyActions[Math.floor(Math.random() * lowEnergyActions.length)]);
  } else if (isHighEnergy) {
    const highEnergyActions = [
      "Block out a dedicated 45-minute deep-work sprint for your hardest assignment while focus is peak.",
      "Tackle your most intimidating lecture problem set first to build fast academic momentum.",
      "Channel your extra vitality into a brisk 20-minute campus walk or active workout."
    ];
    actions.push(highEnergyActions[Math.floor(Math.random() * highEnergyActions.length)]);
  } else {
    const steadyActions = [
      "Step outside for 5–10 minutes between lectures to absorb natural daylight and fresh air.",
      "Unclench your jaw, soften your brow, and take 3 deep diaphragmatic belly breaths.",
      "Clear your immediate desk workspace to reduce subtle visual clutter and distraction."
    ];
    actions.push(steadyActions[Math.floor(Math.random() * steadyActions.length)]);
  }

  // Context & Tag focused micro-step
  if (tags.includes('Exams & Quizzes') || tags.includes('Deadlines') || lower.includes('exam') || lower.includes('grade')) {
    const examActions = [
      "Do a 3-minute 'Brain Dump': write every deadline on paper so your working memory doesn't have to loop on them.",
      "Break your next syllabus chapter into tiny, manageable 15-minute bite-sized concepts.",
      "Put your smartphone on Do Not Disturb and out of sight for your next study block."
    ];
    actions.push(examActions[Math.floor(Math.random() * examActions.length)]);
  } else if (tags.includes('Hostel Life') || tags.includes('Roommates') || tags.includes('Homesick') || lower.includes('home')) {
    const hostelActions = [
      "Put on noise-cancelling headphones with gentle rainfall or stream sounds to build a personal sanctuary.",
      "Send a warm, quick check-in message to a family member or childhood friend.",
      "Step outside for a peaceful solitary stroll around campus to enjoy your own personal headspace."
    ];
    actions.push(hostelActions[Math.floor(Math.random() * hostelActions.length)]);
  } else if (tags.includes('Socializing') || lower.includes('friend') || lower.includes('roommate')) {
    const socialActions = [
      "Enjoy a cup of tea or walk with a peer without talking about grades or exams.",
      "Practice setting a gentle boundary if you need solitary downtime this evening.",
      "Share an encouraging or kind word with someone who might also be feeling semester stress."
    ];
    actions.push(socialActions[Math.floor(Math.random() * socialActions.length)]);
  } else {
    const generalActions = [
      "Review your schedule for today and pick only your top 2 true must-do priorities.",
      "Set a clear, firm cutoff time for studying tonight so your evening is genuinely restful.",
      "Take a 5-minute break away from all computer and phone screens to let your eyes rest."
    ];
    actions.push(generalActions[Math.floor(Math.random() * generalActions.length)]);
  }

  // Mood-balancing third micro-step
  if (mood === 'overwhelmed' || mood === 'stressed') {
    const calmActions = [
      "Try 2 minutes of Box Breathing (4 in, 4 hold, 4 out, 4 hold) to stabilize your heart rate.",
      "Write down the single next physical action you need to take, ignoring the rest of the mountain.",
      "Remind yourself out loud: 'I only need to do one small thing at a time.'"
    ];
    actions.push(calmActions[Math.floor(Math.random() * calmActions.length)]);
  } else if (mood === 'great' || mood === 'good') {
    const upliftingActions = [
      "Write down 3 specific things that went right this week in your campus routine.",
      "Help or inspire a classmate who may be struggling with this week's coursework.",
      "Take a mindful moment to savor this feeling of accomplishment and calm."
    ];
    actions.push(upliftingActions[Math.floor(Math.random() * upliftingActions.length)]);
  } else {
    const balanceActions = [
      "Keep a water bottle beside you and take mindful sips during your next class.",
      "Do a quick 60-second stretch reaching your hands toward the ceiling and exhaling slowly.",
      "Check in on your posture—align your spine comfortably in your study chair."
    ];
    actions.push(balanceActions[Math.floor(Math.random() * balanceActions.length)]);
  }

  return actions.slice(0, 3);
}

// 4. POOLS OF MINDSET AFFIRMATIONS (6 per Mood Category)
const MOOD_AFFIRMATIONS: Record<MoodId, string[]> = {
  overwhelmed: [
    "Rest is not a reward I have to earn; it is the vital fuel my mind needs to function.",
    "I do not need to solve the entire semester today. I only need to take the next gentle step.",
    "My worth as a person is completely independent of my academic output and grades.",
    "I give myself permission to pause, breathe, and let non-essential demands wait.",
    "One breath, one task, one moment at a time is all that is required of me.",
    "It is safe for me to slow down. Clarity returns when I stop rushing."
  ],
  stressed: [
    "I can handle what is in front of me right now with patience and self-compassion.",
    "Stress is just a temporary state, not my permanent identity or destiny.",
    "I release the urge to control everything and focus solely on what is within my control.",
    "Progress does not require panic. Calm and steady effort builds true mastery.",
    "I trust my ability to navigate challenges, just as I have overcome them in the past.",
    "I choose peace over urgency and consistency over perfection."
  ],
  okay: [
    "Small, quiet consistency creates resilient foundations for my student life.",
    "I honor where I am today and embrace the steady rhythm of my daily journey.",
    "Every ordinary day of steady effort is a meaningful investment in my future.",
    "I am grounded, capable, and free to progress at my own unique pace.",
    "Quiet days give me space to reflect, learn, and recharge.",
    "I find contentment in the simple, steady routines of my day."
  ],
  good: [
    "I channel my positive energy into purposeful learning and genuine connection.",
    "My mind is clear, receptive, and capable of understanding complex ideas.",
    "I celebrate my daily growth and look forward to the opportunities ahead.",
    "Positive momentum grows when I nurture my mind, body, and boundaries.",
    "I am grateful for this clarity and use it to uplift myself and those around me.",
    "I welcome creative solutions and enjoy the process of learning."
  ],
  great: [
    "I am thriving, capable, and confident in my unique talents and aspirations.",
    "My vitality inspires and energizes both my personal goals and my community.",
    "I embrace today's flow state with gratitude, courage, and enthusiasm.",
    "I have the focus, curiosity, and drive to turn ambitious goals into reality.",
    "High energy paired with grounded wisdom makes anything achievable.",
    "I savor this peak moment while keeping my heart anchored and kind."
  ]
};

// 5. RECOMMENDED PRACTICE TOOL SELECTION (Varied & Targeted)
function getRecommendedPractice(mood: MoodId, energyLevel: number, tags: string[], reflection: string) {
  const lower = reflection.toLowerCase();
  const isHighEnergy = energyLevel >= 4;
  const isLowEnergy = energyLevel <= 2;

  if (mood === 'overwhelmed' || lower.includes('panic') || lower.includes('anxious') || lower.includes('spinning')) {
    const practices = [
      {
        title: "5-4-3-2-1 Sensory Grounding",
        description: "Anchor your physical senses in your current surroundings to halt racing thoughts.",
        toolId: "grounding-54321"
      },
      {
        title: "4-7-8 Calming Breathwork",
        description: "A soothing extended-exhale breathing cycle to reset your autonomic nervous system.",
        toolId: "478-breathing"
      },
      {
        title: "Mindful Body Scan",
        description: "Release somatic tension in your forehead, jaw, and neck with gentle awareness.",
        toolId: "body-scan"
      }
    ];
    return practices[Math.floor(Math.random() * practices.length)];
  }

  if (mood === 'stressed' || tags.includes('Exams & Quizzes') || tags.includes('Deadlines')) {
    const practices = [
      {
        title: "Box Breathing (4-4-4-4)",
        description: "Equal-ratio breathwork used by top performers to regain mental clarity under pressure.",
        toolId: "box-breathing"
      },
      {
        title: "Thought Reframing Journal",
        description: "Examine catastrophic thoughts and transform them into balanced, realistic perspectives.",
        toolId: "thought-reframe"
      },
      {
        title: "4-7-8 Calming Breathwork",
        description: "Gentle diaphragmatic breathing to quiet adrenaline and lower your heart rate.",
        toolId: "478-breathing"
      }
    ];
    return practices[Math.floor(Math.random() * practices.length)];
  }

  if (isLowEnergy) {
    const practices = [
      {
        title: "Mindful Body Scan",
        description: "A restful, restorative somatic exercise that replenishes energy without strain.",
        toolId: "body-scan"
      },
      {
        title: "Ambient Nature Audio Sanctuary",
        description: "Relaxing rain, mountain stream, or Tibetan singing bowl soundscapes for calm rest.",
        toolId: "ambient-sound"
      },
      {
        title: "4-7-8 Calming Breathwork",
        description: "Gentle breath cycles that oxygenate your body and encourage quiet restoration.",
        toolId: "478-breathing"
      }
    ];
    return practices[Math.floor(Math.random() * practices.length)];
  }

  if (isHighEnergy || mood === 'great') {
    const practices = [
      {
        title: "Focus Pomodoro Session",
        description: "Structured 25-minute focus intervals with planned recovery to sustain peak flow.",
        toolId: "pomodoro-timer"
      },
      {
        title: "Daily Gratitude & Intention Log",
        description: "Capture your positive momentum and clarify your top intentions for the day.",
        toolId: "gratitude-log"
      },
      {
        title: "Box Breathing (4-4-4-4)",
        description: "Sharpen laser focus and concentration before diving into demanding coursework.",
        toolId: "box-breathing"
      }
    ];
    return practices[Math.floor(Math.random() * practices.length)];
  }

  // Balanced / Okay / Good
  const practices = [
    {
      title: "Box Breathing (4-4-4-4)",
      description: "Equal-ratio breathwork to keep your mind sharp and balanced during study hours.",
      toolId: "box-breathing"
    },
    {
      title: "Focus Pomodoro Session",
      description: "Balanced 25-minute study intervals to build effortless academic consistency.",
      toolId: "pomodoro-timer"
    },
    {
      title: "Mindful Body Scan",
      description: "A quick 3-minute physical awareness pause to release study posture strain.",
      toolId: "body-scan"
    },
    {
      title: "4-7-8 Calming Breathwork",
      description: "Diaphragmatic breathing to maintain deep, peaceful baseline concentration.",
      toolId: "478-breathing"
    }
  ];
  return practices[Math.floor(Math.random() * practices.length)];
}

/**
 * Main Client-Side Wellness AI Suggestion Engine.
 * Generates rich, personalized, varied suggestions across 6+ scenarios for each mood,
 * energy level, sleep tier, context tags, and user reflections.
 */
export function generateClientAiSuggestion({
  mood,
  energyLevel,
  sleepHours,
  tags = [],
  reflection = ''
}: SuggestionInput): AiCheckInSuggestion {
  // Select insight from pool of 6 for current mood
  const insightsPool = MOOD_INSIGHTS[mood] || MOOD_INSIGHTS.okay;
  const supportiveInsight = insightsPool[Math.floor(Math.random() * insightsPool.length)];

  // Dynamic Energy & Sleep Interaction Analysis
  const energyAndSleepAnalysis = getEnergySleepAnalysis(energyLevel, sleepHours);

  // Dynamic context-aware micro-actions
  const microActions = getMicroActions(mood, energyLevel, sleepHours, tags, reflection);

  // Affirmation from pool of 6
  const affirmationsPool = MOOD_AFFIRMATIONS[mood] || MOOD_AFFIRMATIONS.okay;
  const mindsetAffirmation = affirmationsPool[Math.floor(Math.random() * affirmationsPool.length)];

  // Practice tool recommendation
  const recommendedPractice = getRecommendedPractice(mood, energyLevel, tags, reflection);

  return {
    supportiveInsight,
    energyAndSleepAnalysis,
    microActions,
    mindsetAffirmation,
    recommendedPractice
  };
}
