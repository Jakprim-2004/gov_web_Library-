'use client';

import Link from 'next/link';
import { GovLogo } from '@/components/GovLogo';
import { HeroSection } from '@/components/HeroSection';

const CARDS = [
  { href: '/tokens', title: 'ชุดโทเคนดีไซน์', subtitle: 'gov-token-css', desc: 'รวมสี ฟอนต์ ระยะห่าง และยูทิลิตี้ที่ใช้ได้ทันทีทั้งระบบ', badge: 'พื้นฐาน' },
  { href: '/layout/staff', title: 'เลย์เอาต์เจ้าหน้าที่', subtitle: 'gov-layout (Staff)', desc: 'โครงสร้างเมนูและหน้าจอหลังบ้านสำหรับงานภาครัฐ', badge: 'คอมโพเนนต์' },
  { href: '/layout/user', title: 'เลย์เอาต์ผู้ใช้งาน', subtitle: 'gov-layout (User)', desc: 'ส่วนหัว เมนู และการแจ้งเตือนสำหรับแอปประชาชน', badge: 'คอมโพเนนต์' },
  { href: '/sso', title: 'ระบบล็อกอิน SSO', subtitle: 'gov-sso-login', desc: 'เชื่อมต่อปุ่มเข้าสู่ระบบและ callback flow พร้อมใช้งานจริง', badge: 'ยืนยันตัวตน' },
  { href: '/guide', title: 'คู่มือการติดตั้ง', subtitle: 'Integration Guide', desc: 'อ่านขั้นตอนตั้งค่าและตัวอย่างการผสานระบบแบบครบถ้วน', badge: 'เอกสาร' },
];

const STATS = [
  { value: '3', label: 'แพ็กเกจหลัก' },
  { value: '33+', label: 'ไอคอน' },
  { value: '50+', label: 'โทเคนดีไซน์' },
  { value: 'v4', label: 'พร้อมใช้กับ Tailwind' },
];

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <div className="relative z-10 bg-[#fbfaf7] pb-10">
        <section className="hero-section">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-grid" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-28">
          <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <div className="hero-kicker animate-fade-in-up">Government UI Toolkit</div>
              <h1 className="hero-title animate-fade-in-up delay-100 mt-4 sm:mt-5">ออกแบบแอปภาครัฐ<span>ให้เร็วและสม่ำเสมอ</span></h1>
              <p className="hero-subtitle animate-fade-in-up delay-200 mt-4 sm:mt-6 max-w-xl">
                รวม <strong className="text-white/90">gov-token-css</strong>, <strong className="text-white/90">gov-layout</strong> และ <strong className="text-white/90">gov-sso-login</strong>
              </p>
              <div className="animate-fade-in-up delay-300 mt-6 sm:mt-8 flex flex-wrap gap-3">
                <Link href="/guide" className="btn-primary" style={{ fontSize: '15px', padding: '12px 28px' }}>เริ่มต้นใช้งาน</Link>
                <Link href="/tokens" className="btn-ghost text-white/80 border-white/25 hover:bg-white/10 hover:border-white/40" style={{ fontSize: '15px', padding: '12px 28px' }}>ดูโทเคนดีไซน์</Link>
              </div>
            </div>
            <div className="animate-fade-in-up delay-200">
              <div className="glass-dark rounded-[20px] sm:rounded-[28px] border border-white/10 p-4 sm:p-6 md:p-8 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/50">System Status</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Integration Ready</p>
                    <p className="mt-1 text-sm text-white/60">Layout, SSO, and token foundation are active.</p>
                  </div>
                  <GovLogo size={96} className="drop-shadow" />
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs text-white/60">Design Tokens</p><p className="mt-2 text-lg font-semibold text-white">Ready to Scale</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs text-white/60">SSO + Layout</p><p className="mt-2 text-lg font-semibold text-white">Production UX</p></div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up delay-400 mt-14 hero-metrics max-w-2xl">
            {STATS.map((stat) => (<div key={stat.label} className="hero-metric"><p>{stat.value}</p><p>{stat.label}</p></div>))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="animate-fade-in-up mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#0b1220]">สำรวจแต่ละโมดูล</h2>
          <p className="mt-1 text-sm text-[#5b6b80]">เลือกหน้าที่ต้องการเพื่อดูตัวอย่างการใช้งานจริง</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, index) => (
            <Link key={card.href} href={card.href} className="card-premium group p-6 animate-fade-in-up" style={{ animationDelay: `${Math.min((index + 1) * 100, 500)}ms` }}>
              <span className="badge badge-brand">{card.badge}</span>
              <h3 className="mt-3 text-lg font-bold text-[#0b1220] tracking-tight group-hover:text-[#1f6f5c] transition-colors">{card.title}</h3>
              <p className="text-xs font-medium text-[#1f6f5c]/70 mt-0.5">{card.subtitle}</p>
              <p className="mt-3 text-sm text-[#5b6b80] leading-relaxed">{card.desc}</p>
              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#1f6f5c] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">เปิดหน้าตัวอย่าง</div>
            </Link>
          ))}
        </div>
      </main>
      </div>
    </div>
  );
}
