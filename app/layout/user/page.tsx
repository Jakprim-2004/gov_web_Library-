'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserHeader, UserSidebar, SettingsPanel } from 'gov-layout';
import { useDemoAuth } from '@/lib/demo-auth';
import { DEMO_NOTIFICATIONS, USER_MENU } from '@/lib/demo-menu';

function UserLayoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const panel = searchParams.get('panel');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoggedIn, isLoading, logout } = useDemoAuth();

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center animate-fade-in">
          <div className="mx-auto mb-4 h-10 w-10 rounded-xl animate-pulse" style={{ background: 'var(--gradient-primary)' }} />
          <p className="text-sm text-[#707993]">กำลังโหลด…</p>
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  const displayUser = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    pictureUrl: user?.pictureUrl,
    subtitle: 'ผู้ใช้ทั่วไป',
  };

  return (
    <>
      <UserHeader
        user={displayUser}
        notifications={DEMO_NOTIFICATIONS}
        onToggleSidebar={() => setSidebarOpen(true)}
        onMarkAllRead={() => alert('mark all read (demo)')}
        onNotificationClick={(n) => alert(`เปิดแจ้งเตือน: ${n.title}`)}
        onProfile={() => router.push('/layout/user')}
      />
      <UserSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={displayUser}
        roleLabel="ผู้ใช้ทั่วไป"
        menuItems={USER_MENU}
        onNavigate={(path) => {
          setSidebarOpen(false);
          router.push(path);
        }}
        onLogout={() => void logout()}
      />

      <main className="p-6 md:p-10 mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="animate-fade-in-up mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div
              className=""
              style={{ background: 'linear-gradient(135deg, #2aa876, #80d897)' }}
            >
              
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#060d26]">
                UserHeader + UserSidebar
              </h1>
              <p className="text-sm text-[#707993]">gov-layout • ผู้ใช้</p>
            </div>
          </div>
          <p className="text-sm text-[#707993] max-w-xl leading-relaxed">
            กด ☰ มุมขวาบนเพื่อเปิด sidebar — กระดิ่งมีแท็บ ทั้งหมด / ต้องดำเนินการ / ทั่วไป
          </p>
        </div>

        <hr className="divider-gradient mb-8" />

        {/* Features Grid */}
        <section className="animate-fade-in-up delay-100 mb-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card-section p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl  text-base"></div>
                <h3 className="text-sm font-bold text-[#060d26]">Responsive Header</h3>
              </div>
              <p className="text-xs text-[#707993] leading-relaxed">
                UserHeader แสดงชื่อผู้ใช้, รูปโปรไฟล์ และปุ่ม hamburger menu
              </p>
            </div>

            <div className="card-section p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl  text-base"></div>
                <h3 className="text-sm font-bold text-[#060d26]">Notifications</h3>
              </div>
              <p className="text-xs text-[#707993] leading-relaxed">
                ระบบแจ้งเตือนพร้อมแท็บกรอง — ทั้งหมด / ต้องดำเนินการ / ทั่วไป
              </p>
            </div>

            <div className="card-section p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <h3 className="text-sm font-bold text-[#060d26]">Slide-in Sidebar</h3>
              </div>
              <p className="text-xs text-[#707993] leading-relaxed">
                UserSidebar เลื่อนเข้าจากขวา — โปรไฟล์, เมนู, ออกจากระบบ
              </p>
            </div>
          </div>
        </section>

        {/* Settings Panel */}
        {panel === 'settings' && (
          <section className="animate-fade-in-up delay-200 card-section p-6 max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f1be25]/10 text-base">⚙️</div>
              <h2 className="text-lg font-bold text-[#060d26]">SettingsPanel</h2>
            </div>
            <SettingsPanel showTheme />
          </section>
        )}
      </main>
    </>
  );
}

export default function UserLayoutPage() {
  return (
    <Suspense
      fallback={
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center animate-fade-in">
            <div className="mx-auto mb-4 h-10 w-10 rounded-xl animate-pulse" style={{ background: 'var(--gradient-primary)' }} />
            <p className="text-sm text-[#707993]">กำลังโหลด…</p>
          </div>
        </main>
      }
    >
      <UserLayoutContent />
    </Suspense>
  );
}
