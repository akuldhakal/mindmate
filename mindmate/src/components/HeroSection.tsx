import React, { useState, useEffect } from 'react';
import { NavTab } from '../types';
import { 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Smile, 
  RefreshCw, 
  Copy, 
  Check, 
  Shuffle, 
  Quote, 
  Volume2, 
  VolumeX,
  Share2,
  Languages
} from 'lucide-react';
import { DAILY_AFFIRMATIONS, NEPALI_QUOTES } from '../data/wellnessData';
import { soundEngine } from '../utils/audioSynth';

interface HeroSectionProps {
  onNavigate: (tab: NavTab) => void;
  onSelectMoodAnchor?: () => void;
}

const AFFIRMATION_TAGS = [
  'Self-Compassion',
  'Academic Worth',
  'Rest & Recovery',
  'Patience & Growth',
  'Small Steps',
  'Courage & Support',
  'Sense of Belonging',
  'Emotional Reset'
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onSelectMoodAnchor }) => {
  const [quoteMode, setQuoteMode] = useState<'nepali' | 'english'>('nepali');
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
  const [currentNepaliIndex, setCurrentNepaliIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mindmate_favorite_quotes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [soundActive, setSoundActive] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);

  const activeQuoteId = quoteMode === 'nepali' ? `np-${currentNepaliIndex}` : `en-${currentAffirmationIndex}`;
  const isFavorited = favorites.includes(activeQuoteId);

  const triggerNext = (nextIdx?: number) => {
    setAnimateCard(true);
    if (quoteMode === 'nepali') {
      const newIdx = nextIdx !== undefined ? nextIdx : (currentNepaliIndex + 1) % NEPALI_QUOTES.length;
      setCurrentNepaliIndex(newIdx);
    } else {
      const newIdx = nextIdx !== undefined ? nextIdx : (currentAffirmationIndex + 1) % DAILY_AFFIRMATIONS.length;
      setCurrentAffirmationIndex(newIdx);
    }

    if (soundActive) {
      soundEngine.playChime(528);
    }

    setTimeout(() => {
      setAnimateCard(false);
    }, 200);
  };

  const handleShuffle = () => {
    if (quoteMode === 'nepali') {
      let randomIdx = Math.floor(Math.random() * NEPALI_QUOTES.length);
      if (randomIdx === currentNepaliIndex) {
        randomIdx = (randomIdx + 1) % NEPALI_QUOTES.length;
      }
      triggerNext(randomIdx);
    } else {
      let randomIdx = Math.floor(Math.random() * DAILY_AFFIRMATIONS.length);
      if (randomIdx === currentAffirmationIndex) {
        randomIdx = (randomIdx + 1) % DAILY_AFFIRMATIONS.length;
      }
      triggerNext(randomIdx);
    }
  };

  const handleCopy = () => {
    let text = '';
    if (quoteMode === 'nepali') {
      const q = NEPALI_QUOTES[currentNepaliIndex];
      text = `"${q.quoteNepali}" (${q.meaningEnglish}) — MindMate Nepali Quotes`;
    } else {
      text = `"${DAILY_AFFIRMATIONS[currentAffirmationIndex]}" — MindMate Student Wellness`;
    }
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const toggleFavorite = () => {
    let updated: string[];
    if (isFavorited) {
      updated = favorites.filter((id) => id !== activeQuoteId);
    } else {
      updated = [...favorites, activeQuoteId];
      if (soundActive) {
        soundEngine.playChime(660);
      }
    }
    setFavorites(updated);
    try {
      localStorage.setItem('mindmate_favorite_quotes', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save favorites to localStorage', e);
    }
  };

  const currentNepaliQuote = NEPALI_QUOTES[currentNepaliIndex];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-[#FCFAF7] border-b border-[#EAE6DF]">
      {/* Subtle organic background glow in natural tones */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-48 h-48 bg-blue-100/30 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Student Wellbeing Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wide border border-emerald-200/70 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Student Mental Wellness & Wellbeing</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A192F] leading-[1.15] tracking-tight">
              Your mind matters. <br />
              <span className="text-emerald-700 font-normal italic">So does your wellbeing.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              College is exciting, challenging, and sometimes overwhelming. MindMate gives you simple tools and information to help you take care of yourself along the way.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-explore-wellbeing-btn"
                onClick={() => onNavigate('wellbeing')}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-sm shadow-emerald-700/20 hover:shadow-md transition-all duration-200 cursor-pointer active:scale-98"
              >
                <BookOpen className="w-5 h-5 text-emerald-100" />
                Explore Wellbeing
              </button>

              <button
                id="hero-quick-checkin-btn"
                onClick={() => {
                  if (onSelectMoodAnchor) {
                    onSelectMoodAnchor();
                  } else {
                    onNavigate('checkin');
                  }
                }}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-[#FCFAF7] text-[#0A192F] font-semibold text-base border border-[#EAE6DF] shadow-2xs hover:border-emerald-300 hover:text-emerald-800 transition-all duration-200 cursor-pointer active:scale-98"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Quick Check-In
              </button>
            </div>

            {/* Trust & Safe Environment micro-pills */}
            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Anonymous & Private</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-amber-600" />
                <span>No sign-up or diagnosis</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Built for Student Life</span>
              </div>
            </div>

          </div>

          {/* Right Column: Daily Student Affirmation Interactive Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer decorative card frame */}
              <div 
                id="hero-daily-affirmation-card"
                className="relative bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#EAE6DF] flex flex-col justify-between min-h-[380px] text-left transition-all"
              >
                
                {/* Visual Header with Language / Mode Switcher */}
                <div className="flex flex-col gap-3 pb-3 mb-3 border-b border-[#EAE6DF]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm shadow-2xs border border-emerald-200/50">
                        <Quote className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                      </div>
                      <div>
                        <h2 className="text-xs font-bold text-[#0A192F] uppercase tracking-wider">
                          {quoteMode === 'nepali' ? 'Daily Nepali Quote' : 'Daily Student Affirmation'}
                        </h2>
                        <p className="text-[11px] text-slate-500">
                          {quoteMode === 'nepali' ? 'नेपाली विचार र प्रेरणा' : 'Gentle perspective for your day'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        id="hero-affirmation-sound-toggle"
                        onClick={() => setSoundActive(!soundActive)}
                        title={soundActive ? 'Sound feedback on' : 'Enable gentle chime feedback'}
                        className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                          soundActive 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'text-slate-400 hover:text-slate-600 hover:bg-gray-100'
                        }`}
                      >
                        {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                      </button>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200/50">
                        {quoteMode === 'nepali'
                          ? `${currentNepaliIndex + 1}/${NEPALI_QUOTES.length}`
                          : `${currentAffirmationIndex + 1}/${DAILY_AFFIRMATIONS.length}`}
                      </span>
                    </div>
                  </div>

                  {/* Mode Selector Tabs */}
                  <div className="flex items-center gap-1.5 bg-[#FCFAF7] p-1 rounded-xl border border-[#EAE6DF]">
                    <button
                      type="button"
                      id="quote-mode-nepali-btn"
                      onClick={() => {
                        setQuoteMode('nepali');
                        if (soundActive) soundEngine.playChime(528);
                      }}
                      className={`flex-1 py-1 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        quoteMode === 'nepali'
                          ? 'bg-white text-emerald-900 shadow-2xs border border-[#EAE6DF]'
                          : 'text-slate-500 hover:text-[#0A192F]'
                      }`}
                    >
                      <Languages className="w-3.5 h-3.5 text-emerald-600" />
                      <span>नेपाली Quotes</span>
                    </button>

                    <button
                      type="button"
                      id="quote-mode-english-btn"
                      onClick={() => {
                        setQuoteMode('english');
                        if (soundActive) soundEngine.playChime(440);
                      }}
                      className={`flex-1 py-1 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        quoteMode === 'english'
                          ? 'bg-white text-emerald-900 shadow-2xs border border-[#EAE6DF]'
                          : 'text-slate-500 hover:text-[#0A192F]'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>Affirmations</span>
                    </button>
                  </div>
                </div>

                {/* Main Quote / Affirmation Box */}
                <div className="relative my-auto py-2 px-1">
                  {/* Category Pill */}
                  <div className="mb-2.5 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200/60">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      {quoteMode === 'nepali' ? currentNepaliQuote.theme : (AFFIRMATION_TAGS[currentAffirmationIndex] || 'Perspective')}
                    </span>
                    {quoteMode === 'nepali' && (
                      <span className="text-[10px] text-slate-400 font-medium italic">
                        {currentNepaliQuote.sourceOrContext}
                      </span>
                    )}
                  </div>

                  {/* Decorative background quote mark */}
                  <Quote className="absolute top-1 right-1 w-14 h-14 text-emerald-500/10 pointer-events-none -z-0" />

                  {/* Main Quote Text */}
                  <div 
                    className={`relative z-10 transition-opacity duration-200 ${
                      animateCard ? 'opacity-30 scale-98' : 'opacity-100 scale-100'
                    }`}
                  >
                    {quoteMode === 'nepali' ? (
                      <div className="space-y-2">
                        <p className="font-display text-xl sm:text-2xl font-bold text-[#0A192F] leading-snug tracking-tight">
                          "{currentNepaliQuote.quoteNepali}"
                        </p>
                        <p className="text-xs text-emerald-800 font-medium italic">
                          {currentNepaliQuote.romanized}
                        </p>
                        <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-950 leading-relaxed mt-2">
                          <strong className="text-emerald-900">अर्थ (Meaning): </strong>
                          {currentNepaliQuote.meaningEnglish}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="font-display text-xl sm:text-2xl font-bold text-[#0A192F] leading-snug tracking-tight">
                          "{DAILY_AFFIRMATIONS[currentAffirmationIndex]}"
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Take a slow breath in. Repeat this to yourself as a reminder that your wellbeing always comes first.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Interactive Dot Selector */}
                <div className="flex items-center justify-center gap-1.5 py-2">
                  {(quoteMode === 'nepali' ? NEPALI_QUOTES : DAILY_AFFIRMATIONS).map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => triggerNext(dotIdx)}
                      aria-label={`View item ${dotIdx + 1}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        dotIdx === (quoteMode === 'nepali' ? currentNepaliIndex : currentAffirmationIndex)
                          ? 'w-6 bg-emerald-600'
                          : 'w-1.5 bg-gray-200 hover:bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Action Buttons Footer */}
                <div className="pt-3 border-t border-[#EAE6DF] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {/* Favorite Button */}
                    <button
                      id="hero-affirmation-fav-btn"
                      onClick={toggleFavorite}
                      title={isFavorited ? 'Remove from saved' : 'Save as favorite'}
                      className={`p-2 rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer ${
                        isFavorited
                          ? 'bg-rose-50 text-rose-600 border border-rose-200/80 font-medium'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-gray-100 border border-transparent'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span className="text-[11px] hidden sm:inline">{isFavorited ? 'Saved' : 'Save'}</span>
                    </button>

                    {/* Copy Button */}
                    <button
                      id="hero-affirmation-copy-btn"
                      onClick={handleCopy}
                      title="Copy quote"
                      className="p-2 rounded-xl text-xs text-slate-500 hover:text-slate-800 hover:bg-gray-100 border border-transparent flex items-center gap-1 transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span className="text-[11px] hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
                    </button>

                    {/* Shuffle Button */}
                    <button
                      id="hero-affirmation-shuffle-btn"
                      onClick={handleShuffle}
                      title="Random quote"
                      className="p-2 rounded-xl text-xs text-slate-500 hover:text-slate-800 hover:bg-gray-100 border border-transparent transition-all cursor-pointer"
                    >
                      <Shuffle className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Next Main Button */}
                  <button
                    id="hero-affirmation-next-btn"
                    onClick={() => triggerNext()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-98"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{quoteMode === 'nepali' ? 'अर्को विचार' : 'Next'}</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
