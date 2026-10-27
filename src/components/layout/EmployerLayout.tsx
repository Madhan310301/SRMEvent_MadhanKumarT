import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Clock, 
  CalendarDays, 
  Receipt, 
  ShieldAlert, 
  MessageSquareOff, 
  Award, 
  HeartPulse, 
  Users, 
  Building 
} from 'lucide-react';
import { AppHeader } from './AppHeader';
import { OfflineStatusBar } from './OfflineStatusBar';
import { LocationLanguagePrompt } from './LocationLanguagePrompt';

export const EmployerLayout: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    { to: '/employer/overview', label: t('empNav.overview'), icon: LayoutDashboard },
    { to: '/employer/attendance', label: t('empNav.attendance'), icon: Clock },
    { to: '/employer/shifts', label: t('empNav.shifts'), icon: CalendarDays },
    { to: '/employer/payroll', label: t('empNav.payroll'), icon: Receipt },
    { to: '/employer/hazards', label: t('empNav.hazards'), icon: ShieldAlert },
    { to: '/employer/feedback', label: t('empNav.feedback'), icon: MessageSquareOff },
    { to: '/employer/skills', label: t('empNav.skills'), icon: Award },
    { to: '/employer/fatigue', label: t('empNav.fatigue'), icon: HeartPulse },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <AppHeader />
      <OfflineStatusBar />
      <LocationLanguagePrompt />

      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        {/* Desktop Sidebar Navigation (1024px and above) */}
        <aside 
          aria-label="Employer Desktop Navigation"
          className="w-full md:w-64 border-r border-zinc-800 bg-zinc-950/50 p-4 shrink-0 hidden md:block"
        >
          <div className="text-xs uppercase font-extrabold text-zinc-500 tracking-wider mb-3 px-2">
            Operations & Oversight
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Mobile / Tablet Horizontal Tab Navigation */}
        <div className="md:hidden overflow-x-auto border-b border-zinc-800 px-4 py-2 flex items-center gap-2 bg-zinc-900/40">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    isActive ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:bg-zinc-800'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
