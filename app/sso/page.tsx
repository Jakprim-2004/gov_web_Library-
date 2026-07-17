'use client';

import { useState } from 'react';
import { useDemoAuth } from '@/lib/demo-auth';
import { ReadmeViewer } from '@/components/ReadmeViewer';

export default function SsoShowcasePage() {
  const { user, ssoPayload, isLoggedIn } = useDemoAuth();
  const normalizedPayload = (ssoPayload as any)?.data || ssoPayload || {};
  const ssoUser = normalizedPayload?.user || {};
  const memberships: any[] = ssoUser.memberships || [];
  const residences: any[] = normalizedPayload?.residences || [];

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 md:py-10 animate-fade-in-up">
      <header className="card-section p-6 md:p-8 mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-[#1f6f5c]">SSO Showcase</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#060d26]">แพ็กเกจล็อกอินภาครัฐ</h1>
        <p className="mt-3 text-sm text-[#5b6b80] leading-relaxed">
          หน้านี้ใช้ข้อมูลที่ได้จาก IAM-GOV API หลังล็อกอินสำเร็จ เพื่อทดสอบโครงสร้างผู้ใช้ สิทธิ์การเข้าถึง และข้อมูลดิบสำหรับดีบัก
        </p>
      </header>

      {isLoggedIn && ssoPayload ? (
        <div className="space-y-6">
          <section className="card-section p-6">
            <h2 className="text-lg font-bold text-[#060d26] mb-4">ข้อมูลผู้ใช้</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DataField label="ชื่อ" value={ssoUser.name} />
              <DataField label="อีเมล" value={ssoUser.email} />
              <DataField label="รหัสผู้ใช้" value={ssoUser.id} mono />
              <DataField label="System Role" value={ssoUser.systemRole} />
            </div>
          </section>

          <section className="card-section p-6">
            <h2 className="text-lg font-bold text-[#060d26] mb-4">สิทธิ์หน่วยงาน ({memberships.length})</h2>
            {memberships.length === 0 ? <EmptyState text="ไม่พบข้อมูล membership" /> : (
              <div className="space-y-3">
                {memberships.map((m: any, i: number) => (
                  <div key={m.id || i} className="rounded-xl border border-[#060d26]/10 bg-white p-4">
                    <p className="text-sm font-semibold text-[#060d26]">{m.municipality?.name || 'ไม่ระบุหน่วยงาน'}</p>
                    <p className="text-xs text-[#707993] mt-1">Role: {m.role || '-'} | สถานะ: {m.isActive ? 'ใช้งาน' : 'ไม่ใช้งาน'}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="card-section p-6">
            <h2 className="text-lg font-bold text-[#060d26] mb-4">ที่อยู่ตามทะเบียน ({residences.length})</h2>
            {residences.length === 0 ? <EmptyState text="ไม่พบข้อมูล residences" /> : (
              <div className="space-y-3">
                {residences.map((r: any, i: number) => (
                  <div key={i} className="rounded-xl border border-[#060d26]/10 bg-white p-4">
                    <ExpandableJson data={r} tone="light" />
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="card-section p-6">
            <h2 className="text-lg font-bold text-[#060d26] mb-4">Raw SSO Payload</h2>
            <div className="rounded-xl border border-[#060d26]/10 bg-[#0f172a] p-4">
              <ExpandableJson data={ssoPayload} tone="dark" />
            </div>
          </section>

          <section className="card-section p-6">
            <h2 className="text-lg font-bold text-[#060d26] mb-4">Session User (Mapped)</h2>
            <ExpandableJson data={user} tone="light" />
          </section>
        </div>
      ) : (
        <section className="card-section p-8 text-center">
          <h2 className="text-lg font-bold text-[#060d26]">ยังไม่ได้เข้าสู่ระบบ</h2>
          <p className="text-sm text-[#707993] mt-2">ล็อกอินก่อนเพื่อดูข้อมูลจาก SSO และ payload แบบเต็ม</p>
        </section>
      )}

      <section className="card-section p-6 md:p-8 mt-8">
        <h2 className="text-lg font-bold text-[#060d26] mb-4">README: gov-sso-login</h2>
        <ReadmeViewer doc="gov-sso-login" />
      </section>
    </main>
  );
}

function DataField({ label, value, mono }: { label: string; value: any; mono?: boolean }) {
  const displayValue = value === null || value === undefined ? '(ไม่ระบุ)' : String(value);
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-[#707993]">{label}</p>
      <p className={`mt-1 text-sm text-[#060d26] ${mono ? 'font-mono' : ''}`}>{displayValue}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className="text-sm text-[#707993]">{text}</p>;
}

function ExpandableJson({ data, tone }: { data: unknown; tone: 'light' | 'dark' }) {
  const [expanded, setExpanded] = useState(false);
  const textClass = tone === 'dark' ? 'text-white/90' : 'text-[#475272]';

  return (
    <div>
      <div className={`font-mono text-xs whitespace-pre-wrap leading-relaxed ${textClass}`} style={{ maxHeight: expanded ? 520 : 220, overflow: expanded ? 'auto' : 'hidden', overflowWrap: 'break-word' }}>
        {JSON.stringify(data, null, 2)}
      </div>
      <button type="button" onClick={() => setExpanded((prev) => !prev)} className="mt-3 rounded-full border border-[#0b1220]/15 px-3 py-1 text-[11px] font-semibold text-[#2a3b52]">
        {expanded ? 'ย่อข้อมูล' : 'ดูข้อมูลเพิ่มเติม'}
      </button>
    </div>
  );
}
