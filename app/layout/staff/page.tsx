'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SettingsPanel } from 'gov-layout';
import { useDemoAuth } from '@/lib/demo-auth';

function StaffLayoutContent() {
  const searchParams = useSearchParams();
  const panel = searchParams.get('panel');
  const { user, ssoPayload, isLoggedIn, isLoading } = useDemoAuth();

  if (isLoading) return <main className="flex min-h-[60vh] items-center justify-center text-sm text-[#707993]">กำลังโหลด...</main>;
  if (!isLoggedIn) return null;

  const normalizedPayload = (ssoPayload as any)?.data || ssoPayload || {};
  const ssoUser = normalizedPayload?.user || {};
  const memberships: any[] = ssoUser.memberships || [];

  return (
    <main className="flex-1 max-w-5xl px-4 py-6 sm:p-6 md:p-10">
      <section className="card-section p-6 md:p-8 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#060d26]">แดชบอร์ดเจ้าหน้าที่</h1>
        <p className="mt-2 text-sm text-[#707993]">แสดงข้อมูลผู้ใช้งานและสิทธิ์ที่ได้จาก SSO</p>
      </section>

      <section className="card-section p-6 mb-6">
        <h2 className="text-lg font-bold text-[#060d26] mb-3">ข้อมูลบัญชี</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p><span className="text-[#707993]">ชื่อ:</span> {ssoUser.name || '-'}</p>
          <p><span className="text-[#707993]">อีเมล:</span> {ssoUser.email || '-'}</p>
          <p><span className="text-[#707993]">User ID:</span> <span className="font-mono">{ssoUser.id || '-'}</span></p>
          <p><span className="text-[#707993]">Role:</span> {ssoUser.systemRole || '-'}</p>
        </div>
      </section>

      <section className="card-section p-6">
        <h2 className="text-lg font-bold text-[#060d26] mb-3">สิทธิ์หน่วยงาน ({memberships.length})</h2>
        <div className="space-y-2">
          {memberships.length === 0 && <p className="text-sm text-[#707993]">ไม่พบข้อมูล membership</p>}
          {memberships.map((m: any, i: number) => (
            <div key={m.id || i} className="rounded-xl border border-[#060d26]/10 bg-white px-4 py-3 text-sm">
              {m.municipality?.name || 'ไม่ระบุหน่วยงาน'} - {m.role || '-'}
            </div>
          ))}
        </div>
      </section>

      {panel === 'settings' && (
        <section className="card-section p-6 max-w-md mt-6">
          <h2 className="text-lg font-bold text-[#060d26] mb-4">ตั้งค่า</h2>
          <SettingsPanel showTheme={false} />
        </section>
      )}
    </main>
  );
}

export default function StaffLayoutPage() {
  return <Suspense fallback={<main className="flex min-h-[60vh] items-center justify-center text-sm text-[#707993]">กำลังโหลด...</main>}><StaffLayoutContent /></Suspense>;
}
