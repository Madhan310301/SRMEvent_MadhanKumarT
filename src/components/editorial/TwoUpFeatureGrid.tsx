import React from 'react';
import { ArrowRight, User, Building2 } from 'lucide-react';

interface TwoUpFeatureGridProps {
  onSelectRole: (role: 'worker' | 'employer') => void;
}

export const TwoUpFeatureGrid: React.FC<TwoUpFeatureGridProps> = ({ onSelectRole }) => {
  return (
    <section className="py-12 md:py-20 bg-[#FAFAF8] dark:bg-[#111214] text-[#17191B] dark:text-[#F4F4F2]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Employee Tile */}
          <div
            onClick={() => onSelectRole('worker')}
            className="group cursor-pointer flex flex-col space-y-5"
          >
            <div className="editorial-tile-zoom w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#F6F6F4] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F]">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85"
                alt="Construction professional reviewing safety gear on site"
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-[0.16em] uppercase">
                  Employee Portal
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-editorial text-2xl md:text-3xl font-normal text-[#17191B] dark:text-white">
                For Employees
              </h3>
              <p className="text-sm text-[#5F6B73] dark:text-[#95A0A6] leading-relaxed font-interface max-w-md">
                Your hours, earnings, safety and skills—clearly documented, accessible in your native language, and permanently verifiable.
              </p>
              <div className="pt-2">
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
            <div className="editorial-tile-zoom w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#F6F6F4] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F]">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=85"
                alt="Site directors reviewing operations"
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-[0.16em] uppercase">
                  Employer & Owner Suite
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-editorial text-2xl md:text-3xl font-normal text-[#17191B] dark:text-white">
                For Employers & Owners
              </h3>
              <p className="text-sm text-[#5F6B73] dark:text-[#95A0A6] leading-relaxed font-interface max-w-md">
                Understand workforce operations, audit live attendance, disburse transparent overtime pay, and resolve hazards with speed.
              </p>
              <div className="pt-2">
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
