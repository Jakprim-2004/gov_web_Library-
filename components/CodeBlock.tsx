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
    <div className="code-premium relative group">
      <div className="code-dots">
        <span /><span /><span />
      </div>

      {/* Copy button */}
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-3 z-10 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/50 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 hover:text-white/80"
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>

      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
