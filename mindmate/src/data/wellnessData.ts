import { MoodOption, WellbeingTopic, CampusResource, NepaliQuote } from '../types';

export const MOOD_OPTIONS: MoodOption[] = [
  {
    id: 'great',
    emoji: '😊',
    label: 'Great',
    badge: 'Energized & Positive',
    tagline: 'Riding a positive wave',
    supportiveMessage: "It's wonderful that you're feeling good today! Celebrating these moments and taking note of what is helping you thrive is a great way to build lasting resilience.",
    suggestedAction: 'Take a moment to savor what brought you joy today, or share a little warmth with a friend or classmate.',
    recommendedTool: {
      name: 'Meditation Space',
      actionTab: 'toolkit',
      toolId: 'meditation'
    }
  },
  {
    id: 'good',
    emoji: '🙂',
    label: 'Good',
    badge: 'Balanced & Steady',
    tagline: 'Feeling grounded',
    supportiveMessage: "Having a calm, steady day is something to be thankful for. Steady days give you room to learn, connect, and enjoy campus life at your own pace.",
    suggestedAction: 'Keep up your gentle routine—remember to stay hydrated, stretch between study sessions, and take brief fresh-air breaks.',
    recommendedTool: {
      name: 'Focus Timer',
      actionTab: 'toolkit',
      toolId: 'timer'
    }
  },
  {
    id: 'okay',
    emoji: '😐',
    label: 'Okay',
    badge: 'Neutral & In-Between',
    tagline: 'Just getting by',
    supportiveMessage: "Feeling 'in-between' is completely valid and normal. You don't have to be at 100% every single day to be doing well in college.",
    suggestedAction: 'Give yourself permission to take things one step at a time. What is one small, kind thing you can do for yourself in the next hour?',
    recommendedTool: {
      name: 'Breathing Exercise',
      actionTab: 'toolkit',
      toolId: 'breathing'
    }
  },
  {
    id: 'stressed',
    emoji: '😟',
    label: 'Stressed',
    badge: 'Tension & Pressure',
    tagline: 'Carrying a heavy load',
    supportiveMessage: "Academic demands, deadlines, and social transitions can pile up fast. Remember: your worth isn't defined by your productivity, and you don't have to carry it all at once.",
    suggestedAction: 'Pause whatever you are doing for 2 minutes. Drop your shoulders, unclench your jaw, and let your body take a slow, deep breath.',
    recommendedTool: {
      name: 'Box Breathing',
      actionTab: 'toolkit',
      toolId: 'breathing'
    }
  },
  {
    id: 'overwhelmed',
    emoji: '😣',
    label: 'Overwhelmed',
    badge: 'High Strain',
    tagline: 'Need a breather',
    supportiveMessage: "When everything feels like too much, it is completely okay to press pause. You don't have to figure everything out right this second. You are safe, and support is always close by.",
    suggestedAction: 'Try our 5-4-3-2-1 sensory grounding reset to bring yourself gently back to the present moment, or reach out to a trusted peer or campus counselor.',
    recommendedTool: {
      name: 'Quick Reset (5-4-3-2-1)',
      actionTab: 'toolkit',
      toolId: 'reset'
    }
  }
];

