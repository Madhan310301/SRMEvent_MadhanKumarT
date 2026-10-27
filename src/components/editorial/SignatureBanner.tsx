import React from 'react';
import { ArrowRight, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SignatureBannerProps {
  onLearnMore: () => void;
}

export const SignatureBanner: React.FC<SignatureBannerProps> = ({ onLearnMore }) => {
  return (
    <section className="relative py-20 md:py-32 bg-[#286B58] text-white overflow-hidden transition-colors">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div className="space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] font-bold tracking-[0.16em] uppercase border border-white/20">
            <Clock className="w-3.5 h-3.5" /> Precision & Worker Trust
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.12]">
            Every hour <br />
            <span className="italic font-light opacity-90">should count.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/85 leading-relaxed font-interface font-normal max-w-xl">
            Unclear overtime and arbitrary deductions cost workers trust and organizations stability. FairShift verifies attendance and computes lawful overtime with complete transparency.
          </p>
        </div>

        <div className="shrink-0">
          <button
            onClick={onLearnMore}
            className="px-8 py-4 rounded-md bg-white text-[#17191B] text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#FAFAF8] transition-all duration-200 cursor-pointer shadow-xl flex items-center gap-2"
          >
            See How FairShift Works <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
