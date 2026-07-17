interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="border-b border-[#0b1220]/8 bg-white px-4 sm:px-6 py-8 sm:py-10 mb-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start gap-4">
          <div className="mt-1 w-1 h-10 rounded-full flex-shrink-0" style={{ background: 'var(--gradient-primary)' }} />
          <div>
            {eyebrow && (
              <p className="text-xs uppercase tracking-[0.2em] text-[#1f6f5c] font-semibold mb-2">{eyebrow}</p>
            )}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0b1220]">{title}</h1>
            {description && (
              <p className="mt-2 text-sm text-[#5b6b80] leading-relaxed max-w-2xl">{description}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}