export const WELLBEING_TOPICS: WellbeingTopic[] = [
  {
    id: 'stress',
    title: 'Stress',
    subtitle: 'Understanding tension and learning how to decompress',
    iconName: 'Flame',
    category: 'Daily Balance',
    color: '#0D9488',
    bgColor: '#F0FDFA',
    borderColor: '#CCFBF1',
    shortDescription: 'College life moves fast. Learn healthy ways to recognize everyday tension before it piles up and restore your baseline.',
    fullDescription: 'Stress is our nervous system’s natural response to perceived challenges and high demands. In college, balancing coursework, personal independence, and extracurriculars can create consistent low-grade tension. Building a toolkit of micro-pauses and mindful routines helps your body shift out of fight-or-flight mode.',
    commonSigns: [
      'Tight shoulders, clenched jaw, or tension headaches',
      'Feeling constantly rushed or like time is slipping away',
      'Difficulty unwinding even when coursework is done',
      'Irritability or feeling easily annoyed by small hiccups'
    ],
    supportiveAdvice: [
      'Stress is a signal to slow down, not proof that you cannot handle college.',
      'Active recovery matters as much as study hours. Taking 10 minutes to walk or breathe actually improves cognitive retention.'
    ],
    practicalTips: [
      'Practice the 90-Second Rule: When stress spikes, close your eyes and breathe deeply for 90 seconds while the initial adrenaline surge passes.',
      'Brain Dump: Write down every looming task on paper to get it out of your working memory.',
      'Define "Done for the Day": Set a firm cut-off time (e.g., 9:30 PM) after which no schoolwork is opened.'
    ],
    mythVsFact: {
      myth: 'If I was organized enough, I wouldn’t feel stressed at all.',
      fact: 'Stress is a universal biological response to high workloads and new environments. Experiencing stress is normal; learning gentle regulation tools is the goal.'
    },
    studentPerspective: '"In my first year, I thought feeling stressed was normal for everyone. Now I realize my best exam preparation happened when I prioritized 20-minute daily walks and taking real breaks."'
  },
  {
    id: 'academic-pressure',
    title: 'Academic Pressure',
    subtitle: 'Navigating expectations, grades, and perfectionism',
    iconName: 'GraduationCap',
    category: 'Academics',
    color: '#2563EB',
    bgColor: '#EFF6FF',
    borderColor: '#DBEAFE',
    shortDescription: 'Manage heavy course loads, perfectionist habits, and exam anxiety while keeping your self-worth intact.',
    fullDescription: 'Transitioning to college academics often means adapting to independent study expectations, semester examinations, and unfamiliar lecture formats. It is common to feel like you must perform at 100% all the time, but sustainable learning requires flexibility, self-compassion, and asking for guidance early.',
    commonSigns: [
      'Procrastinating out of fear that your work won’t be "good enough"',
      'Tying your self-esteem and happiness solely to test scores and grades',
      'Feelings of imposter syndrome ("Everyone else seems smarter")',
      'Studying for hours without breaks due to lingering guilt'
    ],
    supportiveAdvice: [
      'A single exam or assignment is data about what to practice next, not a verdict on your intellect or future.',
      'Professors and departmental mentors are there specifically to help students who feel lost—asking early is a strength.'
    ],
    practicalTips: [
      'Use the 25/5 Pomodoro method: 25 minutes of single-tasking, followed by a strict 5-minute screen-free pause.',
      'Draft "Version Zero": When writing reports or notes, give yourself permission to write a messy first draft without judging it.',
      'Form Study Circles: Collaborative study groups with classmates help demystify tough subjects in a supportive setting.'
    ],
    mythVsFact: {
      myth: 'Top students never struggle with coursework or ask questions after lectures.',
      fact: 'Successful students ask questions frequently and utilize faculty office hours and study groups regularly.'
    },
    studentPerspective: '"Approaching my faculty mentor after class during week three felt intimidating at first, but they were so encouraging. It helped me regain confidence for the whole semester."'
  },
  {
    id: 'sleep',
    title: 'Sleep & Rest',
    subtitle: 'Nourishing your brain with restorative rest and routines',
    iconName: 'Moon',
    category: 'Physical Health',
    color: '#6366F1',
    bgColor: '#EEF2FF',
    borderColor: '#E0E7FF',
    shortDescription: 'Late study sessions and shared living disrupt sleep rhythms. Discover small tweaks for better, deeper rest.',
    fullDescription: 'During sleep, your brain consolidates memories, clears metabolic waste, and regulates emotional centers. College life—with shared hostel rooms, late-night study sessions, and screen exposure—can make consistent sleep difficult, but modest adjustments can transform energy and mood.',
    commonSigns: [
      'Waking up feeling unrefreshed or groggy throughout morning lectures',
      'Relying heavily on tea, coffee, or energy drinks late in the evening',
      'Racing thoughts when trying to fall asleep in bed',
      'Irregular sleep schedule varying significantly between weekdays and weekends'
    ],
    supportiveAdvice: [
      'All-nighters dramatically reduce memory recall and problem-solving ability the next day. Sleeping 6–7 hours before an exam almost always yields higher performance than staying up all night.'
    ],
    practicalTips: [
      'Quiet Rest Sanctuary: Use earplugs or an eye mask if your roommates have a different sleep or study schedule.',
      'Caffeine Curfew: Limit strong tea or coffee after late afternoon so sleep signals can build naturally.',
      'Wind-down buffer: Give yourself 20 minutes before sleep with dim lighting and no coursework screens.'
    ],
    mythVsFact: {
      myth: 'I can get by on 4 hours of sleep during the week and make it all up on Saturday.',
      fact: 'Sleep debt cannot be fully repaid in a single day, and irregular sleep shifts disrupt your circadian rhythm.'
    },
    studentPerspective: '"Turning my phone on silent at 10:30 PM and reading a light book helped me finally fall asleep peacefully even in a busy hostel."'
  },
  {
    id: 'social-pressure',
    title: 'Social Adjustment',
    subtitle: 'Finding authentic community without social burnout',
    iconName: 'Users',
    category: 'Relationships',
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#D1FAE5',
    shortDescription: 'Making new friends, navigating college events, FOMO, and balancing socializing with personal quiet time.',
    fullDescription: 'Starting college often creates an unspoken pressure to form an instant close-knit friend group or attend every orientation gathering. Genuine friendships take time to develop, and feeling socially tired or needing solitude is a healthy trait, not a flaw.',
    commonSigns: [
      'Intense FOMO (Fear of Missing Out) when you stay back to rest',
      'Saying "yes" to every social invitation out of fear of being left out',
      'Feeling exhausted after college events and not making time to recharge',
      'Comparing your social life to curated highlights on social media'
    ],
    supportiveAdvice: [
      'Quality always matters more than quantity. One or two genuine friends who share your values provide far more support than a huge, superficial circle.',
      'Introversion is a strength: honor your need for quiet recharge time.'
    ],
    practicalTips: [
      'Join Student Clubs & Societies: Finding people who share your specific interest (robotics, literature, sports, music) makes socializing natural.',
      'Graceful Declining: "Thanks for inviting me! I need a quiet evening to rest today, but let’s catch up for tea tomorrow!"',
      'Micro-Connections: Say a friendly namaste or hello to the student sitting next to you in class—small daily interactions build lasting bonds.'
    ],
    mythVsFact: {
      myth: 'Everyone else made lifelong best friends during the first few days of orientation.',
      fact: 'Friendship groups shift continuously throughout college. Most students form their deepest friendships gradually across semesters.'
    },
    studentPerspective: '"I felt anxious during orientation week seeing big groups everywhere. By second semester, I realized most of those groups shifted and we all found our genuine friends organically."'
  },
  {
    id: 'homesickness',
    title: 'Homesickness & Relocation',
    subtitle: 'Adjusting to living away from family, hometown, and familiar routines',
    iconName: 'Compass',
    category: 'Transition',
    color: '#D97706',
    bgColor: '#FFFBEB',
    borderColor: '#FEF3C7',
    shortDescription: 'Missing family, home-cooked food, or your hometown is one of the most common student experiences.',
    fullDescription: 'Moving to a new city or college—whether an hour away or from another district—involves adjusting to unfamiliar food, living arrangements, and routines. Homesickness is not a sign of weakness; it is a sign that you have people and places that mean a lot to you.',
    commonSigns: [
      'Feeling a sudden wave of sadness when thinking of family or home food',
      'Urge to stay in your room or travel home every single weekend',
      'Feeling disconnected from both college peers and old school friends',
      'Comparing canteen food or weather unfavorably to home'
    ],
    supportiveAdvice: [
      'Allow yourself to feel nostalgic without treating it as a reason to doubt your college journey.',
      'Create a bridge between worlds by bringing a few familiar comforts of home into your living space.'
    ],
    practicalTips: [
      'Scheduled Catch-Ups: Set up regular weekly video or phone calls with family or school friends rather than feeling anxious throughout the day.',
      'Personalize Your Space: Keep family photos or a favorite familiar item in your study space to make it feel welcoming.',
      'Explore Your Neighborhood: Discover a cozy local tea spot, stationery shop, or quiet library corner that becomes "your spot".'
    ],
    mythVsFact: {
      myth: 'If I am homesick, it means I cannot handle independent college life.',
      fact: 'Most students moving from home experience homesickness during their first semester. It is a completely natural adjustment period.'
    },
    studentPerspective: '"I missed my family and home food so much during my first two weeks. Calling home every evening after dinner helped me settle in while I got used to college routine."'
  },
  {
    id: 'digital-wellbeing',
    title: 'Digital Balance',
    subtitle: 'Reclaiming attention, mindful phone habits, and screen balance',
    iconName: 'Smartphone',
    category: 'Lifestyle',
    color: '#4F46E5',
    bgColor: '#EEF2FF',
    borderColor: '#E0E7FF',
    shortDescription: 'Break doomscrolling loops, manage group chat overload, and create healthy boundaries with your devices.',
    fullDescription: 'Between college group chats, online assignment portals, notifications, and social media, student life can keep you glued to screens from morning to night. Mindful digital boundaries protect your attention span, improve sleep quality, and reduce unnecessary comparison.',
    commonSigns: [
      'Reaching for your phone first thing in the morning before getting out of bed',
      'Opening social apps automatically whenever you experience 5 seconds of downtime',
      'Feeling anxious when your phone is away or silenced during study sessions',
      'Feeling mentally drained after hours of passive video scrolling'
    ],
    supportiveAdvice: [
      'Your attention is your most valuable asset in college. Protect it mindfully.'
    ],
    practicalTips: [
      'Phone-Free Mornings: Spend the first 15 minutes of your day without checking notifications or social feeds.',
      'Study Mode Focus: Put your phone inside your bag on "Do Not Disturb" during study blocks to eliminate micro-distractions.',
      'Notification Audit: Turn off non-essential lock screen banners for social apps; check them intentionally at scheduled times.'
    ],
    mythVsFact: {
      myth: 'I can study effectively while answering group chat messages every 2 minutes.',
      fact: 'Task switching incurs a cognitive penalty that makes studying take 2x longer with lower long-term memory retention.'
    },
    studentPerspective: '"Putting my phone on silent across the room while studying in the library doubled how quickly I finished my course readings."'
  }
];

