'use client';

import { ColorSwatchGrid } from '@/components/ColorSwatchGrid';
import {
  IconAlertTriangle, IconBarChart, IconBell, IconBuilding, IconCalendar, IconCheckCircle,
  IconClipboard, IconDatabase, IconDownload, IconEdit, IconEye, IconFileText, IconFolder,
  IconGear, IconGuide, IconHeart, IconHelpCircle, IconHistory, IconHome, IconLayout,
  IconLogOut, IconMail, IconMapPin, IconPhone, IconPlusCircle, IconPrinter, IconSearch,
  IconShield, IconSSO, IconStar, IconTokens, IconTrash, IconUpload, IconUser, IconUsers,
  IconWrench, IconXCircle,
} from '@/components/GovIcons';
import { RADIUS_CLASSES, SHADOW_CLASSES, SPACING_CLASSES, TOKEN_GROUPS, TYPO_CLASSES } from '@/lib/token-catalog';

const QUICK_LINKS = [
  { id: 'brand', label: 'Brand' }, { id: 'semantic', label: 'Semantic' }, { id: 'text', label: 'Text' },
  { id: 'btn', label: 'Button' }, { id: 'status', label: 'Status' }, { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' }, { id: 'radius', label: 'Radius' }, { id: 'shadows', label: 'Shadow' }, { id: 'icons', label: 'Icons' },
];

const ICONS = [
  { name: 'Home', label: 'Home', Icon: IconHome }, { name: 'Search', label: 'Search', Icon: IconSearch }, { name: 'Bell', label: 'Bell', Icon: IconBell },
  { name: 'Folder', label: 'Folder', Icon: IconFolder }, { name: 'Clipboard', label: 'Clipboard', Icon: IconClipboard }, { name: 'FileText', label: 'FileText', Icon: IconFileText },
  { name: 'Calendar', label: 'Calendar', Icon: IconCalendar }, { name: 'User', label: 'User', Icon: IconUser }, { name: 'Users', label: 'Users', Icon: IconUsers },
  { name: 'Gear', label: 'Gear', Icon: IconGear }, { name: 'Wrench', label: 'Wrench', Icon: IconWrench }, { name: 'Shield', label: 'Shield', Icon: IconShield },
  { name: 'HelpCircle', label: 'HelpCircle', Icon: IconHelpCircle }, { name: 'BarChart', label: 'BarChart', Icon: IconBarChart }, { name: 'History', label: 'History', Icon: IconHistory },
  { name: 'Database', label: 'Database', Icon: IconDatabase }, { name: 'Building', label: 'Building', Icon: IconBuilding }, { name: 'MapPin', label: 'MapPin', Icon: IconMapPin },
  { name: 'Phone', label: 'Phone', Icon: IconPhone }, { name: 'Mail', label: 'Mail', Icon: IconMail }, { name: 'CheckCircle', label: 'CheckCircle', Icon: IconCheckCircle },
  { name: 'AlertTriangle', label: 'AlertTriangle', Icon: IconAlertTriangle }, { name: 'XCircle', label: 'XCircle', Icon: IconXCircle },
  { name: 'PlusCircle', label: 'PlusCircle', Icon: IconPlusCircle }, { name: 'LogOut', label: 'LogOut', Icon: IconLogOut },
  { name: 'Download', label: 'Download', Icon: IconDownload }, { name: 'Upload', label: 'Upload', Icon: IconUpload }, { name: 'Printer', label: 'Printer', Icon: IconPrinter },
  { name: 'Star', label: 'Star', Icon: IconStar }, { name: 'Heart', label: 'Heart', Icon: IconHeart }, { name: 'Eye', label: 'Eye', Icon: IconEye },
  { name: 'Edit', label: 'Edit', Icon: IconEdit }, { name: 'Trash', label: 'Trash', Icon: IconTrash }, { name: 'Tokens', label: 'Tokens', Icon: IconTokens },
  { name: 'Layout', label: 'Layout', Icon: IconLayout }, { name: 'SSO', label: 'SSO', Icon: IconSSO }, { name: 'Guide', label: 'Guide', Icon: IconGuide },
];

export default function TokensPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10">
      <header className="card-section p-6 md:p-8 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#060d26]">คลังทั้งหมดของไลบรารี</h1>
        <p className="mt-2 text-sm text-[#707993]">แสดงโทเคนและยูทิลิตี้ทุกชุดที่มีใน `gov-token-css` พร้อมไอคอนจาก `gov-layout`</p>
      </header>

      <nav className="mb-8 flex flex-wrap gap-2">{QUICK_LINKS.map((link) => <a key={link.id} href={`#${link.id}`} className="pill-nav">{link.label}</a>)}</nav>
      <div className="space-y-12">{TOKEN_GROUPS.map((group) => <ColorSwatchGrid key={group.id} group={group} />)}</div>

      <section id="typography" className="scroll-mt-24 card-section p-6 md:p-8 mt-10">
        <h2 className="text-lg font-bold text-[#060d26] mb-4">Typography Classes</h2>
        <div className="space-y-3">{TYPO_CLASSES.map((tt) => <div key={tt.className} className="rounded-xl border border-[#060d26]/8 bg-white px-4 py-3"><p className={`${tt.className} text-[#060d26]`}>{tt.label}</p><p className="text-xs text-[#707993] mt-1"><code>{tt.className}</code> - {tt.desc}</p></div>)}</div>
      </section>

      <section id="spacing" className="scroll-mt-24 card-section p-6 md:p-8 mt-10"><h2 className="text-lg font-bold text-[#060d26] mb-4">Spacing Scale</h2><div className="flex flex-wrap gap-5 items-end">{SPACING_CLASSES.map((s) => <div key={s.className} className="text-center"><div className={`${s.className} rounded-xl`} style={{ background: 'rgba(30, 125, 85, 0.08)' }}><div className="flex items-center justify-center rounded-lg text-white text-xs font-bold" style={{ background: 'var(--gradient-primary)', minWidth: '40px', minHeight: '40px' }}>{s.value}</div></div><code className="mt-2 block text-[11px] text-[#707993]">{s.className}</code></div>)}</div></section>
      <section id="radius" className="scroll-mt-24 card-section p-6 md:p-8 mt-10"><h2 className="text-lg font-bold text-[#060d26] mb-4">Border Radius</h2><div className="flex flex-wrap gap-6">{RADIUS_CLASSES.map((r) => <div key={r.className} className="text-center"><div className={`${r.className} h-20 w-28 flex items-center justify-center text-white text-sm font-bold`} style={{ background: 'var(--gradient-primary)' }}>{r.value}</div><code className="mt-2 block text-[11px] text-[#707993]">{r.className}</code></div>)}</div></section>
      <section id="shadows" className="scroll-mt-24 card-section p-6 md:p-8 mt-10"><h2 className="text-lg font-bold text-[#060d26] mb-4">Shadow Tokens</h2><div className="grid gap-5 sm:grid-cols-3">{SHADOW_CLASSES.map((s) => <div key={s.className} className={`${s.className} rounded-2xl bg-white p-5 border border-[#060d26]/8`}><p className="text-sm font-semibold text-[#060d26]">{s.className}</p><p className="text-xs text-[#707993] mt-1">{s.desc}</p></div>)}</div></section>
      <section id="icons" className="scroll-mt-24 card-section p-6 md:p-8 mt-10"><h2 className="text-lg font-bold text-[#060d26] mb-4">Icon Set</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{ICONS.map(({ name, label, Icon }) => <div key={name} className="rounded-2xl border border-[#0b1220]/8 bg-white p-4"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f6f5c]/10 text-[#1f6f5c]"><Icon size={26} /></div><div><p className="text-sm font-bold text-[#0b1220]">{label}</p><code className="text-[11px] text-[#5b6b80]">{name}</code></div></div></div>)}</div></section>
    </main>
  );
}
