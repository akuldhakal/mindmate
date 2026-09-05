import React, { useState } from 'react';
import { NavTab } from '../types';
import { 
  HeartHandshake, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  PhoneCall, 
  Menu, 
  X
} from 'lucide-react';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: HeartHandshake },
    { id: 'wellbeing', label: 'Wellbeing', icon: BookOpen },
    { id: 'toolkit', label: 'Toolkit', icon: Sparkles },
    { id: 'checkin', label: 'Check-In', icon: CheckCircle2 },
    { id: 'resources', label: 'Resources', icon: Compass },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE6DF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:bg-emerald-600 transition-colors font-bold text-base">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-2xl font-bold text-[#0A192F] tracking-tight">MindMate</span>
              </div>
              <p className="text-[11px] text-gray-500 font-normal -mt-0.5">Student Mental Wellness</p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50/80 font-semibold border border-emerald-200/70 shadow-2xs'
                      : 'text-gray-600 hover:text-emerald-700 hover:bg-[#FCFAF7]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Direct Action: Support button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-quick-support-btn"
              onClick={() => handleNavClick('support')}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-[#0A192F] text-white hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              Need Support?
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#EAE6DF] px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 mb-3 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-gray-700 bg-[#FCFAF7] hover:bg-emerald-50 border border-[#EAE6DF]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>
          
          <button
            id="mobile-nav-support-btn"
            onClick={() => handleNavClick('support')}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0A192F] text-white font-medium text-sm shadow-sm cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            Immediate Campus & Crisis Support
          </button>
        </div>
      )}
    </header>
  );
};