export const CAMPUS_RESOURCES: CampusResource[] = [
  {
    id: 'nepal-police',
    title: 'Nepal Police — Emergency',
    description: 'For immediate police assistance in an emergency.',
    contact: '100',
    isUrgent: true,
    type: 'hotline'
  },
  {
    id: 'child-helpline',
    title: 'Child Helpline Nepal',
    description: 'Free child-protection helpline for children and young people who may need protection, counseling, rescue, or other support.',
    contact: '1098',
    isUrgent: false,
    type: 'hotline'
  },
  {
    id: 'ncrc',
    title: 'National Child Rights Council',
    description: 'Government body responsible for child-rights protection and related services in Nepal.',
    location: 'https://ncrc.gov.np/',
    isUrgent: false,
    type: 'digital'
  },
  {
    id: 'cwin-nepal',
    title: 'Child Workers in Nepal Concerned Centre (CWIN-Nepal)',
    description: 'Child-rights organization providing child protection, Child Helpline 1098 services, psychosocial support, and related assistance.',
    location: 'https://cwin.org.np/',
    isUrgent: false,
    type: 'peer'
  }
];

export const NEPALI_QUOTES: NepaliQuote[] = [
  {
    id: 'nq-1',
    quoteNepali: 'कर्म गर, फलको आशा नगर।',
    romanized: 'Karma gara, phal ko aasha nagara.',
    meaningEnglish: 'Focus with dedication on your honest effort and actions; rightful results will follow in their own time.',
    theme: 'Diligence (कर्म र निष्ठा)',
    sourceOrContext: 'लोकप्रिय नेपाली दर्शन (Ancient Wisdom)'
  },
  {
    id: 'nq-2',
    quoteNepali: 'साना साना थोपा मिलेर नै विशाल समुद्र बन्छ।',
    romanized: 'Saana saana thopa milera nai vishaal samudra banchha.',
    meaningEnglish: 'Just as tiny drops unite to form a mighty ocean, small daily micro-habits compound into great achievements.',
    theme: 'Small Steps (निरन्तर प्रयास)',
    sourceOrContext: 'नेपाली उखान (Nepali Proverb)'
  },
  {
    id: 'nq-3',
    quoteNepali: 'मन शान्त भए जस्तोसुकै कठिन परिस्थिति पनि सहज बन्दछ।',
    romanized: 'Mana shaanta bhaye jastosukai kathin paristhiti pani sahaj bandachha.',
    meaningEnglish: 'When your inner mind is calm and steady, even the most demanding challenges become clear and manageable.',
    theme: 'Inner Peace (मानसिक शान्ति)',
    sourceOrContext: 'ध्यान र चेतना (Mindfulness)'
  },
  {
    id: 'nq-4',
    quoteNepali: 'सफलता एकै रातमा होइन, हरेक दिनको धैर्य र लगनशीलताले मिल्छ।',
    romanized: 'Safalta ekai raat ma hoina, harek din ko dhairya ra lagansheelta le milchha.',
    meaningEnglish: 'Success is never built overnight; it grows quietly through patience, curiosity, and daily resilience.',
    theme: 'Patience (धैर्य र लगन)',
    sourceOrContext: 'विद्यार्थी प्रेरणा (Student Growth)'
  },
  {
    id: 'nq-5',
    quoteNepali: 'अरूसँग तुलना नगर; तिम्रो आफ्नै गति र आफ्नै सुनौलो यात्रा छ।',
    romanized: 'Aroo sanga tulanaa nagara; timro aaphnai gati ra aaphnai sunaulo yaatraa chha.',
    meaningEnglish: 'Never measure your self-worth against others; you have your own unique rhythm, strengths, and future.',
    theme: 'Self-Worth (आत्म-सम्मान)',
    sourceOrContext: 'सकारात्मक सोच (Self-Compassion)'
  },
  {
    id: 'nq-6',
    quoteNepali: 'विश्राम लिनु कमजोरी होइन, नयाँ उर्जाका साथ अघि बढ्ने बुद्धिमानी हो।',
    romanized: 'Vishraam linu kamjori hoina, nayaa oorjaa kaa saath aghi badhne buddhimani ho.',
    meaningEnglish: 'Taking mindful rest is not a weakness—it is essential wisdom that recharges your mind and spirit.',
    theme: 'Rest & Renewal (विश्राम र स्वास्थ्य)',
    sourceOrContext: 'स्वास्थ्य चिन्तन (Wellbeing)'
  },
  {
    id: 'nq-7',
    quoteNepali: 'हिम्मत र सकारात्मक सोच नै जीवनका सबैभन्दा भरपर्दा साथी हुन्।',
    romanized: 'Himmat ra sakaaraatmak soch nai jeevan kaa sabaibhandaa bharpardaa saathi hun.',
    meaningEnglish: 'Courage and a hopeful perspective are your most steadfast allies in overcoming uncertainty.',
    theme: 'Courage (साहस र आशा)',
    sourceOrContext: 'जीवन दृष्टि (Life Perspective)'
  },
  {
    id: 'nq-8',
    quoteNepali: 'ज्ञान नै त्यो अमूल्य ज्योति हो जसलाई कसैले खोस्न सक्दैन।',
    romanized: 'Gyan nai tyo amulya jyoti ho jaslaai kasaile khosna sakdaina.',
    meaningEnglish: 'Knowledge and self-awareness are eternal lights that no one can ever diminish.',
    theme: 'Wisdom (ज्ञान र विद्या)',
    sourceOrContext: 'शिक्षा र विवेक (Education & Insight)'
  }
];

