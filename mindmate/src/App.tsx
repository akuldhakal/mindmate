import React, { useState } from 'react';
import { NavTab } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { WellbeingView } from './components/WellbeingView';
import { ToolkitView } from './components/ToolkitView';
import { CheckInView } from './components/CheckInView';
import { ResourcesView } from './components/ResourcesView';
import { SupportView } from './components/SupportView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [activeToolkitTool, setActiveToolkitTool] = useState<string>('breathing');

  const handleNavigate = (tab: NavTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTool = (toolId: string) => {
    setActiveToolkitTool(toolId);
    setCurrentTab('toolkit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7] text-[#0A192F] selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Navbar */}
      <Navbar currentTab={currentTab} onSelectTab={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView onNavigate={handleNavigate} onOpenTool={handleOpenTool} />
        )}

        {currentTab === 'wellbeing' && (
          <WellbeingView onNavigate={handleNavigate} />
        )}

        {currentTab === 'toolkit' && (
          <ToolkitView initialTool={activeToolkitTool} />
        )}

        {currentTab === 'checkin' && (
          <CheckInView onNavigate={handleNavigate} onOpenTool={handleOpenTool} />
        )}

        {currentTab === 'resources' && (
          <ResourcesView onNavigate={handleNavigate} />
        )}

        {currentTab === 'support' && (
          <SupportView />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleNavigate} />

    </div>
  );
}
