import React from 'react';
import { HeartHandshake, ShieldCheck, PhoneCall, Sparkles, Heart } from 'lucide-react';
import { NavTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const handleNav = (tab: NavTab) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A192F] text-slate-300 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand & Motto */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <HeartHandshake className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-2xl font-bold text-white tracking-tight">MindMate</span>
            </div>
            <p className="text-emerald-400 font-medium text-base">
              "A little support can make a big difference."
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              MindMate is a student mental wellness awareness and wellbeing platform created to help college students feel grounded, balanced, and supported throughout the academic year.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 text-xs font-medium border border-slate-700/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Privacy First • No account or tracking required
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  id="footer-link-home"
                  onClick={() => handleNav('home')} 
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Home & Daily Pulse
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-wellbeing"
                  onClick={() => handleNav('wellbeing')} 
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Wellbeing Guides
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-toolkit"
                  onClick={() => handleNav('toolkit')} 
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Interactive Toolkit
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-checkin"
                  onClick={() => handleNav('checkin')} 
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Daily Check-In
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-resources"
                  onClick={() => handleNav('resources')} 
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Student Resources & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Support */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Nepal Support</h4>
            <div className="space-y-3 text-sm">
              <a 
                href="tel:1098" 
                className="block p-3 rounded-xl bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 transition-colors"
              >
                <p className="text-xs text-slate-400 uppercase font-semibold">Child Helpline Nepal</p>
                <p className="text-white font-bold text-base mt-0.5 flex items-center justify-between">
                  <span>Call 1098</span>
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                </p>
                <p className="text-[11px] text-emerald-400 mt-1">Free protection & support</p>
              </a>
              <button
                id="footer-support-center-btn"
                onClick={() => handleNav('support')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Nepal Support Directory</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer Banner */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-800 max-w-2xl text-slate-300">
            <span className="font-semibold text-emerald-400 block mb-0.5">Important Safety Notice:</span>
            MindMate provides general wellbeing information and does not replace professional care or emergency services. If you or someone else is in immediate danger, seek immediate help from an appropriate emergency service or trusted adult.
          </div>
          <div className="text-center md:text-right space-y-1">
            <p>© {new Date().getFullYear()} MindMate • Student Mental Wellness</p>
            <p className="text-slate-500 flex items-center justify-center md:justify-end gap-1">
              Crafted with care for student wellness <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
            </p>
          </div>
        </div>

        {/* Final Credit Line */}
        <div className="pt-6 mt-6 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-400 tracking-wide font-normal">
            Developed  in GEA with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};
