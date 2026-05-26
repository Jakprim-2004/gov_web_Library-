import { ColorSwatchGrid } from '@/components/ColorSwatchGrid';
import { CodeBlock } from '@/components/CodeBlock';
import {
  IconAlertTriangle,
  IconBarChart,
  IconBell,
  IconBuilding,
  IconCalendar,
  IconCheckCircle,
  IconClipboard,
  IconDatabase,
  IconDownload,
  IconEdit,
  IconEye,
  IconFileText,
  IconFolder,
  IconGear,
  IconGuide,
  IconHeart,
  IconHistory,
  IconHome,
  IconLayout,
  IconLogOut,
  IconMail,
  IconMapPin,
  IconPhone,
  IconPlusCircle,
  IconPrinter,
  IconSearch,
  IconShield,
  IconSSO,
  IconStar,
  IconTrash,
  IconTokens,
  IconUpload,
  IconUser,
  IconUsers,
  IconWrench,
  IconHelpCircle,
  IconXCircle,
} from '@/components/GovIcons';
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
  { id: 'icons', label: ' Icons', icon: '' },
];

const ICONS = [
  { name: 'Home', label: 'หน้าแรก', Icon: IconHome },
  { name: 'Search', label: 'ค้นหา', Icon: IconSearch },
  { name: 'Bell', label: 'แจ้งเตือน', Icon: IconBell },
  { name: 'Folder', label: 'หมวดหมู่', Icon: IconFolder },
  { name: 'Clipboard', label: 'คำร้อง / แบบฟอร์ม', Icon: IconClipboard },
  { name: 'FileText', label: 'เอกสาร / รายงาน', Icon: IconFileText },
  { name: 'Calendar', label: 'นัดหมาย', Icon: IconCalendar },
  { name: 'User', label: 'ผู้ใช้', Icon: IconUser },
  { name: 'Users', label: 'สมาชิก', Icon: IconUsers },
  { name: 'Gear', label: 'ตั้งค่า', Icon: IconGear },
  { name: 'Wrench', label: 'ซ่อมบำรุง', Icon: IconWrench },
  { name: 'Shield', label: 'สิทธิ์', Icon: IconShield },
  { name: 'HelpCircle', label: 'ช่วยเหลือ', Icon: IconHelpCircle },
  { name: 'BarChart', label: 'สถิติ', Icon: IconBarChart },
  { name: 'History', label: 'ประวัติ', Icon: IconHistory },
  { name: 'Database', label: 'สำรองข้อมูล', Icon: IconDatabase },
  { name: 'Building', label: 'องค์กร', Icon: IconBuilding },
  { name: 'MapPin', label: 'สถานที่', Icon: IconMapPin },
  { name: 'Phone', label: 'โทรศัพท์', Icon: IconPhone },
  { name: 'Mail', label: 'อีเมล', Icon: IconMail },
  { name: 'CheckCircle', label: 'สำเร็จ', Icon: IconCheckCircle },
  { name: 'AlertTriangle', label: 'คำเตือน', Icon: IconAlertTriangle },
  { name: 'XCircle', label: 'ผิดพลาด', Icon: IconXCircle },
  { name: 'PlusCircle', label: 'เพิ่ม', Icon: IconPlusCircle },
  { name: 'LogOut', label: 'ออกจากระบบ', Icon: IconLogOut },
  { name: 'Download', label: 'ดาวน์โหลด', Icon: IconDownload },
  { name: 'Upload', label: 'อัปโหลด', Icon: IconUpload },
  { name: 'Printer', label: 'พิมพ์', Icon: IconPrinter },
  { name: 'Star', label: 'รายการโปรด', Icon: IconStar },
  { name: 'Heart', label: 'ถูกใจ', Icon: IconHeart },
  { name: 'Eye', label: 'ดูรายละเอียด', Icon: IconEye },
  { name: 'Edit', label: 'แก้ไข', Icon: IconEdit },
  { name: 'Trash', label: 'ลบ', Icon: IconTrash },
  { name: 'Tokens', label: 'Design Tokens', Icon: IconTokens },
  { name: 'Layout', label: 'Layout', Icon: IconLayout },
  { name: 'SSO', label: 'SSO', Icon: IconSSO },
  { name: 'Guide', label: 'คู่มือ', Icon: IconGuide },
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

      {/* ──── Icons ──── */}
      <section id="icons" className="scroll-mt-24 card-section p-6 md:p-8 mb-10 animate-fade-in-up">
        <div className="section-header">
          <div>
            <h2>Icon Set</h2>
            <p>ไอคอน SVG พร้อมใช้กับเมนูและสถานะ</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ICONS.map(({ name, label, Icon }) => (
            <div
              key={name}
              className="rounded-2xl border border-[#0b1220]/8 bg-white p-4 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f6f5c]/10 text-[#1f6f5c]">
                  <Icon size={26} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0b1220]">{label}</p>
                  <code className="text-[11px] text-[#5b6b80]">{name}</code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──── Dark Mode Note ──── */}
      <section className="card-section mb-10 overflow-hidden animate-fade-in-up">
        <div
          className="p-6 md:p-8 relative"
          style={{ background: 'linear-gradient(135deg, rgba(241, 190, 37, 0.06) 0%, rgba(248, 132, 45, 0.06) 100%)' }}
        >
          <div className="flex items-start gap-3">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[#0b1220]">Dark Mode</h2>
              <p className="text-sm text-[#5b6b80] mt-1 leading-relaxed">
                ใส่ class{' '}
                <code className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs font-medium text-[#1f6f5c]">dark</code>{' '}
                บน{' '}
                <code className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs font-medium text-[#1f6f5c]">html</code>{' '}
                เพื่อให้ token สลับโทนอัตโนมัติ (เช่น{' '}
                <code className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs font-medium text-[#1f6f5c]">text-text-primary</code>{' '}
                และ{' '}
                <code className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs font-medium text-[#1f6f5c]">text-text-tertiary</code>{' '}
                ) และสามารถใช้{' '}
                <code className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs font-medium text-[#1f6f5c]">SettingsProvider</code>{' '}
                จาก gov-layout เพื่อสลับธีมได้
              </p>

              <ul className="mt-4 space-y-1.5 text-sm text-[#5b6b80]">
                <li>Theme: เพิ่ม/ลบ class <code className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs font-medium text-[#1f6f5c]">dark</code> บน <code className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs font-medium text-[#1f6f5c]">html</code></li>
                <li>Token Text: ค่า primary/tertiary จะสลับเป็นโทนอ่อนอัตโนมัติ</li>
                <li>Layout: ใช้ CSS ด้านล่างเพื่อปรับสีพื้นหลังของ body/aside/header</li>
              </ul>

              <div className="mt-5">
                <CodeBlock
                  code={`/* globals.css — เพิ่มสำหรับ dark mode */
html.dark body          { background-color: #0f172a; color: #f1f5f9; }
html.dark aside         { background-color: #1e293b !important; }
html.dark header        { background-color: #1e293b !important; }
html.dark h1,
html.dark h2,
html.dark h3            { color: #f1f5f9 !important; }
html.dark p             { color: #94a3b8 !important; }`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
