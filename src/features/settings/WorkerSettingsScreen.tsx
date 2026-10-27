import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Settings, Globe, Volume2, Database, Shield, LogOut, Check, RefreshCw, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { syncOutboxNow } from '@/services/offline/syncManager';
import { db } from '@/services/offline/db';

export const WorkerSettingsScreen: React.FC = () => {
  const { user, org, switchSector, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [speechSpeed, setSpeechSpeed] = useState<'normal' | 'slow'>('normal');
  const [isSyncing, setIsSyncing] = useState(false);
  const [offlineCount, setOfflineCount] = useState<number>(0);

  React.useEffect(() => {
    db.mutations.where('syncStatus').equals('queued').count().then(setOfflineCount);
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    await syncOutboxNow();
    const count = await db.mutations.where('syncStatus').equals('queued').count();
    setOfflineCount(count);
    setIsSyncing(false);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'bn', name: 'বাংলা (Bengali)' }
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-amber-400" />
          Worker Profile & Preferences
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Customize language, text-to-speech audio, offline caching, and identity credentials.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-amber-500/20 shrink-0">
          {user?.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h2 className="font-black text-lg text-white">{user?.name}</h2>
          <p className="text-xs text-amber-400 font-medium">{user?.jobTitle}</p>
          <p className="text-[11px] text-zinc-400 mt-0.5">{org?.name} • Phone: {user?.phone}</p>
        </div>
      </div>

      {/* Language Preferences */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-100">
          <Globe className="w-4 h-4 text-sky-400" />
          <h3>App Display & Audio Language</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                i18n.language === lang.code
                  ? 'bg-amber-500/10 border-amber-500/60 text-amber-300'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              <span>{lang.name}</span>
              {i18n.language === lang.code && <Check className="w-4 h-4 text-amber-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Read-Aloud Options */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-100">
          <Volume2 className="w-4 h-4 text-emerald-400" />
          <h3>Voice Assistance & Audio Playback</h3>
        </div>
        <p className="text-xs text-zinc-400">
          Adjust speech rate for payslip explanations, hazard guides, and fatigue notifications.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setSpeechSpeed('normal')}
            className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              speechSpeed === 'normal'
                ? 'bg-emerald-500/10 border-emerald-500/60 text-emerald-300'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
            }`}
          >
            Normal Speed (1.0x)
          </button>
          <button
            onClick={() => setSpeechSpeed('slow')}
            className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              speechSpeed === 'slow'
                ? 'bg-emerald-500/10 border-emerald-500/60 text-emerald-300'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
            }`}
          >
            Clear & Slow (0.8x)
          </button>
        </div>
      </div>

      {/* Offline Storage Status */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-100">
            <Database className="w-4 h-4 text-indigo-400" />
            <h3>Offline Local Storage (Dexie DB)</h3>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-mono">
            {offlineCount} pending syncs
          </span>
        </div>
        <p className="text-xs text-zinc-400">
          Your attendance punches, voice incident reports, and Speak Up tokens are preserved locally on this phone when network connection drops.
        </p>
        <button
          onClick={handleManualSync}
          disabled={isSyncing}
          className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-bold text-zinc-200 flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Syncing with Server...' : 'Force Sync Outbox Now'}
        </button>
      </div>

      {/* Industry Switcher (Demo Feature) */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-100">
          <Shield className="w-4 h-4 text-amber-400" />
          <h3>Switch Industry Sector (Demo)</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => switchSector('construction')}
            className={`p-3 rounded-xl border text-left text-xs font-semibold transition cursor-pointer ${
              org?.sector === 'construction'
                ? 'bg-amber-500/10 border-amber-500/60 text-amber-300'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
            }`}
          >
            🏗️ Construction Mega-Project
          </button>
          <button
            onClick={() => switchSector('college')}
            className={`p-3 rounded-xl border text-left text-xs font-semibold transition cursor-pointer ${
              org?.sector === 'college'
                ? 'bg-sky-500/10 border-sky-500/60 text-sky-300'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
            }`}
          >
            🎓 College Campus Facilities
          </button>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full py-3 rounded-xl bg-red-950/40 hover:bg-red-950/60 border border-red-800/60 text-red-300 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out / Switch User</span>
      </button>
    </div>
  );
};
