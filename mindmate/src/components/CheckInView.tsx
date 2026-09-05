import React, { useState, useEffect } from 'react';
import { MOOD_OPTIONS } from '../data/wellnessData';
import { MoodId, NavTab, AiCheckInSuggestion } from '../types';
import { generateClientAiSuggestion } from '../utils/wellnessAiEngine';
import { 
  Sparkles, 
  ShieldCheck, 
  Battery, 
  BatteryLow,
  BatteryMedium,
  BatteryCharging,
  Moon, 
  Tag, 
  ArrowRight, 
  AlertCircle,
  RefreshCw,
  Zap,
  Lightbulb,
  HeartHandshake,
  Clock,
  Plus,
  Minus,
  Flame,
  Check
} from 'lucide-react';

interface CheckInViewProps {
  onNavigate: (tab: NavTab) => void;
  onOpenTool: (toolId: string) => void;
}

export const CheckInView: React.FC<CheckInViewProps> = ({ onNavigate, onOpenTool }) => {
  const [selectedMood, setSelectedMood] = useState<MoodId>('okay');
  const [energyLevel, setEnergyLevel] = useState<number>(3);
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [reflectionText, setReflectionText] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Lectures']);
  
  // AI Suggestion State
  const [aiSuggestion, setAiSuggestion] = useState<AiCheckInSuggestion | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const availableTags = [
    'Lectures', 'Exams & Quizzes', 'Hostel Life', 'Socializing', 
    'Homesick', 'Work/Study', 'Exercise', 'Rest & Relaxation', 'Roommates', 'Deadlines'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const currentMoodObj = MOOD_OPTIONS.find((m) => m.id === selectedMood) || MOOD_OPTIONS[2];

  // Request AI Suggestion based on mood, energy level, and sleep duration
  const generateAiSuggestion = async (isManualClick = false) => {
    setIsLoadingAi(true);
    setAiError(null);

    const clientGenerated = generateClientAiSuggestion({
      mood: selectedMood,
      moodLabel: currentMoodObj.label,
      energyLevel,
      sleepHours,
      tags: selectedTags,
      reflection: reflectionText.trim()
    });

    // Set immediate client-generated suggestion so user never experiences lag or blank state
    setAiSuggestion(clientGenerated);

    try {
      const response = await fetch('/api/checkin-suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood: selectedMood,
          moodLabel: currentMoodObj.label,
          energyLevel,
          sleepHours,
          tags: selectedTags,
          reflection: reflectionText.trim()
        }),
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data: AiCheckInSuggestion = await response.json();
          if (data && data.supportiveInsight) {
            setAiSuggestion(data);
          }
        }
      }
    } catch {
      // Retain the rich clientGenerated suggestion seamlessly
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Re-generate suggestions automatically whenever mood, energy, sleep, or tags change
  useEffect(() => {
    generateAiSuggestion(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMood, energyLevel, sleepHours, selectedTags]);

  const getEnergyData = (lvl: number) => {
    switch (lvl) {
      case 1:
        return {
          label: 'Exhausted',
          sub: 'Running on empty',
          icon: BatteryLow,
          color: 'text-rose-600',
          bg: 'bg-rose-50',
          border: 'border-rose-200',
          activeBg: 'bg-rose-500 text-white border-rose-600 shadow-sm'
        };
      case 2:
        return {
          label: 'Low Energy',
          sub: 'Need gentle pacing',
          icon: BatteryLow,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          activeBg: 'bg-amber-500 text-white border-amber-600 shadow-sm'
        };
      case 3:
        return {
          label: 'Steady',
          sub: 'Balanced baseline',
          icon: BatteryMedium,
          color: 'text-teal-600',
          bg: 'bg-teal-50',
          border: 'border-teal-200',
          activeBg: 'bg-teal-600 text-white border-teal-700 shadow-sm'
        };
      case 4:
        return {
          label: 'Alert & Good',
          sub: 'Clear focus & drive',
          icon: BatteryCharging,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          activeBg: 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
        };
      case 5:
      default:
        return {
          label: 'Peak Energy',
          sub: 'Vibrant & unstoppable',
          icon: Flame,
          color: 'text-indigo-600',
          bg: 'bg-indigo-50',
          border: 'border-indigo-200',
          activeBg: 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
        };
    }
  };

  const getSleepData = (hours: number) => {
    if (hours < 5) {
      return {
        quality: 'Severe Sleep Debt',
        badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
        barColor: 'bg-rose-500',
        note: 'Cognitive alertness and memory retention are reduced. Prioritize a quiet 15–20m power nap or early bedtime.'
      };
    }
    if (hours < 7) {
      return {
        quality: 'Slightly Below Optimal',
        badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
        barColor: 'bg-amber-500',
        note: 'Manageable for classes, but try to hydrate well and take regular micro-breaks between study sessions.'
      };
    }
    if (hours <= 9) {
      return {
        quality: 'Optimal Student Rest',
        badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        barColor: 'bg-emerald-500',
        note: 'Excellent! Your brain completed essential REM and deep recovery cycles for peak lecture focus.'
      };
    }
    return {
      quality: 'Extended Deep Rest',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      barColor: 'bg-indigo-500',
      note: 'Recharging after demanding deadlines or physical fatigue. Keep moving gently to avoid sluggishness.'
    };
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FCFAF7] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60 shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>AI-Powered Wellness Check-In</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#0A192F] tracking-tight">
            Mindful Check-In & AI Suggestions
          </h1>
          <p className="text-slate-600 text-base max-w-2xl">
            Tune in to your current mood, energy level, and sleep duration. Our AI analyzes your state in real time to provide personalized, non-judgmental student wellbeing guidance.
          </p>

          {/* Non-Diagnostic Reflection Notice */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#EAE6DF] text-xs text-slate-700 flex items-start gap-2.5 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#0A192F]">Educational & Self-Awareness Notice:</span> This AI check-in provides supportive, general wellbeing ideas. It does not provide clinical diagnosis, medical therapy, or replace professional health consultations.
            </div>
          </div>
        </div>

        {/* Check-In Input Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE6DF] shadow-sm space-y-8 text-left">
          
          <div className="space-y-8">
            
            {/* 1. Mood Selection */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#0A192F] flex items-center justify-between">
                <span>1. How are you feeling right now?</span>
                <span className="text-xs font-normal text-gray-500">Pick your current headspace</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {MOOD_OPTIONS.map((mood) => {
                  const isSelected = selectedMood === mood.id;
                  return (
                    <button
                      key={mood.id}
                      type="button"
                      id={`checkin-mood-select-${mood.id}`}
                      onClick={() => setSelectedMood(mood.id)}
                      className={`flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm scale-102 ring-2 ring-emerald-600 ring-offset-2'
                          : 'bg-[#FCFAF7] text-[#0A192F] hover:bg-emerald-50/60 border-[#EAE6DF]'
                      }`}
                    >
                      <span className="text-3xl sm:text-4xl mb-1.5">{mood.emoji}</span>
                      <span className="text-xs font-bold">{mood.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Dynamic Energy Level Selection */}
            <div className="space-y-4 pt-4 border-t border-[#EAE6DF]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-sm font-bold text-[#0A192F] flex items-center gap-2">
                  <Battery className="w-4 h-4 text-amber-500" />
                  <span>2. Current Energy Level</span>
                </label>

                {/* Status Badge & Steppers */}
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getEnergyData(energyLevel).bg} ${getEnergyData(energyLevel).color} ${getEnergyData(energyLevel).border}`}>
                    Level {energyLevel}/5 • {getEnergyData(energyLevel).label}
                  </span>
                  <div className="flex items-center gap-1 bg-[#FCFAF7] border border-[#EAE6DF] rounded-xl p-0.5">
                    <button
                      type="button"
                      id="energy-step-down"
                      onClick={() => setEnergyLevel((prev) => Math.max(1, prev - 1))}
                      disabled={energyLevel <= 1}
                      className="p-1 rounded-lg hover:bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                      title="Decrease Energy"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      id="energy-step-up"
                      onClick={() => setEnergyLevel((prev) => Math.min(5, prev + 1))}
                      disabled={energyLevel >= 5}
                      className="p-1 rounded-lg hover:bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                      title="Increase Energy"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 5 Dynamic Segmented Energy Cards */}
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((lvl) => {
                  const data = getEnergyData(lvl);
                  const isSelected = energyLevel === lvl;
                  const IconComp = data.icon;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      id={`energy-level-btn-${lvl}`}
                      onClick={() => setEnergyLevel(lvl)}
                      className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer text-center relative ${
                        isSelected
                          ? `${data.activeBg} scale-102 ring-2 ring-offset-1`
                          : 'bg-[#FCFAF7] text-slate-700 hover:bg-white border-[#EAE6DF]'
                      }`}
                    >
                      <IconComp className={`w-4 h-4 mb-1 ${isSelected ? 'text-white' : data.color}`} />
                      <span className="text-xs font-bold font-mono">{lvl}</span>
                      <span className="text-[10px] font-semibold truncate max-w-full hidden sm:inline">
                        {data.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Slider for precision */}
              <div className="space-y-1 pt-1">
                <input
                  id="energy-slider"
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={energyLevel}
                  onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-gray-400 font-medium px-1">
                  <span>1 - Exhausted</span>
                  <span>3 - Steady baseline</span>
                  <span>5 - Peak drive</span>
                </div>
              </div>
            </div>

            {/* 3. Dynamic Sleep Duration Selection */}
            <div className="space-y-4 pt-4 border-t border-[#EAE6DF]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-sm font-bold text-[#0A192F] flex items-center gap-2">
                  <Moon className="w-4 h-4 text-indigo-500" />
                  <span>3. Sleep Duration (Last Night)</span>
                </label>

                {/* Duration Badge & Steppers */}
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getSleepData(sleepHours).badgeColor}`}>
                    {sleepHours} hrs • {getSleepData(sleepHours).quality}
                  </span>
                  <div className="flex items-center gap-1 bg-[#FCFAF7] border border-[#EAE6DF] rounded-xl p-0.5">
                    <button
                      type="button"
                      id="sleep-step-down"
                      onClick={() => setSleepHours((prev) => Math.max(3, parseFloat((prev - 0.5).toFixed(1))))}
                      disabled={sleepHours <= 3}
                      className="p-1 rounded-lg hover:bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                      title="Decrease 30 mins"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      id="sleep-step-up"
                      onClick={() => setSleepHours((prev) => Math.min(12, parseFloat((prev + 0.5).toFixed(1))))}
                      disabled={sleepHours >= 12}
                      className="p-1 rounded-lg hover:bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                      title="Increase 30 mins"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick 1-Tap Sleep Presets */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Quick Presets:</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { hours: 4.0, label: '4h (Short)', desc: 'Late study' },
                    { hours: 5.5, label: '5.5h (Light)', desc: 'Below rec.' },
                    { hours: 7.0, label: '7h (Good)', desc: 'Healthy min.' },
                    { hours: 8.0, label: '8h (Optimal)', desc: 'Ideal rest' },
                    { hours: 9.5, label: '9.5h+ (Deep)', desc: 'Catch-up' }
                  ].map((preset) => {
                    const isSelected = sleepHours === preset.hours;
                    return (
                      <button
                        key={preset.hours}
                        type="button"
                        id={`sleep-preset-${preset.hours}`}
                        onClick={() => setSleepHours(preset.hours)}
                        className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs font-bold'
                            : 'bg-[#FCFAF7] hover:bg-white border-[#EAE6DF] text-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold">{preset.label}</div>
                        <div className={`text-[10px] ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                          {preset.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sleep Range Slider with Recovery Insight Note */}
              <div className="space-y-2 pt-1">
                <input
                  id="sleep-slider"
                  type="range"
                  min="3"
                  max="12"
                  step="0.5"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[11px] text-gray-400 font-medium px-1">
                  <span>3 hrs</span>
                  <span>7–8 hrs (Recommended for Students)</span>
                  <span>12 hrs</span>
                </div>

                {/* Real-time Sleep Quality Insight Callout */}
                <div className="p-3 rounded-2xl bg-[#FCFAF7] border border-[#EAE6DF] flex items-start gap-2.5 text-xs text-slate-600">
                  <Clock className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-[#0A192F]">{getSleepData(sleepHours).quality}: </strong>
                    {getSleepData(sleepHours).note}
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Context & Focus Tags */}
            <div className="space-y-3 pt-4 border-t border-[#EAE6DF]">
              <label className="text-sm font-bold text-[#0A192F] flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>4. What is on your mind today? (Select all that apply)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => {
                  const isChecked = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                        isChecked
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                          : 'bg-[#FCFAF7] text-[#0A192F] hover:bg-gray-100 border-[#EAE6DF]'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '}
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Optional Free-Text Note */}
            <div className="space-y-3 pt-4 border-t border-[#EAE6DF]">
              <label htmlFor="checkin-reflection" className="text-sm font-bold text-[#0A192F] block">
                5. Add a brief note or thought (Optional):
              </label>
              <textarea
                id="checkin-reflection"
                rows={2}
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="e.g., Preparing for physics lab, feeling a bit rushed this morning..."
                className="w-full p-4 rounded-2xl bg-[#FCFAF7] border border-[#EAE6DF] text-sm text-[#0A192F] placeholder:text-gray-400 focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>

            {/* AI Generation Trigger */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="button"
                id="generate-ai-suggestion-btn"
                disabled={isLoadingAi}
                onClick={() => generateAiSuggestion(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-base shadow-md shadow-emerald-600/20 cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2.5"
              >
                {isLoadingAi ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Analyzing with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-emerald-200" />
                    <span>Get AI Suggestion</span>
                  </>
                )}
              </button>

              <div className="text-xs text-slate-500 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Tailored dynamically to your {currentMoodObj.label}, Level {energyLevel} Energy & {sleepHours}h Sleep.</span>
              </div>
            </div>

          </div>

          {/* AI Suggestion Output Section */}
          {isLoadingAi && (
            <div className="mt-8 p-8 rounded-3xl bg-emerald-50/50 border border-emerald-200/80 text-center space-y-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5 animate-spin" />
              </div>
              <h3 className="font-display font-bold text-[#0A192F] text-lg">
                Crafting Personalized Wellbeing Suggestions...
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Analyzing your {currentMoodObj.label.toLowerCase()} headspace, {energyLevel}/5 energy level, and {sleepHours} hours of sleep to create realistic student guidance.
              </p>
            </div>
          )}

          {aiError && !isLoadingAi && (
            <div className="mt-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{aiError}</span>
            </div>
          )}

          {aiSuggestion && !isLoadingAi && (
            <div className="mt-8 rounded-3xl bg-gradient-to-br from-emerald-50/40 via-white to-amber-50/30 border border-emerald-200/80 p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in zoom-in-95 duration-200">
              
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EAE6DF]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-xl font-bold text-[#0A192F]">
                        AI Wellbeing Guidance
                      </h3>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                        Custom Plan
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Based on Feeling {currentMoodObj.label} • Energy {energyLevel}/5 • {sleepHours}h Sleep
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  id="re-analyze-checkin-btn"
                  onClick={() => generateAiSuggestion(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-900 font-semibold px-3 py-1.5 rounded-xl bg-white border border-emerald-200 hover:bg-emerald-50 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Analysis</span>
                </button>
              </div>

              {/* 1. Compassionate Reflection & State Validation */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <HeartHandshake className="w-4 h-4 text-emerald-600" />
                  <span>Compassionate Reflection</span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal bg-white p-4 sm:p-5 rounded-2xl border border-[#EAE6DF]/80">
                  {aiSuggestion.supportiveInsight}
                </p>
              </div>

              {/* 2. Energy & Sleep Dynamic Analysis */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-900">
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>Energy & Sleep Interaction</span>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100/80 text-sm text-indigo-950 leading-relaxed">
                  {aiSuggestion.energyAndSleepAnalysis}
                </div>
              </div>

              {/* 3. Actionable Micro-Steps */}
              {aiSuggestion.microActions && aiSuggestion.microActions.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Suggested Micro-Actions for Right Now</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {aiSuggestion.microActions.map((action, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#EAE6DF] text-sm text-slate-700 shadow-2xs"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                          {idx + 1}
                        </div>
                        <span className="leading-snug">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Mindset Affirmation / Grounding Thought */}
              {aiSuggestion.mindsetAffirmation && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-center space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                    Daily Anchor Thought
                  </span>
                  <p className="font-display italic text-amber-950 text-sm sm:text-base font-medium">
                    "{aiSuggestion.mindsetAffirmation}"
                  </p>
                </div>
              )}

              {/* 5. Recommended Interactive Practice */}
              {aiSuggestion.recommendedPractice && (
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-emerald-200">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                      Recommended Practice
                    </span>
                    <h4 className="font-bold text-[#0A192F] text-sm sm:text-base">
                      {aiSuggestion.recommendedPractice.title}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {aiSuggestion.recommendedPractice.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    id="open-ai-recommended-practice-btn"
                    onClick={() => {
                      if (aiSuggestion.recommendedPractice.toolId) {
                        onOpenTool(aiSuggestion.recommendedPractice.toolId);
                      } else {
                        onNavigate('toolkit');
                      }
                    }}
                    className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Try This Practice</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
