import React from 'react';
import { ArrowUp, Shield, HeartHandshake } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F6F6F4] dark:bg-[#141618] border-t border-[#E8E8E5] dark:border-[#282B2F] text-[#17191B] dark:text-[#F4F4F2] pt-16 pb-12 transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#17191B] dark:text-white">
                FairShift
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#286B58] dark:bg-[#3DA386]"></span>
            </div>
            <p className="text-sm text-[#5F6B73] dark:text-[#95A0A6] max-w-sm leading-relaxed">
              Workforce fairness, transparent pay, and worker safety platform engineered for United Nations SDG 8: Decent Work and Economic Growth.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#286B58]/10 text-[#286B58] dark:text-[#3DA386] text-xs font-semibold">
              <Shield className="w-3.5 h-3.5" /> Supporting UN SDG 8 • PromptWars 2026
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#17191B] dark:text-white">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-[#5F6B73] dark:text-[#95A0A6]">
              <li><a href="#capabilities" className="hover:text-[#17191B] dark:hover:text-white transition-colors">Smart Attendance & QR</a></li>
              <li><a href="#capabilities" className="hover:text-[#17191B] dark:hover:text-white transition-colors">Itemized Audio Payslips</a></li>
              <li><a href="#capabilities" className="hover:text-[#17191B] dark:hover:text-white transition-colors">Voice Hazard Reporting</a></li>
              <li><a href="#capabilities" className="hover:text-[#17191B] dark:hover:text-white transition-colors">Speak Up Anonymous Inbox</a></li>
              <li><a href="#capabilities" className="hover:text-[#17191B] dark:hover:text-white transition-colors">Portable Skill Passport</a></li>
              <li><a href="#capabilities" className="hover:text-[#17191B] dark:hover:text-white transition-colors">Fatigue Risk Early Warning</a></li>
            </ul>
          </div>

          {/* Column 3: Sectors */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#17191B] dark:text-white">
              Industries
            </h4>
            <ul className="space-y-2 text-xs text-[#5F6B73] dark:text-[#95A0A6]">
              <li><span className="font-semibold text-[#17191B] dark:text-white">Construction & Civil</span></li>
              <li className="text-[11px]">Site Geofencing & Daily Wages</li>
              <li><span className="font-semibold text-[#17191B] dark:text-white mt-2 block">Colleges & Universities</span></li>
              <li className="text-[11px]">Department Rosters & Sanitation</li>
              <li className="pt-1 text-[#8A969E]">Healthcare (Extensible)</li>
              <li className="text-[#8A969E]">Factories (Extensible)</li>
            </ul>
          </div>

          {/* Column 4: Governance */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#17191B] dark:text-white">
              Worker Dignity
            </h4>
            <ul className="space-y-2 text-xs text-[#5F6B73] dark:text-[#95A0A6]">
              <li><a href="#privacy" className="hover:text-[#17191B] dark:hover:text-white transition-colors">Zero-Retaliation Protocol</a></li>
              <li><a href="#privacy" className="hover:text-[#17191B] dark:hover:text-white transition-colors">Worker Protection Charter</a></li>
              <li><a href="#privacy" className="hover:text-[#17191B] dark:hover:text-white transition-colors">Non-Punitive Wellbeing</a></li>
              <li><a href="#privacy" className="hover:text-[#17191B] dark:hover:text-white transition-colors">Accessibility Statement</a></li>
              <li><a href="#privacy" className="hover:text-[#17191B] dark:hover:text-white transition-colors">Factories Act Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-[#E8E8E5] dark:border-[#282B2F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5F6B73] dark:text-[#95A0A6]">
          <p>© 2026 FairShift Technologies. Built for PromptWars 2026 (SRM ACM Student Chapter). All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-[#17191B] dark:text-white hover:opacity-60 transition-opacity cursor-pointer"
          >
            Back to Top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
