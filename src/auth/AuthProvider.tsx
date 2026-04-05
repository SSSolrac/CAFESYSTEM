import { createContext, useMemo, useState } from 'react';
import { authService } from '@/services/authService';
import { loginHistoryService } from '@/services/loginHistoryService';
import type { SessionUser } from '@/types/user';

interface AuthContextType {
  user: SessionUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const SESSION_KEY = 'staffowner_session';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<SessionUser | null>(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  });

  const login = async (email: string, password: string) => {
    const device = navigator.userAgent;
    const session = await authService.login(email, password, device);
    setUser(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));

    try {
      await loginHistoryService.recordLogin({
        userId: session.id,
        userName: session.name,
        role: session.role,
        loginTime: new Date().toISOString(),
        logoutTime: '',
        ipAddress: '127.0.0.1',
        device,
        loginStatus: 'success',
      });
    } catch {}
  };

  const logout = async () => {
    if (user) {
      try {
        await loginHistoryService.recordLogout(user);
      } catch {}
    }
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
