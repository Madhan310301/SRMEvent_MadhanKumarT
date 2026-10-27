import React from 'react';
import { ArrowUpRight, QrCode, FileText, Mic, MessageSquare, Award, ShieldAlert, BarChart3, Globe } from 'lucide-react';

export const CapabilityGrid: React.FC = () => {
  const capabilities = [
    {
      id: 'cap-1',
      title: 'Smart Attendance & QR',
      description: 'Rotating time-bound QR code check-in with GPS geofencing radius validation and supervisor fallback.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      icon: QrCode,
      tag: 'ATTENDANCE'
    },
    {
      id: 'cap-2',
      title: 'Transparent Payslips',
      description: 'Itemized wage disclosures with 1.5x/2.0x overtime formulas, statutory PF/ESI, and text-to-speech audio.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      icon: FileText,
      tag: 'PAYROLL'
    },
    {
      id: 'cap-3',
      title: 'Voice Hazard Reporting',
      description: 'Record on-site hazards using MediaRecorder voice notes and photos through an auditable 6-stage lifecycle.',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80',
      icon: Mic,
      tag: 'SAFETY'
    },
    {
      id: 'cap-4',
      title: 'Speak Up Anonymous',
      description: 'Zero-PII feedback path with SHA-256 tokens and k-anonymity (k ≥ 5) protecting worker identities.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
      icon: MessageSquare,
      tag: 'FEEDBACK'
    },
    {
      id: 'cap-5',
      title: 'Portable Skill Passport',
      description: 'Worker-owned trade credentials, verified safety certifications, and expiring QR verification links.',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80',
      icon: Award,
      tag: 'CREDENTIALS'
    },
    {
      id: 'cap-6',
      title: 'Explainable Fatigue Radar',
      description: 'Non-punitive safety alerts for shifts >12h, rest gaps <11h, and 48h weekly ceilings.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      icon: ShieldAlert,
      tag: 'WELLBEING'
    },
    {
      id: 'cap-7',
      title: 'Workforce Intelligence',
      description: 'Executive muster rolls, cross-sector filtering, and dispute resolution command center.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      icon: BarChart3,
      tag: 'ANALYTICS'
    },
    {
      id: 'cap-8',
      title: '8 Indian Languages',
      description: 'Native UI & speech synthesis across Tamil, Hindi, Kannada, Telugu, Malayalam, Marathi, and Bengali.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
      icon: Globe,
      tag: 'INCLUSION'
    }
  ];

  return (
    <section id="capabilities" className="py-20 md:py-32 bg-[#FAFAF8] dark:bg-[#111214] border-t border-[#E8E8E5] dark:border-[#282B2F] transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E8E5] dark:border-[#282B2F] pb-8">
          <div className="space-y-3">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5F6B73] dark:text-[#95A0A6] block">
              Core Capabilities
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#17191B] dark:text-white">
              Engineered for clarity and trust.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5F6B73] dark:text-[#95A0A6] max-w-md font-interface">
            Eight essential modules designed to protect frontline dignity, guarantee lawful wages, and streamline operations.
          </p>
        </div>

        {/* 4-Column Showcase (Grovemade Inspired) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                className="group flex flex-col space-y-4 bg-[#FFFFFF] dark:bg-[#181A1D] p-4 rounded-xl border border-[#E8E8E5] dark:border-[#282B2F] hover:border-[#D5D5CF] dark:hover:border-[#373B40] transition-all duration-200"
              >
                {/* Image Tile with Hover Zoom */}
                <div className="editorial-tile-zoom w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#F6F6F4] dark:bg-[#222529]">
                  <img
                    src={cap.image}
                    alt={cap.title}
                    className="w-full h-full object-cover filter contrast-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold tracking-widest uppercase">
                      {cap.tag}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-editorial text-xl font-normal text-[#17191B] dark:text-white group-hover:text-[#286B58] dark:group-hover:text-[#3DA386] transition-colors flex items-center justify-between">
                      {cap.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs text-[#5F6B73] dark:text-[#95A0A6] leading-relaxed font-interface mt-1">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
