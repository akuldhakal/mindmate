import React, { useState } from 'react';
import { WELLBEING_TOPICS } from '../data/wellnessData';
import { WellbeingTopic, NavTab } from '../types';
import { TopicDetailModal } from './TopicDetailModal';
import { 
  Flame, 
  GraduationCap, 
  Moon, 
  Users, 
  Compass, 
  Smartphone, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface TopicCardsSectionProps {
  onNavigate: (tab: NavTab) => void;
}

export const TopicCardsSection: React.FC<TopicCardsSectionProps> = ({ onNavigate }) => {
  const [activeModalTopic, setActiveModalTopic] = useState<WellbeingTopic | null>(null);

  const getTopicIcon = (iconName: WellbeingTopic['iconName']) => {
    const size = "w-5 h-5";
    switch (iconName) {
      case 'Flame': return <Flame className={`${size} text-teal-600`} />;
      case 'GraduationCap': return <GraduationCap className={`${size} text-blue-600`} />;
      case 'Moon': return <Moon className={`${size} text-indigo-600`} />;
      case 'Users': return <Users className={`${size} text-emerald-600`} />;
      case 'Compass': return <Compass className={`${size} text-amber-600`} />;
      case 'Smartphone': return <Smartphone className={`${size} text-purple-600`} />;
    }
  };

  return (
    <section id="understand-feelings-section" className="py-16 sm:py-24 bg-[#FCFAF7] border-b border-[#EAE6DF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Campus Wellness Literacy</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0A192F] tracking-tight">
              Understand what you're feeling
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              College brings unique challenges. Learning to recognize and navigate these common experiences makes the journey smoother.
            </p>
          </div>

          <button
            id="view-all-wellbeing-guides-btn"
            onClick={() => onNavigate('wellbeing')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>View All Guides & Tips</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Six Required Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WELLBEING_TOPICS.map((topic) => {
            return (
              <div
                key={topic.id}
                id={`topic-card-${topic.id}`}
                className="group flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 border border-[#EAE6DF] hover:border-emerald-300 shadow-2xs hover:shadow-sm transition-all duration-200 text-left relative overflow-hidden"
              >
                {/* Subtle top indicator */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-0 group-hover:opacity-100 bg-emerald-500" 
                />

                <div className="space-y-4">
                  {/* Icon & Category Pill */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#FCFAF7] border border-[#EAE6DF] group-hover:scale-105 transition-transform duration-200">
                      {getTopicIcon(topic.iconName)}
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FCFAF7] text-[#0A192F] border border-[#EAE6DF]">
                      {topic.category}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div className="space-y-1.5">
                    <h3 className="font-display text-xl font-bold text-[#0A192F] group-hover:text-emerald-700 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {topic.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Card Action: Learn More */}
                <div className="pt-6 mt-4 border-t border-[#EAE6DF] flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">3 min read</span>
                  
                  <button
                    id={`learn-more-btn-${topic.id}`}
                    onClick={() => setActiveModalTopic(topic)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FCFAF7] group-hover:bg-emerald-600 text-[#0A192F] group-hover:text-white text-xs font-semibold transition-all duration-150 cursor-pointer border border-[#EAE6DF] group-hover:border-emerald-600"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Modal View for detailed topic content */}
      <TopicDetailModal
        topic={activeModalTopic}
        onClose={() => setActiveModalTopic(null)}
        onNavigateToToolkit={() => onNavigate('toolkit')}
      />
    </section>
  );
};
