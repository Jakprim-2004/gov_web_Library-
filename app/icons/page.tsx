import Link from 'next/link';
import {
  IconAlertTriangle,
  IconBarChart,
  IconBell,
  IconBuilding,
  IconCalendar,
  IconCheckCircle,
  IconChevronRight,
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

export default function IconsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1e7d55]">Icon Preview</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#060d26]">ชุด SVG Icons สำหรับ library</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#707993]">
          หน้าแสดงตัวอย่างไอคอนแบบ SVG ที่ใช้กับเมนูหลักได้จริง และสอดคล้องกับสไตล์ของหน้าคู่มือ
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ICONS.map(({ name, label, Icon }) => (
          <div key={name} className="rounded-2xl border border-[#060d26]/8 bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1e7d55]/8 text-[#1e7d55]">
                <Icon size={30} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#060d26]">{label}</p>
                <code className="text-[11px] text-[#707993]">{name}</code>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-[#060d26]/8 bg-[#f8faf9] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#060d26]">ตัวอย่างเมนูแบบในภาพ</h2>
            <p className="text-sm text-[#707993]">ใช้ SVG icons พร้อมไฮไลต์รายการ active</p>
          </div>
          <Link href="/guide" className="inline-flex items-center gap-2 rounded-full bg-[#1e7d55] px-4 py-2 text-sm font-semibold text-white hover:bg-[#256B48] transition-colors">
            ไปหน้า Guide
            <IconChevronRight size={16} />
          </Link>
        </div>

        <div className="mt-5 max-w-xs rounded-2xl bg-white p-2 shadow-sm ring-1 ring-[#060d26]/8">
          {[
            { label: 'หน้าแรก', active: false, Icon: IconHome },
            { label: 'Design Tokens', active: false, Icon: IconTokens },
            { label: 'Layout ผู้ใช้', active: false, Icon: IconLayout },
            { label: 'SSO (Login)', active: false, Icon: IconSSO },
            { label: 'คู่มือใช้งาน', active: true, Icon: IconGuide },
          ].map(({ label, active, Icon }) => (
            <div
              key={label}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                active ? 'bg-[#1e7d55]/10 text-[#1e7d55]' : 'text-[#060d26] hover:bg-[#f8faf9]'
              }`}
            >
              <Icon size={22} />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
