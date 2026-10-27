import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Bell, CheckCircle2, AlertTriangle, FileText, ShieldAlert, Award, Volume2 } from 'lucide-react';
import { speakText } from '@/services/voice/speech';
import { useTranslation } from 'react-i18next';

interface NotificationItem {
  id: string;
  type: 'payslip' | 'hazard' | 'fatigue' | 'skill' | 'general';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export const NotificationsScreen: React.FC = () => {
  const { user } = useAuth();
  const { i18n } = useTranslation();

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n-01',
      type: 'payslip',
      title: 'Monthly Wage Slip Deposited',
      description: 'Your October 2026 payslip (₹21,850 Net Pay) is verified and ready for download with itemized allowances and PF deduction.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 'n-02',
      type: 'hazard',
      title: 'Hazard Report Acknowledged',
      description: 'Site Safety Supervisor updated status of "Frayed heavy hoist cable on Pier 42" to Under Investigation.',
      time: 'Yesterday',
      read: false
    },
    {
      id: 'n-03',
      type: 'fatigue',
      title: 'Wellbeing Advisory: Rest Period',
      description: 'You completed a 10.5-hour shift yesterday. Ensure minimum 11 hours rest before your next scheduled clock-in.',
      time: '1 day ago',
      read: true
    },
    {
      id: 'n-04',
      type: 'skill',
      title: 'Credential Verified by Apex Infra',
      description: 'Your "Certified Crane & Heavy Rigging Specialist" certificate has been electronically sealed on your Skill Passport.',
      time: '3 days ago',
      read: true
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'payslip': return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'hazard': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'fatigue': return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      case 'skill': return <Award className="w-4 h-4 text-sky-400" />;
      default: return <Bell className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            Worker Notifications
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Official alerts, payslip disbursements, hazard updates, and skill verifications.
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
        >
          Mark all read
        </button>
      </div>

      <div className="space-y-2.5">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl border transition ${
              item.read
                ? 'bg-zinc-900/60 border-zinc-800/70 text-zinc-300'
                : 'bg-zinc-900 border-zinc-700/80 shadow-md text-zinc-100'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 shrink-0">
                {getIcon(item.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-100">{item.title}</h3>
                  <span className="text-[10px] text-zinc-400">{item.time}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{item.description}</p>
                <div className="pt-1 flex items-center gap-3">
                  <button
                    onClick={() => speakText(`${item.title}. ${item.description}`, i18n.language)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Read aloud
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
