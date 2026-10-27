import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthContext';
import { Globe, UserCheck, HardHat, GraduationCap, Building2 } from 'lucide-react';

export const AppHeader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, org, sectorConfig, switchDemoUser, switchSector } = useAuth();

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
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur border-b border-zinc-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand & SDG 8 Badge */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-lg text-white shadow-lg shadow-blue-600/30">
              FS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">FairShift</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  UN SDG 8
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium truncate max-w-[200px] sm:max-w-xs">
                {org?.name}
              </p>
            </div>
          </div>

          {/* Quick Sector Switcher */}
          <div className="flex items-center p-0.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs">
            <button
              onClick={() => switchSector('construction')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition ${
                org?.sector === 'construction' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <HardHat className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Construction</span>
            </button>
            <button
              onClick={() => switchSector('college')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition ${
                org?.sector === 'college' ? 'bg-emerald-600 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden md:inline">College</span>
            </button>
          </div>
        </div>

        {/* Persona Switcher & Language Selector */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {/* Persona selector for quick hackathon evaluator inspection */}
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-1 text-xs">
            <UserCheck className="w-3.5 h-3.5 text-zinc-400" />
            <select
              value={
                user?.id === 'w-murugan-01'
                  ? 'worker-construction'
                  : user?.id === 'e-ramesh-01'
                  ? 'employer-construction'
                  : user?.id === 'w-lakshmi-02'
                  ? 'worker-college'
                  : 'employer-college'
              }
              onChange={(e) => switchDemoUser(e.target.value as any)}
              className="bg-transparent text-zinc-200 font-medium focus:outline-none cursor-pointer"
              title="Switch Demo Persona"
              aria-label="Switch Demo Persona"
            >
              <option value="worker-construction" className="bg-zinc-900">Murugan K. (Construction Worker)</option>
              <option value="employer-construction" className="bg-zinc-900">Ramesh S. (Construction Employer)</option>
              <option value="worker-college" className="bg-zinc-900">Lakshmi S. (College Worker)</option>
              <option value="employer-college" className="bg-zinc-900">Dr. Arun K. (College Employer)</option>
            </select>
          </div>

          {/* Language Picker */}
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl px-2.5 py-1 text-xs text-zinc-300">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-transparent text-zinc-200 font-semibold focus:outline-none cursor-pointer"
              title="Select Language"
              aria-label="Select Language"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-zinc-900">
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
