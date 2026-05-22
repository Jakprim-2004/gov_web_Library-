"use client";

import { useState } from 'react';
import Link from 'next/link';
import { CodeBlock } from '@/components/CodeBlock';
import { ReadmeViewer } from '@/components/ReadmeViewer';

const README_TABS = [
  { id: 'combined', label: 'รวมทั้งหมด' },
  { id: 'gov-layout', label: 'gov-layout' },
  { id: 'gov-sso-login', label: 'gov-sso-login' },
  { id: 'gov-token-css', label: 'gov-token-css' },
] as const;

const SECTIONS = [
  {
    id: 'install',
    icon: '',
    title: 'ติดตั้งทั้งสามแพ็กเกจ',
    step: '01',
    body: (
      <>
        <CodeBlock code="npm install gov-token-css gov-layout gov-sso-login" />
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#6982e1]/5 border border-[#6982e1]/10 px-4 py-3">
          <span className="text-sm shrink-0"></span>
          <p className="text-xs text-[#475272] leading-relaxed">
            ใน monorepo นี้ใช้{' '}
            <code className="rounded-md bg-white px-1.5 py-0.5 text-[11px] font-medium text-[#1e7d55]">
              file:../gov-*
            </code>{' '}
            ตาม demo/package.json
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'css',
    icon: '',
    title: 'gov-token-css — สีและ class',
    step: '02',
    body: (
      <div className="space-y-3">
        <p className="text-xs text-[#707993] leading-relaxed">
          `gov-token-css` มีทั้ง tokens, base, theme และ typography — ดูการ import แบบ modular ได้จาก{' '}
          <code className="rounded-md bg-[#f0f4f2] px-1.5 py-0.5 text-[11px] font-medium text-[#1e7d55]">
            gov-token-css/README.md
          </code>
        </p>
        {[
          {
            label: 'Brand',
            items: 'bg-brand-primary (#1e7d55), bg-brand-secondary, bg-brand-surface',
            color: '#1e7d55',
          },
          {
            label: 'ข้อความ',
            items: 'text-text-primary, text-text-secondary, text-text-tertiary, text-text-critical',
            color: '#060d26',
          },
          {
            label: 'ปุ่ม',
            items: 'bg-btn-primary hover:bg-btn-hover',
            color: '#1e7d55',
          },
          {
            label: 'สถานะ',
            items: 'bg-semantic-success, bg-semantic-warning, bg-semantic-critical',
            color: '#95c135',
          },
          {
            label: 'Typography',
            items: 'typo-h1 … typo-tags',
            color: '#6982e1',
            link: { href: '/tokens', text: '→ ดูตัวอย่าง' },
          },
          {
            label: 'ระยะห่าง',
            items: 'p-1x (8px), p-2x (16px), p-3x (24px), p-4x (32px)',
            color: '#f8842d',
          },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-start gap-3 rounded-xl bg-[#f8faf9] px-4 py-3 hover:bg-[#f0f4f2] transition-colors"
          >
            <div
              className="mt-0.5 h-3 w-3 rounded-full shrink-0"
              style={{ backgroundColor: row.color }}
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#060d26]">{row.label}</p>
              <p className="text-xs text-[#707993] mt-0.5">
                <code className="text-[11px]">{row.items}</code>
              </p>
              {row.link && (
                <Link href={row.link.href} className="text-[11px] font-medium text-[#1e7d55] hover:underline mt-1 inline-block">
                  {row.link.text}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'layout',
    title: 'gov-layout — Components',
    step: '03',
    body: (
      <div className="space-y-4">
        <p className="text-xs text-[#707993] leading-relaxed">
          `gov-layout` รวม StaffSidebar, UserHeader, UserSidebar, SettingsPanel, SettingsProvider และ Icons — ดู props/ตัวอย่างครบใน{' '}
          <code className="rounded-md bg-[#f0f4f2] px-1.5 py-0.5 text-[11px] font-medium text-[#1e7d55]">
            gov-layout/README.md
          </code>
        </p>
        <div className="overflow-hidden rounded-xl border border-[#060d26]/6">
          <table className="table-premium">
            <thead>
              <tr>
                <th>Component</th>
                <th>ใช้เมื่อ</th>
                <th>Demo</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'StaffSidebar', desc: 'เจ้าหน้าที่ — sidebar ซ้าย', link: '/layout/staff' },
                { name: 'UserHeader', desc: 'ผู้ใช้ — header + แจ้งเตือน', link: '/layout/user' },
                { name: 'UserSidebar', desc: 'เมนู slide-in ขวา', link: '' },
                { name: 'SettingsPanel', desc: 'ฟอนต์ + ธีม (ต้องมี SettingsProvider)', link: '' },
                { name: 'Icons.*', desc: 'ไอคอน built-in สำหรับเมนู', link: '/layout/staff' },
              ].map((row) => (
                <tr key={row.name}>
                  <td>
                    <code className="rounded-md bg-[#f0f4f2] px-2 py-0.5 text-[11px] font-semibold text-[#1e7d55]">
                      {row.name}
                    </code>
                  </td>
                  <td className="text-sm">{row.desc}</td>
                  <td>
                    {row.link ? (
                      <Link href={row.link} className="text-xs font-medium text-[#1e7d55] hover:underline">
                        {row.link}
                      </Link>
                    ) : (
                      <span className="text-xs text-[#707993]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: 'sso',
    icon: '',
    title: 'gov-sso-login',
    step: '04',
    body: (
      <div className="space-y-4">
        <p className="text-xs text-[#707993] leading-relaxed">
          `gov-sso-login` ครอบคลุม provider, button, callback handler, hooks และ core client พร้อม flow residence claim — ดูรายละเอียดทั้งหมดใน{' '}
          <code className="rounded-md bg-[#f0f4f2] px-1.5 py-0.5 text-[11px] font-medium text-[#1e7d55]">
            gov-sso-login/README.md
          </code>
        </p>
        <CodeBlock
          code={`// 1. Wrap Provider
<GovSsoProvider config={ssoConfig}>
  <SettingsProvider>{children}</SettingsProvider>
</GovSsoProvider>

// 2. ปุ่ม login
<SsoLoginButton />

// 3. หน้า callback
<SsoCallbackHandler onSuccess={...} onError={...} />

// next.config.ts
transpilePackages: ['gov-sso-login', 'gov-layout']`}
        />
        <div className="flex items-start gap-2 rounded-xl bg-[#f1be25]/5 border border-[#f1be25]/10 px-4 py-3">
          <span className="text-sm shrink-0">⚠️</span>
          <p className="text-xs text-[#475272] leading-relaxed">
            Backend ต้องมี <code className="font-semibold">POST /auth/sso-callback</code> + <code className="font-semibold">x-api-key</code> — และถ้าใช้ residence flow ให้ดูหัวข้อ Residence API Integration ใน README
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'stack',
    title: 'ประกอบกันใน app เดียว',
    step: '05',
    body: (
      <div className="space-y-3">
        <CodeBlock
          code={`app/
  globals.css          ← @import gov-token-css/*
  layout.tsx           ← GovSsoProvider + SettingsProvider
  login/page.tsx       ← SsoLoginButton
  auth/callback/       ← SsoCallbackHandler
  (protected)/layout   ← StaffSidebar หรือ UserHeader
                       ← ส่ง user จาก session หลัง SSO`}
        />
        <p className="text-xs text-[#707993] leading-relaxed">
          ถ้าต้องการอ่านฉบับเต็มของการประกอบใช้งานแต่ละแพ็กเกจ ให้เปิด README ของแต่ละตัว: `gov-token-css/README.md`, `gov-layout/README.md`, `gov-sso-login/README.md`
        </p>
      </div>
    ),
  },
];

export default function GuidePage() {
  const [readmeDoc, setReadmeDoc] = useState<(typeof README_TABS)[number]['id']>('combined');

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      {/* ──── Page Header ──── */}
      <header className="animate-fade-in-up mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#060d26]">
              คู่มือใช้งาน
            </h1>
            <p className="text-sm text-[#707993]">GOV Components Library Integration Guide</p>
          </div>
        </div>
        <p className="text-sm text-[#707993] max-w-2xl mt-2 leading-relaxed">
          สรุปสั้น — ฉบับเต็มอยู่ที่{' '}
          <code className="rounded-md bg-[#f0f4f2] px-1.5 py-0.5 text-xs font-medium text-[#1e7d55]">
            demo/USAGE-GUIDE.md
          </code>{' '}
          และ README ของแต่ละแพ็กเกจ: `gov-token-css/README.md`, `gov-layout/README.md`, `gov-sso-login/README.md`
        </p>
      </header>

      {/* ──── Quick Navigation ──── */}
      <nav className="animate-fade-in-up delay-100 mb-10 flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="pill-nav">
            <span>{s.icon}</span>
            {s.title}
          </a>
        ))}
      </nav>

      {/* ──── Steps ──── */}
      <div className="space-y-6">
        {SECTIONS.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={`scroll-mt-24 card-section overflow-hidden animate-fade-in-up delay-${(i + 1) * 100}`}
          >
            {/* Section Header */}
            <div className="flex items-center gap-4 border-b border-[#060d26]/5 px-6 py-4 md:px-8">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold text-white shrink-0"
                style={{ background: 'var(--gradient-primary)' }}
              >
                {s.step}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{s.icon}</span>
                <h2 className="text-lg font-bold tracking-tight text-[#060d26]">{s.title}</h2>
              </div>
            </div>

            {/* Section Body */}
            <div className="p-6 md:p-8">{s.body}</div>
          </section>
        ))}

        <section className="card-section overflow-hidden animate-fade-in-up delay-600">
          <div className="flex items-center gap-4 border-b border-[#060d26]/5 px-6 py-4 md:px-8">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold text-white shrink-0"
              style={{ background: 'var(--gradient-primary)' }}
            >
              06
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold tracking-tight text-[#060d26]">README แบบเต็ม</h2>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <p className="text-sm text-[#707993] mb-4">
              ด้านล่างคือเอกสาร README แบบเลือกดูได้ตามแพ็กเกจ
            </p>
            <div className="mb-5 flex flex-wrap gap-2">
              {README_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setReadmeDoc(tab.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors border ${
                    readmeDoc === tab.id
                      ? 'bg-[#1e7d55] text-white border-[#1e7d55]'
                      : 'bg-white text-[#475272] border-[#060d26]/10 hover:bg-[#f8faf9]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <ReadmeViewer doc={readmeDoc} />
          </div>
        </section>
      </div>
    </main>
  );
}
