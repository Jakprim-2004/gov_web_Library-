'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GovLogo } from './GovLogo';

const LINKS = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/tokens', label: 'โทเคนดีไซน์' },
  { href: '/layout/staff', label: 'เลย์เอาต์เจ้าหน้าที่' },
  { href: '/layout/user', label: 'เลย์เอาต์ผู้ใช้' },
  { href: '/login', label: 'เข้าสู่ระบบ' },
  { href: '/guide', label: 'คู่มือ' },
  { href: '/setting', label: 'ตั้งค่า' },
] as const;

export function DemoNav() {
  const pathname = usePathname();

  return (
    <nav className="nav-premium animate-fade-in-down">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
        <Link href="/" className="flex items-center gap-2.5 mr-2 group">
          <GovLogo size={44} />
          <span className="text-base font-bold tracking-tight text-[#060d26] group-hover:text-[#1e7d55] transition-colors">
            GOV Demo
          </span>
        </Link>

        <div className="hidden md:block h-6 w-px bg-black/8" />

        <div className="flex flex-1 flex-wrap gap-1">
          {LINKS.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={`nav-link ${isActive ? 'active' : ''}`}>
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
