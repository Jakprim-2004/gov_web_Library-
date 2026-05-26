'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import type { SsoCallbackResult, SsoUser } from 'gov-sso-login';

type DemoAuthContextValue = {
  user: SsoUser | null;
  ssoPayload: Record<string, unknown> | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
  loginFromResult: (result: SsoCallbackResult) => void;
  logout: () => Promise<void>;
};

const SSO_PAYLOAD_KEY = 'gov_demo_sso_payload';

const DemoAuthContext = createContext<DemoAuthContextValue | null>(null);

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<SsoUser | null>(null);
  const [ssoPayload, setSsoPayload] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.authenticated) {
        setUser(null);
        setSsoPayload(null);
        sessionStorage.removeItem(SSO_PAYLOAD_KEY);
        return;
      }
      setUser(data.user ?? null);
      const cached = sessionStorage.getItem(SSO_PAYLOAD_KEY);
      if (cached) {
        const cachedPayload = JSON.parse(cached) as Record<string, unknown>;
        const hasResidences = Array.isArray((data.ssoPayload as any)?.residences);
        setSsoPayload(hasResidences ? (data.ssoPayload ?? null) : cachedPayload);
      } else {
        setSsoPayload(data.ssoPayload ?? null);
      }
    } catch {
      setUser(null);
      setSsoPayload(null);
    }
  }, []);

  useEffect(() => {
    refreshSession().finally(() => setIsLoading(false));
  }, [refreshSession]);

  const loginFromResult = useCallback(
    (result: SsoCallbackResult) => {
      if (result.user) setUser(result.user);
      if (result.ssoPayload) {
        setSsoPayload(result.ssoPayload as Record<string, unknown>);
        sessionStorage.setItem(SSO_PAYLOAD_KEY, JSON.stringify(result.ssoPayload));
      }
      void refreshSession();
    },
    [refreshSession],
  );

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
    setSsoPayload(null);
    sessionStorage.removeItem(SSO_PAYLOAD_KEY);
    router.push('/login');
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      ssoPayload,
      isLoggedIn: !!user,
      isLoading,
      refreshSession,
      loginFromResult,
      logout,
    }),
    [user, ssoPayload, isLoading, refreshSession, loginFromResult, logout],
  );

  return (
    <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>
  );
}

export function useDemoAuth() {
  const ctx = useContext(DemoAuthContext);
  if (!ctx) throw new Error('useDemoAuth ต้องใช้ภายใน DemoAuthProvider');
  return ctx;
}
