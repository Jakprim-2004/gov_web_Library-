import {
  IconBell,
  IconCalendar,
  IconFileText,
  IconGear,
  IconGuide,
  IconHome,
  IconLayout,
  IconSearch,
  IconSSO,
  IconTokens,
  IconUser,
} from '@/components/GovIcons';

const ICONS = [
  { name: 'Home', label: 'หน้าแรก', Icon: IconHome },
  { name: 'Search', label: 'ค้นหา', Icon: IconSearch },
  { name: 'Bell', label: 'แจ้งเตือน', Icon: IconBell },
  { name: 'Calendar', label: 'นัดหมาย', Icon: IconCalendar },
  { name: 'FileText', label: 'เอกสาร', Icon: IconFileText },
  { name: 'User', label: 'ผู้ใช้งาน', Icon: IconUser },
  { name: 'Gear', label: 'ตั้งค่า', Icon: IconGear },
  { name: 'Tokens', label: 'Design Tokens', Icon: IconTokens },
  { name: 'Layout', label: 'Layout', Icon: IconLayout },
  { name: 'SSO', label: 'SSO', Icon: IconSSO },
  { name: 'Guide', label: 'คู่มือ', Icon: IconGuide },
];

export default function IconsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
      <section className="card-section p-6 md:p-8 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#060d26]">คลังไอคอนสำหรับระบบราชการ</h1>
        <p className="mt-2 text-sm text-[#707993]">ตัวอย่างไอคอน SVG ที่ใช้งานร่วมกับเมนูและคอมโพเนนต์หลัก</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ICONS.map(({ name, label, Icon }) => (
          <div key={name} className="card-premium p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f6f5c]/10 text-[#1f6f5c]">
                <Icon size={26} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#060d26]">{label}</p>
                <code className="text-[11px] text-[#707993]">{name}</code>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
