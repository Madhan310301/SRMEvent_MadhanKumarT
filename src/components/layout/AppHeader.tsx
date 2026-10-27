import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthContext';
import { DEMO_USERS } from '@/features/organizations/mockData';
import { Globe, UserCheck, HardHat, GraduationCap, Crown, Shield, ChevronDown, Check, User, Building2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const AppHeader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, org, switchDemoUser, switchSector } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [personaMenuOpen, setPersonaMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const personaRef = useRef<HTMLDivElement | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' }
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (personaRef.current && !personaRef.current.contains(e.target as Node)) {
        setPersonaMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPersona = (userKey: keyof typeof DEMO_USERS) => {
    switchDemoUser(userKey);
    setPersonaMenuOpen(false);
    const targetUser = DEMO_USERS[userKey];
    if (targetUser.role === 'worker' && location.pathname.startsWith('/employer')) {
      navigate('/worker');
    } else if ((targetUser.role === 'owner' || targetUser.role === 'employer') && location.pathname.startsWith('/worker')) {
      navigate('/employer');
    }
  };

  const getPersonaBadge = () => {
    if (user?.role === 'owner') return <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold uppercase tracking-wider">Owner</span>;
    if (user?.role === 'employer') return <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[9px] font-bold uppercase tracking-wider">Employer</span>;
    return <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase tracking-wider">Employee</span>;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#E8E8E5] px-4 py-2.5 transition-colors shadow-xs">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand & SDG 8 Badge */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-editorial text-2xl font-bold tracking-tight text-[#17191B]">
              FairShift
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#286B58]"></span>
          </Link>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#286B58]/10 text-[#286B58] text-[10px] font-bold tracking-wider uppercase">
            <Shield className="w-3 h-3" /> UN SDG 8
          </span>

          {/* Quick Sector Switcher */}
          <div className="flex items-center p-0.5 bg-[#F6F6F4] border border-[#E8E8E5] rounded-lg text-xs">
            <button
              onClick={() => switchSector('construction')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                org?.sector === 'construction'
                  ? 'bg-white text-[#17191B] shadow-sm'
                  : 'text-[#5F6B73] hover:text-[#17191B]'
              }`}
            >
              <HardHat className="w-3.5 h-3.5 text-[#286B58]" />
              <span className="hidden md:inline">Construction</span>
            </button>
            <button
              onClick={() => switchSector('college')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                org?.sector === 'college'
                  ? 'bg-white text-[#17191B] shadow-sm'
                  : 'text-[#5F6B73] hover:text-[#17191B]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#286B58]" />
              <span className="hidden md:inline">College</span>
            </button>
          </div>
        </div>

        {/* 6 Personas Selector & Language Selector */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {/* Custom Persona Dropdown (Eliminates Browser Option Glitches) */}
          <div ref={personaRef} className="relative">
            <button
              type="button"
              onClick={() => setPersonaMenuOpen(!personaMenuOpen)}
              className="flex items-center gap-2 bg-[#F6F6F4] hover:bg-[#EFEFE9] border border-[#E8E8E5] rounded-lg px-3 py-1.5 text-xs text-[#17191B] font-semibold transition cursor-pointer shadow-xs"
              aria-haspopup="true"
              aria-expanded={personaMenuOpen}
            >
              <UserCheck className="w-3.5 h-3.5 text-[#286B58]" />
              <span className="font-bold truncate max-w-[130px] sm:max-w-[160px]">{user?.name}</span>
              {getPersonaBadge()}
              <ChevronDown className={`w-3.5 h-3.5 text-[#5F6B73] transition-transform duration-200 ${personaMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Floating Dropdown Card */}
            {personaMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E8E8E5] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* Sector 1: Construction */}
                <div className="px-3 py-1.5 bg-[#F6F6F4] border-b border-[#E8E8E5] flex items-center justify-between text-[10px] font-bold text-[#5F6B73] tracking-widest uppercase">
                  <span className="flex items-center gap-1.5 text-[#17191B]">
                    <HardHat className="w-3.5 h-3.5 text-[#286B58]" /> Construction Mega-Project
                  </span>
                  <span>Kaveri Infra</span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => handleSelectPersona('owner-construction')}
                    className="w-full px-3 py-2 text-left hover:bg-[#FAFAF8] flex items-center justify-between transition cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#17191B] flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5 text-amber-600" /> Rajesh Kaveri
                      </div>
                      <div className="text-[11px] text-[#5F6B73]">Managing Director & Enterprise Owner</div>
                    </div>
                    {user?.id === 'o-rajesh-01' && <Check className="w-4 h-4 text-[#286B58]" />}
                  </button>

                  <button
                    onClick={() => handleSelectPersona('employer-construction')}
                    className="w-full px-3 py-2 text-left hover:bg-[#FAFAF8] flex items-center justify-between transition cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#17191B] flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-indigo-600" /> Ramesh Sundaram
                      </div>
                      <div className="text-[11px] text-[#5F6B73]">Head Safety Officer & Site Director</div>
                    </div>
                    {user?.id === 'e-ramesh-01' && <Check className="w-4 h-4 text-[#286B58]" />}
                  </button>

                  <button
                    onClick={() => handleSelectPersona('worker-construction')}
                    className="w-full px-3 py-2 text-left hover:bg-[#FAFAF8] flex items-center justify-between transition cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#17191B] flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-emerald-600" /> Murugan K.
                      </div>
                      <div className="text-[11px] text-[#5F6B73]">Crane & Rigging Specialist (Tamil UI)</div>
                    </div>
                    {user?.id === 'w-murugan-01' && <Check className="w-4 h-4 text-[#286B58]" />}
                  </button>
                </div>

                {/* Sector 2: College */}
                <div className="px-3 py-1.5 bg-[#F6F6F4] border-y border-[#E8E8E5] flex items-center justify-between text-[10px] font-bold text-[#5F6B73] tracking-widest uppercase mt-1">
                  <span className="flex items-center gap-1.5 text-[#17191B]">
                    <GraduationCap className="w-3.5 h-3.5 text-[#286B58]" /> College Campus Facilities
                  </span>
                  <span>SRM Institute</span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => handleSelectPersona('owner-college')}
                    className="w-full px-3 py-2 text-left hover:bg-[#FAFAF8] flex items-center justify-between transition cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#17191B] flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5 text-amber-600" /> Dr. P. Sathyanarayanan
                      </div>
                      <div className="text-[11px] text-[#5F6B73]">Pro-Chancellor & Institution Owner</div>
                    </div>
                    {user?.id === 'o-sathya-02' && <Check className="w-4 h-4 text-[#286B58]" />}
                  </button>

                  <button
                    onClick={() => handleSelectPersona('employer-college')}
                    className="w-full px-3 py-2 text-left hover:bg-[#FAFAF8] flex items-center justify-between transition cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#17191B] flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-indigo-600" /> Dr. Arun Kumar
                      </div>
                      <div className="text-[11px] text-[#5F6B73]">Director of Campus Infrastructure</div>
                    </div>
                    {user?.id === 'e-arun-02' && <Check className="w-4 h-4 text-[#286B58]" />}
                  </button>

                  <button
                    onClick={() => handleSelectPersona('worker-college')}
                    className="w-full px-3 py-2 text-left hover:bg-[#FAFAF8] flex items-center justify-between transition cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#17191B] flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-emerald-600" /> Lakshmi S.
                      </div>
                      <div className="text-[11px] text-[#5F6B73]">Facilities & Sanitation Lead (Tamil UI)</div>
                    </div>
                    {user?.id === 'w-lakshmi-02' && <Check className="w-4 h-4 text-[#286B58]" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Custom Language Dropdown */}
          <div ref={langRef} className="relative">
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 bg-[#F6F6F4] hover:bg-[#EFEFE9] border border-[#E8E8E5] rounded-lg px-2.5 py-1.5 text-xs text-[#17191B] font-semibold transition cursor-pointer shadow-xs"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#286B58]" />
              <span className="uppercase text-[11px]">{i18n.language}</span>
              <ChevronDown className={`w-3 h-3 text-[#5F6B73] transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E8E8E5] rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-64 overflow-y-auto">
                <div className="px-3 py-1 text-[10px] font-bold text-[#5F6B73] uppercase tracking-wider border-b border-[#E8E8E5]">
                  Select Language
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      i18n.changeLanguage(l.code);
                      setLangMenuOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs hover:bg-[#FAFAF8] flex items-center justify-between text-[#17191B] transition cursor-pointer"
                  >
                    <span>{l.native} ({l.label})</span>
                    {i18n.language === l.code && <Check className="w-3.5 h-3.5 text-[#286B58]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
