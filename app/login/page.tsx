'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { SsoLoginButton } from 'gov-sso-login';
import { GovLogo } from '@/components/GovLogo';
import { getSsoConfig } from '@/lib/sso-config';

const SSO_FROM_KEY = 'gov_demo_sso_from';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const from = searchParams.get('from');

  useEffect(() => {
    void (async () => {
      try {
        const me = await fetch('/api/auth/me', { credentials: 'include', cache: 'no-store' });
        const data = await me.json().catch(() => ({}));
        if (me.ok && data.authenticated) router.replace(from && !from.startsWith('/login') ? from : '/layout/staff');
      } catch {}
    })();
  }, [router, from]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }}><div className="hero-grid" /></div>
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/40 bg-white/95 p-8 shadow-2xl">
        <div className="text-center">
          <GovLogo size={120} className="mx-auto" />
          <h1 className="mt-4 text-2xl font-extrabold text-[#060d26]">เข้าสู่ระบบเดโมภาครัฐ</h1>
          <p className="mt-2 text-sm text-[#707993]">ยืนยันตัวตนด้วย Gov Center SSO ก่อนใช้งาน</p>
        </div>
        {error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง</div>}
        <div className="mt-6">
          <SsoLoginButton
            config={getSsoConfig()}
            label="เข้าสู่ระบบด้วย Gov Center"
            className="w-full rounded-xl py-3.5 text-white font-semibold"
            style={{ background: 'var(--gradient-primary)' }}
            onBeforeLogin={() => { if (from) sessionStorage.setItem(SSO_FROM_KEY, from); else sessionStorage.removeItem(SSO_FROM_KEY); }}
          />
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<main className="flex min-h-screen items-center justify-center"><p className="text-sm text-[#707993]">กำลังโหลด...</p></main>}><LoginContent /></Suspense>;
}
