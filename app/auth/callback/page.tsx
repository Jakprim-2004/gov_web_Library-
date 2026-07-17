'use client';

import { Suspense, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGovSsoCallback, type SsoCallbackResult } from 'gov-sso-login';
import { useDemoAuth } from '@/lib/demo-auth';

const SSO_FROM_KEY = 'gov_demo_sso_from';

async function hasActiveSession(): Promise<boolean> {
  try {
    const me = await fetch('/api/auth/me', { credentials: 'include', cache: 'no-store' });
    const data = await me.json().catch(() => ({}));
    return me.ok && data.authenticated === true;
  } catch {
    return false;
  }
}

function resolveTarget(searchParams: URLSearchParams, authenticated: boolean, options?: { failedExchange?: boolean }): string {
  const storedFrom = sessionStorage.getItem(SSO_FROM_KEY);
  sessionStorage.removeItem(SSO_FROM_KEY);
  const from = searchParams.get('from') || storedFrom;

  if (!authenticated) {
    const login = new URL('/login', window.location.origin);
    if (options?.failedExchange) login.searchParams.set('error', 'sso_failed');
    if (from && !from.startsWith('/login')) login.searchParams.set('from', from);
    return `${login.pathname}${login.search}`;
  }

  if (from && !from.startsWith('/login')) return from;
  return '/layout/staff';
}

function CallbackResumeSession() {
  const searchParams = useSearchParams();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    void (async () => {
      const ok = await hasActiveSession();
      window.location.replace(resolveTarget(searchParams, ok));
    })();
  }, [searchParams]);

  return <main className="flex min-h-screen items-center justify-center text-sm text-[#707993]">กำลังตรวจสอบ session...</main>;
}

function CallbackExchangeCode({ code }: { code: string }) {
  const searchParams = useSearchParams();
  const { loginFromResult } = useDemoAuth();
  const redirected = useRef(false);

  const finishRedirect = useCallback(async (result: SsoCallbackResult) => {
    if (redirected.current) return;
    redirected.current = true;

    loginFromResult(result);

    let authenticated = false;
    for (let attempt = 0; attempt < 8; attempt++) {
      if (await hasActiveSession()) {
        authenticated = true;
        break;
      }
      await new Promise((r) => setTimeout(r, 80 * (attempt + 1)));
    }

    window.location.replace(resolveTarget(searchParams, authenticated, { failedExchange: !authenticated }));
  }, [loginFromResult, searchParams]);

  const goLoginFailed = useCallback(async () => {
    if (redirected.current) return;
    if (await hasActiveSession()) {
      redirected.current = true;
      window.location.replace(resolveTarget(searchParams, true));
      return;
    }
    redirected.current = true;
    window.location.replace(resolveTarget(searchParams, false, { failedExchange: true }));
  }, [searchParams]);

  const { status, message } = useGovSsoCallback({
    code,
    onSuccess: (result) => { void finishRedirect(result); },
    onError: () => { void goLoginFailed(); },
  });

  const displayMessage = status === 'loading'
    ? 'กำลังยืนยันข้อมูลกับระบบ Gov Auth...'
    : status === 'error'
      ? message || 'เข้าสู่ระบบไม่สำเร็จ'
      : 'กำลังพาไปหน้าใช้งาน...';

  return <main className="flex min-h-screen items-center justify-center text-sm text-[#707993]">{displayMessage}</main>;
}

function CallbackContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code')?.trim();
  if (!code) return <CallbackResumeSession />;
  return <CallbackExchangeCode code={code} />;
}

export default function AuthCallbackPage() {
  return <Suspense fallback={<main className="flex min-h-screen items-center justify-center text-sm text-[#707993]">กำลังตรวจสอบ SSO...</main>}><CallbackContent /></Suspense>;
}
