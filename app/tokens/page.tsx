import { ColorSwatchGrid } from '@/components/ColorSwatchGrid';
import { CodeBlock } from '@/components/CodeBlock';
import {
  RADIUS_CLASSES,
  SHADOW_CLASSES,
  SPACING_CLASSES,
  TOKEN_GROUPS,
  TYPO_CLASSES,
} from '@/lib/token-catalog';

const QUICK_LINKS = [
  { id: 'brand', label: ' Brand', icon: '' },
  { id: 'semantic', label: ' Semantic', icon: '' },
  { id: 'text', label: ' Text', icon: '' },
  { id: 'btn', label: ' Button', icon: '' },
  { id: 'status', label: ' Status', icon: '' },
  { id: 'typography', label: ' Typography', icon: '' },
  { id: 'spacing', label: ' Spacing', icon: '' },
  { id: 'radius', label: ' Radius', icon: '' },
  { id: 'shadows', label: ' Shadows', icon: '' },
];

export default function TokensPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* ──── Page Header ──── */}
      <header className="animate-fade-in-up mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div
            className=""
            style={{ background: 'var(--gradient-primary)' }}
          >
            
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#060d26]">
              Design Tokens
            </h1>
            <p className="text-sm text-[#707993]">gov-token-css</p>
          </div>
        </div>
        <p className="text-sm text-[#707993] max-w-2xl mt-2 leading-relaxed">
          คลิกแต่ละกล่องเพื่อดู Tailwind class — ค่าสีมาจาก CSS variables ใน{' '}
          <code className="rounded-md bg-[#f0f4f2] px-1.5 py-0.5 text-xs font-medium text-[#1e7d55]">
            tokens.css
          </code>
        </p>
      </header>

      {/* ──── Quick Navigation ──── */}
      <nav className="animate-fade-in-up delay-100 mb-10 flex flex-wrap gap-2">
        {QUICK_LINKS.map((link) => (
          <a key={link.id} href={`#${link.id}`} className="pill-nav">
            {link.label}
          </a>
        ))}
      </nav>

      {/* ──── Import Guide ──── */}
      <section className="animate-fade-in-up delay-200 card-section p-6 md:p-8 mb-10">
        <div className="flex items-center gap-3 mb-5">
          
          <div>
            <h2 className="text-lg font-bold tracking-tight text-[#060d26]">วิธี Import</h2>
            <p className="text-xs text-[#707993]">ใส่ใน globals.css ของโปรเจกต์</p>
          </div>
        </div>
        <CodeBlock
          code={`/* app/globals.css — แบบ modular (แนะนำ + Tailwind v4) */
@import "tailwindcss";
@import "gov-token-css/tokens";
@import "gov-token-css/base";
@import "gov-token-css/theme";
@import "gov-token-css/typography";

/* หรือ all-in-one */
@import "gov-token-css";`}
        />
      </section>

      {/* ──── Color Swatches ──── */}
      <div className="space-y-12">
        {TOKEN_GROUPS.map((group) => (
          <ColorSwatchGrid key={group.id} group={group} />
        ))}
      </div>

      <hr className="divider-gradient my-12" />

      {/* ──── Typography ──── */}
      <section id="typography" className="scroll-mt-24 card-section p-6 md:p-8 mb-10 animate-fade-in-up">
        <div className="section-header">
          
          <div>
            <h2>Typography Classes</h2>
            <p>ใส่ class บน element — responsive ตาม breakpoint ใน typography.css</p>
          </div>
        </div>
        <div className="space-y-0">
          {TYPO_CLASSES.map((t, i) => (
            <div
              key={t.className}
              className={`flex items-baseline justify-between gap-4 py-4 ${i < TYPO_CLASSES.length - 1 ? 'border-b border-[#060d26]/5' : ''
                } group hover:bg-[#f8faf9] px-4 -mx-4 rounded-xl transition-colors`}
            >
              <div className="min-w-0 flex-1">
                <p className={`${t.className} text-[#060d26] truncate`}>
                  ตัวอย่าง {t.label} — สวัสดีครับ
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-3 shrink-0">
                <code className="rounded-md bg-[#f0f4f2] px-2 py-0.5 text-[11px] font-medium text-[#1e7d55]">
                  {t.className}
                </code>
                <span className="text-[11px] text-[#707993]">{t.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──── Spacing ──── */}
      <section id="spacing" className="scroll-mt-24 card-section p-6 md:p-8 mb-10 animate-fade-in-up">
        <div className="section-header">
          
          <div>
            <h2>Spacing Scale</h2>
            <p>p / m / gap — ใช้ suffix 1x–4x</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 items-end">
          {SPACING_CLASSES.map((s) => (
            <div key={s.className} className="text-center group">
              <div
                className={`${s.className} rounded-xl transition-transform group-hover:scale-105`}
                style={{ background: 'rgba(30, 125, 85, 0.08)' }}
              >
                <div
                  className="flex items-center justify-center rounded-lg text-white text-xs font-bold"
                  style={{
                    background: 'var(--gradient-primary)',
                    minWidth: '40px',
                    minHeight: '40px',
                  }}
                >
                  {s.value}
                </div>
              </div>
              <code className="mt-2 block text-[11px] font-medium text-[#707993]">
                {s.className}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* ──── Border Radius ──── */}
      <section id="radius" className="scroll-mt-24 card-section p-6 md:p-8 mb-10 animate-fade-in-up">
        <div className="section-header">
          
          <div>
            <h2>Border Radius</h2>
            <p>rounded-square | rounded-square-hard | rounded-circle</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          {RADIUS_CLASSES.map((r) => (
            <div key={r.className} className="text-center group">
              <div
                className={`${r.className} h-20 w-28 flex items-center justify-center text-white text-sm font-bold transition-all group-hover:scale-105 group-hover:shadow-lg`}
                style={{ background: 'var(--gradient-primary)' }}
              >
                {r.value}
              </div>
              <code className="mt-2 block text-[11px] font-medium text-[#707993]">
                {r.className}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* ──── Shadows ──── */}
      <section id="shadows" className="scroll-mt-24 card-section p-6 md:p-8 mb-10 animate-fade-in-up">
        <div className="section-header">
          
          <div>
            <h2>Shadow Tokens</h2>
            <p>เงาสำหรับระดับความลึกต่างๆ</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {SHADOW_CLASSES.map((s) => (
            <div
              key={s.className}
              className={`${s.className} rounded-2xl bg-white p-5 border border-[#060d26]/4 transition-transform hover:scale-[1.02]`}
            >
              <p className="text-sm font-semibold text-[#060d26]">{s.className}</p>
              <p className="text-xs text-[#707993] mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ──── Dark Mode Note ──── */}
      <section className="card-section mb-10 overflow-hidden animate-fade-in-up">
        <div className="p-6 md:p-8 relative" style={{ background: 'linear-gradient(135deg, rgba(241, 190, 37, 0.06) 0%, rgba(248, 132, 45, 0.06) 100%)' }}>
          <div className="flex items-start gap-3">
            
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[#060d26]">Dark Mode</h2>
              <p className="text-sm text-[#707993] mt-1 leading-relaxed">
                ใส่ class{' '}
                <code className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs font-medium text-[#1e7d55]">dark</code>{' '}
                บน{' '}
                <code className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs font-medium text-[#1e7d55]">html</code>{' '}
                — token เช่น{' '}
                <code className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs font-medium text-[#1e7d55]">text-text-primary</code>{' '}
                จะสลับโทนอัตโนมัติ หรือใช้{' '}
                <code className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs font-medium text-[#1e7d55]">SettingsProvider</code>{' '}
                จาก gov-layout
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
