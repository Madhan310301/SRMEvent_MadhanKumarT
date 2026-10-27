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
    { to: '/worker', label: 'Home', icon: Home },
    { to: '/worker/attendance', label: 'Check In', icon: Clock },
    { to: '/worker/hours', label: 'Hours', icon: Calendar },
    { to: '/worker/payslips', label: 'Payslips', icon: FileText },
    { to: '/worker/hazard', label: 'Hazard', icon: AlertTriangle },
    { to: '/worker/reports', label: 'Reports', icon: FolderOpen },
    { to: '/worker/speakup', label: 'Speak Up', icon: MessageSquareOff },
    { to: '/worker/skills', label: 'Skills', icon: Award },
    { to: '/worker/fatigue', label: 'Fatigue', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#111214] text-[#17191B] dark:text-[#F4F4F2] flex flex-col font-interface transition-colors">
      <AppHeader />
      <OfflineStatusBar />
      <LocationLanguagePrompt />

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 pb-24 sm:pb-8">
        <Outlet />
      </main>

      {/* Mobile Sticky Bottom Navigation (Optimised for 360px Android devices) */}
      <nav 
        aria-label="Worker Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 dark:bg-[#181A1D]/95 backdrop-blur-md border-t border-[#E8E8E5] dark:border-[#282B2F] px-2 py-1.5 flex items-center justify-around sm:hidden shadow-lg"
      >
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/worker'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-w-[56px] py-1 text-[10px] font-semibold transition ${
                  isActive ? 'text-[#286B58] dark:text-[#3DA386] font-bold' : 'text-[#5F6B73] dark:text-[#95A0A6]'
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
