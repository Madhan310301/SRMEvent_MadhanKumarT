import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthContext';
import { 
  Clock, 
  Mic, 
  FileText, 
  ShieldAlert, 
  Award, 
  MessageSquareOff, 
  Activity, 
  Volume2,
  CheckCircle2,
  QrCode,
  ArrowRight
} from 'lucide-react';
import { speechService } from '@/services/voice/speech';
import { localDb } from '@/services/offline/db';

export const WorkerHome: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, org, sectorConfig } = useAuth();
  const navigate = useNavigate();

  const [isOnDuty, setIsOnDuty] = useState<boolean>(false);
  const [todayHours, setTodayHours] = useState<number>(7.5);
  const [weeklyHours, setWeeklyHours] = useState<number>(44.0);

  useEffect(() => {
    // Check if there is an active checkin in Dexie
    localDb.attendances
      .where('userId')
      .equals(user?.id || '')
      .last()
      .then((record) => {
        if (record && !record.checkOutTime) {
          setIsOnDuty(true);
        }
      })
      .catch(() => {});
  }, [user?.id]);

  const handleVoiceRead = () => {
    const text = isOnDuty
      ? `வணக்கம் ${user?.name}. நீங்கள் தற்போது பணியில் உள்ளீர்கள். இன்றைய வேலை நேரம் ஏழரை மணி நேரம்.`
      : `வணக்கம் ${user?.name}. நீங்கள் தற்போது பணியில் இல்லை. உங்கள் பணி நேரத்தை தொடங்க வருகை பதிவு செய்யவும்.`;
    speechService.speak(text, { languageCode: i18n.language });
  };

  return (
    <div className="space-y-4">
      {/* Worker Hero Profile Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatarUrl}
              alt={user?.name}
              className="w-12 h-12 rounded-xl object-cover border-2 border-blue-500/30"
            />
            <div>
              <h1 className="text-lg font-black text-white">{user?.name}</h1>
              <p className="text-xs text-blue-400 font-semibold">{user?.jobTitle}</p>
            </div>
          </div>

          <button
            onClick={handleVoiceRead}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition"
            title="Read Aloud"
            aria-label="Read Aloud"
          >
            <Volume2 className="w-5 h-5 text-blue-400" />
          </button>
        </div>

        {/* Live Attendance State Badge */}
        <div className="mt-4 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/90 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-zinc-400 font-medium block">
              {t('attendance.currentStatus')}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`w-2.5 h-2.5 rounded-full ${isOnDuty ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'}`} />
              <span className="text-sm font-bold text-white">
                {isOnDuty ? t('attendance.onDuty') : t('attendance.offDuty')}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/worker/attendance')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition shadow-lg ${
              isOnDuty
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
            }`}
          >
            {isOnDuty ? t('attendance.clockOutBtn') : t('attendance.clockInBtn')}
          </button>
        </div>

        {/* Hours Summary Metrics */}
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
          <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/50">
            <span className="text-zinc-400 block text-[11px]">{t('attendance.todayHours')}</span>
            <span className="text-base font-extrabold text-white">{todayHours}h</span>
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/50">
            <span className="text-zinc-400 block text-[11px]">{t('attendance.weeklyHours')}</span>
            <span className="text-base font-extrabold text-white">{weeklyHours}h</span>
          </div>
        </div>
      </div>

      {/* Prominent Voice Hazard Action Button */}
      <button
        onClick={() => navigate('/worker/hazard')}
        className="w-full p-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-xl shadow-red-600/20 flex items-center justify-between transition group"
      >
        <div className="flex items-center gap-3 text-left">
          <div className="p-3 rounded-xl bg-black/25">
            <Mic className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider">Report a Safety Hazard</h2>
            <p className="text-xs text-red-100 font-medium">Record by voice or attach photo immediately</p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition" />
      </button>

      {/* Quick Navigation Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate('/worker/payslips')}
          className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition text-left flex flex-col justify-between"
        >
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-3">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{t('nav.payslips')}</h3>
            <p className="text-[11px] text-zinc-400 font-medium">Transparent breakdowns</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/worker/speakup')}
          className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition text-left flex flex-col justify-between"
        >
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-3">
            <MessageSquareOff className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Speak Up</h3>
            <p className="text-[11px] text-zinc-400 font-medium">Zero-PII confidential</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/worker/skills')}
          className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition text-left flex flex-col justify-between"
        >
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 w-fit mb-3">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{t('nav.skills')}</h3>
            <p className="text-[11px] text-zinc-400 font-medium">Portable digital credentials</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/worker/fatigue')}
          className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition text-left flex flex-col justify-between"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-3">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{t('nav.fatigue')}</h3>
            <p className="text-[11px] text-zinc-400 font-medium">Shift rest protection</p>
          </div>
        </button>
      </div>
    </div>
  );
};
