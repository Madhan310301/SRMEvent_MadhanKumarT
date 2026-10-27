import React from 'react';
import { ArrowDown } from 'lucide-react';

export const EditorialIntro: React.FC = () => {
  const scrollToCapabilities = () => {
    const el = document.getElementById('capabilities');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="overview" className="py-24 md:py-36 bg-[#FAFAF8] dark:bg-[#111214] text-[#17191B] dark:text-[#F4F4F2] transition-colors">
      <div className="max-w-[800px] mx-auto px-6 text-center space-y-8">
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5F6B73] dark:text-[#95A0A6] block">
          Workforce Transparency
        </span>

        <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#17191B] dark:text-white leading-[1.15]">
          A better way to work.
        </h2>

        <p className="text-base sm:text-lg text-[#5F6B73] dark:text-[#95A0A6] leading-relaxed font-interface font-normal max-w-xl mx-auto">
          From construction sites to college campuses, FairShift makes essential workplace processes clearer, accountable, and rooted in human dignity.
        </p>

        <div className="pt-4">
          <button
            onClick={scrollToCapabilities}
            className="editorial-underline-link cursor-pointer"
          >
            Discover the Platform <ArrowDown className="w-3.5 h-3.5 inline ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
