import type { TokenGroup } from '@/lib/token-catalog';

export function ColorSwatchGrid({ group }: { group: TokenGroup }) {
  return (
    <section id={group.id} className="scroll-mt-24 animate-fade-in-up">
      <div className="section-header">
        <div
          className=""
          style={{
            background:
              group.id === 'brand'
                ? 'rgba(30, 125, 85, 0.1)'
                : group.id === 'semantic'
                  ? 'rgba(105, 130, 225, 0.1)'
                  : group.id === 'text'
                    ? 'rgba(71, 82, 114, 0.1)'
                    : group.id === 'btn'
                      ? 'rgba(241, 190, 37, 0.1)'
                      : 'rgba(30, 125, 85, 0.1)',
          }}
        >
          {group.id === 'brand'
            ? ''
            : group.id === 'semantic'
              ? ''
              : group.id === 'text'
                ? ''
                : group.id === 'btn'
                  ? ''
                  : ''}
        </div>
        <div>
          <h2>{group.title}</h2>
          <p>{group.description}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {group.items.map((item) => (
          <div key={item.name} className="swatch-card group">
            {/* Color Preview */}
            <div className={`swatch-preview ${item.className}`} />

            {/* Info */}
            <div className="p-4 space-y-2">
              <p className="text-sm font-semibold text-[#060d26] tracking-tight">
                {item.name}
              </p>
              <div className="flex items-center gap-2">
                <code className="rounded-md bg-[#f0f4f2] px-2 py-0.5 text-[11px] font-medium text-[#1e7d55]">
                  {item.className}
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#707993] uppercase">
                  {item.hex}
                </span>
                <div
                  className="h-4 w-4 rounded-md border border-black/8"
                  style={{ backgroundColor: item.hex }}
                />
              </div>
              <p className="text-xs text-[#707993] leading-relaxed">{item.usage}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
