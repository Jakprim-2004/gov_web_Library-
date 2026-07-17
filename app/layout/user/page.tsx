'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserHeader, UserSidebar, SettingsPanel } from 'gov-layout';
import { useDemoAuth } from '@/lib/demo-auth';
import { DEMO_NOTIFICATIONS, USER_MENU } from '@/lib/demo-menu';

function UserLayoutContent() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const { user, isLoggedIn, isLoading, logout } = useDemoAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem('demo_theme');
    const savedFont = localStorage.getItem('demo_font_size');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    if (savedFont === 'sm' || savedFont === 'md' || savedFont === 'lg') {
      setFontSize(savedFont);
      document.documentElement.style.fontSize =
        savedFont === 'sm' ? '14px' : savedFont === 'lg' ? '18px' : '16px';
    }
  }, []);

  const onChangeTheme = (next: 'light' | 'dark') => {
    setTheme(next);
    localStorage.setItem('demo_theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const onChangeFont = (next: 'sm' | 'md' | 'lg') => {
    setFontSize(next);
    localStorage.setItem('demo_font_size', next);
    document.documentElement.style.fontSize =
      next === 'sm' ? '14px' : next === 'lg' ? '18px' : '16px';
  };

  if (isLoading) {
    return <main className="flex min-h-[60vh] items-center justify-center text-sm text-[#707993]">กำลังโหลด...</main>;
  }

  if (!isLoggedIn) return null;

  const displayUser = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    pictureUrl: user?.pictureUrl,
    subtitle: 'ผู้ใช้งานทั่วไป',
  };

  return (
    <>
      <UserHeader
        user={displayUser}
        notifications={DEMO_NOTIFICATIONS}
        onToggleSidebar={() => setSidebarOpen(true)}
        onMarkAllRead={() => alert('ทำเครื่องหมายอ่านทั้งหมด (เดโม)')}
        onNotificationClick={(n) => alert(`เปิดการแจ้งเตือน: ${n.title}`)}
        onProfile={() => router.push('/layout/user')}
      />

      <UserSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={displayUser}
        roleLabel="ผู้ใช้งานทั่วไป"
        menuItems={USER_MENU}
        onNavigate={(path) => {
          setSidebarOpen(false);
          router.push(path);
        }}
        onLogout={() => void logout()}
      />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:p-6 md:p-10">
        <section className="card-section p-6 md:p-8 mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#060d26]">หน้าเลย์เอาต์ผู้ใช้งานแบบครบฟังก์ชัน</h1>
          <p className="mt-2 text-sm text-[#707993]">หน้านี้รวม UserHeader, UserSidebar และแผงตั้งค่าการแสดงผลทั้งหมดไว้ในที่เดียว</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card-section p-6 md:p-8">
            <h2 className="text-lg font-bold text-[#060d26] mb-4">พรีวิวตัวอักษรและสี</h2>
            <p className="text-sm text-[#707993] mb-5">ลองปรับฟอนต์/ธีมจากแผงด้านขวา แล้วดูผลกับข้อความตัวอย่างด้านล่างทันที</p>

            <div className="space-y-4">
              <div className="rounded-xl border border-[#060d26]/8 bg-white p-4">
                <p className="typo-h3 text-text-primary">หัวข้อหลักสำหรับงานบริการภาครัฐ</p>
                <p className="typo-body text-text-tertiary mt-2">ข้อความเนื้อหาทั่วไปที่ใช้ในหน้าฟอร์ม รายการข้อมูล หรือแดชบอร์ดผู้ใช้งาน</p>
              </div>

              <div className="rounded-xl border border-[#060d26]/8 bg-white p-4">
                <p className="typo-menu text-text-secondary">เมนูที่เลือกอยู่: ข้อมูลส่วนตัว</p>
                <p className="typo-tags text-text-placeholder mt-2">ป้ายสถานะ: รอดำเนินการ</p>
              </div>
            </div>
          </div>

          <aside className="card-section p-6 md:p-8">
            <h2 className="text-lg font-bold text-[#060d26] mb-2">ตั้งค่าการแสดงผล</h2>
            <p className="text-xs text-[#707993] mb-4">รองรับการปรับขนาดตัวอักษรและสลับโหมดสี (สว่าง/มืด)</p>

            <div className="mb-5">
              <p className="text-sm font-semibold text-[#060d26] mb-2">โหมดสี</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => onChangeTheme('light')} className={`rounded-full px-3 py-1.5 text-xs font-semibold border ${theme === 'light' ? 'bg-[#1e7d55] text-white border-[#1e7d55]' : 'bg-white text-[#475272] border-[#060d26]/10'}`}>สว่าง</button>
                <button type="button" onClick={() => onChangeTheme('dark')} className={`rounded-full px-3 py-1.5 text-xs font-semibold border ${theme === 'dark' ? 'bg-[#1e7d55] text-white border-[#1e7d55]' : 'bg-white text-[#475272] border-[#060d26]/10'}`}>มืด</button>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-sm font-semibold text-[#060d26] mb-2">ขนาดตัวอักษร</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => onChangeFont('sm')} className={`rounded-full px-3 py-1.5 text-xs font-semibold border ${fontSize === 'sm' ? 'bg-[#1e7d55] text-white border-[#1e7d55]' : 'bg-white text-[#475272] border-[#060d26]/10'}`}>เล็ก</button>
                <button type="button" onClick={() => onChangeFont('md')} className={`rounded-full px-3 py-1.5 text-xs font-semibold border ${fontSize === 'md' ? 'bg-[#1e7d55] text-white border-[#1e7d55]' : 'bg-white text-[#475272] border-[#060d26]/10'}`}>กลาง</button>
                <button type="button" onClick={() => onChangeFont('lg')} className={`rounded-full px-3 py-1.5 text-xs font-semibold border ${fontSize === 'lg' ? 'bg-[#1e7d55] text-white border-[#1e7d55]' : 'bg-white text-[#475272] border-[#060d26]/10'}`}>ใหญ่</button>
              </div>
            </div>

            <SettingsPanel showTheme />
          </aside>
        </section>
      </main>
    </>
  );
}

export default function UserLayoutPage() {
  return (
    <Suspense fallback={<main className="flex min-h-[60vh] items-center justify-center text-sm text-[#707993]">กำลังโหลด...</main>}>
      <UserLayoutContent />
    </Suspense>
  );
}
