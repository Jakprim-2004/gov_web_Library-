'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useState } from 'react';

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 rounded-lg animate-pulse" style={{ background: 'var(--gradient-primary)' }} />
          <p className="text-sm text-[#707993]">กำลังโหลดเอกสาร…</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="rounded-2xl border border-dashed border-[#060d26]/10 bg-[#f8fafc] p-8 text-center">
        <p className="text-sm text-[#707993]">ไม่สามารถโหลด README.md ได้</p>
      </div>
    );
  }

  return (
    <div className="readme-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-extrabold tracking-tight text-[#060d26] mt-10 mb-4 first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-[#060d26] mt-10 mb-4 pt-6 border-t border-[#060d26]/8">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold text-[#060d26] mt-8 mb-3">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-bold text-[#060d26] mt-6 mb-2">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-sm font-bold text-[#475272] mt-4 mb-2">{children}</h5>
          ),
          p: ({ children }) => (
            <p className="text-sm text-[#475272] leading-relaxed mb-4">{children}</p>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-[#1e7d55] font-medium underline underline-offset-2 hover:text-[#256B48] transition-colors">{children}</a>
          ),
          ul: ({ children }) => (
            <ul className="text-sm text-[#475272] leading-relaxed mb-4 ml-5 list-disc space-y-1.5">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="text-sm text-[#475272] leading-relaxed mb-4 ml-5 list-decimal space-y-1.5">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-sm text-[#475272]">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="rounded-xl border-l-4 border-[#f1be25] bg-[#f1be25]/5 px-5 py-3 my-4 [&>p]:mb-0 [&>p]:text-[#475272]">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="rounded-md bg-[#060d26]/5 px-1.5 py-0.5 text-[13px] font-medium text-[#1e7d55] font-mono">
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
          pre: ({ children }) => (
            <pre className="rounded-xl bg-[#0f172a] text-[#e2e8f0] p-5 overflow-x-auto mb-4 text-[13px] leading-relaxed font-mono shadow-sm border border-[#1e293b]">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4 rounded-xl border border-[#060d26]/8">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#f8fafc] border-b border-[#060d26]/8">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2.5 text-left text-xs font-bold text-[#475272] uppercase tracking-wider">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2.5 text-sm text-[#475272] border-t border-[#060d26]/4">{children}</td>
          ),
          hr: () => (
            <hr className="divider-gradient my-8" />
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-[#060d26]">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
