'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDemoAuth } from '@/lib/demo-auth';
import { GovLogo } from './GovLogo';

const LINKS = [
  { href: '/', label: 'หน้าแรก', icon: '' },
  { href: '/tokens', label: 'Design Tokens', icon: '' },
  { href: '/layout/staff', label: 'Layout เจ้าหน้าที่', icon: '' },
  { href: '/layout/user', label: 'Layout ผู้ใช้', icon: '' },
  { href: '/login', label: 'SSO', icon: '' },
  { href: '/guide', label: 'คู่มือใช้งาน', icon: '' },
];

export function DemoNav() {
  const pathname = usePathname();
  const { isLoggedIn, user, logout } = useDemoAuth();

  return (
    <nav className="nav-premium animate-fade-in-down">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mr-2 group">
          <GovLogo size={44} />
          <span className="text-base font-bold tracking-tight text-[#060d26] group-hover:text-[#1e7d55] transition-colors">
            GOV Demo
          </span>
        </Link>

        {/* Divider */}
        <div className="hidden md:block h-6 w-px bg-black/8" />

        {/* Nav Links */}
        <div className="flex flex-1 flex-wrap gap-1">
          {LINKS.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="mr-1.5 text-xs">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </div>


      </div>
    </nav>
  );
}
