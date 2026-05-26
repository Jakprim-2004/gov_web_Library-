import Link from 'next/link';
import { GovLogo } from '@/components/GovLogo';

const CARDS = [
  {
    href: '/tokens',
    title: 'Design Tokens',
    subtitle: 'gov-token-css',
    desc: 'สี, Typography, Spacing, Shadow — ดู swatch และ class ที่ใช้ได้ทั้งหมด',
    icon: '',
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
  { value: '3', label: 'Packages', icon: '' },
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

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-28">
          <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <div className="hero-kicker animate-fade-in-up">Government Design System</div>

              <h1 className="hero-title animate-fade-in-up delay-100 mt-4 sm:mt-5" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                GOV Components Library
                <span>Design System</span>
              </h1>

              <p className="hero-subtitle animate-fade-in-up delay-200 mt-4 sm:mt-6 max-w-xl">
                เว็บตัวอย่างที่รวมทั้งสามแพ็กเกจ — <strong className="text-white/90">gov-token-css</strong>,{' '}
                <strong className="text-white/90">gov-layout</strong>,{' '}
                <strong className="text-white/90">gov-sso-login</strong> — ใช้เป็นจุดอ้างอิงตอน integrate กับ Next.js
              </p>

              <div className="animate-fade-in-up delay-300 mt-6 sm:mt-8 flex flex-wrap gap-3">
                <Link href="/guide" className="btn-primary" style={{ fontSize: '15px', padding: '12px 28px' }}>
                  เริ่มต้นใช้งาน
                </Link>
                <Link
                  href="/tokens"
                  className="btn-ghost text-white/80 border-white/25 hover:bg-white/10 hover:border-white/40"
                  style={{ fontSize: '15px', padding: '12px 28px' }}
                >
                  ดู Design Tokens
                </Link>
              </div>
            </div>

            <div className="animate-fade-in-up delay-200">
              <div className="glass-dark rounded-[20px] sm:rounded-[28px] border border-white/10 p-4 sm:p-6 md:p-8 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/50">Government UI</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Integration Ready</p>
                    <p className="mt-1 text-sm text-white/60">มาตรฐานโทนราชการ + เอกสารไทยครบถ้วน</p>
                  </div>
                  <GovLogo size={96} className="drop-shadow" />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-white/60">Design Tokens</p>
                    <p className="mt-2 text-lg font-semibold text-white">Ready-to-scale</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-white/60">SSO + Layout</p>
                    <p className="mt-2 text-lg font-semibold text-white">Gov-grade UX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up delay-400 mt-14 hero-metrics max-w-2xl">
            {STATS.map((stat) => (
              <div key={stat.label} className="hero-metric">
                <p>{stat.value}</p>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Main Content ──── */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Section Title */}
        <div className="animate-fade-in-up mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#0b1220]">
            สำรวจ Components
          </h2>
          <p className="mt-1 text-sm text-[#5b6b80]">
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
              <h3 className="text-lg font-bold text-[#0b1220] tracking-tight group-hover:text-[#1f6f5c] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs font-medium text-[#1f6f5c]/70 mt-0.5">
                {card.subtitle}
              </p>
              <p className="mt-3 text-sm text-[#5b6b80] leading-relaxed">
                {card.desc}
              </p>

              {/* Arrow */}
              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#1f6f5c] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
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
                <h2 className="text-xl font-bold tracking-tight text-[#0b1220]">
                  Quick Start
                </h2>
                <p className="text-xs text-[#5b6b80]">เริ่มต้นใน 3 ขั้นตอน</p>
              </div>
            </div>

            <div className="code-premium">
              <div className="code-dots">
                <span /><span /><span />
              </div>
              <pre style={{ overflowX: 'auto', wordBreak: 'break-all', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{`cd demo
cp .env.example .env.local   # ใส่ E_SERVICE_API_KEY + SESSION_SECRET
npm install
npm run dev
# 🚀 http://localhost:3100 → redirect ไป /login`}</pre>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-[#1f6f5c]/15 bg-[#1f6f5c]/5 px-4 py-2">
                <span className="text-xs font-medium text-[#2a3b52]">SSO Ready</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[#2b7aa0]/20 bg-[#2b7aa0]/5 px-4 py-2">
                <span className="text-xs font-medium text-[#2a3b52]">Dark Mode</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[#c89b3c]/20 bg-[#c89b3c]/10 px-4 py-2">
                <span className="text-xs font-medium text-[#2a3b52]">Responsive</span>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
