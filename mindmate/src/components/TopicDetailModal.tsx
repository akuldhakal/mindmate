import React, { useEffect } from 'react';
import { WellbeingTopic } from '../types';
import { 
  X, 
  Flame, 
  GraduationCap, 
  Moon, 
  Users, 
  Compass, 
  Smartphone, 
  Lightbulb, 
  CheckCircle2, 
  Quote, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface TopicDetailModalProps {
  topic: WellbeingTopic | null;
  onClose: () => void;
  onNavigateToToolkit?: () => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({ topic, onClose, onNavigateToToolkit }) => {
  useEffect(() => {
    if (!topic) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [topic, onClose]);

  if (!topic) return null;

  const renderIcon = (name: WellbeingTopic['iconName']) => {
    const props = { className: 'w-6 h-6' };
    switch (name) {
      case 'Flame': return <Flame {...props} className="w-6 h-6 text-teal-600" />;
      case 'GraduationCap': return <GraduationCap {...props} className="w-6 h-6 text-blue-600" />;
      case 'Moon': return <Moon {...props} className="w-6 h-6 text-indigo-600" />;
      case 'Users': return <Users {...props} className="w-6 h-6 text-emerald-600" />;
      case 'Compass': return <Compass {...props} className="w-6 h-6 text-amber-600" />;
      case 'Smartphone': return <Smartphone {...props} className="w-6 h-6 text-purple-600" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="topic-modal-title"
    >
      {/* Modal Container */}
      <div 
        id="topic-modal-container"
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EAE6DF] animate-in zoom-in-95 duration-200"
      >
        {/* Modal Top Banner */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm px-6 py-4 border-b border-[#EAE6DF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#FCFAF7] border border-[#EAE6DF]">
              {renderIcon(topic.iconName)}
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">{topic.category}</span>
              <h3 id="topic-modal-title" className="font-display text-xl font-bold text-[#0A192F]">{topic.title}</h3>
            </div>
          </div>

          <button
            id="close-topic-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-slate-700 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Subtitle & Full Overview */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl inline-block border border-emerald-200/60">
              {topic.subtitle}
            </p>
            <p className="text-slate-700 text-base leading-relaxed pt-2">
              {topic.fullDescription}
            </p>
          </div>

          {/* Common Experiences / Signs */}
          <div className="bg-[#FCFAF7] rounded-2xl p-5 border border-[#EAE6DF] space-y-3">
            <h4 className="text-xs font-bold text-[#0A192F] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Common Student Signs & Feelings
            </h4>
            <ul className="space-y-2">
              {topic.commonSigns.map((sign, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practical Campus Tips */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0A192F] uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Practical Action Steps for College Life
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {topic.practicalTips.map((tip, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#EAE6DF] text-sm text-[#0A192F] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Myth vs Fact */}
          <div className="bg-white rounded-2xl p-5 border border-[#EAE6DF] space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A192F] uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              Myth vs. Reality on Campus
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FCFAF7] border border-[#EAE6DF]">
                <span className="font-bold text-rose-600 block mb-1">Common Myth:</span>
                <p className="text-slate-600">{topic.mythVsFact.myth}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#FCFAF7] border border-[#EAE6DF]">
                <span className="font-bold text-emerald-700 block mb-1">Gentle Fact:</span>
                <p className="text-slate-600">{topic.mythVsFact.fact}</p>
              </div>
            </div>
          </div>

          {/* Student Quote */}
          <div className="p-4 rounded-2xl bg-[#FCFAF7] border border-[#EAE6DF] flex items-start gap-3">
            <Quote className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-amber-900 uppercase tracking-wider mb-1">Upperclassman Perspective</p>
              <p className="text-sm italic text-slate-700">{topic.studentPerspective}</p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#FCFAF7] px-6 py-4 border-t border-[#EAE6DF] flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            For personal guidance, visit campus health or connect with a peer mentor.
          </p>

          <div className="flex items-center gap-2">
            {onNavigateToToolkit && (
              <button
                id="modal-open-toolkit-btn"
                onClick={() => {
                  onClose();
                  onNavigateToToolkit();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Try Interactive Toolkit
              </button>
            )}
            <button
              id="modal-close-action-btn"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-gray-100 text-[#0A192F] font-medium text-xs border border-[#EAE6DF] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
