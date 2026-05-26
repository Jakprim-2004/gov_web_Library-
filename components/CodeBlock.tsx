'use client';

import { useState } from 'react';

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-premium group">
      <div className="code-header">
        <div className="code-dots">
          <span /><span /><span />
        </div>

        {/* Copy button */}
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60 opacity-0 transition-all hover:bg-white/10 hover:text-white/90 group-hover:opacity-100"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
