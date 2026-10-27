import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Clock, 
  FileText, 
  AlertTriangle, 
  MessageSquareOff, 
  Award, 
  Activity, 
  Calendar,
  FolderOpen
} from 'lucide-react';
import { AppHeader } from './AppHeader';
import { OfflineStatusBar } from './OfflineStatusBar';
import { LocationLanguagePrompt } from './LocationLanguagePrompt';

export const WorkerLayout: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    { to: '/worker/home', label: t('nav.home'), icon: Home },
    { to: '/worker/attendance', label: t('nav.checkIn'), icon: Clock },
    { to: '/worker/hours', label: t('nav.hours'), icon: Calendar },
    { to: '/worker/payslips', label: t('nav.payslips'), icon: FileText },
    { to: '/worker/hazard', label: t('nav.reportHazard'), icon: AlertTriangle },
    { to: '/worker/reports', label: t('nav.myReports'), icon: FolderOpen },
    { to: '/worker/speakup', label: t('nav.speakUp'), icon: MessageSquareOff },
    { to: '/worker/skills', label: t('nav.skills'), icon: Award },
    { to: '/worker/fatigue', label: t('nav.fatigue'), icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <AppHeader />
      <OfflineStatusBar />
      <LocationLanguagePrompt />

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-4 pb-24 sm:pb-8">
        <Outlet />
      </main>

      {/* Mobile Sticky Bottom Navigation (Optimised for 360px Android devices) */}
      <nav 
        aria-label="Worker Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur border-t border-zinc-800 px-2 py-1.5 flex items-center justify-around sm:hidden"
      >
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-w-[56px] py-1 text-[10px] font-semibold transition ${
                  isActive ? 'text-blue-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="truncate max-w-[62px] text-center">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
