import React from 'react';
import { Shield, CheckCircle2, Globe, HeartHandshake } from 'lucide-react';

export const MissionStatement: React.FC = () => {
  return (
    <section id="mission" className="py-24 md:py-36 bg-[#FAFAF8] dark:bg-[#111214] text-[#17191B] dark:text-[#F4F4F2] transition-colors">
      <div className="max-w-[900px] mx-auto px-6 text-center space-y-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#286B58]/10 text-[#286B58] dark:text-[#3DA386] text-[11px] font-bold tracking-[0.16em] uppercase">
          <Shield className="w-3.5 h-3.5" /> United Nations Sustainable Development Goal 8
        </div>

        <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#17191B] dark:text-white leading-[1.12]">
          Make work meaningful.
        </h2>

        <p className="text-base sm:text-lg text-[#5F6B73] dark:text-[#95A0A6] leading-relaxed font-interface font-normal max-w-2xl mx-auto">
          FairShift supports clearer records, better communication and more accountable workplace practices. We believe economic growth is sustainable only when the dignity, health, and wages of frontline workers are uncompromised.
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
          <div className="p-5 rounded-xl bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] space-y-2">
            <span className="font-mono text-xs font-bold text-[#286B58] dark:text-[#3DA386]">Target 8.8</span>
            <h4 className="font-editorial text-xl font-normal text-[#17191B] dark:text-white">Safe Workplaces</h4>
            <p className="text-xs text-[#5F6B73] dark:text-[#95A0A6] leading-relaxed">
              Voice incident logging and non-punitive fatigue early-warnings prevent exhaustion and accidents.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] space-y-2">
            <span className="font-mono text-xs font-bold text-[#286B58] dark:text-[#3DA386]">Target 8.5</span>
            <h4 className="font-editorial text-xl font-normal text-[#17191B] dark:text-white">Equal & Clear Pay</h4>
            <p className="text-xs text-[#5F6B73] dark:text-[#95A0A6] leading-relaxed">
              Auditable overtime calculations and itemized payslips delivered in 8 native Indian languages.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] space-y-2">
            <span className="font-mono text-xs font-bold text-[#286B58] dark:text-[#3DA386]">Target 8.6</span>
            <h4 className="font-editorial text-xl font-normal text-[#17191B] dark:text-white">Portable Growth</h4>
            <p className="text-xs text-[#5F6B73] dark:text-[#95A0A6] leading-relaxed">
              Worker-owned Skill Passports retain hard-earned trade certificates across different contractors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
