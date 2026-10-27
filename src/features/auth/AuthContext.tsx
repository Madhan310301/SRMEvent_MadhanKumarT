import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS, DEMO_ORGS, DemoUser, DemoOrg } from '@/features/organizations/mockData';
import { SECTORS, SectorConfig } from '@/config/sectors';
import i18n from '@/lib/i18n';

interface AuthContextType {
  user: DemoUser | null;
  org: DemoOrg | null;
  sectorConfig: SectorConfig;
  activeRole: 'worker' | 'employer';
  switchDemoUser: (userKey: keyof typeof DEMO_USERS) => void;
  switchSector: (sectorKey: 'construction' | 'college') => void;
  logout: () => void;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Construction Worker (Murugan K) for rich initial experience
  const [currentUserKey, setCurrentUserKey] = useState<string>(() => {
    return localStorage.getItem('fairshift_demo_user_key') || 'worker-construction';
  });

  const user = DEMO_USERS[currentUserKey] || DEMO_USERS['worker-construction'];
  const org = DEMO_ORGS[user.orgId] || DEMO_ORGS['org-construction'];
  const sectorConfig = SECTORS[org.sector] || SECTORS.construction;

  useEffect(() => {
    localStorage.setItem('fairshift_demo_user_key', currentUserKey);
    // Align language if user has preferred language saved
    if (user.preferredLanguage && i18n.language !== user.preferredLanguage) {
      i18n.changeLanguage(user.preferredLanguage);
    }
  }, [currentUserKey, user.preferredLanguage]);

  const switchDemoUser = (userKey: keyof typeof DEMO_USERS) => {
    setCurrentUserKey(userKey);
  };

  const switchSector = (sectorKey: 'construction' | 'college') => {
    if (sectorKey === 'construction') {
      setCurrentUserKey(user.role === 'worker' ? 'worker-construction' : 'employer-construction');
    } else {
      setCurrentUserKey(user.role === 'worker' ? 'worker-college' : 'employer-college');
    }
  };

  const logout = () => {
    // Clear credentials
    setCurrentUserKey('worker-construction');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        org,
        sectorConfig,
        activeRole: user.role,
        switchDemoUser,
        switchSector,
        logout,
        isDemoMode: true
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
