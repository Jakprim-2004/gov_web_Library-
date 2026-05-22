import Link from 'next/link';
import { GovLogo } from '@/components/GovLogo';

const CARDS = [
  {
    href: '/tokens',
    title: 'Design Tokens',
    subtitle: 'gov-token-css',
    desc: 'สี, Typography, Spacing, Shadow — ดู swatch และ class ที่ใช้ได้ทั้งหมด',
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #1e7d55, #2aa876)',
    badge: 'Foundation',
    badgeClass: 'badge-brand',
  },
  {
    href: '/layout/staff',
    title: 'Staff Layout',
    subtitle: 'gov-layout (เจ้าหน้าที่)',
    desc: 'StaffSidebar, SettingsPanel, Icons — พร้อม auto-icon mapping',
    icon: '',
    gradient: 'linear-gradient(135deg, #6982e1, #8b9cf7)',
    badge: 'Components',
    badgeClass: 'badge-purple',
  },
  {
    href: '/layout/user',
    title: 'User Layout',
    subtitle: 'gov-layout (ผู้ใช้)',
    desc: 'UserHeader, UserSidebar, ระบบแจ้งเตือนพร้อมแท็บกรอง',
    icon: '',
    gradient: 'linear-gradient(135deg, #2aa876, #80d897)',
    badge: 'Components',
    badgeClass: 'badge-purple',
  },
  {
    href: '/sso',
    title: 'SSO Login',
    subtitle: 'gov-sso-login',
    desc: 'SsoLoginButton, GovSsoProvider, Callback flow — พร้อมใช้งาน',
    icon: '',
    gradient: 'linear-gradient(135deg, #f8842d, #f1be25)',
    badge: 'Auth',
    badgeClass: 'badge-amber',
  },
  {
    href: '/guide',
    title: 'คู่มือใช้งาน',
    subtitle: 'Integration Guide',
    desc: 'เอกสารภาษาไทย: วิธีติดตั้ง, class reference, component props ทั้งหมด',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    badge: 'Docs',
    badgeClass: 'badge-purple',
  },
];

const STATS = [
  { value: '3', label: 'Packages', icon: '📦' },
  { value: '33+', label: 'Icons', icon: '' },
  { value: '50+', label: 'Tokens', icon: '🎯' },
  { value: 'v4', label: 'Tailwind', icon: '🌊' },
];

export default function HomePage() {
  return (
    <div>
      {/* ──── Hero Section ──── */}
      <section className="hero-section">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-grid" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Logo + Badge */}
            <div className="animate-fade-in-up mb-6 flex items-center gap-4">
              <GovLogo size={300} className="drop-shadow-lg" />
              
            </div>

            {/* Title */}
            <h1 className="animate-fade-in-up delay-100 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl"
              style={{ lineHeight: '1.1' }}
            >
              GOV Components Library
              <span className="block mt-1 bg-gradient-to-r from-[#80d897] to-[#2aa876] bg-clip-text text-transparent">
                Design System
              </span>
            </h1>

            {/* Description */}
            <p className="animate-fade-in-up delay-200 mt-6 text-base md:text-lg text-white/60 leading-relaxed max-w-xl">
              เว็บตัวอย่างที่รวมทั้งสามแพ็กเกจ — <strong className="text-white/80">gov-token-css</strong>,{' '}
              <strong className="text-white/80">gov-layout</strong>,{' '}
              <strong className="text-white/80">gov-sso-login</strong> — ใช้เป็นจุดอ้างอิงตอน integrate กับ Next.js
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up delay-300 mt-8 flex flex-wrap gap-3">
              <Link href="/guide" className="btn-primary" style={{ fontSize: '15px', padding: '12px 28px' }}>
                เริ่มต้นใช้งาน
              </Link>
              <Link href="/tokens" className="btn-ghost text-white/80 border-white/15 hover:bg-white/8 hover:border-white/25" style={{ fontSize: '15px', padding: '12px 28px' }}>
                ดู Design Tokens
              </Link>
            </div>
          </div>

          {/* Stats Row */}
          <div className="animate-fade-in-up delay-400 mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 max-w-2xl">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 backdrop-blur-sm"
              >
                <span className="text-xl">{stat.icon}</span>
                <div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-[11px] text-white/50 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Main Content ──── */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Section Title */}
        <div className="animate-fade-in-up mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#060d26]">
            สำรวจ Components
          </h2>
          <p className="mt-1 text-sm text-[#707993]">
            เลือก package ที่ต้องการเพื่อดูตัวอย่างการใช้งานจริง
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Link
              key={card.href}
              href={card.href}
              className={`card-premium group p-6 animate-fade-in-up delay-${(i + 1) * 100}`}
            >
              {/* Content */}
              <h3 className="text-lg font-bold text-[#060d26] tracking-tight group-hover:text-[#1e7d55] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs font-medium text-[#1e7d55]/60 mt-0.5">
                {card.subtitle}
              </p>
              <p className="mt-3 text-sm text-[#707993] leading-relaxed">
                {card.desc}
              </p>

              {/* Arrow */}
              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#1e7d55] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                ดูตัวอย่าง
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* ──── Quick Start ──── */}
        <section className="mt-14 card-section animate-fade-in-up">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#060d26]">
                  Quick Start
                </h2>
                <p className="text-xs text-[#707993]">เริ่มต้นใน 3 ขั้นตอน</p>
              </div>
            </div>

            <div className="code-premium">
              <div className="code-dots">
                <span /><span /><span />
              </div>
              <pre>{`cd demo
cp .env.example .env.local   # ใส่ E_SERVICE_API_KEY + SESSION_SECRET
npm install
npm run dev
# 🚀 http://localhost:3100 → redirect ไป /login`}</pre>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-[#95c135]/20 bg-[#95c135]/5 px-4 py-2">
                <span className="text-xs font-medium text-[#475272]">SSO Ready</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[#6982e1]/20 bg-[#6982e1]/5 px-4 py-2">
                <span className="text-xs font-medium text-[#475272]">Dark Mode</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[#f1be25]/20 bg-[#f1be25]/5 px-4 py-2">
                <span className="text-xs font-medium text-[#475272]">Responsive</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
