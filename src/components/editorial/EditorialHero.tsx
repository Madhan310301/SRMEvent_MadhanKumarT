import React from 'react';
import { ArrowDown, ArrowRight, ShieldCheck, Sparkles, Clock, Shield, CheckCircle2, Award } from 'lucide-react';

interface EditorialHeroProps {
  onGetStarted: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({ onGetStarted }) => {
  const scrollToOverview = () => {
    const el = document.getElementById('overview');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#FAFAF8] text-[#17191B] pt-12 md:pt-16 pb-8 transition-colors">
      {/* Editorial Content */}
      <div className="max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center z-10">
        {/* Subtle Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8E8E5] border border-[#D5D5CF] text-[11px] font-bold tracking-[0.18em] uppercase text-[#17191B] mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#286B58]" /> PromptWars 2026 • SRM ACM Student Chapter
        </div>

        {/* Large Serif Headline */}
        <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#17191B] max-w-4xl leading-[1.06] mb-6">
          Fair Work. <br />
          <span className="italic font-light text-[#5F6B73]">Clear Futures.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg md:text-xl text-[#5F6B73] max-w-2xl font-normal leading-relaxed mb-8 font-interface">
          Transparent pay, safer workplaces, and trusted records for every worker. Designed for frontline teams across construction and universities.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
          <button
            onClick={scrollToOverview}
            className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#17191B] text-white text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#286B58] transition-all duration-200 cursor-pointer shadow-md"
          >
            Explore FairShift
          </button>
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-white border border-[#E8E8E5] text-[#17191B] text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#F6F6F4] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            Choose Portal <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Featured Editorial Hero Visual: Clean Offline-Proof Mockup Composition */}
      <div className="w-full max-w-[1100px] mx-auto px-6 relative z-10">
        <div className="bg-[#FFFFFF] border border-[#E8E8E5] rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E8E5] pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#286B58] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                FS
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#286B58] uppercase block">
                  Live Operations Verification
                </span>
                <h3 className="font-editorial text-2xl font-normal text-[#17191B]">
                  Frontline Workforce Command
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#286B58]/10 text-[#286B58] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> UN SDG 8 Compliant
              </span>
            </div>
          </div>

          {/* Three Live Stats Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
            <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E8E8E5]">
              <span className="text-[11px] font-bold text-[#5F6B73] tracking-wider uppercase block">Smart Attendance</span>
              <span className="text-2xl font-bold text-[#17191B] mt-1 block">100% Geofenced</span>
              <span className="text-xs text-[#5F6B73] mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#286B58]" /> Rotating QR & 150m GPS
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E8E8E5]">
              <span className="text-[11px] font-bold text-[#5F6B73] tracking-wider uppercase block">Overtime Accuracy</span>
              <span className="text-2xl font-bold text-[#17191B] mt-1 block">1.5x / 2.0x Rates</span>
              <span className="text-xs text-[#5F6B73] mt-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" /> Itemized Audio Payslips
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E8E8E5]">
              <span className="text-[11px] font-bold text-[#5F6B73] tracking-wider uppercase block">Worker Identity</span>
              <span className="text-2xl font-bold text-[#17191B] mt-1 block">Zero PII Speak Up</span>
              <span className="text-xs text-[#5F6B73] mt-1 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-sky-600" /> Portable Skill Passport
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <button
        onClick={scrollToOverview}
        aria-label="Scroll to overview"
        className="mt-6 mx-auto text-[#5F6B73] hover:text-[#17191B] transition-colors cursor-pointer p-2"
      >
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};
