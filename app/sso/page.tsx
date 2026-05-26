'use client';

import { useState } from 'react';
import { useDemoAuth } from '@/lib/demo-auth';
import { ReadmeViewer } from '@/components/ReadmeViewer';

export default function SsoShowcasePage() {
  const { user, ssoPayload, isLoggedIn, logout } = useDemoAuth();

  // ดึงข้อมูลจาก ssoPayload (ข้อมูลดิบจาก IAM-GOV API)
  const normalizedPayload = (ssoPayload as any)?.data || ssoPayload || {};
  const ssoUser = normalizedPayload?.user || {};
  const memberships: any[] = ssoUser.memberships || [];
  const residences: any[] = normalizedPayload?.residences || [];

  return (
    <main className="mx-auto max-w-5xl p-6 md:p-10 animate-fade-in-up">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#060d26]">
              SSO Login Package
            </h1>
            <p className="text-sm text-[#707993]">gov-sso-login • Authentication</p>
          </div>
        </div>
        <p className="text-[#475272] leading-relaxed max-w-2xl">
          แพ็กเกจสำหรับเชื่อมต่อระบบยืนยันตัวตน (SSO) ของรัฐ ครอบคลุมตั้งแต่ปุ่มเข้าสู่ระบบ, 
          การจัดการ Callback, และ Context Provider ที่พร้อมใช้งานทันที
        </p>
      </div>

      <hr className="divider-gradient mb-8" />

      {/* ── Logged in: Full SSO Data ── */}
      {isLoggedIn && ssoPayload ? (
        <>
          {/* User Profile Card */}
          <section className="mb-10 animate-fade-in-up delay-100">
            <SectionHeader
              emoji=""
              title="ข้อมูลผู้ใช้ปัจจุบันที่ได้จากการล็อกอิน"
              subtitle="ข้อมูลจาก IAM-GOV API"
              accentBg="rgba(30, 125, 85, 0.05)"
              accentBorder="#1e7d55"
            />
            <div className="rounded-2xl border border-[#1e7d55]/20 p-6 bg-gradient-to-br from-[#1e7d55]/5 to-transparent">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {ssoUser.avatarUrl ? (
                    <img
                      src={ssoUser.avatarUrl}
                      alt="avatar"
                      className="h-20 w-20 rounded-2xl object-cover border-2 border-[#1e7d55]/20"
                    />
                  ) : (
                    <div
                      className="h-20 w-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #6982e1, #8b9cf7)' }}
                    >
                      {(ssoUser.name || user?.firstName || '?')[0]}
                    </div>
                  )}
                </div>

                {/* User Fields */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 w-full">
                  <DataField label="ID (จาก IAM-GOV)" value={ssoUser.id} mono />
                  <DataField label="ชื่อ (name)" value={ssoUser.name} />
                  <DataField label="อีเมล (email)" value={ssoUser.email} />
                  <DataField label="System Role" value={ssoUser.systemRole} badge />
                  <DataField label="Avatar URL" value={ssoUser.avatarUrl || '(ไม่มี)'} muted={!ssoUser.avatarUrl} />
                </div>
              </div>
            </div>
          </section>

          {/* Memberships */}
          <section className="mb-10 animate-fade-in-up delay-200">
            {memberships.length === 0 ? (
              <EmptyState text="ไม่พบข้อมูล membership" />
            ) : (
              <div className="space-y-4">
                {memberships.map((m: any, i: number) => (
                  <div
                    key={m.id || i}
                    className="rounded-2xl border border-[#060d26]/6 bg-white p-6 shadow-sm"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#060d26]/5">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#060d26]">
                          {m.municipality?.name || 'ไม่ระบุองค์กร'}
                        </h3>
                        <p className="text-xs text-[#707993] font-mono">ID: {m.id}</p>
                      </div>
                      <div className="ml-auto">
                        <StatusBadge active={m.isActive} />
                      </div>
                    </div>

                    {/* Membership Detail Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-4">
                      <DataField label="Role" value={m.role} badge />
                      <DataField label="สถานะ" value={m.isActive ? 'Active' : 'Inactive'} />
                      <DataField label="เข้าร่วมเมื่อ" value={formatDate(m.joinedAt)} />
                      <DataField label="User ID" value={m.userId} mono />
                      <DataField label="Municipality ID" value={m.municipalityId} mono />
                    </div>

                    {/* Municipality Info */}
                    {m.municipality && (
                      <div className="mt-4 rounded-xl bg-[#f8fafc] border border-[#060d26]/4 p-4">
                        <h4 className="text-xs font-bold text-[#475272] uppercase tracking-wider mb-3 flex items-center gap-2">
                          📍 ข้อมูลองค์กร (Municipality)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                          <DataField label="ID" value={m.municipality.id} mono />
                          <DataField label="ชื่อ" value={m.municipality.name} />
                          <DataField label="Slug" value={m.municipality.slug} mono />
                          <DataField label="ละติจูด" value={m.municipality.latitude ?? '(ไม่มี)'} muted={!m.municipality.latitude} />
                          <DataField label="ลองจิจูด" value={m.municipality.longitude ?? '(ไม่มี)'} muted={!m.municipality.longitude} />
                        </div>

                        {/* Province */}
                        {m.municipality.province && (
                          <div className="mt-3 pt-3 border-t border-[#060d26]/5">
                            <h5 className="text-xs font-semibold text-[#707993] mb-2 flex items-center gap-1.5">
                              🗺️ จังหวัด (Province)
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
                              <DataField label="ID" value={m.municipality.province.id} />
                              <DataField label="ชื่อ (TH)" value={m.municipality.province.nameTh} />
                              <DataField label="ชื่อ (EN)" value={m.municipality.province.nameEn} />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Service Access */}
                    <div className="mt-4">
                      <h4 className="text-xs font-bold text-[#475272] uppercase tracking-wider mb-2 flex items-center gap-2">
                        🔑 สิทธิ์การเข้าถึงบริการ (Service Access)
                      </h4>
                      {m.serviceAccess && m.serviceAccess.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {m.serviceAccess.map((sa: any, j: number) => (
                            <span
                              key={j}
                              className="inline-block rounded-lg bg-[#6982e1]/10 px-3 py-1.5 text-xs font-medium text-[#6982e1]"
                            >
                              {typeof sa === 'string' ? sa : JSON.stringify(sa)}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-[#707993] italic">ไม่มีข้อมูล service access</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Residences */}
          <section className="mb-10 animate-fade-in-up delay-300">
            {residences.length === 0 ? (
              <EmptyState text="ไม่พบข้อมูล residences" />
            ) : (
              <div className="space-y-3">
                {residences.map((r: any, i: number) => (
                  <div key={i} className="rounded-2xl border border-[#060d26]/6 bg-white p-5 shadow-sm">
                    <ExpandableJson data={r} tone="light" />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Raw SSO Payload */}
          <section className="mb-10 animate-fade-in-up delay-400">
            <SectionHeader
              emoji=""
              title="Raw SSO Payload"
              subtitle="ข้อมูลดิบทั้งหมดที่ได้จาก IAM-GOV API (JSON)"
            />
            <div className="rounded-2xl border border-[#060d26]/6 bg-[#0f172a] p-6 shadow-sm">
              <ExpandableJson data={ssoPayload} tone="dark" />
            </div>
          </section>

          {/* Session User (Mapped) */}
          <section className="mb-10 animate-fade-in-up delay-500">
            <SectionHeader
              emoji="🔐"
              title="Session User (Mapped)"
              subtitle="ข้อมูลผู้ใช้ที่ถูก map แล้วและเก็บใน session cookie"
            />
            <div className="rounded-2xl border border-[#6982e1]/15 bg-[#6982e1]/5 p-6 shadow-sm">
              <ExpandableJson data={user} tone="light" />
            </div>
          </section>

          <hr className="divider-gradient mb-8" />
        </>
      ) : (
        <section className="mb-12 animate-fade-in-up delay-100">
          <div className="rounded-2xl border border-dashed border-[#060d26]/20 p-8 text-center bg-[#f8f9fa]">
            <h2 className="text-lg font-bold text-[#060d26] mb-2">ยังไม่ได้เข้าสู่ระบบ</h2>
            <p className="text-sm text-[#707993] max-w-md mx-auto">
              คุณยังไม่ได้ล็อกอิน หากเข้าสู่ระบบแล้วข้อมูลโปรไฟล์ที่ได้จาก SSO จะถูกนำมาแสดงผลที่นี่
            </p>
          </div>
        </section>
      )}

      {/* ── README Documentation ── */}
      <section className="mb-12 animate-fade-in-up delay-200">
        <div className="mb-4 flex items-center gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#060d26]">README: gov-sso-login</h2>
            <p className="text-xs text-[#707993]">แสดงเอกสาร README แบบเดียวกับหน้า SSO showcase</p>
          </div>
        </div>
        <div className="card-section p-6 md:p-10">
          <ReadmeViewer doc="gov-sso-login" />
        </div>
      </section>
    </main>
  );
}

/* ── Helper Components ── */

function SectionHeader({
  emoji,
  title,
  subtitle,
  accentBg,
  accentBorder,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  accentBg?: string;
  accentBorder?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div>
        <h2 className="text-lg font-bold text-[#060d26]">{title}</h2>
        <p className="text-xs text-[#707993]">{subtitle}</p>
      </div>
    </div>
  );
}

function DataField({
  label,
  value,
  mono,
  badge,
  muted,
}: {
  label: string;
  value: any;
  mono?: boolean;
  badge?: boolean;
  muted?: boolean;
}) {
  const displayValue = value === null || value === undefined ? '(null)' : String(value);

  return (
    <div>
      <dt className="text-[10px] font-semibold text-[#707993] uppercase tracking-wider mb-0.5">
        {label}
      </dt>
      <dd className="text-sm">
        {badge ? (
          <span className="inline-block rounded-md bg-[#6982e1]/10 px-2.5 py-0.5 text-xs font-bold text-[#6982e1]">
            {displayValue}
          </span>
        ) : (
          <span
            className={`${mono ? 'font-mono text-xs' : 'font-medium'} ${
              muted ? 'text-[#707993] italic' : 'text-[#060d26]'
            }`}
          >
            {displayValue}
          </span>
        )}
      </dd>
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
      style={{
        background: active ? 'rgba(30, 125, 85, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        color: active ? '#1e7d55' : '#ef4444',
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: active ? '#1e7d55' : '#ef4444' }}
      />
      {active ? 'Active' : 'Inactive'}
    </span>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#060d26]/10 bg-[#f8fafc] p-8 text-center">
      <p className="text-sm text-[#707993]">{text}</p>
    </div>
  );
}

function ExpandableJson({ data, tone }: { data: unknown; tone: 'light' | 'dark' }) {
  const [expanded, setExpanded] = useState(false);
  const textClass = tone === 'dark' ? 'text-white/90' : 'text-[#475272]';
  const buttonClass =
    tone === 'dark'
      ? 'border-white/15 text-white/70 hover:border-white/35 hover:text-white'
      : 'border-[#0b1220]/10 text-[#2a3b52] hover:border-[#1f6f5c]/30 hover:text-[#1f6f5c]';

  return (
    <div>
      <div
        className={`font-mono text-xs whitespace-pre-wrap leading-relaxed overflow-auto ${textClass}`}
        style={{ maxHeight: expanded ? 520 : 220, overflow: expanded ? 'auto' : 'hidden' }}
      >
        {JSON.stringify(data, null, 2)}
      </div>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className={`mt-3 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${buttonClass}`}
      >
        {expanded ? 'ย่อ' : 'แสดงเพิ่มเติม'}
      </button>
    </div>
  );
}

function formatDate(isoDate: string | null | undefined): string {
  if (!isoDate) return '(ไม่ระบุ)';
  try {
    return new Date(isoDate).toLocaleString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoDate;
  }
}
