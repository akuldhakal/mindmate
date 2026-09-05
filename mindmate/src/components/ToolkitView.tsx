import React, { useState, useEffect } from 'react';
import { 
  Wind, 
  Timer, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Eye, 
  Hand, 
  Ear, 
  Heart, 
  RefreshCw, 
  Bell,
  Sliders,
  Feather,
  Flower2,
  Clock,
  Music,
  Sun,
  Flame,
  Minus,
  Plus,
  Activity,
  ChevronRight,
  ChevronLeft,
  Check,
  Zap,
  Info,
  ShieldCheck
} from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';

interface ToolkitViewProps {
  initialTool?: string;
}

export const ToolkitView: React.FC<ToolkitViewProps> = ({ initialTool = 'meditation' }) => {
  const [activeTab, setActiveTab] = useState<'meditation' | 'breathing' | 'timer' | 'reset' | 'stretch'>(
    (initialTool as any) === 'affirmation' || (initialTool as any) === 'journal' 
      ? 'meditation' 
      : (initialTool as any) || 'meditation'
  );

  useEffect(() => {
    if (initialTool && ['meditation', 'breathing', 'timer', 'reset', 'stretch', 'exercise', 'physical'].includes(initialTool)) {
      if (initialTool === 'exercise' || initialTool === 'physical') {
        setActiveTab('stretch');
      } else {
        setActiveTab(initialTool as any);
      }
    }
  }, [initialTool]);

  useEffect(() => {
    return () => {
      soundEngine.stopAmbient();
    };
  }, []);

  // Stop sounds when switching tabs
  const handleTabChange = (newTab: 'meditation' | 'breathing' | 'timer' | 'reset' | 'stretch') => {
    soundEngine.stopAmbient();
    setIsMeditationRunning(false);
    setIsBreathingRunning(false);
    setIsTimerRunning(false);
    setIsStretchRunning(false);
    setActiveTab(newTab);
  };

  // ===================== 0. MEDITATION STATE =====================
  const [meditationDurationMinutes, setMeditationDurationMinutes] = useState<number>(5);
  const [meditationSecondsLeft, setMeditationSecondsLeft] = useState<number>(5 * 60);
  const [isMeditationRunning, setIsMeditationRunning] = useState<boolean>(false);
  const [isMeditationCompleted, setIsMeditationCompleted] = useState<boolean>(false);
  const [meditationSound, setMeditationSound] = useState<'zen-drone' | 'peaceful-pad' | 'stream' | 'rain' | 'silent'>('zen-drone');
  const [meditationVolume, setMeditationVolume] = useState<number>(0.2);
  const [meditationTheme, setMeditationTheme] = useState<'breath' | 'stress' | 'kindness' | 'silent'>('breath');
  const [currentPromptIndex, setCurrentPromptIndex] = useState<number>(0);

  const meditationPromptsMap: Record<string, string[]> = {
    breath: [
      "Gently close your eyes or soften your gaze downwards.",
      "Bring your awareness to the natural flow of your breath entering and leaving your body.",
      "Notice where you feel the breath most clearly — in your chest, belly, or the tip of your nose.",
      "Allow any tension in your forehead, jaw, and shoulders to soften with each exhale.",
      "There is nothing you need to fix or achieve in this moment. Simply be present with your breath.",
      "When thoughts arise, gently observe them like clouds passing in the sky, and return to your breathing."
    ],
    stress: [
      "Acknowledge that academic pressure is real, but you are more than your deadlines.",
      "With every slow exhale, imagine releasing the mental weight of exams and expectations.",
      "Feel the solid support beneath your body, anchoring you securely in the present room.",
      "Give yourself permission to pause. Rest is what restores your strength and clarity.",
      "You do not have to solve tomorrow's problems in this very breath."
    ],
    kindness: [
      "Place a gentle hand on your chest and offer yourself patience and warmth.",
      "Silently say to yourself: 'May I be at ease. May I be gentle with my journey today.'",
      "Think of how understanding you are with a close friend, and extend that same kindness to yourself.",
      "You are learning, growing, and doing your best one day at a time."
    ],
    silent: [
      "Resting in quiet, open presence...",
      "Anchored in the stillness of the present moment...",
      "Aware of the quiet space between thoughts..."
    ]
  };

  // Countdown timer for Meditation
  useEffect(() => {
    let interval: any = null;
    if (isMeditationRunning && meditationSecondsLeft > 0) {
      interval = setInterval(() => {
        setMeditationSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (meditationSecondsLeft === 0 && isMeditationRunning) {
      setIsMeditationRunning(false);
      setIsMeditationCompleted(true);
      soundEngine.stopAmbient();
      // Peaceful completion singing bowl bells
      soundEngine.playMeditationBell(528);
      setTimeout(() => soundEngine.playMeditationBell(432), 1600);
    }
    return () => clearInterval(interval);
  }, [isMeditationRunning, meditationSecondsLeft]);

  // Rotate guidance prompt every 20 seconds during meditation
  useEffect(() => {
    let promptInterval: any = null;
    if (isMeditationRunning) {
      promptInterval = setInterval(() => {
        const prompts = meditationPromptsMap[meditationTheme] || meditationPromptsMap.breath;
        setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
      }, 20000);
    }
    return () => clearInterval(promptInterval);
  }, [isMeditationRunning, meditationTheme]);

  const handleStartMeditation = () => {
    setIsMeditationRunning(true);
    setIsMeditationCompleted(false);
    
    // Play calm and peaceful sound on start
    soundEngine.playMeditationBell(432);
    if (meditationSound !== 'silent') {
      soundEngine.startAmbient(meditationSound as any, meditationVolume);
    }
  };

  const handlePauseMeditation = () => {
    setIsMeditationRunning(false);
    soundEngine.stopAmbient();
  };

  const handleResetMeditation = () => {
    setIsMeditationRunning(false);
    setIsMeditationCompleted(false);
    soundEngine.stopAmbient();
    setMeditationSecondsLeft(meditationDurationMinutes * 60);
  };

  const handleSetDuration = (mins: number) => {
    const clamped = Math.max(1, Math.min(60, mins));
    setMeditationDurationMinutes(clamped);
    if (!isMeditationRunning) {
      setMeditationSecondsLeft(clamped * 60);
      setIsMeditationCompleted(false);
    }
  };

  const handleMeditationSoundChange = (sound: 'zen-drone' | 'peaceful-pad' | 'stream' | 'rain' | 'silent') => {
    setMeditationSound(sound);
    if (isMeditationRunning) {
      if (sound === 'silent') {
        soundEngine.stopAmbient();
      } else {
        soundEngine.startAmbient(sound as any, meditationVolume);
      }
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setMeditationVolume(newVol);
    if (isMeditationRunning && meditationSound !== 'silent') {
      soundEngine.startAmbient(meditationSound as any, newVol);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const totalDurationSeconds = meditationDurationMinutes * 60;
  const progressPercent = totalDurationSeconds > 0 
    ? Math.max(0, Math.min(100, ((totalDurationSeconds - meditationSecondsLeft) / totalDurationSeconds) * 100))
    : 0;

  // ===================== 1. BREATHING STATE =====================
  type BreathingPattern = 'box' | 'relax478' | 'calm55';
  const [breathingPattern, setBreathingPattern] = useState<BreathingPattern>('box');
  const [isBreathingRunning, setIsBreathingRunning] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathSecondsLeft, setBreathSecondsLeft] = useState(4);
  const [breathCyclesCompleted, setBreathCyclesCompleted] = useState(0);
  const [soundCuesEnabled, setSoundCuesEnabled] = useState(true);

  // Pattern parameters: [inhale, hold1, exhale, hold2/rest]
  const patternConfigs: Record<BreathingPattern, { name: string; desc: string; timings: { Inhale: number; Hold: number; Exhale: number; Rest: number } }> = {
    box: {
      name: 'Box Breathing (4-4-4-4)',
      desc: 'Used by athletes and students to lower acute stress and restore focus.',
      timings: { Inhale: 4, Hold: 4, Exhale: 4, Rest: 4 }
    },
    relax478: {
      name: '4-7-8 Deep Relaxation',
      desc: 'Triggers the parasympathetic nervous system for sleep and deep calm.',
      timings: { Inhale: 4, Hold: 7, Exhale: 8, Rest: 0 }
    },
    calm55: {
      name: 'Coherent 5-5 Breathing',
      desc: 'Smooth, balanced rhythm to steady heart rate and calm racing thoughts.',
      timings: { Inhale: 5, Hold: 0, Exhale: 5, Rest: 0 }
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isBreathingRunning) {
      const timings = patternConfigs[breathingPattern].timings;
      interval = setInterval(() => {
        setBreathSecondsLeft((prev) => {
          if (prev <= 1) {
            // Transition phase
            setBreathPhase((currentPhase) => {
              let nextPhase: 'Inhale' | 'Hold' | 'Exhale' | 'Rest' = 'Inhale';
              if (currentPhase === 'Inhale') {
                nextPhase = timings.Hold > 0 ? 'Hold' : 'Exhale';
              } else if (currentPhase === 'Hold') {
                nextPhase = 'Exhale';
              } else if (currentPhase === 'Exhale') {
                nextPhase = timings.Rest > 0 ? 'Rest' : 'Inhale';
              } else {
                nextPhase = 'Inhale';
              }

              if (nextPhase === 'Inhale') {
                setBreathCyclesCompleted((c) => c + 1);
              }

              if (soundCuesEnabled) {
                soundEngine.playChime(nextPhase === 'Inhale' ? 528 : 396);
              }

              return nextPhase;
            });
            const nextDuration = timings[breathPhase === 'Inhale' ? (timings.Hold > 0 ? 'Hold' : 'Exhale') : breathPhase === 'Hold' ? 'Exhale' : breathPhase === 'Exhale' ? (timings.Rest > 0 ? 'Rest' : 'Inhale') : 'Inhale'];
            return nextDuration || 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathPhase('Inhale');
      setBreathSecondsLeft(patternConfigs[breathingPattern].timings.Inhale);
    }

    return () => clearInterval(interval);
  }, [isBreathingRunning, breathingPattern, breathPhase, soundCuesEnabled]);

  // ===================== 2. FOCUS TIMER STATE =====================
  const [timerDuration, setTimerDuration] = useState<number>(25 * 60);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'study' | 'break'>('study');
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'stream' | 'whitenoise'>('none');

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerSecondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      soundEngine.playChime(639);
      if (timerMode === 'study') {
        setTimerMode('break');
        setTimerSecondsLeft(5 * 60);
        setTimerDuration(5 * 60);
      } else {
        setTimerMode('study');
        setTimerSecondsLeft(25 * 60);
        setTimerDuration(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft, timerMode]);

  const handleAmbientToggle = (sound: 'rain' | 'stream' | 'whitenoise') => {
    if (ambientSound === sound) {
      soundEngine.stopAmbient();
      setAmbientSound('none');
    } else {
      soundEngine.startAmbient(sound);
      setAmbientSound(sound);
    }
  };

  const handleSelectPreset = (minutes: number, mode: 'study' | 'break') => {
    setIsTimerRunning(false);
    setTimerMode(mode);
    setTimerDuration(minutes * 60);
    setTimerSecondsLeft(minutes * 60);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // ===================== 3. QUICK RESET (5-4-3-2-1) STATE =====================
  const [groundingStep, setGroundingStep] = useState(0);
  const [userInputs, setUserInputs] = useState<Record<number, string[]>>({
    0: ['', '', '', '', ''],
    1: ['', '', '', ''],
    2: ['', '', ''],
    3: ['', ''],
    4: ['']
  });

  const groundingStepsData = [
    {
      count: 5,
      title: '5 Things You Can SEE',
      prompt: 'Look around your room or desk. Notice colors, shadows, textures, or small details.',
      icon: Eye,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      placeholders: ['A green plant leaf', 'A water bottle', 'Pattern on my rug', 'Light coming through the window', 'My pen on the notebook']
    },
    {
      count: 4,
      title: '4 Things You Can TOUCH & FEEL',
      prompt: 'Notice physical sensations. The solid floor under your feet, the fabric of your shirt, the cool surface of your desk.',
      icon: Hand,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      placeholders: ['Feet firmly on the floor', 'Soft sweater fabric', 'Smooth desk surface', 'Cool air on my hands']
    },
    {
      count: 3,
      title: '3 Things You Can HEAR',
      prompt: 'Listen past the obvious sounds. The air conditioning hum, distant hallway chatter, birds outside.',
      icon: Ear,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      placeholders: ['Computer fan humming', 'Distant bird outside', 'Clock ticking or footsteps']
    },
    {
      count: 2,
      title: '2 Things You Can SMELL',
      prompt: 'Take a gentle breath through your nose. Notice coffee aroma, fresh rain, shampoo, or notebook paper.',
      icon: Sparkles,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      placeholders: ['Warm coffee or tea', 'Fresh laundry or clean air']
    },
    {
      count: 1,
      title: '1 Thing You Appreciate or TASTE',
      prompt: 'Savor the taste of cool water, or state one kind, compassionate thought about yourself.',
      icon: Heart,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      placeholders: ['I am doing the best I can today']
    }
  ];

  // ===================== 4. QUICK PHYSICAL EXERCISE & BODY STRETCH STATE =====================
  interface StretchExercise {
    id: string;
    name: string;
    category: 'Neck & Shoulders' | 'Spine & Back' | 'Wrists & Hands' | 'Hips & Legs' | 'Chest & Posture';
    targetArea: string;
    durationSec: number;
    cue: string;
    instructions: string[];
    benefit: string;
    tag: string;
  }

  interface StretchRoutine {
    id: 'desk' | 'spine' | 'full';
    name: string;
    durationLabel: string;
    description: string;
    color: string;
    bg: string;
    borderColor: string;
    exerciseIds: string[];
  }

  const stretchExercises: StretchExercise[] = [
    {
      id: 'neck-tilt',
      name: 'Cervical Neck Release',
      category: 'Neck & Shoulders',
      targetArea: 'Upper Trapezius & Neck Sides',
      durationSec: 30,
      cue: 'Inhale tall, exhale gently tilt your right ear toward your right shoulder. Hold 15s, then switch.',
      instructions: [
        'Sit tall in your chair with shoulders relaxed downward.',
        'Gently lower your right ear toward your right shoulder without hiking the shoulder.',
        'Breathe smoothly, feeling the release along the left side of your neck for 15 seconds.',
        'Slowly return to center and gently tilt to your left side for 15 seconds.'
      ],
      benefit: 'Relieves neck tension caused by looking down at laptops and notebooks.',
      tag: 'Desk Friendly'
    },
    {
      id: 'shoulder-rolls',
      name: 'Shoulder Blade Rolls & Pinches',
      category: 'Neck & Shoulders',
      targetArea: 'Rhomboids & Scapular Stabilizers',
      durationSec: 30,
      cue: 'Roll shoulders up, back, and down in slow circular waves with conscious breathing.',
      instructions: [
        'Inhale as you shrug shoulders smoothly up toward your ears.',
        'Roll them backward, gently pinching your shoulder blades together.',
        'Exhale as you press them down away from your ears.',
        'Perform 5 smooth backward rolls, then reverse for 5 forward rolls.'
      ],
      benefit: 'Unlocks upper back knots and boosts circulation around the upper spine.',
      tag: 'Instant Relief'
    },
    {
      id: 'chest-expansion',
      name: 'Chest Opener & Clasp',
      category: 'Chest & Posture',
      targetArea: 'Pectoralis Major & Anterior Deltoids',
      durationSec: 30,
      cue: 'Clasp hands behind your lower back, draw shoulder blades together, and lift your sternum.',
      instructions: [
        'Interlace your fingers behind your back (or hold the rear edges of your chair).',
        'Gently straighten your arms and draw shoulder blades together.',
        'Lift your chest gently upward and take 3 deep, expansive breaths.',
        'Keep your neck neutral and your core softly braced.'
      ],
      benefit: 'Reverses the rounded-shoulder hunch from typing and phone use.',
      tag: 'Posture Reset'
    },
    {
      id: 'seated-twist',
      name: 'Seated Chair Spine Rotation',
      category: 'Spine & Back',
      targetArea: 'Thoracic Spine & Obliques',
      durationSec: 40,
      cue: 'Inhale to lengthen your spine, exhale to gently rotate through your ribcage.',
      instructions: [
        'Sit tall with both feet flat on the floor.',
        'Place your right hand on your left knee, and left hand on your chair arm or backrest.',
        'Inhale deeply to sit up straight, then exhale and gently turn your torso left.',
        'Hold for 20 seconds, then switch sides and repeat on the right.'
      ],
      benefit: 'Decompresses mid-back vertebrae and re-energizes sluggish circulation.',
      tag: 'Spine Mobility'
    },
    {
      id: 'wrist-forearm',
      name: 'Wrist & Forearm Flexor Release',
      category: 'Wrists & Hands',
      targetArea: 'Carpal Tunnel & Forearm Tendons',
      durationSec: 30,
      cue: 'Extend arm forward, gently pull fingers back for 15s, then invert downward for 15s.',
      instructions: [
        'Extend your right arm forward with palm facing out and fingertips up.',
        'Use your left hand to gently pull your right fingers back toward your body for 15 seconds.',
        'Flip your hand so fingertips point down, and gently press the back of your hand.',
        'Repeat the full sequence on your left wrist.'
      ],
      benefit: 'Prevents repetitive strain injury, stiffness, and typing cramp fatigue.',
      tag: 'Typing Relief'
    },
    {
      id: 'overhead-reach',
      name: 'Sky Reach & Side Body Arc',
      category: 'Spine & Back',
      targetArea: 'Latissimus Dorsi & Intercostals',
      durationSec: 35,
      cue: 'Interlace fingers overhead, reach high, and gently lean to each side.',
      instructions: [
        'Interlace fingers and turn palms upward toward the ceiling.',
        'Inhale deeply and stretch your arms up as high as comfortable.',
        'Exhale and lean your torso gently to the right, opening the left ribs for 15s.',
        'Return to center and lean to the left side for 15s.'
      ],
      benefit: 'Expands lung capacity, encourages full diaphragmatic breathing, and fights fatigue.',
      tag: 'Energy Boost'
    },
    {
      id: 'seated-cat-cow',
      name: 'Seated Cat-Cow Breath Waves',
      category: 'Spine & Back',
      targetArea: 'Full Spine & Pelvic Tilt',
      durationSec: 40,
      cue: 'Inhale arching into Cow pose, exhale rounding into Cat pose.',
      instructions: [
        'Place your hands firmly on your knees.',
        'Inhale (Cow): Arch your back, lift your chest, and look slightly upward.',
        'Exhale (Cat): Round your entire back, tuck your chin to your chest, and scoop pelvis.',
        'Flow smoothly through 6 to 8 mindful breath cycles.'
      ],
      benefit: 'Restores spinal mobility and releases lower back compression from hard study chairs.',
      tag: 'Full Spine'
    },
    {
      id: 'figure-four',
      name: 'Seated Figure-4 Hip Opener',
      category: 'Hips & Legs',
      targetArea: 'Piriformis, Glutes & Sciatic Nerve',
      durationSec: 40,
      cue: 'Cross ankle over opposite knee, flex foot, and gently hinge forward from the hips.',
      instructions: [
        'Sit on the front half of your chair with left foot planted flat.',
        'Cross your right ankle over your left knee, forming a figure 4.',
        'Keep your right foot flexed to protect your knee.',
        'Hinge forward from the hips with a straight back until you feel a deep glute stretch. Hold 20s, then switch.'
      ],
      benefit: 'Alleviates hip stiffness and glute pressure caused by long study sessions.',
      tag: 'Hip Relief'
    },
    {
      id: 'standing-fold',
      name: 'Standing Forward Ragdoll Hang',
      category: 'Hips & Legs',
      targetArea: 'Hamstrings & Lumbar Decompression',
      durationSec: 45,
      cue: 'Soft bend in your knees, let your upper body and head hang completely loose.',
      instructions: [
        'Stand up with feet hip-width apart.',
        'Bend your knees softly and hinge at the hips, letting your upper body hang down.',
        'Optionally hold opposite elbows and gently sway your torso side to side.',
        'Inhale slowly and roll up vertebra by vertebra when time expires.'
      ],
      benefit: 'Inverts blood flow to awaken mental focus and decompresses the lower spine.',
      tag: 'Standing'
    },
    {
      id: 'standing-quad',
      name: 'Standing Quad & Hip Flexor Stretch',
      category: 'Hips & Legs',
      targetArea: 'Quadriceps & Psoas',
      durationSec: 40,
      cue: 'Hold a desk or wall for balance, bend knee and gently draw heel toward glutes.',
      instructions: [
        'Stand tall next to a desk or wall, holding it for balance with one hand.',
        'Bend your right knee and hold your right ankle or foot with your right hand.',
        'Keep your knees parallel and tuck your pelvis slightly to lengthen the thigh.',
        'Hold for 20 seconds, release gently, and repeat on your left leg.'
      ],
      benefit: 'Lengthens chronically shortened hip flexors that cause lower back ache.',
      tag: 'Standing'
    }
  ];

  const stretchRoutines: StretchRoutine[] = [
    {
      id: 'desk',
      name: 'Desk & Study Break De-Hunch',
      durationLabel: '2.5 Mins • 4 Stretches',
      description: 'Quick seated relief without getting out of your chair. Targets neck, shoulders, chest, and wrists.',
      color: 'text-emerald-800',
      bg: 'bg-emerald-50',
      borderColor: 'border-emerald-200/70',
      exerciseIds: ['neck-tilt', 'shoulder-rolls', 'chest-expansion', 'wrist-forearm']
    },
    {
      id: 'spine',
      name: 'Spine Mobility & Hip Release',
      durationLabel: '3.5 Mins • 4 Stretches',
      description: 'Restores spinal flexion, rotational freedom, and hip flexibility after prolonged sitting.',
      color: 'text-amber-800',
      bg: 'bg-amber-50',
      borderColor: 'border-amber-200/70',
      exerciseIds: ['seated-cat-cow', 'seated-twist', 'overhead-reach', 'figure-four']
    },
    {
      id: 'full',
      name: 'Full-Body Study Awakening',
      durationLabel: '4.5 Mins • 5 Stretches',
      description: 'Standing reset to wake up muscles, elevate oxygen delivery to the brain, and eliminate sluggishness.',
      color: 'text-indigo-800',
      bg: 'bg-indigo-50',
      borderColor: 'border-indigo-200/70',
      exerciseIds: ['overhead-reach', 'chest-expansion', 'standing-fold', 'standing-quad', 'figure-four']
    }
  ];

  const [selectedRoutineId, setSelectedRoutineId] = useState<'desk' | 'spine' | 'full'>('desk');
  const [currentRoutineIndex, setCurrentRoutineIndex] = useState<number>(0);
  const [isStretchRunning, setIsStretchRunning] = useState<boolean>(false);
  const [stretchSecondsLeft, setStretchSecondsLeft] = useState<number>(30);
  const [autoAdvanceStretch, setAutoAdvanceStretch] = useState<boolean>(true);
  const [stretchSoundEnabled, setStretchSoundEnabled] = useState<boolean>(true);
  const [stretchSubTab, setStretchSubTab] = useState<'guided' | 'catalog' | 'ergonomics'>('guided');
  const [catalogCategoryFilter, setCatalogCategoryFilter] = useState<string>('All');
  const [routineCompletedBanner, setRoutineCompletedBanner] = useState<boolean>(false);

  // Timer effect for physical stretches
  useEffect(() => {
    let interval: any = null;
    if (isStretchRunning && stretchSecondsLeft > 0) {
      interval = setInterval(() => {
        setStretchSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (isStretchRunning && stretchSecondsLeft === 0) {
      if (stretchSoundEnabled) {
        soundEngine.playChime(660);
      }
      
      const currentRoutine = stretchRoutines.find((r) => r.id === selectedRoutineId) || stretchRoutines[0];
      
      if (stretchSubTab === 'guided' && autoAdvanceStretch) {
        if (currentRoutineIndex < currentRoutine.exerciseIds.length - 1) {
          const nextIdx = currentRoutineIndex + 1;
          const nextExId = currentRoutine.exerciseIds[nextIdx];
          const nextEx = stretchExercises.find((e) => e.id === nextExId) || stretchExercises[0];
          setCurrentRoutineIndex(nextIdx);
          setStretchSecondsLeft(nextEx.durationSec);
        } else {
          // Routine completed!
          setIsStretchRunning(false);
          setRoutineCompletedBanner(true);
          soundEngine.playMeditationBell(528);
        }
      } else {
        setIsStretchRunning(false);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStretchRunning, stretchSecondsLeft, autoAdvanceStretch, currentRoutineIndex, selectedRoutineId, stretchSubTab, stretchSoundEnabled]);

  const handleSelectRoutine = (routineId: 'desk' | 'spine' | 'full') => {
    setIsStretchRunning(false);
    setSelectedRoutineId(routineId);
    setCurrentRoutineIndex(0);
    setRoutineCompletedBanner(false);
    const routine = stretchRoutines.find((r) => r.id === routineId) || stretchRoutines[0];
    const firstEx = stretchExercises.find((e) => e.id === routine.exerciseIds[0]) || stretchExercises[0];
    setStretchSecondsLeft(firstEx.durationSec);
  };

  const handleSelectRoutineIndex = (index: number) => {
    setIsStretchRunning(false);
    setCurrentRoutineIndex(index);
    setRoutineCompletedBanner(false);
    const routine = stretchRoutines.find((r) => r.id === selectedRoutineId) || stretchRoutines[0];
    const exId = routine.exerciseIds[index];
    const ex = stretchExercises.find((e) => e.id === exId) || stretchExercises[0];
    setStretchSecondsLeft(ex.durationSec);
  };

  const handleToggleStretchPlay = () => {
    if (routineCompletedBanner) {
      setRoutineCompletedBanner(false);
      setCurrentRoutineIndex(0);
      const routine = stretchRoutines.find((r) => r.id === selectedRoutineId) || stretchRoutines[0];
      const firstEx = stretchExercises.find((e) => e.id === routine.exerciseIds[0]) || stretchExercises[0];
      setStretchSecondsLeft(firstEx.durationSec);
      setIsStretchRunning(true);
      return;
    }
    setIsStretchRunning((prev) => !prev);
  };

  const handleResetCurrentStretch = () => {
    setIsStretchRunning(false);
    const routine = stretchRoutines.find((r) => r.id === selectedRoutineId) || stretchRoutines[0];
    const exId = routine.exerciseIds[currentRoutineIndex];
    const ex = stretchExercises.find((e) => e.id === exId) || stretchExercises[0];
    setStretchSecondsLeft(ex.durationSec);
  };

  const handleLaunchSingleExercise = (exerciseId: string) => {
    const ex = stretchExercises.find((e) => e.id === exerciseId);
    if (!ex) return;
    setStretchSubTab('guided');
    const routineIdx = (stretchRoutines.find((r) => r.id === selectedRoutineId)?.exerciseIds || []).indexOf(exerciseId);
    if (routineIdx !== -1) {
      setCurrentRoutineIndex(routineIdx);
    }
    setStretchSecondsLeft(ex.durationSec);
    setIsStretchRunning(true);
    setRoutineCompletedBanner(false);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FCFAF7] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Interactive Student Toolkit</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#0A192F] tracking-tight">
            Self-Care & Focus Toolkit
          </h1>
          <p className="text-slate-600 text-base max-w-2xl">
            Gentle, accessible exercises designed for busy student schedules. Use these tools whenever you need a mental reset, a structured study block, or a moment of calm.
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <button
            id="tab-btn-meditation"
            onClick={() => handleTabChange('meditation')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'meditation'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A192F] hover:bg-gray-50'
            }`}
          >
            <Flower2 className="w-4 h-4 text-amber-300" />
            <span>Meditation</span>
          </button>

          <button
            id="tab-btn-breathing"
            onClick={() => handleTabChange('breathing')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'breathing'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A192F] hover:bg-gray-50'
            }`}
          >
            <Wind className="w-4 h-4" />
            Breathing Exercise
          </button>

          <button
            id="tab-btn-timer"
            onClick={() => handleTabChange('timer')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'timer'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A192F] hover:bg-gray-50'
            }`}
          >
            <Timer className="w-4 h-4" />
            Focus Study Timer
          </button>

          <button
            id="tab-btn-reset"
            onClick={() => handleTabChange('reset')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'reset'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A192F] hover:bg-gray-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Quick Reset (5-4-3-2-1)
          </button>

          <button
            id="tab-btn-stretch"
            onClick={() => handleTabChange('stretch')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'stretch'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0A192F] hover:bg-gray-50'
            }`}
          >
            <Activity className="w-4 h-4" />
            Quick Body Stretch
          </button>
        </div>

        {/* ===================== TAB 0: MEDITATION ===================== */}
        {activeTab === 'meditation' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE6DF] shadow-2xs space-y-8 animate-in fade-in duration-150 text-left">
            
            {/* Header & Peaceful Audio Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE6DF]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display text-2xl font-bold text-[#0A192F]">Calm Meditation Space</h3>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 font-semibold">
                    Mindful Pauses
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Set your desired session duration, tune into peaceful harmonic sound, and anchor your awareness.
                </p>
              </div>

              {/* Sound Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FCFAF7] border border-[#EAE6DF] text-xs text-slate-600">
                <Music className={`w-3.5 h-3.5 ${isMeditationRunning && meditationSound !== 'silent' ? 'text-emerald-600 animate-pulse' : 'text-slate-400'}`} />
                <span className="font-medium">
                  {isMeditationRunning ? 'Calm Sound Active' : 'Chime on Start & Finish'}
                </span>
              </div>
            </div>

            {/* 1. DURATION SETTINGS SECTION */}
            <div className="space-y-4 bg-[#FCFAF7] p-5 sm:p-6 rounded-2xl border border-[#EAE6DF]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-sm font-bold text-[#0A192F] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Set Meditation Duration</span>
                </label>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                  {meditationDurationMinutes} {meditationDurationMinutes === 1 ? 'Minute' : 'Minutes'} ({formatTime(meditationDurationMinutes * 60)})
                </span>
              </div>

              {/* Quick Preset Duration Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[1, 3, 5, 10, 15, 20].map((mins) => {
                  const isSelected = meditationDurationMinutes === mins;
                  return (
                    <button
                      key={mins}
                      type="button"
                      id={`meditation-duration-${mins}m`}
                      disabled={isMeditationRunning}
                      onClick={() => handleSetDuration(mins)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-600 ring-offset-1'
                          : 'bg-white text-[#0A192F] hover:bg-emerald-50/70 border border-[#EAE6DF]'
                      }`}
                    >
                      {mins} min{mins > 1 ? 's' : ''}
                      <span className="block text-[10px] font-normal opacity-80">
                        {mins === 1 ? 'Micro-Reset' : mins === 3 ? 'Quick Center' : mins === 5 ? 'Classic Calm' : mins === 10 ? 'Deep Peace' : 'Immersion'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Duration Stepper & Slider */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  type="button"
                  id="meditation-duration-minus-btn"
                  disabled={isMeditationRunning || meditationDurationMinutes <= 1}
                  onClick={() => handleSetDuration(meditationDurationMinutes - 1)}
                  className="w-8 h-8 rounded-xl bg-white border border-[#EAE6DF] hover:bg-gray-100 flex items-center justify-center text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
                  title="Subtract 1 minute"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <input
                  id="meditation-duration-slider"
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  disabled={isMeditationRunning}
                  value={meditationDurationMinutes}
                  onChange={(e) => handleSetDuration(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 disabled:opacity-50"
                />

                <button
                  type="button"
                  id="meditation-duration-plus-btn"
                  disabled={isMeditationRunning || meditationDurationMinutes >= 60}
                  onClick={() => handleSetDuration(meditationDurationMinutes + 1)}
                  className="w-8 h-8 rounded-xl bg-white border border-[#EAE6DF] hover:bg-gray-100 flex items-center justify-center text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
                  title="Add 1 minute"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. CALM & PEACEFUL SOUNDSCAPE SELECTOR */}
            <div className="space-y-4 bg-[#FCFAF7] p-5 sm:p-6 rounded-2xl border border-[#EAE6DF]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-sm font-bold text-[#0A192F] flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>Peaceful Ambient Sound & Bells</span>
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-500">Sound Volume</span>
                  <input
                    type="range"
                    min="0.05"
                    max="0.4"
                    step="0.02"
                    value={meditationVolume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
              </div>

              {/* Sound Options Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { id: 'zen-drone', label: 'Zen Harmonic (432Hz)', icon: '🧘', desc: 'Singing bowl resonance' },
                  { id: 'peaceful-pad', label: 'OM Frequency (136Hz)', icon: '🕊️', desc: 'Earth grounding tone' },
                  { id: 'stream', label: 'Mountain Stream', icon: '🌊', desc: 'Gentle water flow' },
                  { id: 'rain', label: 'Soft Rainfall', icon: '🌧️', desc: 'Cozy peaceful drops' },
                  { id: 'silent', label: 'Bell Chimes Only', icon: '🔕', desc: 'Quiet with start/end bell' },
                ].map((s) => {
                  const isSelected = meditationSound === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      id={`meditation-sound-${s.id}`}
                      onClick={() => handleMeditationSoundChange(s.id as any)}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs ring-2 ring-emerald-600/30'
                          : 'bg-white text-slate-700 hover:bg-emerald-50/50 border-[#EAE6DF]'
                      }`}
                    >
                      <div className="text-xl mb-1">{s.icon}</div>
                      <div className="text-xs font-bold leading-tight">{s.label}</div>
                      <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                        {s.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>A peaceful Tibetan singing bowl chime sounds automatically when you press <strong>Begin Meditation</strong> and when your time completes.</span>
              </p>
            </div>

            {/* 3. MINDFUL GUIDANCE THEME */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#0A192F] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Mindful Focus Theme</span>
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'breath', label: 'Breath & Body Scan', icon: '🌿' },
                  { id: 'stress', label: 'Academic Stress Release', icon: '💡' },
                  { id: 'kindness', label: 'Self-Compassion & Ease', icon: '🤍' },
                  { id: 'silent', label: 'Pure Silent Awareness', icon: '🌌' },
                ].map((theme) => {
                  const isSelected = meditationTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      id={`meditation-theme-${theme.id}`}
                      onClick={() => {
                        setMeditationTheme(theme.id as any);
                        setCurrentPromptIndex(0);
                      }}
                      className={`px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-colors cursor-pointer border flex items-center gap-2 ${
                        isSelected
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300 shadow-2xs font-bold'
                          : 'bg-[#FCFAF7] text-slate-700 hover:bg-gray-100 border-[#EAE6DF]'
                      }`}
                    >
                      <span className="text-base">{theme.icon}</span>
                      <span>{theme.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. MEDITATION VISUALIZER & TIMER DISPLAY */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#FCFAF7] via-emerald-50/20 to-amber-50/20 border border-[#EAE6DF] p-8 sm:p-12 flex flex-col items-center justify-center space-y-8 text-center">
              
              {/* Concentric Pulsing Zen Rings */}
              <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72">
                {/* Outer Ring */}
                <div 
                  className={`absolute inset-0 rounded-full border border-emerald-200/70 transition-all duration-1000 ${
                    isMeditationRunning ? 'scale-110 opacity-70 animate-pulse' : 'scale-100 opacity-40'
                  }`} 
                />
                
                {/* Middle Glow Ring */}
                <div 
                  className={`absolute inset-4 rounded-full bg-emerald-100/40 blur-md transition-transform duration-1000 ${
                    isMeditationRunning ? 'scale-105 opacity-80' : 'scale-95 opacity-20'
                  }`} 
                />

                {/* Main Zen Circle */}
                <div className="relative z-10 w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-white border-2 border-emerald-300/80 shadow-md flex flex-col items-center justify-center p-6 space-y-1">
                  <Flower2 className={`w-8 h-8 ${isMeditationRunning ? 'text-emerald-600 animate-spin-slow' : 'text-amber-500'}`} />
                  
                  <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
                    {formatTime(meditationSecondsLeft)}
                  </div>
                  
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {isMeditationRunning 
                      ? 'In Calm Meditation' 
                      : isMeditationCompleted 
                        ? 'Session Complete' 
                        : `${meditationDurationMinutes} Min Ready`}
                  </span>

                  {/* Micro Progress Track */}
                  <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Mindful Prompt Bar */}
              <div className="max-w-md mx-auto min-h-[52px] flex items-center justify-center px-4 py-2.5 rounded-2xl bg-white/90 border border-[#EAE6DF] text-xs sm:text-sm text-slate-700 italic font-serif shadow-2xs">
                "{meditationPromptsMap[meditationTheme]?.[currentPromptIndex] || meditationPromptsMap.breath[0]}"
              </div>

              {/* Action Controls (Start / Pause / Resume / Reset) */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {!isMeditationRunning ? (
                  <button
                    type="button"
                    id="start-meditation-btn"
                    onClick={handleStartMeditation}
                    className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-md shadow-emerald-600/25 flex items-center gap-2.5 cursor-pointer transition-all active:scale-98"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>{meditationSecondsLeft < totalDurationSeconds && !isMeditationCompleted ? 'Resume Meditation' : 'Begin Meditation'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    id="pause-meditation-btn"
                    onClick={handlePauseMeditation}
                    className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base shadow-md shadow-amber-500/25 flex items-center gap-2.5 cursor-pointer transition-all active:scale-98"
                  >
                    <Pause className="w-5 h-5 fill-current" />
                    <span>Pause</span>
                  </button>
                )}

                <button
                  type="button"
                  id="reset-meditation-btn"
                  onClick={handleResetMeditation}
                  className="px-5 py-4 rounded-2xl bg-white hover:bg-gray-100 text-slate-700 font-semibold text-sm border border-[#EAE6DF] flex items-center gap-2 cursor-pointer shadow-2xs transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Completion Banner */}
              {isMeditationCompleted && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium flex items-center gap-3 animate-in fade-in zoom-in-95">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold block">Wonderful job taking time for yourself today.</span>
                    <span>Carry this calm focus and clarity with you into your study and daily rhythm.</span>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ===================== TAB 1: BREATHING EXERCISE ===================== */}
        {activeTab === 'breathing' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE6DF] shadow-2xs space-y-8 animate-in fade-in duration-150 text-left">
            
            {/* Pattern Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE6DF]">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0A192F]">Guided Breathwork</h3>
                <p className="text-xs text-slate-500">{patternConfigs[breathingPattern].desc}</p>
              </div>

              <div className="flex items-center gap-2">
                {(['box', 'relax478', 'calm55'] as BreathingPattern[]).map((pattern) => (
                  <button
                    key={pattern}
                    id={`pattern-${pattern}`}
                    onClick={() => {
                      setIsBreathingRunning(false);
                      setBreathingPattern(pattern);
                      setBreathPhase('Inhale');
                      setBreathSecondsLeft(patternConfigs[pattern].timings.Inhale);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      breathingPattern === pattern
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-[#FCFAF7] text-slate-600 hover:bg-gray-100 border border-[#EAE6DF]'
                    }`}
                  >
                    {pattern === 'box' ? 'Box (4-4-4-4)' : pattern === 'relax478' ? '4-7-8 Sleep' : '5-5 Balance'}
                  </button>
                ))}
              </div>
            </div>

            {/* Visualizer Circle */}
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Outer guide rings */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-200 opacity-60" />
                <div className="absolute inset-4 rounded-full border border-emerald-100" />
                
                {/* Dynamic animated breathing circle */}
                <div
                  className={`rounded-full flex items-center justify-center text-center transition-all ease-in-out ${
                    breathPhase === 'Inhale'
                      ? 'w-56 h-56 bg-emerald-100 border-4 border-emerald-500 shadow-lg shadow-emerald-500/20'
                      : breathPhase === 'Hold'
                      ? 'w-56 h-56 bg-amber-100 border-4 border-amber-400 shadow-lg shadow-amber-500/20'
                      : breathPhase === 'Exhale'
                      ? 'w-36 h-36 bg-sky-100 border-4 border-sky-400 shadow-md shadow-sky-500/20'
                      : 'w-36 h-36 bg-emerald-50 border-4 border-emerald-300'
                  }`}
                  style={{
                    transitionDuration: `${patternConfigs[breathingPattern].timings[breathPhase] || 4}s`
                  }}
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0A192F] block">
                      {isBreathingRunning ? breathPhase : 'Ready'}
                    </span>
                    <span className="text-4xl font-extrabold text-[#0A192F] font-mono">
                      {isBreathingRunning ? breathSecondsLeft : '4'}s
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {isBreathingRunning
                        ? breathPhase === 'Inhale'
                          ? 'Breathe in slowly'
                          : breathPhase === 'Hold'
                          ? 'Hold gently'
                          : breathPhase === 'Exhale'
                          ? 'Release with ease'
                          : 'Pause'
                        : 'Press start to begin'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  id="breathing-main-toggle-btn"
                  onClick={() => setIsBreathingRunning(!isBreathingRunning)}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer transition-all active:scale-98"
                >
                  {isBreathingRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isBreathingRunning ? 'Pause Exercise' : 'Begin Breathing Session'}
                </button>

                <button
                  id="breathing-sound-toggle-btn"
                  onClick={() => setSoundCuesEnabled(!soundCuesEnabled)}
                  className={`p-3 rounded-2xl border transition-colors cursor-pointer ${
                    soundCuesEnabled
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-white text-gray-400 border-[#EAE6DF]'
                  }`}
                  title={soundCuesEnabled ? 'Chime sound cues active' : 'Sound cues muted'}
                >
                  {soundCuesEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>

                {breathCyclesCompleted > 0 && (
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#FCFAF7] text-[#0A192F] border border-[#EAE6DF]">
                    Cycles completed: {breathCyclesCompleted}
                  </span>
                )}
              </div>
            </div>

            {/* Quick guidance notes */}
            <div className="p-4 rounded-2xl bg-[#FCFAF7] border border-[#EAE6DF] flex items-start gap-3 text-xs text-slate-600">
              <Feather className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#0A192F]">Pro Tip for College Students:</span> Practice 4 cycles of Box Breathing right before entering an exam hall or giving a class presentation. It lowers cortisol and keeps working memory clear.
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 2: FOCUS STUDY TIMER ===================== */}
        {activeTab === 'timer' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE6DF] shadow-2xs space-y-8 animate-in fade-in duration-150 text-left">
            
            {/* Header & Modes */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE6DF]">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0A192F]">
                  Mindful Study Pomodoro
                </h3>
                <p className="text-xs text-slate-500">
                  Single-task focus sessions with restful pauses and built-in ambient study sounds.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="preset-25-study"
                  onClick={() => handleSelectPreset(25, 'study')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                    timerMode === 'study' && timerDuration === 25 * 60
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#FCFAF7] text-slate-700 hover:bg-gray-100 border border-[#EAE6DF]'
                  }`}
                >
                  25m Study
                </button>
                <button
                  id="preset-50-study"
                  onClick={() => handleSelectPreset(50, 'study')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                    timerMode === 'study' && timerDuration === 50 * 60
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#FCFAF7] text-slate-700 hover:bg-gray-100 border border-[#EAE6DF]'
                  }`}
                >
                  50m Deep Work
                </button>
                <button
                  id="preset-5-break"
                  onClick={() => handleSelectPreset(5, 'break')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                    timerMode === 'break'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#FCFAF7] text-slate-700 hover:bg-gray-100 border border-[#EAE6DF]'
                  }`}
                >
                  5m Rest Break
                </button>
              </div>
            </div>

            {/* Timer Display */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-center space-y-2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  timerMode === 'study' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {timerMode === 'study' ? '📚 Focused Study Mode' : '☕ Mindful Rest Break'}
                </span>
                
                <div className="font-mono text-6xl sm:text-7xl font-extrabold text-[#0A192F] tracking-tight my-4">
                  {formatTimer(timerSecondsLeft)}
                </div>

                <p className="text-xs text-slate-500">
                  {timerMode === 'study' ? 'Keep one tab open and put your phone face down.' : 'Stand up, stretch, sip some water, and rest your eyes.'}
                </p>
              </div>

              {/* Controls */}
              <div className="mt-8 flex items-center gap-3">
                <button
                  id="focus-timer-main-toggle"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-blue-600/20 cursor-pointer transition-all active:scale-98"
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isTimerRunning ? 'Pause' : 'Start Focus Session'}
                </button>

                <button
                  id="focus-timer-reset"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSecondsLeft(timerDuration);
                  }}
                  className="p-3 rounded-2xl bg-[#FCFAF7] hover:bg-gray-100 text-[#0A192F] border border-[#EAE6DF] text-xs transition-colors cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Ambient Sound Toggles (Web Audio Synthesizer) */}
            <div className="pt-6 border-t border-[#EAE6DF] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A192F] flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-blue-600" />
                  Calming Study Background Noise (Pure Client-Side Audio)
                </span>
                {ambientSound !== 'none' && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                    Playing {ambientSound}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'rain', label: '🌧️ Soft Rain' },
                  { id: 'stream', label: '🌊 Gentle Stream' },
                  { id: 'whitenoise', label: '📻 Brown Noise' },
                  { id: 'none', label: '🔇 Silent' }
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`ambient-${item.id}`}
                    onClick={() => {
                      if (item.id === 'none') {
                        soundEngine.stopAmbient();
                        setAmbientSound('none');
                      } else {
                        handleAmbientToggle(item.id as any);
                      }
                    }}
                    className={`p-3 rounded-2xl text-xs font-semibold transition-colors cursor-pointer text-center border ${
                      ambientSound === item.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-[#FCFAF7] text-[#0A192F] hover:bg-gray-100 border-[#EAE6DF]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 3: QUICK RESET (5-4-3-2-1) ===================== */}
        {activeTab === 'reset' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE6DF] shadow-2xs space-y-8 animate-in fade-in duration-150 text-left">
            
            <div className="pb-6 border-b border-[#EAE6DF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0A192F]">
                  5-4-3-2-1 Sensory Grounding Reset
                </h3>
                <p className="text-xs text-slate-500">
                  A somatic technique to disrupt spiral thoughts, ground your sensory awareness, and return to the present.
                </p>
              </div>

              <div className="flex items-center gap-1">
                {groundingStepsData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGroundingStep(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      groundingStep === idx
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-[#FCFAF7] text-slate-600 hover:bg-gray-100 border border-[#EAE6DF]'
                    }`}
                  >
                    {5 - idx}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Step Card */}
            {(() => {
              const curr = groundingStepsData[groundingStep];
              const Icon = curr.icon;
              return (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${curr.bg} ${curr.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                        Step {groundingStep + 1} of 5
                      </span>
                      <h4 className="font-display text-2xl font-bold text-[#0A192F] mt-0.5">
                        {curr.title}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        {curr.prompt}
                      </p>
                    </div>
                  </div>

                  {/* Optional Interactive Input checklist */}
                  <div className="bg-[#FCFAF7] rounded-2xl p-5 border border-[#EAE6DF] space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0A192F] block">
                      Name or notice {curr.count} items in your environment:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {Array.from({ length: curr.count }).map((_, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-white border border-[#EAE6DF] text-[#0A192F] text-xs font-bold flex items-center justify-center shrink-0">
                            {itemIdx + 1}
                          </span>
                          <input
                            type="text"
                            value={userInputs[groundingStep]?.[itemIdx] || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setUserInputs((prev) => {
                                const currentList = [...(prev[groundingStep] || [])];
                                currentList[itemIdx] = val;
                                return { ...prev, [groundingStep]: currentList };
                              });
                            }}
                            placeholder={curr.placeholders[itemIdx] || `Notice item ${itemIdx + 1}...`}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-[#EAE6DF] text-xs text-[#0A192F] placeholder:text-gray-400 focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation controls */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      id="grounding-prev-step"
                      onClick={() => setGroundingStep((prev) => Math.max(0, prev - 1))}
                      disabled={groundingStep === 0}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-[#0A192F] bg-[#FCFAF7] hover:bg-gray-100 border border-[#EAE6DF] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    >
                      ← Previous Step
                    </button>

                    <button
                      id="grounding-next-step"
                      onClick={() => setGroundingStep((prev) => (prev + 1) % groundingStepsData.length)}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-xs cursor-pointer"
                    >
                      {groundingStep === groundingStepsData.length - 1 ? '✨ Complete Reset' : 'Next Step →'}
                    </button>
                  </div>
                </div>
              );
            })()}

          </div>
        )}

        {/* ===================== TAB 4: QUICK PHYSICAL EXERCISE & BODY STRETCH ===================== */}
        {activeTab === 'stretch' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE6DF] shadow-2xs space-y-8 animate-in fade-in duration-150 text-left">
            
            {/* Header & Sub-Navigation */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EAE6DF]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display text-2xl font-bold text-[#0A192F]">Quick Physical Reset & Stretch</h3>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-semibold flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-600" />
                    Desk & Body Mobility
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Release muscle stiffness, relieve screen fatigue, and re-energize your brain with student-tested desk stretches.
                </p>
              </div>

              {/* Top Action Controls */}
              <div className="flex items-center gap-2 self-start md:self-auto">
                <button
                  id="stretch-sound-toggle"
                  onClick={() => setStretchSoundEnabled((prev) => !prev)}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    stretchSoundEnabled 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-gray-50 text-gray-500 border-gray-200'
                  }`}
                  title={stretchSoundEnabled ? 'Chime sound enabled' : 'Chime sound muted'}
                >
                  {stretchSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span className="hidden sm:inline">{stretchSoundEnabled ? 'Chime On' : 'Muted'}</span>
                </button>
              </div>
            </div>

            {/* Sub-Tabs: Guided Routine / Catalog / Ergonomics */}
            <div className="flex flex-wrap gap-2 border-b border-[#EAE6DF] pb-4">
              <button
                id="stretch-subtab-guided"
                onClick={() => setStretchSubTab('guided')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  stretchSubTab === 'guided'
                    ? 'bg-[#0A192F] text-white shadow-xs'
                    : 'bg-[#FCFAF7] text-slate-600 hover:text-[#0A192F] border border-[#EAE6DF]'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-400" />
                Guided Routines
              </button>

              <button
                id="stretch-subtab-catalog"
                onClick={() => setStretchSubTab('catalog')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  stretchSubTab === 'catalog'
                    ? 'bg-[#0A192F] text-white shadow-xs'
                    : 'bg-[#FCFAF7] text-slate-600 hover:text-[#0A192F] border border-[#EAE6DF]'
                }`}
              >
                <Feather className="w-4 h-4 text-emerald-500" />
                All Stretch Catalog ({stretchExercises.length})
              </button>

              <button
                id="stretch-subtab-ergonomics"
                onClick={() => setStretchSubTab('ergonomics')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  stretchSubTab === 'ergonomics'
                    ? 'bg-[#0A192F] text-white shadow-xs'
                    : 'bg-[#FCFAF7] text-slate-600 hover:text-[#0A192F] border border-[#EAE6DF]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                Study Posture Guide
              </button>
            </div>

            {/* ================= MODE 1: GUIDED ROUTINES ================= */}
            {stretchSubTab === 'guided' && (
              <div className="space-y-6">
                
                {/* Routine Selection Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {stretchRoutines.map((routine) => {
                    const isSelected = selectedRoutineId === routine.id;
                    return (
                      <button
                        key={routine.id}
                        id={`routine-card-${routine.id}`}
                        onClick={() => handleSelectRoutine(routine.id)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative ${
                          isSelected
                            ? `${routine.bg} ${routine.borderColor} ring-2 ring-emerald-600/30 shadow-xs`
                            : 'bg-[#FCFAF7] border-[#EAE6DF] hover:bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h4 className="font-bold text-sm text-[#0A192F]">{routine.name}</h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${routine.color} bg-white/80 border border-current/20`}>
                            {routine.durationLabel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {routine.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Routine Complete Banner */}
                {routineCompletedBanner ? (
                  <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in zoom-in-95 duration-200">
                    <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display text-2xl font-bold text-emerald-950">
                        Physical Reset Completed!
                      </h4>
                      <p className="text-sm text-emerald-800 max-w-md mx-auto">
                        Your muscles are re-oxygenated and spine stiffness is relieved. Take a sip of water and enjoy your refreshed focus!
                      </p>
                    </div>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <button
                        id="restart-routine-btn"
                        onClick={() => {
                          setRoutineCompletedBanner(false);
                          handleSelectRoutine(selectedRoutineId);
                          setIsStretchRunning(true);
                        }}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                      >
                        Repeat Routine
                      </button>
                      <button
                        id="choose-other-routine-btn"
                        onClick={() => {
                          setRoutineCompletedBanner(false);
                          setStretchSubTab('catalog');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold transition-all cursor-pointer"
                      >
                        Explore Other Stretches
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Active Stretch Player */
                  (() => {
                    const activeRoutine = stretchRoutines.find((r) => r.id === selectedRoutineId) || stretchRoutines[0];
                    const activeExId = activeRoutine.exerciseIds[currentRoutineIndex] || activeRoutine.exerciseIds[0];
                    const currentEx = stretchExercises.find((e) => e.id === activeExId) || stretchExercises[0];
                    const progressPercent = Math.max(0, Math.min(100, ((currentEx.durationSec - stretchSecondsLeft) / currentEx.durationSec) * 100));

                    return (
                      <div className="p-6 sm:p-8 rounded-3xl bg-[#FCFAF7] border border-[#EAE6DF] space-y-6">
                        
                        {/* Routine Timeline Dots */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EAE6DF]">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Stretch {currentRoutineIndex + 1} of {activeRoutine.exerciseIds.length}:
                            </span>
                            <span className="text-xs font-semibold text-[#0A192F]">
                              {currentEx.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {activeRoutine.exerciseIds.map((exId, idx) => (
                              <button
                                key={exId}
                                onClick={() => handleSelectRoutineIndex(idx)}
                                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                                  idx === currentRoutineIndex
                                    ? 'w-7 bg-emerald-600'
                                    : idx < currentRoutineIndex
                                    ? 'w-2.5 bg-emerald-300'
                                    : 'w-2.5 bg-gray-200 hover:bg-gray-300'
                                }`}
                                title={`Jump to stretch ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Main Visual & Interactive Controls */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          
                          {/* Left: Countdown Timer & Playback */}
                          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-[#EAE6DF] shadow-2xs space-y-4">
                            <div className="relative w-44 h-44 flex items-center justify-center">
                              {/* SVG Progress Circle */}
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                                <circle
                                  cx="80"
                                  cy="80"
                                  r="70"
                                  stroke="#EAE6DF"
                                  strokeWidth="10"
                                  fill="none"
                                />
                                <circle
                                  cx="80"
                                  cy="80"
                                  r="70"
                                  stroke="#059669"
                                  strokeWidth="10"
                                  strokeDasharray={440}
                                  strokeDashoffset={440 - (440 * progressPercent) / 100}
                                  strokeLinecap="round"
                                  fill="none"
                                  className="transition-all duration-500 ease-linear"
                                />
                              </svg>

                              {/* Center Timer Display */}
                              <div className="absolute flex flex-col items-center justify-center text-center">
                                <span className="font-mono text-4xl font-bold text-[#0A192F]">
                                  {stretchSecondsLeft}s
                                </span>
                                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                                  {isStretchRunning ? 'Holding Stretch' : 'Ready'}
                                </span>
                              </div>
                            </div>

                            {/* Playback Control Buttons */}
                            <div className="flex items-center gap-3">
                              <button
                                id="stretch-prev-btn"
                                onClick={() => handleSelectRoutineIndex(Math.max(0, currentRoutineIndex - 1))}
                                disabled={currentRoutineIndex === 0}
                                className="p-2.5 rounded-xl text-slate-600 bg-[#FCFAF7] hover:bg-gray-100 border border-[#EAE6DF] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
                                title="Previous Stretch"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>

                              <button
                                id="stretch-play-toggle-btn"
                                onClick={handleToggleStretchPlay}
                                className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                                  isStretchRunning
                                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                }`}
                              >
                                {isStretchRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                                <span>{isStretchRunning ? 'Pause Stretch' : 'Start Stretch'}</span>
                              </button>

                              <button
                                id="stretch-reset-btn"
                                onClick={handleResetCurrentStretch}
                                className="p-2.5 rounded-xl text-slate-600 bg-[#FCFAF7] hover:bg-gray-100 border border-[#EAE6DF] cursor-pointer transition-colors"
                                title="Reset Current Stretch Timer"
                              >
                                <RotateCcw className="w-4 h-4" />
                              </button>

                              <button
                                id="stretch-next-btn"
                                onClick={() => handleSelectRoutineIndex(Math.min(activeRoutine.exerciseIds.length - 1, currentRoutineIndex + 1))}
                                disabled={currentRoutineIndex === activeRoutine.exerciseIds.length - 1}
                                className="p-2.5 rounded-xl text-slate-600 bg-[#FCFAF7] hover:bg-gray-100 border border-[#EAE6DF] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
                                title="Next Stretch"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Auto Advance Toggle */}
                            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none pt-1">
                              <input
                                type="checkbox"
                                checked={autoAdvanceStretch}
                                onChange={(e) => setAutoAdvanceStretch(e.target.checked)}
                                className="rounded border-[#EAE6DF] text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                              />
                              <span>Auto-advance to next stretch</span>
                            </label>
                          </div>

                          {/* Right: Stretch Detailed Guidance & Steps */}
                          <div className="lg:col-span-7 space-y-4">
                            
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/60">
                                  {currentEx.category}
                                </span>
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                                  {currentEx.tag}
                                </span>
                              </div>
                              <h4 className="font-display text-xl font-bold text-[#0A192F]">
                                {currentEx.name}
                              </h4>
                              <p className="text-xs text-slate-500 font-medium">
                                Target Area: <span className="text-slate-800 font-semibold">{currentEx.targetArea}</span>
                              </p>
                            </div>

                            {/* Gentle Breath Cue Box */}
                            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/60 flex items-start gap-2.5">
                              <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                              <div className="text-xs text-amber-950 font-medium leading-relaxed">
                                <span className="font-bold">Breath & Alignment Cue: </span>
                                {currentEx.cue}
                              </div>
                            </div>

                            {/* Step-by-step checklist */}
                            <div className="space-y-2">
                              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">How to Perform:</span>
                              <div className="space-y-2">
                                {currentEx.instructions.map((step, sIdx) => (
                                  <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-[#EAE6DF]/80">
                                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                                      {sIdx + 1}
                                    </span>
                                    <span className="leading-relaxed">{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Benefit Callout */}
                            <p className="text-[11px] text-slate-500 italic pt-1">
                              💡 <strong>Why this helps:</strong> {currentEx.benefit}
                            </p>

                          </div>

                        </div>

                      </div>
                    );
                  })()
                )}

              </div>
            )}

            {/* ================= MODE 2: ALL STRETCHES CATALOG ================= */}
            {stretchSubTab === 'catalog' && (
              <div className="space-y-6">
                
                {/* Category Filter Chips */}
                <div className="flex flex-wrap gap-2">
                  {['All', 'Neck & Shoulders', 'Spine & Back', 'Wrists & Hands', 'Hips & Legs', 'Chest & Posture'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCatalogCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        catalogCategoryFilter === cat
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-[#FCFAF7] text-slate-600 hover:text-[#0A192F] border border-[#EAE6DF]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Grid of Exercises */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stretchExercises
                    .filter((ex) => catalogCategoryFilter === 'All' || ex.category === catalogCategoryFilter)
                    .map((ex) => (
                      <div
                        key={ex.id}
                        className="p-5 rounded-2xl bg-[#FCFAF7] border border-[#EAE6DF] hover:bg-white hover:border-gray-300 transition-all flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold uppercase tracking-wider border border-emerald-200/60">
                              {ex.category}
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-500">
                              ⏱️ {ex.durationSec}s
                            </span>
                          </div>

                          <div>
                            <h4 className="font-display text-base font-bold text-[#0A192F]">{ex.name}</h4>
                            <p className="text-xs text-slate-500 font-medium">Target: {ex.targetArea}</p>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed">
                            {ex.benefit}
                          </p>
                        </div>

                        <button
                          onClick={() => handleLaunchSingleExercise(ex.id)}
                          className="w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-200 hover:border-transparent text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          Start {ex.durationSec}s Guided Stretch
                        </button>
                      </div>
                    ))}
                </div>

              </div>
            )}

            {/* ================= MODE 3: STUDY POSTURE & ERGONOMICS ================= */}
            {stretchSubTab === 'ergonomics' && (
              <div className="space-y-6">
                
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/70 flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-950 leading-relaxed">
                    <strong>The Student Posture Principle:</strong> Most study strain comes from sustained micro-compression (forward head tilt and slumped thoracic spine). Small adjustments reduce physical fatigue by up to 40% during long study nights.
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: '1. Eye-Level Screen Alignment',
                      badge: 'Prevents "Tech Neck"',
                      icon: Eye,
                      color: 'text-blue-600',
                      bg: 'bg-blue-50',
                      desc: 'Elevate your laptop with books or a riser so the top third of your display aligns directly with eye level. This eliminates 20-30 lbs of gravitational cervical pressure.'
                    },
                    {
                      title: '2. The 90-Degree Limb Angles',
                      badge: 'Joint & Tendon Health',
                      icon: Hand,
                      color: 'text-emerald-600',
                      bg: 'bg-emerald-50',
                      desc: 'Adjust your chair height so elbows rest comfortably at desk level at a 90-degree bend, avoiding sharp wrist angles while typing or writing notes.'
                    },
                    {
                      title: '3. Grounded Feet & Pelvic Base',
                      badge: 'Lower Spine Support',
                      icon: Activity,
                      color: 'text-indigo-600',
                      bg: 'bg-indigo-50',
                      desc: 'Keep both feet flat on the floor. Avoid crossing legs or sitting on one foot for prolonged periods, which twists the pelvic girdle and pinches the sciatic pathway.'
                    },
                    {
                      title: '4. The 20-20-20 Vision & Micro-Move',
                      badge: 'Eye & Scapula Reset',
                      icon: Clock,
                      color: 'text-amber-600',
                      bg: 'bg-amber-50',
                      desc: 'Every 20 minutes of screen study, look 20 feet into the distance for 20 seconds, roll your shoulders back 3 times, and take one conscious deep breath.'
                    }
                  ].map((tip, tIdx) => {
                    const TipIcon = tip.icon;
                    return (
                      <div key={tIdx} className="p-5 rounded-2xl bg-[#FCFAF7] border border-[#EAE6DF] space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className={`w-9 h-9 rounded-xl ${tip.bg} ${tip.color} flex items-center justify-center shrink-0`}>
                            <TipIcon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-[#EAE6DF]">
                            {tip.badge}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-[#0A192F]">{tip.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{tip.desc}</p>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
