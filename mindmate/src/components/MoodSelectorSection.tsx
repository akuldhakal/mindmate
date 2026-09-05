import React, { useState } from 'react';
import { MOOD_OPTIONS } from '../data/wellnessData';
import { MoodId, NavTab } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, Heart, RefreshCw } from 'lucide-react';

interface MoodSelectorSectionProps {
  onNavigate: (tab: NavTab) => void;
  onOpenTool?: (toolId: string) => void;
}

export const MoodSelectorSection: React.FC<MoodSelectorSectionProps> = ({ onNavigate, onOpenTool }) => {
  const [selectedMoodId, setSelectedMoodId] = useState<MoodId | null>('good');
  const [savedLocally, setSavedLocally] = useState<boolean>(false);

  const currentMood = MOOD_OPTIONS.find((m) => m.id === selectedMoodId) || MOOD_OPTIONS[1];

  const handleSelectMood = (id: MoodId) => {
    setSelectedMoodId(id);
    setSavedLocally(false);
  };

  const handleSaveToQuickLog = () => {
    try {
      const timeStr = new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      const existingEntries = JSON.parse(localStorage.getItem('mindmate_checkins') || '[]');
      
      const newEntry = {
        id: 'entry_' + Date.now(),
        date: timeStr,
        timestamp: Date.now(),
        mood: selectedMoodId,
        energyLevel: selectedMoodId === 'great' ? 5 : selectedMoodId === 'good' ? 4 : selectedMoodId === 'okay' ? 3 : selectedMoodId === 'stressed' ? 2 : 1,
        sleepHours: 7,
        notes: 'Logged from quick pulse',
        tags: ['Quick Pulse']
      };

      const updated = [newEntry, ...existingEntries.slice(0, 19)];
      localStorage.setItem('mindmate_checkins', JSON.stringify(updated));
      setSavedLocally(true);
    } catch (e) {
      console.warn('Local storage write error', e);
    }
  };

  return (
    <section id="mood-checkin-section" className="py-14 sm:py-20 bg-[#FCFAF7] border-b border-[#EAE6DF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
            <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>Gentle Daily Pulse</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0A192F] tracking-tight">
            How are you feeling today?
          </h2>
          <p className="text-slate-600 text-base max-w-xl mx-auto">
            Take a gentle second to tune in with yourself. No scores, no judgments, and no diagnostic evaluations.
          </p>
        </div>

        {/* 5 Interactive Mood Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {MOOD_OPTIONS.map((mood) => {
            const isSelected = selectedMoodId === mood.id;
            return (
              <button
                key={mood.id}
                id={`mood-btn-${mood.id}`}
                onClick={() => handleSelectMood(mood.id)}
                className={`group flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer text-center relative ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/20 ring-2 ring-emerald-600 ring-offset-2 scale-[1.03]'
                    : 'bg-white hover:bg-emerald-50/40 text-[#0A192F] border border-[#EAE6DF] hover:border-emerald-300 shadow-2xs'
                }`}
              >
                {/* Mood Emoji */}
                <span className="text-4xl sm:text-5xl mb-2 transition-transform duration-200 group-hover:scale-110">
                  {mood.emoji}
                </span>

                {/* Mood Label */}
                <span className={`font-bold text-sm sm:text-base ${isSelected ? 'text-white' : 'text-[#0A192F]'}`}>
                  {mood.label}
                </span>

                {/* Subtitle tag */}
                <span className={`text-[11px] mt-0.5 font-medium ${isSelected ? 'text-emerald-100' : 'text-gray-500'}`}>
                  {mood.tagline}
                </span>

                {isSelected && (
                  <span className="absolute -top-2 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-white shadow-xs" />
                )}
              </button>
            );
          })}
        </div>

        {/* Supportive Feedback Card (Non-diagnostic, purely encouraging) */}
        {currentMood && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-sm space-y-5 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Message header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#EAE6DF]">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{currentMood.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-[#0A192F]">
                      Feeling {currentMood.label}
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-medium">
                      {currentMood.badge}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Private & Non-diagnostic</span>
              </div>
            </div>

            {/* Supportive Message Content */}
            <div className="space-y-3">
              <p className="text-slate-700 text-base leading-relaxed font-normal">
                {currentMood.supportiveMessage}
              </p>

              <div className="p-3.5 rounded-2xl bg-[#FCFAF7] border border-[#EAE6DF] flex items-start gap-3 text-slate-800">
                <div className="p-1.5 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0A192F] uppercase tracking-wide block">
                    Gentle Suggestion
                  </span>
                  <p className="text-sm text-slate-600 mt-0.5">
                    {currentMood.suggestedAction}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  id="mood-suggested-tool-btn"
                  onClick={() => {
                    if (onOpenTool && currentMood.recommendedTool.toolId) {
                      onOpenTool(currentMood.recommendedTool.toolId);
                    } else {
                      onNavigate(currentMood.recommendedTool.actionTab);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  <span>Open {currentMood.recommendedTool.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="mood-save-pulse-btn"
                  onClick={handleSaveToQuickLog}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer border ${
                    savedLocally 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-[#FCFAF7] text-[#0A192F] hover:bg-gray-100 border-[#EAE6DF]'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${savedLocally ? 'text-emerald-600' : 'text-gray-400'}`} />
                  {savedLocally ? 'Saved to Your Reflection Log' : 'Save to Reflections'}
                </button>
              </div>

              <button
                id="mood-detailed-checkin-link"
                onClick={() => onNavigate('checkin')}
                className="text-xs text-gray-500 hover:text-emerald-700 font-medium underline underline-offset-4 cursor-pointer"
              >
                Open AI Wellbeing Check-In →
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
