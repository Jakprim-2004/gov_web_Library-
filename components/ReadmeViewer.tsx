'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as GovIcons from '@/components/GovIcons';

const EMOJI_ICON_MAP: Record<string, keyof typeof GovIcons> = {
  '🏠': 'IconHome',
  '🔍': 'IconSearch',
  '🔔': 'IconBell',
  '📁': 'IconFolder',
  '📋': 'IconClipboard',
  '📄': 'IconFileText',
  '🗓': 'IconCalendar',
  '🗓️': 'IconCalendar',
  '👤': 'IconUser',
  '👥': 'IconUsers',
  '⚙️': 'IconGear',
  '⚙': 'IconGear',
  '🔧': 'IconWrench',
  '🛡': 'IconShield',
  '🛡️': 'IconShield',
  '❓': 'IconHelpCircle',
  '📊': 'IconBarChart',
  '⏱': 'IconHistory',
  '⏱️': 'IconHistory',
  '💾': 'IconDatabase',
  '🧩': 'IconTokens',
  '🪟': 'IconLayout',
  '📖': 'IconGuide',
  '➜': 'IconChevronRight',
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/[^\w\-\u0E00-\u0E7F]/g, '');
}

export function ReadmeViewer({ doc = 'root' }: { doc?: string }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/readme?doc=${encodeURIComponent(doc)}`)
      .then((r) => r.json())
      .then((d) => setContent(d.content || ''))
      .catch(() => setContent(''))
      .finally(() => setLoading(false));
  }, [doc]);

  const components = useMemo(
    () => ({
      h1: ({ children }: { children?: React.ReactNode }) => {
        const id = slugify(String(children ?? ''));
        return (
          <h1 id={id} className="text-3xl font-extrabold tracking-tight text-[#0b1220] mt-10 mb-4 first:mt-0">
            {children}
          </h1>
        );
      },
      h2: ({ children }: { children?: React.ReactNode }) => {
        const id = slugify(String(children ?? ''));
        return (
          <h2 id={id} className="text-2xl font-bold text-[#0b1220] mt-10 mb-4 pt-6 border-t border-[#0b1220]/8">
            {children}
          </h2>
        );
      },
      h3: ({ children }: { children?: React.ReactNode }) => {
        const id = slugify(String(children ?? ''));
        return (
          <h3 id={id} className="text-lg font-bold text-[#0b1220] mt-8 mb-3">{children}</h3>
        );
      },
      h4: ({ children }: { children?: React.ReactNode }) => {
        const id = slugify(String(children ?? ''));
        return (
          <h4 id={id} className="text-base font-bold text-[#0b1220] mt-6 mb-2">{children}</h4>
        );
      },
      h5: ({ children }: { children?: React.ReactNode }) => {
        const id = slugify(String(children ?? ''));
        return (
          <h5 id={id} className="text-sm font-bold text-[#2a3b52] mt-4 mb-2">{children}</h5>
        );
      },
      p: ({ children }: { children?: React.ReactNode }) => (
        <p className="text-sm text-[#2a3b52] leading-relaxed mb-4">{children}</p>
      ),
      a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
        <a href={href} className="text-[#1f6f5c] font-medium underline underline-offset-2 hover:text-[#1a5d4c] transition-colors">
          {children}
        </a>
      ),
      ul: ({ children }: { children?: React.ReactNode }) => (
        <ul className="text-sm text-[#2a3b52] leading-relaxed mb-4 ml-5 list-disc space-y-1.5">{children}</ul>
      ),
      ol: ({ children }: { children?: React.ReactNode }) => (
        <ol className="text-sm text-[#2a3b52] leading-relaxed mb-4 ml-5 list-decimal space-y-1.5">{children}</ol>
      ),
      li: ({ children }: { children?: React.ReactNode }) => <li className="text-sm text-[#475272]">{children}</li>,
      blockquote: ({ children }: { children?: React.ReactNode }) => (
        <blockquote className="rounded-xl border-l-4 border-[#c89b3c] bg-[#c89b3c]/10 px-5 py-3 my-4 [&>p]:mb-0 [&>p]:text-[#2a3b52]">
          {children}
        </blockquote>
      ),
      code: ({ className, children, ...props }: { className?: string; children?: React.ReactNode }) => {
        const isInline = !className;
        if (isInline) {
          return (
            <code className="rounded-md bg-[#0b1220]/5 px-1.5 py-0.5 text-[13px] font-medium text-[#1f6f5c] font-mono">
              {children}
            </code>
          );
        }
        return (
          <code className={`${className} text-[13px] font-mono`} {...props}>
            {children}
          </code>
        );
      },
      pre: ({ children }: { children?: React.ReactNode }) => (
        <pre className="rounded-xl bg-[#0d1624] text-[#e2e8f0] p-5 overflow-x-auto mb-4 text-[13px] leading-relaxed font-mono shadow-sm border border-[#172033]">
          {children}
        </pre>
      ),
      table: ({ children }: { children?: React.ReactNode }) => (
        <div className="overflow-x-auto mb-4 rounded-xl border border-[#0b1220]/8">
          <table className="w-full text-sm">{children}</table>
        </div>
      ),
      thead: ({ children }: { children?: React.ReactNode }) => (
        <thead className="bg-[#f5f2ec] border-b border-[#0b1220]/8">{children}</thead>
      ),
      th: ({ children }: { children?: React.ReactNode }) => (
        <th className="px-4 py-2.5 text-left text-xs font-bold text-[#2a3b52] uppercase tracking-wider">{children}</th>
      ),
      td: ({ children }: { children?: React.ReactNode }) => {
        let content = children;
        if (typeof children === 'string') {
          const trimStr = children.trim();
          const cleanStr = trimStr.replace(/[\uFE0F\u200D]/g, '');
          const IconName = EMOJI_ICON_MAP[trimStr] || EMOJI_ICON_MAP[cleanStr];
          if (IconName) {
            const IconComp = GovIcons[IconName];
            if (IconComp) {
              content = <div className="flex justify-center items-center w-full h-full text-[#1e7d55]"><IconComp size={24} /></div>;
            }
          }
        }
        return (
          <td className="px-4 py-2.5 text-sm text-[#2a3b52] border-t border-[#0b1220]/4">{content}</td>
        );
      },
      hr: () => <hr className="divider-gradient my-8" />,
      strong: ({ children }: { children?: React.ReactNode }) => (
        <strong className="font-bold text-[#0b1220]">{children}</strong>
      ),
    }),
    [],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 rounded-lg animate-pulse" style={{ background: 'var(--gradient-primary)' }} />
            <p className="text-sm text-[#5b6b80]">กำลังโหลดเอกสาร…</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="rounded-2xl border border-dashed border-[#0b1220]/10 bg-[#f5f2ec] p-8 text-center">
          <p className="text-sm text-[#5b6b80]">ไม่พบ README ที่ร้องขอ</p>
      </div>
    );
  }

  return (
    <div className="readme-content" style={{ overflowWrap: 'break-word', wordBreak: 'break-word', minWidth: 0 }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components as any}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
