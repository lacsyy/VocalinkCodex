import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { Teacher } from '../types';

type AuthState = {
  token: string | null;
  teacher: Teacher | null;
  login: (token: string, teacher: Teacher) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

const TOKEN_KEY = 'vocalink_token';
const TEACHER_KEY = 'vocalink_teacher';

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [teacher, setTeacher] = useState<Teacher | null>(() => {
    const raw = localStorage.getItem(TEACHER_KEY);
    return raw ? (JSON.parse(raw) as Teacher) : null;
  });

  const value = useMemo<AuthState>(
    () => ({
      token,
      teacher,
      login: (newToken, newTeacher) => {
        setToken(newToken);
        setTeacher(newTeacher);
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(TEACHER_KEY, JSON.stringify(newTeacher));
      },
      logout: () => {
        setToken(null);
        setTeacher(null);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TEACHER_KEY);
      },
    }),
    [token, teacher],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
