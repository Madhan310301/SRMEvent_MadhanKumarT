import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';

interface ClosingCTAProps {
  onGetStarted: () => void;
}

export const ClosingCTA: React.FC<ClosingCTAProps> = ({ onGetStarted }) => {
  return (
    <section className="py-24 md:py-36 bg-[#FAFAF8] text-[#17191B] border-t border-[#E8E8E5] transition-colors">
      <div className="max-w-[1000px] mx-auto px-6 text-center space-y-8">
        <div className="w-12 h-12 rounded-2xl bg-[#286B58]/10 text-[#286B58] flex items-center justify-center mx-auto border border-[#286B58]/20">
          <Shield className="w-6 h-6" />
        </div>

        <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1]">
          Fairness starts with clarity.
        </h2>

        <p className="text-base sm:text-lg text-[#5F6B73] font-interface font-normal max-w-xl mx-auto leading-relaxed">
          Build a workplace where people can understand their hours, pay, safety and opportunities. Tested, compliant, and ready for deployment.
        </p>

        <div className="pt-4">
          <button
            onClick={onGetStarted}
            className="px-9 py-4 rounded-md bg-[#17191B] text-white text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#286B58] transition-all duration-200 cursor-pointer shadow-xl inline-flex items-center gap-2"
          >
            Get Started with FairShift <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
