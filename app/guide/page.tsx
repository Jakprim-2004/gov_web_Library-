'use client';

import { useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ReadmeViewer } from '@/components/ReadmeViewer';
import { PageHeader } from '@/components/PageHeader';

const README_TABS = [
  { id: 'combined', label: 'All Packages' },
  { id: 'gov-layout', label: 'gov-layout' },
  { id: 'gov-sso-login', label: 'gov-sso-login' },
  { id: 'gov-token-css', label: 'gov-token-css' },
] as const;

export default function GuidePage() {
  const [readmeDoc, setReadmeDoc] = useState<(typeof README_TABS)[number]['id']>('combined');

  return (
    <div>
      <PageHeader
        eyebrow="Integration Guide"
        title="Getting Started"
        description="Step-by-step setup and integration examples for gov-token-css, gov-layout, and gov-sso-login."
      />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 pb-12">
        <section className="card-section p-6 mb-6">
          <h2 className="text-lg font-bold text-[#060d26] mb-4">Install packages</h2>
          <CodeBlock code="npm install gov-token-css gov-layout gov-sso-login" />
        </section>

        <section className="card-section p-6 mb-6">
          <h2 className="text-lg font-bold text-[#060d26] mb-4">Configure globals.css</h2>
          <CodeBlock code={`@import "tailwindcss";\n@import "gov-token-css/tokens";\n@import "gov-token-css/base";\n@import "gov-token-css/theme";\n@import "gov-token-css/typography";`} />
        </section>

        <section className="card-section p-6">
          <h2 className="text-lg font-bold text-[#060d26] mb-4">Full README</h2>
          <div className="mb-4 flex flex-wrap gap-2">
            {README_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setReadmeDoc(tab.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold border ${readmeDoc === tab.id ? 'bg-[#1e7d55] text-white border-[#1e7d55]' : 'bg-white text-[#475272] border-[#060d26]/10'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <ReadmeViewer doc={readmeDoc} />
        </section>
      </main>
    </div>
  );
}