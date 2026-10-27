import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthContext';
import { Globe, UserCheck, HardHat, GraduationCap, Crown, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AppHeader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, org, switchDemoUser, switchSector } = useAuth();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'mr', label: 'मराठी' },
    { code: 'bn', label: 'বাংলা' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 dark:bg-[#111214]/95 backdrop-blur-md border-b border-[#E8E8E5] dark:border-[#282B2F] px-4 py-2.5 transition-colors">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand & SDG 8 Badge */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-editorial text-2xl font-bold tracking-tight text-[#17191B] dark:text-white">
              FairShift
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#286B58] dark:bg-[#3DA386]"></span>
          </Link>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#286B58]/10 text-[#286B58] dark:text-[#3DA386] text-[10px] font-bold tracking-wider uppercase">
            <Shield className="w-3 h-3" /> UN SDG 8
          </span>

          {/* Quick Sector Switcher */}
          <div className="flex items-center p-0.5 bg-[#F6F6F4] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] rounded-lg text-xs">
            <button
              onClick={() => switchSector('construction')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                org?.sector === 'construction'
                  ? 'bg-white dark:bg-[#282B2F] text-[#17191B] dark:text-white shadow-sm'
                  : 'text-[#5F6B73] dark:text-[#95A0A6] hover:text-[#17191B] dark:hover:text-white'
              }`}
            >
              <HardHat className="w-3.5 h-3.5 text-[#286B58] dark:text-[#3DA386]" />
              <span className="hidden md:inline">Construction</span>
            </button>
            <button
              onClick={() => switchSector('college')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                org?.sector === 'college'
                  ? 'bg-white dark:bg-[#282B2F] text-[#17191B] dark:text-white shadow-sm'
                  : 'text-[#5F6B73] dark:text-[#95A0A6] hover:text-[#17191B] dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#286B58] dark:text-[#3DA386]" />
              <span className="hidden md:inline">College</span>
            </button>
          </div>
        </div>

        {/* 6 Personas Selector & Language Selector */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {/* Persona selector for all 6 roles */}
          <div className="flex items-center gap-1 bg-[#F6F6F4] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] rounded-lg px-2.5 py-1 text-xs">
            <UserCheck className="w-3.5 h-3.5 text-[#286B58] dark:text-[#3DA386]" />
            <select
              value={
                user?.id === 'o-rajesh-01'
                  ? 'owner-construction'
                  : user?.id === 'e-ramesh-01'
                  ? 'employer-construction'
                  : user?.id === 'w-murugan-01'
                  ? 'worker-construction'
                  : user?.id === 'o-sathya-02'
                  ? 'owner-college'
                  : user?.id === 'e-arun-02'
                  ? 'employer-college'
                  : 'worker-college'
              }
              onChange={(e) => switchDemoUser(e.target.value as any)}
              className="bg-transparent text-[#17191B] dark:text-white text-xs font-semibold focus:outline-none cursor-pointer"
              title="Switch Persona"
              aria-label="Switch Persona"
            >
              <optgroup label="🏗️ Construction Mega-Project">
                <option value="owner-construction" className="bg-white dark:bg-[#181A1D]">👑 Rajesh Kaveri (Owner / Director)</option>
                <option value="employer-construction" className="bg-white dark:bg-[#181A1D]">👷 Ramesh Sundaram (Employer / Site Lead)</option>
                <option value="worker-construction" className="bg-white dark:bg-[#181A1D]">🔧 Murugan K. (Employee / Crane Lead)</option>
              </optgroup>
              <optgroup label="🎓 College Campus Facilities">
                <option value="owner-college" className="bg-white dark:bg-[#181A1D]">👑 Dr. P. Sathyanarayanan (Owner / Chancellor)</option>
                <option value="employer-college" className="bg-white dark:bg-[#181A1D]">🏛️ Dr. Arun Kumar (Employer / Director)</option>
                <option value="worker-college" className="bg-white dark:bg-[#181A1D]">🧹 Lakshmi S. (Employee / Housekeeping Lead)</option>
              </optgroup>
            </select>
          </div>

          {/* Language Picker */}
          <div className="flex items-center gap-1 bg-[#F6F6F4] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] rounded-lg px-2.5 py-1 text-xs text-[#17191B] dark:text-white">
            <Globe className="w-3.5 h-3.5 text-[#5F6B73] dark:text-[#95A0A6]" />
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-transparent text-[#17191B] dark:text-white font-semibold focus:outline-none cursor-pointer"
              title="Select Language"
              aria-label="Select Language"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-white dark:bg-[#181A1D]">
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
