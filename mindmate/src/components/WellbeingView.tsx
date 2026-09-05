import React, { useState } from 'react';
import { WELLBEING_TOPICS } from '../data/wellnessData';
import { WellbeingTopic, NavTab } from '../types';
import { TopicDetailModal } from './TopicDetailModal';
import { 
  BookOpen, 
  Search, 
  Flame, 
  GraduationCap, 
  Moon, 
  Users, 
  Compass, 
  Smartphone, 
  ArrowRight
} from 'lucide-react';

interface WellbeingViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const WellbeingView: React.FC<WellbeingViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalTopic, setActiveModalTopic] = useState<WellbeingTopic | null>(null);

  const categories = ['All', 'Academics', 'Daily Balance', 'Physical Health', 'Relationships', 'Transition', 'Lifestyle'];

  const filteredTopics = WELLBEING_TOPICS.filter((topic) => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTopicIcon = (name: WellbeingTopic['iconName']) => {
    const className = "w-5 h-5";
    switch (name) {
      case 'Flame': return <Flame className={`${className} text-teal-600`} />;
      case 'GraduationCap': return <GraduationCap className={`${className} text-blue-600`} />;
      case 'Moon': return <Moon className={`${className} text-indigo-600`} />;
      case 'Users': return <Users className={`${className} text-emerald-600`} />;
      case 'Compass': return <Compass className={`${className} text-amber-600`} />;
      case 'Smartphone': return <Smartphone className={`${className} text-purple-600`} />;
    }
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FCFAF7] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-left space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Educational Guides & Self-Care</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#0A192F] tracking-tight">
            Student Wellbeing Hub
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Practical, non-judgmental guides tailored for college challenges. Learn how stress works, how to pace your coursework, and how to build healthy routines that stick.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#EAE6DF] shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="search-wellbeing-topics"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g., stress, exams, sleep, friends)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FCFAF7] border border-[#EAE6DF] text-sm text-[#0A192F] placeholder:text-gray-400 focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Categories Pill List */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`category-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-[#FCFAF7] text-slate-600 hover:bg-gray-100 border border-[#EAE6DF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Grid */}
        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                id={`wellbeing-card-${topic.id}`}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAE6DF] hover:border-emerald-400 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FCFAF7] border border-[#EAE6DF] flex items-center justify-center">
                      {getTopicIcon(topic.iconName)}
                    </div>
                    <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full bg-[#FCFAF7] text-[#0A192F] border border-[#EAE6DF]">
                      {topic.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold text-[#0A192F]">{topic.title}</h3>
                    <p className="text-xs text-emerald-800 font-medium mt-0.5">{topic.subtitle}</p>
                    <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                      {topic.shortDescription}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="p-3.5 rounded-2xl bg-[#FCFAF7] border border-[#EAE6DF] text-xs space-y-2">
                    <span className="font-bold text-[#0A192F] block">Common Student Trigger:</span>
                    <p className="text-slate-600">
                      {topic.commonSigns[0]}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-[#EAE6DF] flex items-center justify-between">
                  <button
                    id={`open-detail-modal-${topic.id}`}
                    onClick={() => setActiveModalTopic(topic)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-xs text-gray-400">3 min read</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 border border-[#EAE6DF] text-center space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-[#FCFAF7] border border-[#EAE6DF] flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-lg font-bold text-[#0A192F]">No matching guides found</h3>
              <p className="text-xs text-slate-500">
                Try searching for other keywords like "sleep", "stress", or "friends".
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <TopicDetailModal
        topic={activeModalTopic}
        onClose={() => setActiveModalTopic(null)}
        onNavigateToToolkit={() => onNavigate('toolkit')}
      />
    </div>
  );
};
