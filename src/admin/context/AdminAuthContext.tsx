import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { AdminSession, AdminUser } from '../types';

const SESSION_KEY = 'flowza_admin_session';
const INACTIVITY_TIMEOUT = 30 * 60 * 1000;

interface AdminAuthContextType {
  session: AdminSession | null;
  isLoading: boolean;
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
  updateUser: (user: AdminUser) => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        const parsed: AdminSession = JSON.parse(raw);
        if (parsed.expiresAt > Date.now()) {
          setSession(parsed);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!session) return;
    let timer: ReturnType<typeof setTimeout>;

    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(logout, INACTIVITY_TIMEOUT);
      // Keep expiresAt in sync with activity so page refreshes don't falsely expire
      setSession(prev => {
        if (!prev) return prev;
        const updated = { ...prev, expiresAt: Date.now() + INACTIVITY_TIMEOUT };
        localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
        return updated;
      });
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(e => window.addEventListener(e, reset));
    timer = setTimeout(logout, INACTIVITY_TIMEOUT);

    return () => {
      clearTimeout(timer);
      events.forEach(e => window.removeEventListener(e, reset));
    };
  }, [session?.token, logout]);

  const login = useCallback((token: string, user: AdminUser) => {
    const s: AdminSession = {
      token,
      user,
      expiresAt: Date.now() + INACTIVITY_TIMEOUT,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    setSession(s);
  }, []);

  const updateUser = useCallback((user: AdminUser) => {
    setSession(prev => {
      if (!prev) return prev;
      const updated = { ...prev, user };
      localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AdminAuthContext.Provider value={{ session, isLoading, login, logout, updateUser }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
}
