import React from 'react';
import { NavTab } from '../types';
import { PhoneCall, HeartHandshake, ShieldCheck, ArrowRight, MessageSquareHeart } from 'lucide-react';

interface CtaSupportSectionProps {
  onNavigate: (tab: NavTab) => void;
}

export const CtaSupportSection: React.FC<CtaSupportSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#0A192F] text-white relative overflow-hidden border-b border-slate-800">
      {/* Soft background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
          <MessageSquareHeart className="w-4 h-4 text-emerald-400" />
          <span>You are never alone on campus</span>
        </div>

        {/* Required Heading & Subtitle */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Need someone to talk to?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Whether you want to connect with a trusted friend or mentor, reach out to Child Helpline Nepal (1098), or access verified emergency contacts, help is always within reach.
          </p>
        </div>

        {/* Call to Action Button to Support Page */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            id="cta-support-page-btn"
            onClick={() => onNavigate('support')}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 cursor-pointer active:scale-98"
          >
            <PhoneCall className="w-5 h-5 text-slate-950" />
            <span>View Nepal Support & Help Directory</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>

        {/* Quick Contact Micro-Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 text-left max-w-3xl mx-auto">
          <a 
            href="tel:100" 
            className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-xs hover:border-rose-400/60 transition-colors block"
          >
            <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block">🚨 Immediate Emergency</span>
            <p className="text-white font-bold text-sm mt-0.5">Nepal Police — 100</p>
            <p className="text-slate-400 text-xs mt-0.5">For immediate police assistance</p>
          </a>

          <a 
            href="tel:1098" 
            className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-xs hover:border-emerald-400/60 transition-colors block"
          >
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">🧒 Child & Youth Support</span>
            <p className="text-white font-bold text-sm mt-0.5">Child Helpline — 1098</p>
            <p className="text-slate-400 text-xs mt-0.5">Free child-protection helpline</p>
          </a>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-xs">
            <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider block">🤝 Child & Psychosocial</span>
            <p className="text-white font-bold text-sm mt-0.5">CWIN & NCRC</p>
            <p className="text-slate-400 text-xs mt-0.5">Protection & psychosocial support</p>
          </div>
        </div>

      </div>
    </section>
  );
};
