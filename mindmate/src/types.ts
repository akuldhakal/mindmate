export type NavTab = 'home' | 'wellbeing' | 'toolkit' | 'checkin' | 'resources' | 'support';

export type MoodId = 'great' | 'good' | 'okay' | 'stressed' | 'overwhelmed';

export interface MoodOption {
  id: MoodId;
  emoji: string;
  label: string;
  badge: string;
  tagline: string;
  supportiveMessage: string;
  suggestedAction: string;
  recommendedTool: {
    name: string;
    actionTab: NavTab;
    toolId?: string;
  };
}

export interface WellbeingTopic {
  id: string;
  title: string;
  subtitle: string;
  iconName: 'Flame' | 'GraduationCap' | 'Moon' | 'Users' | 'Compass' | 'Smartphone';
  category: string;
  color: string;
  bgColor: string;
  borderColor: string;
  shortDescription: string;
  fullDescription: string;
  commonSigns: string[];
  supportiveAdvice: string[];
  practicalTips: string[];
  mythVsFact: {
    myth: string;
    fact: string;
  };
  studentPerspective: string;
}

export interface AiCheckInSuggestion {
  supportiveInsight: string;
  energyAndSleepAnalysis: string;
  microActions: string[];
  mindsetAffirmation: string;
  recommendedPractice: {
    title: string;
    description: string;
    toolId?: string;
  };
}

export interface CheckInEntry {
  id: string;
  date: string;
  timestamp: number;
  mood: MoodId;
  energyLevel: number; // 1 - 5
  sleepHours: number;
  notes?: string;
  tags: string[];
  aiSuggestion?: AiCheckInSuggestion;
}

export interface CampusResource {
  id: string;
  title: string;
  description: string;
  contact?: string;
  hours?: string;
  location?: string;
  isUrgent?: boolean;
  type: 'campus' | 'hotline' | 'peer' | 'digital';
}

export interface NepaliQuote {
  id: string;
  quoteNepali: string;
  romanized: string;
  meaningEnglish: string;
  theme: string;
  sourceOrContext: string;
}
