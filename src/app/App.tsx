import React from 'react';
import { AuthProvider } from '@/features/auth/AuthContext';
import { AppRouter } from '@/app/router';
import { LocationLanguagePrompt } from '@/components/layout/LocationLanguagePrompt';
import { OfflineStatusBar } from '@/components/layout/OfflineStatusBar';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
        <OfflineStatusBar />
        <LocationLanguagePrompt />
        <div className="flex-1 flex flex-col">
          <AppRouter />
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
