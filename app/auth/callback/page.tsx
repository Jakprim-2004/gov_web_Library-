'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { SsoCallbackHandler } from 'gov-sso-login';
import { useDemoAuth } from '@/lib/demo-auth';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginFromResult } = useDemoAuth();
  const from = searchParams.get('from') || '/';

  return (
    <main className="flex min-h-screen items-center justify-center p-4x">
      <SsoCallbackHandler
        onSuccess={(result) => {
          loginFromResult(result);
          const isDefaultFrom = from === '/' || from.startsWith('/login');
          const target = isDefaultFrom ? '/layout/staff' : from;
          // ใช้ window.location.replace เพื่อบังคับ redirect แน่นอน
          setTimeout(() => {
            window.location.replace(target);
          }, 1200);
        }}
        onError={() => {
          setTimeout(() => {
            window.location.replace('/login?error=sso_failed');
          }, 2000);
        }}
      />
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<main className="p-4x typo-body">กำลังตรวจสอบ SSO…</main>}>
      <CallbackContent />
    </Suspense>
  );
}
