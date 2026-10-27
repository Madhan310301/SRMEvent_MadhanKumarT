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
  Building2,
  Settings
} from 'lucide-react';
import { AppHeader } from './AppHeader';
import { OfflineStatusBar } from './OfflineStatusBar';
import { LocationLanguagePrompt } from './LocationLanguagePrompt';

export const EmployerLayout: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    { to: '/employer', label: 'Overview', icon: LayoutDashboard },
    { to: '/employer/workers', label: 'Workforce', icon: Users },
    { to: '/employer/attendance', label: 'Attendance', icon: Clock },
    { to: '/employer/shifts', label: 'Shifts', icon: CalendarDays },
    { to: '/employer/payroll', label: 'Payroll', icon: Receipt },
    { to: '/employer/hazards', label: 'Safety Reports', icon: ShieldAlert },
    { to: '/employer/feedback', label: 'Speak Up Inbox', icon: MessageSquareOff },
    { to: '/employer/skills', label: 'Skills Verification', icon: Award },
    { to: '/employer/fatigue', label: 'Fatigue Radar', icon: HeartPulse },
    { to: '/employer/sites', label: 'Sites & Geofence', icon: Building2 },
    { to: '/employer/settings', label: 'Organization Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#111214] text-[#17191B] dark:text-[#F4F4F2] flex flex-col font-interface transition-colors">
      <AppHeader />
      <OfflineStatusBar />
      <LocationLanguagePrompt />

      <div className="flex-1 max-w-[1440px] w-full mx-auto flex flex-col md:flex-row">
        {/* Editorial Sidebar Navigation (1024px and above) */}
        <aside 
          aria-label="Employer Desktop Navigation"
          className="w-full md:w-64 border-r border-[#E8E8E5] dark:border-[#282B2F] bg-[#FFFFFF]/70 dark:bg-[#181A1D]/50 p-4 shrink-0 hidden md:block"
        >
          <div className="text-[10px] font-mono uppercase font-bold text-[#5F6B73] dark:text-[#95A0A6] tracking-[0.16em] mb-4 px-2">
            Operations Command
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/employer'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? 'bg-[#17191B] text-white dark:bg-white dark:text-[#17191B] shadow-sm font-bold'
                        : 'text-[#5F6B73] dark:text-[#95A0A6] hover:text-[#17191B] dark:hover:text-white hover:bg-[#F6F6F4] dark:hover:bg-[#222529]'
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
        <div className="md:hidden overflow-x-auto border-b border-[#E8E8E5] dark:border-[#282B2F] px-4 py-2 flex items-center gap-2 bg-[#FFFFFF] dark:bg-[#181A1D]">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/employer'}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-[#17191B] text-white dark:bg-white dark:text-[#17191B]'
                      : 'text-[#5F6B73] dark:text-[#95A0A6] hover:bg-[#F6F6F4] dark:hover:bg-[#222529]'
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
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
