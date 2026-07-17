'use client';

import { useState } from 'react';
import { useDemoAuth } from '@/lib/demo-auth';
import { ReadmeViewer } from '@/components/ReadmeViewer';
import { PageHeader } from '@/components/PageHeader';

export default function SsoShowcasePage() {
  const { user, ssoPayload, isLoggedIn } = useDemoAuth();
  const normalizedPayload = (ssoPayload as any)?.data || ssoPayload || {};
  const ssoUser = normalizedPayload?.user || {};
  const memberships: any[] = ssoUser.memberships || [];
  const residences: any[] = normalizedPayload?.residences || [];

  return (
    <div>
      <PageHeader
        eyebrow="gov-sso-login"
        title="SSO Login Showcase"
        description="Test the SSO login flow and inspect the user structure, permissions, and raw payload from IAM-GOV API."
      />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 pb-10 animate-fade-in-up">
        {isLoggedIn && ssoPayload ? (
          <div className="space-y-6">
            <section className="card-section p-6">
              <h2 className="text-lg font-bold text-[#060d26] mb-4">User Info</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DataField label="Name" value={ssoUser.name} />
                <DataField label="Email" value={ssoUser.email} />
                <DataField label="User ID" value={ssoUser.id} mono />
                <DataField label="System Role" value={ssoUser.systemRole} />
              </div>
            </section>

            <section className="card-section p-6">
              <h2 className="text-lg font-bold text-[#060d26] mb-4">Organization Permissions ({memberships.length})</h2>
              {memberships.length === 0 ? <EmptyState text="No membership data found" /> : (
                <div className="space-y-3">
                  {memberships.map((m: any, i: number) => (
                    <div key={m.id || i} className="rounded-xl border border-[#060d26]/10 bg-white p-4">
                      <p className="text-sm font-semibold text-[#060d26]">{m.municipality?.name || 'Unknown organization'}</p>
                      <p className="text-xs text-[#707993] mt-1">Role: {m.role || '-'} | Status: {m.isActive ? 'Active' : 'Inactive'}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="card-section p-6">
              <h2 className="text-lg font-bold text-[#060d26] mb-4">Registered Addresses ({residences.length})</h2>
              {residences.length === 0 ? <EmptyState text="No residence data found" /> : (
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
            <h2 className="text-lg font-bold text-[#060d26]">Not logged in</h2>
            <p className="text-sm text-[#707993] mt-2">Login first to view SSO data and the full payload.</p>
          </section>
        )}

        <section className="card-section p-6 md:p-8 mt-8">
          <h2 className="text-lg font-bold text-[#060d26] mb-4">README: gov-sso-login</h2>
          <ReadmeViewer doc="gov-sso-login" />
        </section>
      </main>
    </div>
  );
}

function DataField({ label, value, mono }: { label: string; value: any; mono?: boolean }) {
  const displayValue = value === null || value === undefined ? '(not specified)' : String(value);
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
        {expanded ? 'Collapse' : 'Show more'}
      </button>
    </div>
  );
}