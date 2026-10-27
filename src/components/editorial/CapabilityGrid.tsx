import React from 'react';
import { ArrowUpRight, QrCode, FileText, Mic, MessageSquare, Award, ShieldAlert, BarChart3, Globe } from 'lucide-react';

export const CapabilityGrid: React.FC = () => {
  const capabilities = [
    {
      id: 'cap-1',
      title: 'Smart Attendance & QR',
      description: 'Rotating time-bound QR code check-in with GPS geofencing radius validation and supervisor fallback.',
      icon: QrCode,
      tag: 'ATTENDANCE',
      accentBg: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: 'cap-2',
      title: 'Transparent Payslips',
      description: 'Itemized wage disclosures with 1.5x/2.0x overtime formulas, statutory PF/ESI, and text-to-speech audio.',
      icon: FileText,
      tag: 'PAYROLL',
      accentBg: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      id: 'cap-3',
      title: 'Voice Hazard Reporting',
      description: 'Record on-site hazards using MediaRecorder voice notes and photos through an auditable 6-stage lifecycle.',
      icon: Mic,
      tag: 'SAFETY',
      accentBg: 'bg-rose-50 text-rose-800 border-rose-200'
    },
    {
      id: 'cap-4',
      title: 'Speak Up Anonymous',
      description: 'Zero-PII feedback path with SHA-256 tokens and k-anonymity (k ≥ 5) protecting worker identities.',
      icon: MessageSquare,
      tag: 'FEEDBACK',
      accentBg: 'bg-sky-50 text-sky-800 border-sky-200'
    },
    {
      id: 'cap-5',
      title: 'Portable Skill Passport',
      description: 'Worker-owned trade credentials, verified safety certifications, and expiring QR verification links.',
      icon: Award,
      tag: 'CREDENTIALS',
      accentBg: 'bg-indigo-50 text-indigo-800 border-indigo-200'
    },
    {
      id: 'cap-6',
      title: 'Explainable Fatigue Radar',
      description: 'Non-punitive safety alerts for shifts >12h, rest gaps <11h, and 48h weekly ceilings.',
      icon: ShieldAlert,
      tag: 'WELLBEING',
      accentBg: 'bg-orange-50 text-orange-800 border-orange-200'
    },
    {
      id: 'cap-7',
      title: 'Workforce Intelligence',
      description: 'Executive muster rolls, cross-sector filtering, and dispute resolution command center.',
      icon: BarChart3,
      tag: 'ANALYTICS',
      accentBg: 'bg-teal-50 text-teal-800 border-teal-200'
    },
    {
      id: 'cap-8',
      title: '8 Indian Languages',
      description: 'Native UI & speech synthesis across Tamil, Hindi, Kannada, Telugu, Malayalam, Marathi, and Bengali.',
      icon: Globe,
      tag: 'INCLUSION',
      accentBg: 'bg-purple-50 text-purple-800 border-purple-200'
    }
  ];

  return (
    <section id="capabilities" className="py-20 md:py-32 bg-[#FAFAF8] border-t border-[#E8E8E5] transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E8E5] pb-8">
          <div className="space-y-3">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5F6B73] block">
              Core Capabilities
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#17191B]">
              Engineered for clarity and trust.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5F6B73] max-w-md font-interface">
            Eight essential modules designed to protect frontline dignity, guarantee lawful wages, and streamline operations.
          </p>
        </div>

        {/* 4-Column Showcase (Bright Editorial Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                className="group flex flex-col justify-between space-y-5 bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E8E5] hover:border-[#286B58] hover:shadow-lg transition-all duration-200"
              >
                {/* Visual Header */}
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl border ${cap.accentBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#F6F6F4] text-[#5F6B73] text-[9px] font-bold tracking-widest uppercase border border-[#E8E8E5]">
                    {cap.tag}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 flex-1 flex flex-col justify-between pt-2">
                  <div>
                    <h3 className="font-editorial text-2xl font-normal text-[#17191B] group-hover:text-[#286B58] transition-colors flex items-center justify-between">
                      {cap.title}
                      <ArrowUpRight className="w-4 h-4 text-[#5F6B73] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs text-[#5F6B73] leading-relaxed font-interface mt-1.5">
                      {cap.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E8E8E5] flex items-center justify-between text-[11px] font-semibold text-[#286B58]">
                  <span>Explore Feature</span>
                  <span>&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
