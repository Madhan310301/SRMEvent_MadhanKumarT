import React from 'react';
import { ArrowDown, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface EditorialHeroProps {
  onGetStarted: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({ onGetStarted }) => {
  const scrollToOverview = () => {
    const el = document.getElementById('overview');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#17191B] text-white">
      {/* Background Photography with subtle editorial darkening */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=2000&q=85"
          alt="Active civil engineering site operations"
          className="w-full h-full object-cover object-center opacity-40 scale-100 filter contrast-[1.08] brightness-[0.88]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17191B] via-transparent to-[#17191B]/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 text-center flex flex-col items-center">
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#F6F6F4] mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#3DA386]" /> PromptWars 2026 • SRM ACM Student Chapter
        </div>

        {/* Large Serif Headline */}
        <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white max-w-4xl leading-[1.08] mb-6">
          Fair Work. <br className="hidden sm:inline" />
          <span className="italic font-light">Clear Futures.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg md:text-xl text-[#D6D7D4] max-w-2xl font-normal leading-relaxed mb-10 font-interface">
          Transparent pay, safer workplaces, and trusted records for every frontline worker. Supporting United Nations SDG 8: Decent Work and Economic Growth.
        </p>

        {/* Restrained Grovemade-style CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={scrollToOverview}
            className="w-full sm:w-auto px-8 py-4 rounded-md bg-white text-[#17191B] text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#F6F6F4] transition-all duration-200 cursor-pointer shadow-lg"
          >
            Explore FairShift
          </button>
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 rounded-md bg-transparent border border-white/40 text-white text-xs font-bold tracking-[0.18em] uppercase hover:bg-white/10 hover:border-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            Get Started <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <button
        onClick={scrollToOverview}
        aria-label="Scroll to overview"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white transition-colors cursor-pointer p-2"
      >
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};
