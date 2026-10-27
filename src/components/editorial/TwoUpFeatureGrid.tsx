import React from 'react';
import { ArrowRight, User, Building2, HardHat, GraduationCap, ShieldCheck, Clock, Award, FileText } from 'lucide-react';

interface TwoUpFeatureGridProps {
  onSelectRole: (role: 'worker' | 'employer') => void;
}

export const TwoUpFeatureGrid: React.FC<TwoUpFeatureGridProps> = ({ onSelectRole }) => {
  return (
    <section className="py-16 md:py-24 bg-[#FAFAF8] text-[#17191B] transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Employee Tile */}
          <div
            onClick={() => onSelectRole('worker')}
            className="group cursor-pointer flex flex-col space-y-5"
          >
            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F6F6F4] to-[#EFEFE9] border border-[#E8E8E5] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#286B58]/10 text-[#286B58] text-[10px] font-bold tracking-[0.16em] uppercase flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Employee Experience
                </span>
                <span className="text-[10px] font-mono text-[#5F6B73]">Mobile-First 360px</span>
              </div>

              {/* Graphical Editorial Element (Guaranteed Zero-Network Offline Rendering) */}
              <div className="my-auto py-4 space-y-2.5">
                <div className="p-4 rounded-xl bg-white border border-[#E8E8E5] shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#17191B]">
                    <span className="flex items-center gap-2">
                      <HardHat className="w-4 h-4 text-[#286B58]" /> Today's Shift • Pier 42 Metro
                    </span>
                    <span className="text-emerald-700 font-mono">08:00 AM – Active</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#5F6B73]">
                    <span>Itemized Overtime: <strong className="text-[#17191B]">+2.5 hrs (1.5x)</strong></span>
                    <span className="text-[#286B58] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Tamil Audio Available
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#5F6B73]">
                <span>Voice Hazard Reports • Skill Passport</span>
                <span className="font-mono text-[10px]">TAP TO LAUNCH</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-editorial text-3xl font-normal text-[#17191B]">
                For Employees
              </h3>
              <p className="text-sm text-[#5F6B73] leading-relaxed font-interface max-w-md">
                Your hours, earnings, safety and skills—clearly documented, accessible in your native language, and permanently verifiable.
              </p>
              <div className="pt-1">
                <span className="editorial-underline-link group-hover:opacity-70 transition-opacity">
                  Enter Worker Portal <ArrowRight className="w-3.5 h-3.5 inline ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>

          {/* Employer Tile */}
          <div
            onClick={() => onSelectRole('employer')}
            className="group cursor-pointer flex flex-col space-y-5"
          >
            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F6F6F4] to-[#EFEFE9] border border-[#E8E8E5] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#17191B]/5 text-[#17191B] text-[10px] font-bold tracking-[0.16em] uppercase flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#286B58]" /> Employer & Owner Suite
                </span>
                <span className="text-[10px] font-mono text-[#5F6B73]">Desktop Command 1024px+</span>
              </div>

              {/* Graphical Editorial Element */}
              <div className="my-auto py-4 space-y-2.5">
                <div className="p-4 rounded-xl bg-white border border-[#E8E8E5] shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#17191B]">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-600" /> Live Workforce Muster Roll
                    </span>
                    <span className="text-[#286B58] font-mono">100% On-Site</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#5F6B73]">
                    <span>Bank NEFT Export: <strong className="text-[#17191B]">Verified</strong></span>
                    <span className="text-amber-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 0 Unresolved Hazards
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#5F6B73]">
                <span>Shift Rosters • Safety Desk • MorphOrb AI</span>
                <span className="font-mono text-[10px]">TAP TO LAUNCH</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-editorial text-3xl font-normal text-[#17191B]">
                For Employers & Owners
              </h3>
              <p className="text-sm text-[#5F6B73] leading-relaxed font-interface max-w-md">
                Understand workforce operations, audit live attendance, disburse transparent overtime pay, and resolve hazards with speed.
              </p>
              <div className="pt-1">
                <span className="editorial-underline-link group-hover:opacity-70 transition-opacity">
                  Enter Employer Suite <ArrowRight className="w-3.5 h-3.5 inline ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