export const DAILY_AFFIRMATIONS = [
  "I am allowed to take up space and learn at my own pace.",
  "My worth as a human being is not determined solely by grades.",
  "Rest is productive and essential for a healthy mind.",
  "I don't have to have everything figured out right now.",
  "Small steps forward each day are meaningful progress.",
  "It is brave and healthy to ask for guidance when I need it.",
  "I belong here just as much as anyone else.",
  "One stressful day does not define my semester."
];

export const COLLEGE_WELCOME_FAQS = [
  {
    question: "Is it normal to feel overwhelmed during the first month of college?",
    answer: "Yes, completely. Adjusting to a new routine, higher academic expectations, different food, and unfamiliar social dynamics is a major transition. Almost every student experiences this, even if they appear confident on the outside."
  },
  {
    question: "How do I reach out to a professor or tutor when I am struggling with coursework?",
    answer: "Keep it brief, polite, and proactive! For example: 'Respected Sir/Madam, I am finding [Topic] challenging and want to make sure I am on the right track for [Subject]. Could I meet you during your office hours or after class for 10 minutes to ask a few clarifying questions? Thank you, [Your Name]'. Faculty appreciate students who take the initiative early."
  },
  {
    question: "What if I feel like I haven't found my close group of friends yet?",
    answer: "Building genuine friendships in college takes time. The initial groups formed during orientation often evolve. Participating in college societies, sports, study circles, or volunteering aligned with your true interests is the most natural way to meet genuine friends."
  },
  {
    question: "How can I set boundaries with roommates in the hostel or shared room?",
    answer: "Discuss small habits early with a respectful, collaborative tone rather than letting frustration build. Try phrasing it kindly: 'Hey, I have an early morning class tomorrow. Would it be okay if we use desk lamps or headphones after 11 PM?' Most roommates appreciate clear, considerate communication."
  }
];
