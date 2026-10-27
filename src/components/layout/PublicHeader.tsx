import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HardHat, Menu, X, ArrowUpRight, Globe, Lock, Shield } from 'lucide-react';
import { useAuth } from '@/features/auth/AuthContext';

interface PublicHeaderProps {
  onOpenAuth: (role?: 'owner' | 'employer' | 'worker') => void;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({ onOpenAuth }) => {
  const { i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 dark:bg-[#111214]/95 backdrop-blur-md border-b border-[#E8E8E5] dark:border-[#282B2F] transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 h-18 flex items-center justify-between">
        {/* Left Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#17191B] dark:text-[#F4F4F2]">
          <a href="#capabilities" className="hover:opacity-60 transition-opacity">
            Platform
          </a>
          <a href="#how-it-works" className="hover:opacity-60 transition-opacity">
            How It Works
          </a>
          <a href="#mission" className="hover:opacity-60 transition-opacity">
            UN SDG 8
          </a>
        </nav>

        {/* Center Branding (Grovemade-style refined typography) */}
        <div className="flex items-center gap-2.5">
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-editorial text-2xl md:text-3xl font-bold tracking-tight text-[#17191B] dark:text-[#FFFFFF]">
              FairShift
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#286B58] dark:bg-[#3DA386]"></span>
          </a>
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#286B58]/10 text-[#286B58] dark:text-[#3DA386] text-[10px] font-bold tracking-wider uppercase ml-1">
            <Shield className="w-3 h-3" /> UN SDG 8
          </span>
        </div>

        {/* Right Navigation & CTAs (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {/* Language Selector */}
          <div className="relative flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#5F6B73] dark:text-[#95A0A6]" />
            <select
              aria-label="Language"
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-transparent text-[11px] font-semibold tracking-wider uppercase text-[#17191B] dark:text-[#F4F4F2] focus:outline-none cursor-pointer pr-2"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="text-[#17191B] bg-white dark:bg-[#1A1C1F] dark:text-white">
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => onOpenAuth()}
            className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#17191B] dark:text-[#F4F4F2] hover:opacity-60 transition-opacity cursor-pointer"
          >
            Sign In
          </button>

          <a
            href="#login-section"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#17191B] text-white dark:bg-[#FFFFFF] dark:text-[#17191B] text-[11px] font-bold tracking-[0.16em] uppercase hover:bg-[#286B58] dark:hover:bg-[#3DA386] dark:hover:text-white transition-all shadow-sm cursor-pointer"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <select
            aria-label="Language Select"
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-transparent text-[11px] font-bold uppercase text-[#17191B] dark:text-white border border-[#E8E8E5] dark:border-[#282B2F] rounded px-2 py-1"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code} className="text-[#17191B] bg-white dark:bg-[#1A1C1F] dark:text-white">
                {l.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#17191B] dark:text-white hover:opacity-70 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E8E5] dark:border-[#282B2F] bg-[#FFFFFF] dark:bg-[#111214] px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-xs font-semibold tracking-[0.14em] uppercase text-[#17191B] dark:text-[#F4F4F2]">
            <a
              href="#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-[#E8E8E5]/50 dark:border-[#282B2F]"
            >
              Platform Modules
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-[#E8E8E5]/50 dark:border-[#282B2F]"
            >
              How It Works
            </a>
            <a
              href="#mission"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-[#E8E8E5]/50 dark:border-[#282B2F]"
            >
              UN SDG 8 Mission
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full py-3 text-center border border-[#17191B] dark:border-white text-[#17191B] dark:text-white text-xs font-bold tracking-[0.16em] uppercase rounded-md"
            >
              Sign In
            </button>
            <a
              href="#login-section"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center bg-[#17191B] text-white dark:bg-white dark:text-[#17191B] text-xs font-bold tracking-[0.16em] uppercase rounded-md"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
