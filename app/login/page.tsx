'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { SsoLoginButton } from 'gov-sso-login';
import { ssoConfig } from '@/lib/sso-config';
import { GovLogo } from '@/components/GovLogo';

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--gradient-hero)' }}>
        <div className="hero-grid" />
        <div className="hero-blob hero-blob-1" style={{ opacity: 0.06 }} />
        <div className="hero-blob hero-blob-2" style={{ opacity: 0.06 }} />
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #80d897 0%, transparent 70%)' }}
        />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-scale-in">
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4">
              <GovLogo size={128} className="mx-auto drop-shadow-md" />
            </div>
            <span className="badge badge-brand mb-2">Gov Center</span>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-[#060d26]">
              GOV Components Library
            </h1>
            <p className="mt-2 text-sm text-[#707993] leading-relaxed">
              เข้าสู่ระบบด้วย SSO ก่อนใช้งานตัวอย่าง
            </p>
          </div>

          {/* Divider */}
          <hr className="divider-gradient mb-6" />

          {/* Error Message */}
          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-xl border border-[#f21515]/15 bg-[#f21515]/5 px-4 py-3 animate-fade-in">
              <span className="text-sm">⚠️</span>
              <p className="text-xs font-medium text-[#f21515]">
                เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่
              </p>
            </div>
          )}

          {/* SSO Button from gov-sso-login README */}
          <SsoLoginButton
            config={ssoConfig}
            label="เข้าสู่ระบบด้วย Gov Center"
            icon=""
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-6 text-white font-semibold text-[15px] transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98] cursor-pointer"
            style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 16px rgba(30, 125, 85, 0.3)' }}
          />

          {/* Service Info */}
          <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#f0f4f2] px-4 py-2.5">
            <span className="text-xs">🔒</span>
            <span className="text-[11px] font-medium text-[#707993]">
              Service: <span className="text-[#1e7d55] font-semibold">webdemolibrary</span>
            </span>
          </div>

          <p className="mt-5 text-center text-[11px] text-[#707993]/70">
            หลัง login สำเร็จจะ redirect กลับมาที่ demo อัตโนมัติ
          </p>
        </div>

        {/* Bottom text */}
        <p className="mt-6 text-center text-[11px] text-white/30">
          Powered by GOV Components Library Monorepo
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center" style={{ background: 'var(--gradient-hero)' }}><p className="text-white/60">กำลังโหลด…</p></main>}>
      <LoginContent />
    </Suspense>
  );
}
