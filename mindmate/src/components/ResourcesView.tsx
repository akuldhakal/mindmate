import React, { useState } from 'react';
import { COLLEGE_WELCOME_FAQS } from '../data/wellnessData';
import { NavTab } from '../types';
import { 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  BookOpen, 
  Coffee, 
  Sun, 
  Clock, 
  HeartHandshake
} from 'lucide-react';

interface ResourcesViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  const survivalKits = [
    {
      title: 'Orientation & First-Month Milestones',
      icon: Sun,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      points: [
        'Locate quiet study spaces in the college library or campus gardens.',
        'Find your department coordinator and faculty offices early in the term.',
        'Keep a reusable water bottle in your bag to stay hydrated between lectures.'
      ]
    },
    {
      title: 'Hostel & Roommate Harmony',
      icon: HeartHandshake,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      points: [
        'Have a brief, polite chat about sleep schedules, study routines, and quiet hours.',
        'Use soft study lamps and earphones after 10:30 PM if routines differ.',
        'Respect mutual space and boundaries for a peaceful living environment.'
      ]
    },
    {
      title: 'Mindful Exam & Assignment Prep',
      icon: Clock,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      points: [
        'Break weekly coursework and report preparations into manageable 30-minute focus blocks.',
        'Reach out to tutors or professors with clarifying questions as soon as a topic feels tricky.',
        'Prioritize 7 hours of sleep before exam days—rested minds recall formulas much faster.'
      ]
    }
  ];

  return (
    <div className="py-10 sm:py-16 bg-[#FCFAF7] min-h-screen text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Student Life & Academic Toolkit</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#0A192F] tracking-tight">
            Student Resource Directory
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Essential strategies, wellness routines, and practical advice to help you navigate college life with confidence.
          </p>
        </div>

        {/* 1. College Foundations & Student Survival Kit */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-[#0A192F]">
              Academic & Semester Foundations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {survivalKits.map((kit, idx) => {
              const Icon = kit.icon;
              return (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-[#EAE6DF] shadow-2xs space-y-4">
                  <div className={`w-12 h-12 rounded-2xl ${kit.bg} ${kit.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0A192F]">
                    {kit.title}
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {kit.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Frequently Asked Questions by First-Year & Returning Students */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-bold text-[#0A192F]">
              Student Wellbeing FAQ
            </h2>
            <p className="text-xs text-gray-500">
              Real questions college students ask during orientation and exam seasons.
            </p>
          </div>

          <div className="space-y-3">
            {COLLEGE_WELCOME_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#EAE6DF] overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 flex items-center justify-between gap-4 text-left font-display font-semibold text-[#0A192F] hover:text-emerald-700 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-[#EAE6DF] bg-[#FCFAF7] animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
