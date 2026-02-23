import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { UserRole } from '@/types';

type SessionContextValue = {
  role: UserRole;
  language: 'en' | 'fil';
  setRole: (role: UserRole) => void;
  toggleLanguage: () => void;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: PropsWithChildren) {
  const [role, setRole] = useState<UserRole>('student');
  const [language, setLanguage] = useState<'en' | 'fil'>('en');

  const value = useMemo(
    () => ({
      role,
      language,
      setRole,
      toggleLanguage: () => setLanguage((current) => (current === 'en' ? 'fil' : 'en')),
    }),
    [role, language],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
