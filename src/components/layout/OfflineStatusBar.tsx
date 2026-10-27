import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { syncManager } from '@/services/offline/syncManager';

export const OfflineStatusBar: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(syncManager.isOnline);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [isManualSyncing, setIsManualSyncing] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = syncManager.subscribe((count, online) => {
      setPendingCount(count);
      setIsOnline(online);
    });
    return () => unsubscribe();
  }, []);

  const handleManualSync = async () => {
    setIsManualSyncing(true);
    await syncManager.processQueue();
    setIsManualSyncing(false);
  };

  if (isOnline && pendingCount === 0) {
    return null; // Keep screen clean when everything is nominal and online
  }

  return (
    <aside 
      aria-label="Offline Sync Status"
      className="w-full bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center justify-between text-xs text-zinc-300"
    >
      <div className="flex items-center gap-2">
        {!isOnline ? (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
            <WifiOff className="w-3.5 h-3.5" />
            Offline Mode
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
            <Wifi className="w-3.5 h-3.5" />
            Online
          </span>
        )}

        {pendingCount > 0 && (
          <span className="text-zinc-400">
            {pendingCount} operation{pendingCount > 1 ? 's' : ''} queued locally (Will Sync automatically)
          </span>
        )}
      </div>

      {isOnline && pendingCount > 0 && (
        <button
          onClick={handleManualSync}
          disabled={isManualSyncing}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition font-medium"
        >
          <RefreshCw className={`w-3 h-3 ${isManualSyncing ? 'animate-spin' : ''}`} />
          {isManualSyncing ? 'Syncing...' : 'Sync Now'}
        </button>
      )}
    </aside>
  );
};
