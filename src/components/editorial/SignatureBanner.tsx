import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

interface SignatureBannerProps {
  onLearnMore: () => void;
}

export const SignatureBanner: React.FC<SignatureBannerProps> = ({ onLearnMore }) => {
  return (
    <section className="relative py-28 md:py-40 bg-[#17191B] text-white overflow-hidden">
      {/* Background with subtle industrial texture */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=85"
          alt="Workplace operations"
          className="w-full h-full object-cover object-center opacity-25 filter contrast-125"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17191B] via-[#17191B]/80 to-[#17191B]/95" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div className="space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold tracking-[0.16em] uppercase">
            <Clock className="w-3.5 h-3.5 text-[#3DA386]" /> Precision & Transparency
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.12]">
            Every hour <br />
            <span className="italic font-light">should count.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#D6D7D4] leading-relaxed font-interface font-normal max-w-xl">
            Unclear overtime and arbitrary deductions cost workers trust and organizations stability. FairShift verifies attendance and computes lawful overtime with complete transparency.
          </p>
        </div>

        <div className="shrink-0">
          <button
            onClick={onLearnMore}
            className="px-8 py-4 rounded-md bg-white text-[#17191B] text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#F6F6F4] transition-all duration-200 cursor-pointer shadow-xl flex items-center gap-2"
          >
            See How FairShift Works <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
