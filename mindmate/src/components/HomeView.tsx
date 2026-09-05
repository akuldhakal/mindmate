import React from 'react';
import { NavTab } from '../types';
import { HeroSection } from './HeroSection';
import { MoodSelectorSection } from './MoodSelectorSection';
import { TopicCardsSection } from './TopicCardsSection';
import { ToolkitPreviewSection } from './ToolkitPreviewSection';
import { CtaSupportSection } from './CtaSupportSection';

interface HomeViewProps {
  onNavigate: (tab: NavTab) => void;
  onOpenTool: (toolId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenTool }) => {
  const scrollToMood = () => {
    const el = document.getElementById('mood-checkin-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('checkin');
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection onNavigate={onNavigate} onSelectMoodAnchor={scrollToMood} />

      {/* 2. How are you feeling today? (5 Mood Buttons & Supportive Feedback) */}
      <MoodSelectorSection onNavigate={onNavigate} onOpenTool={onOpenTool} />

      {/* 3. Understand what you're feeling (6 Cards) */}
      <TopicCardsSection onNavigate={onNavigate} />

      {/* 4. Small tools. Real difference. (3 Toolkit Features Preview) */}
      <ToolkitPreviewSection onNavigate={onNavigate} onOpenTool={onOpenTool} />

      {/* 5. Need someone to talk to? (CTA to Support Page) */}
      <CtaSupportSection onNavigate={onNavigate} />
    </div>
  );
};
