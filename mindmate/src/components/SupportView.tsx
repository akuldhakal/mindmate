import React, { useState } from 'react';
import { 
  NEPAL_SUPPORT_DIRECTORY, 
  TRUSTED_PEOPLE_LIST,
  NepalEmergencyContact 
} from '../data/nepalSupportData';
import { 
  PhoneCall, 
  ShieldAlert, 
  Users, 
  HeartHandshake, 
  ExternalLink,
  LifeBuoy,
  AlertTriangle,
  Heart,
  UserCheck,
  Building2,
  PhoneForwarded,
  Sparkles
} from 'lucide-react';

export const SupportView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'emergency' | 'child-young-person' | 'psychosocial'>('all');

  const emergencyContacts = NEPAL_SUPPORT_DIRECTORY.filter(c => c.category === 'emergency');
  const childYoungPersonContacts = NEPAL_SUPPORT_DIRECTORY.filter(c => c.category === 'child-young-person');
  const psychosocialContacts = NEPAL_SUPPORT_DIRECTORY.filter(c => c.category === 'psychosocial');

  const filteredContacts = NEPAL_SUPPORT_DIRECTORY.filter(c => {
    if (selectedCategory === 'all') return true;
    return c.category === selectedCategory;
  });

  const friendSupportSteps = [
    {
      step: '1',
      title: 'Notice Changes',
      desc: 'Look out for subtle shifts: withdrawing from friends, missed classes, changes in energy, or uncharacteristic quietness.'
    },
    {
      step: '2',
      title: 'Check In Privately',
      desc: 'Ask gently in a private moment: "Hey, I noticed things have seemed heavy lately. How are you really doing?"'
    },
    {
      step: '3',
      title: 'Listen With Care',
      desc: 'Listen patiently without rushing to give advice. Acknowledge what they are experiencing with kindness.'
    },
    {
      step: '4',
      title: 'Connect to Support',
      desc: 'Encourage reaching out to a trusted mentor, teacher, or helpline, or offer to accompany them.'
    }
  ];

  return (
    <div className="py-10 sm:py-16 bg-[#FCFAF7] min-h-screen text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
            <LifeBuoy className="w-4 h-4 text-emerald-600" />
            <span>Nepal Support & Help Directory</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#0A192F] tracking-tight">
            Support & Help in Nepal
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Verified national public helplines, child and young person protection services, and trusted support resources available across Nepal.
          </p>
        </div>

        {/* Essential Safety Note */}
        <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/90 border border-amber-200/80 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300/80 flex items-center justify-center text-amber-800 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
            <span className="font-bold text-amber-900 block text-sm sm:text-base">
              Important Safety & Emergency Notice
            </span>
            <p className="text-amber-800 font-normal">
              MindMate provides general wellbeing information and does not replace professional care or emergency services. If you or someone else is in immediate danger, seek immediate help from an appropriate emergency service or trusted adult.
            </p>
          </div>
        </div>

        {/* 1. 🚨 IMMEDIATE EMERGENCY SECTION */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🚨</span>
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A192F]">
                Immediate Emergency
              </h2>
              <p className="text-xs text-slate-500">For urgent police response and emergency safety situations.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {emergencyContacts.map((contact) => (
              <div 
                key={contact.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-rose-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-rose-300 transition-colors"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      Emergency Police Assistance
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Nepal Nationwide</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0A192F]">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {contact.description}
                  </p>
                </div>

                {contact.phone && contact.telLink && (
                  <div className="shrink-0">
                    <a
                      href={contact.telLink}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-base shadow-sm transition-all active:scale-98 cursor-pointer"
                    >
                      <PhoneCall className="w-5 h-5 text-white" />
                      <span>Call {contact.phone}</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. 🧒 CHILD & YOUNG PERSON SUPPORT */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🧒</span>
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A192F]">
                Child & Young Person Support
              </h2>
              <p className="text-xs text-slate-500">Government protection, helpline, and welfare services for children and young people.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {childYoungPersonContacts.map((contact) => (
              <div 
                key={contact.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAE6DF] shadow-xs flex flex-col justify-between space-y-5 hover:border-emerald-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Child & Youth Welfare
                    </span>
                    {contact.phone && (
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        Toll-Free: {contact.phone}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#0A192F]">
                    {contact.name}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {contact.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EAE6DF] flex items-center justify-between gap-3">
                  {contact.phone && contact.telLink ? (
                    <a
                      href={contact.telLink}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Call {contact.phone}</span>
                    </a>
                  ) : contact.website ? (
                    <a
                      href={contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A192F] font-semibold text-xs transition-colors cursor-pointer group"
                    >
                      <span>Visit Official Website (NCRC)</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  ) : null}

                  {contact.phone && (
                    <span className="text-[11px] text-slate-400 font-medium">Free Helpline</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. 🤝 CHILD & PSYCHOSOCIAL SUPPORT */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🤝</span>
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A192F]">
                Child & Psychosocial Support
              </h2>
              <p className="text-xs text-slate-500">Child-rights organization providing protection, helpline services, and psychosocial support.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {psychosocialContacts.map((contact) => (
              <div 
                key={contact.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAE6DF] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-emerald-300 transition-colors"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                      Child Rights & Psychosocial Support
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Nepal</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0A192F]">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {contact.description}
                  </p>
                </div>

                {contact.website && (
                  <div className="shrink-0">
                    <a
                      href={contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#0A192F] hover:bg-slate-800 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer group"
                    >
                      <span>Visit CWIN-Nepal Website</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4. 💬 TALK TO SOMEONE YOU TRUST */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#EAE6DF]">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A192F]">
                Talk to Someone You Trust
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                You do not have to navigate difficult moments alone. Connecting with people in your everyday life can provide comfort and guidance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRUSTED_PEOPLE_LIST.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FCFAF7] border border-[#EAE6DF] space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-700">
                  <UserCheck className="w-4 h-4" />
                  <h3 className="font-bold text-[#0A192F] text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. 🤝 HOW TO SUPPORT A PEER OR FRIEND IN DISTRESS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#EAE6DF]">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A192F]">
                How to Support a Friend in Distress
              </h2>
              <p className="text-xs text-slate-500">
                A simple 4-step compassionate framework for classmates, roommates, and friends.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {friendSupportSteps.map((s) => (
              <div key={s.step} className="p-4 rounded-2xl bg-[#FCFAF7] border border-[#EAE6DF] space-y-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  {s.step}
                </span>
                <h3 className="font-bold text-[#0A192F] text-sm">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
