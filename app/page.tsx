'use client';

import Link from 'next/link';
import { HeroSection } from '@/components/HeroSection';

const CARDS = [
  { href: '/tokens', title: 'Design Tokens', subtitle: 'gov-token-css', desc: 'Colors, fonts, spacing, and utilities ready to use across your entire system.', badge: 'Foundation' },
  { href: '/layout/staff', title: 'Staff Layout', subtitle: 'gov-layout (Staff)', desc: 'Sidebar, menu structure and back-office screens for government staff.', badge: 'Component' },
  { href: '/layout/user', title: 'User Layout', subtitle: 'gov-layout (User)', desc: 'Header, navigation, and notifications for citizen-facing apps.', badge: 'Component' },
  { href: '/sso', title: 'SSO Login', subtitle: 'gov-sso-login', desc: 'Connect login buttons and the callback flow, ready for production.', badge: 'Auth' },
  { href: '/guide', title: 'Integration Guide', subtitle: 'Usage Guide', desc: 'Step-by-step setup and full integration examples.', badge: 'Docs' },
];

const STATS = [
  { value: '3', label: '3 Core Packages' },
  { value: '33+', label: 'Icons' },
  { value: '50+', label: 'Design Tokens' },
  { value: 'v4', label: 'Tailwind Ready' },
];

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <div className="relative z-10 bg-[#fbfaf7] pb-16">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="animate-fade-in-up mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#1f6f5c] font-semibold mb-2">Explore</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0b1220]">Choose what you need</h2>
            <p className="mt-2 text-sm text-[#5b6b80]">Each package works independently or together as a complete system.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card, index) => (
              <Link
                key={card.href}
                href={card.href}
                className="card-premium group p-6 animate-fade-in-up"
                style={{ animationDelay: `${Math.min((index + 1) * 100, 500)}ms` }}
              >
                <span className="badge badge-brand">{card.badge}</span>
                <h3 className="mt-3 text-lg font-bold text-[#0b1220] tracking-tight group-hover:text-[#1f6f5c] transition-colors">{card.title}</h3>
                <p className="text-xs font-medium text-[#1f6f5c]/70 mt-0.5">{card.subtitle}</p>
                <p className="mt-3 text-sm text-[#5b6b80] leading-relaxed">{card.desc}</p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#1f6f5c] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                  Open example page
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in-up delay-400">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[#0b1220]/8 bg-white p-5 text-center shadow-sm">
                <p className="text-2xl font-bold text-[#1f6f5c]">{stat.value}</p>
                <p className="mt-1 text-xs text-[#5b6b80] uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}