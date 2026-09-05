import React, { useState, useEffect } from 'react';
import { NavTab } from '../types';
import { 
  Wind, 
  Timer, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle2,
  Volume2,
  Eye,
  Hand,
  Ear,
  Smile,
  Heart
} from 'lucide-react';

interface ToolkitPreviewSectionProps {
  onNavigate: (tab: NavTab) => void;
  onOpenTool: (toolId: string) => void;
}

export const ToolkitPreviewSection: React.FC<ToolkitPreviewSectionProps> = ({ onNavigate, onOpenTool }) => {
  // Mini interactive state for breathing preview
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathingCount, setBreathingCount] = useState(4);

  // Mini interactive state for focus timer preview
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  // Mini interactive state for 5-4-3-2-1 Quick Reset preview
  const [groundingStep, setGroundingStep] = useState(0);
  const groundingSteps = [
    { count: '5', label: 'Things you can SEE', desc: 'Find 5 colors or shapes around your study space.', icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
    { count: '4', label: 'Things you can TOUCH', desc: 'Feel your desk, clothes, or feet on the floor.', icon: Hand, color: 'text-teal-600', bg: 'bg-teal-50' },
    { count: '3', label: 'Things you can HEAR', desc: 'Listen for room hum, footsteps, or distant traffic.', icon: Ear, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { count: '2', label: 'Things you can SMELL', desc: 'Notice coffee aroma, fresh air, or pencil cedar.', icon: Sparkles, color: 'text-amber-600', bg: 'bg-amber-50' },
    { count: '1', label: 'Thing you APPRECIATE', desc: 'Name one kind thought about yourself today.', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  // Breathing interval
  useEffect(() => {
    let interval: any = null;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathingCount((prev) => {
          if (prev <= 1) {
            setBreathingPhase((currPhase) => {
              if (currPhase === 'Inhale') return 'Hold';
              if (currPhase === 'Hold') return 'Exhale';
              if (currPhase === 'Exhale') return 'Rest';
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathingPhase('Inhale');
      setBreathingCount(4);
    }
    return () => clearInterval(interval);
  }, [breathingActive]);

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <section id="small-tools-section" className="py-16 sm:py-24 bg-white border-b border-[#EAE6DF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Interactive Self-Care</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0A192F] tracking-tight">
              Small tools. Real difference.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              When study stress peaks or your energy dips, these 2-minute interactive exercises help reset your nervous system.
            </p>
          </div>

          <button
            id="view-full-toolkit-btn"
            onClick={() => onNavigate('toolkit')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>Open Complete Toolkit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Toolkit Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tool 1: Breathing Exercise */}
          <div 
            id="tool-preview-breathing"
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAE6DF] hover:border-emerald-300 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all text-left"
          >
            <div>
              {/* Tool Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                  <Wind className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                  2 Min Reset
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-[#0A192F] mb-1">
                Breathing Exercise
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Box breathing (4-4-4-4) to lower heart rate and calm test anxiety.
              </p>

              {/* Interactive Mini Visualizer */}
              <div className="bg-[#FCFAF7] rounded-2xl p-5 border border-[#EAE6DF] flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div 
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-1000 border-4 ${
                    breathingActive
                      ? breathingPhase === 'Inhale'
                        ? 'scale-115 bg-emerald-100 border-emerald-500 text-emerald-800'
                        : breathingPhase === 'Hold'
                        ? 'scale-110 bg-amber-100 border-amber-400 text-amber-900'
                        : breathingPhase === 'Exhale'
                        ? 'scale-85 bg-sky-100 border-sky-400 text-sky-800'
                        : 'scale-90 bg-emerald-50 border-emerald-300 text-emerald-700'
                      : 'bg-white border-emerald-300 text-slate-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold uppercase tracking-wider block">
                      {breathingActive ? breathingPhase : 'Ready'}
                    </span>
                    <span className="text-lg font-extrabold text-[#0A192F]">
                      {breathingActive ? breathingCount : '4s'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    id="mini-breath-toggle-btn"
                    onClick={() => setBreathingActive(!breathingActive)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {breathingActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {breathingActive ? 'Pause' : 'Start Mini Breath'}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#EAE6DF] flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Visual guided cycle</span>
              <button
                id="open-full-breathing-btn"
                onClick={() => onOpenTool('breathing')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
              >
                Full Experience <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tool 2: Focus Timer */}
          <div 
            id="tool-preview-timer"
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAE6DF] hover:border-blue-300 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all text-left"
          >
            <div>
              {/* Tool Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-2xs">
                  <Timer className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-full">
                  Study Flow
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-[#0A192F] mb-1">
                Focus Timer
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                25/5 Pomodoro method with mindful study pauses and ambient sounds.
              </p>

              {/* Interactive Mini Timer */}
              <div className="bg-[#FCFAF7] rounded-2xl p-5 border border-[#EAE6DF] flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-extrabold text-[#0A192F] font-mono tracking-tight my-1">
                  {formatTimer(timerSeconds)}
                </div>
                <span className="text-[11px] text-blue-700 font-medium">Single-Tasking Block</span>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    id="mini-timer-toggle-btn"
                    onClick={() => setTimerRunning(!timerRunning)}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {timerRunning ? 'Pause' : 'Start Focus'}
                  </button>

                  <button
                    id="mini-timer-reset-btn"
                    onClick={() => {
                      setTimerRunning(false);
                      setTimerSeconds(25 * 60);
                    }}
                    className="p-1.5 rounded-xl bg-white hover:bg-gray-100 border border-[#EAE6DF] text-slate-600 text-xs transition-colors cursor-pointer"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#EAE6DF] flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Includes ambient noise</span>
              <button
                id="open-full-timer-btn"
                onClick={() => onOpenTool('timer')}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
              >
                Full Experience <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tool 3: Quick Reset (5-4-3-2-1) */}
          <div 
            id="tool-preview-reset"
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAE6DF] hover:border-amber-300 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all text-left"
          >
            <div>
              {/* Tool Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-2xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-full">
                  Grounding
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-[#0A192F] mb-1">
                Quick Reset
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                5-4-3-2-1 sensory technique to stop overthinking and reconnect.
              </p>

              {/* Interactive Mini Step Guide */}
              <div className="bg-[#FCFAF7] rounded-2xl p-4 sm:p-5 border border-[#EAE6DF] space-y-3">
                {(() => {
                  const curr = groundingSteps[groundingStep];
                  const Icon = curr.icon;
                  return (
                    <div className="space-y-2 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#EAE6DF] text-slate-700 text-xs font-bold">
                        <Icon className={`w-3.5 h-3.5 ${curr.color}`} />
                        Step {5 - groundingStep} of 5
                      </div>
                      <h4 className="font-bold text-[#0A192F] text-sm">
                        {curr.count} {curr.label}
                      </h4>
                      <p className="text-xs text-slate-600 min-h-8">
                        {curr.desc}
                      </p>
                    </div>
                  );
                })()}

                <div className="flex items-center justify-between pt-1">
                  <button
                    id="mini-grounding-prev-btn"
                    onClick={() => setGroundingStep((prev) => Math.max(0, prev - 1))}
                    disabled={groundingStep === 0}
                    className="text-xs text-slate-500 hover:text-slate-800 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {groundingSteps.map((_, i) => (
                      <span 
                        key={i} 
                        className={`w-2 h-2 rounded-full transition-colors ${i === groundingStep ? 'bg-amber-500' : 'bg-gray-200'}`} 
                      />
                    ))}
                  </div>

                  <button
                    id="mini-grounding-next-btn"
                    onClick={() => setGroundingStep((prev) => (prev + 1) % groundingSteps.length)}
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 cursor-pointer"
                  >
                    {groundingStep === groundingSteps.length - 1 ? 'Start Over' : 'Next Step →'}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#EAE6DF] flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Sensory de-escalation</span>
              <button
                id="open-full-reset-btn"
                onClick={() => onOpenTool('reset')}
                className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
              >
                Full Experience <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
