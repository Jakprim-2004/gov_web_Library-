# gov-layout

Government Layout Components สำหรับเว็บแอปพลิเคชันภาครัฐ

> ใช้คู่กับ `gov-token-css` เพื่อให้สีตรงตาม Design System

---

## Installation

```bash
npm install gov-layout gov-token-css
```

```css
/* ใน globals.css */
@import "gov-token-css";
```

---

##  Components ทั้งหมด

| Component | ใช้สำหรับ | import |
|-----------|----------|--------|
| `StaffSidebar` | Sidebar เจ้าหน้าที่ | `import { StaffSidebar } from 'gov-layout'` |
| `UserHeader` | Header ผู้ใช้ทั่วไป | `import { UserHeader } from 'gov-layout'` |
| `UserSidebar` | Sidebar ผู้ใช้ (slide-in) | `import { UserSidebar } from 'gov-layout'` |
| `SettingsPanel` | หน้าตั้งค่า (font + theme) | `import { SettingsPanel } from 'gov-layout'` |
| `SettingsProvider` | Context wrapper | `import { SettingsProvider } from 'gov-layout'` |
| `useSettings` | Hook อ่าน/เปลี่ยนค่า | `import { useSettings } from 'gov-layout'` |
| `Icons` | ไอคอน built-in 33 ตัว | `import { Icons } from 'gov-layout'` |

---

## Icons (ไอคอน built-in)

import ครั้งเดียว ใช้ได้ทุกไอคอน — ไม่ต้องสร้าง SVG เอง

### วิธีใช้งาน

```tsx
import { Icons } from 'gov-layout';

// ใช้ตรงๆ
<Icons.Folder />
<Icons.User />
<Icons.Gear />

// ปรับขนาด (default = 20)
<Icons.Home size={24} />

// ใส่ใน MenuItem
const menuItems: MenuItem[] = [
  { id: 'services', title: 'งานบริการ', icon: <Icons.Folder />, path: '/services' },
  { id: 'users', title: 'จัดการผู้ใช้', icon: <Icons.User />, path: '/users' },
  { id: 'reports', title: 'รายงาน', icon: <Icons.BarChart />, path: '/reports' },
];
```

### ไอคอนทั้งหมด

| ชื่อ | Component | ใช้สำหรับ |
|------|-----------|----------|
| 🏠 | `IconHome` | หน้าแรก / Dashboard |
| 🧩 | `IconTokens` | Design Tokens |
| 🪟 | `IconLayout` | Layout ผู้ใช้ |
| 🛡️ | `IconSSO` | SSO (Login) |
| 📖 | `IconGuide` | คู่มือใช้งาน |
| ➜ | `IconChevronRight` | ไปหน้าถัดไป |

### IconProps

| Prop | Type | Default | คำอธิบาย |
|------|------|---------|----------|
| `size` | `number?` | `20` | ขนาด (width & height) |
| `className` | `string?` | - | CSS class |
| `style` | `CSSProperties?` | - | inline style |

>  ถ้าต้องการ import ทีละตัวก็ได้: `import { FolderIcon, UserIcon } from 'gov-layout'`

## 1. StaffSidebar (เจ้าหน้าที่)

Sidebar ฝั่งซ้ายแบบ fixed — รองรับพับ/กาง (collapsible)

### ตัวอย่างใช้งาน

```tsx
import { StaffSidebar } from 'gov-layout';
import type { MenuItem } from 'gov-layout';

// ไม่ต้องระบุ icon — sidebar จับคู่ไอคอนให้อัตโนมัติจาก id
const menuItems: MenuItem[] = [
  {
    id: 'services',       // → 📁 FolderIcon
    title: 'งานบริการ',
    children: [
      { id: 'water', title: 'ประปา', path: '/services/water' },
      { id: 'tax', title: 'ภาษี', path: '/services/tax' },
    ],
    dividerAfter: true,
  },
  { id: 'users', title: 'จัดการผู้ใช้', path: '/users' },       // → 👥 UsersIcon
  { id: 'reports', title: 'รายงาน', path: '/reports' },          // → 📊 BarChartIcon
  { id: 'roles', title: 'สิทธิ์การใช้งาน', path: '/roles' },     // → 🛡️ ShieldIcon
  { id: 'logs', title: 'ประวัติ', path: '/logs' },                // → 🕐 HistoryIcon
  { id: 'backup', title: 'สำรองข้อมูล', path: '/backup' },       // → 💾 DatabaseIcon
];

<StaffSidebar
  orgLogo="/logo.png"
  orgName="เทศบาลตำบล Biza"
  orgSubtitle="จังหวัดราชบุรี"
  menuItems={menuItems}
  user={{ firstName: 'สมชาย', lastName: 'ใจดี' }}
  roleLabel="เจ้าหน้าที่"
  currentPath="/services/water"
  onNavigate={(path) => router.push(path)}
  onLogout={() => signOut()}
  onProfile={() => router.push('/profile')}
  collapsible
/>
```

> ** Auto-Icon:** ไม่ต้อง import ไอคอน — sidebar จับคู่จาก `id` อัตโนมัติ
> ถ้าอยากกำหนดเอง ก็ส่ง `icon` prop ได้ตามปกติ: `icon: <Icons.Folder />`

> ** ข้อมูลองค์กร (`orgLogo`, `orgName`, `orgSubtitle`) มาจากไหนก็ได้:**
> - ดึงจาก **ตัวกลาง SSO** หลังล็อกอิน (แนะนำ) เช่น `useSSOAuth().organization`
> - ดึงจาก **API** เช่น `fetchOrgInfo()`
> - **Fix ค่า** ตรงๆ ก็ได้ ถ้าใช้ระบบเดียว
>
> Library ไม่ผูกกับแหล่งข้อมูลใดๆ — แค่รับ props แล้วแสดงผล

### Default Bottom Menu

ไม่ต้องตั้งค่าเอง — มี **ตั้งค่าระบบ** + **ช่วยเหลือ** อยู่ด้านล่างอัตโนมัติ

```
งานบริการ ▽
  ประปา / ภาษี / ทะเบียน
──────────────
จัดการผู้ใช้
รายงาน
ตั้งค่าระบบ    ← default (ไม่ต้องส่ง)
ช่วยเหลือ     ← default (ไม่ต้องส่ง)
      ↕ spacer
โปรไฟล์ + ออกจากระบบ
```

ถ้าอยากเปลี่ยน bottom menu เอง:

```tsx
<StaffSidebar
  bottomMenuItems={[
    { id: 'settings', title: 'ตั้งค่า', icon: <Icons.Gear />, path: '/settings' },
  ]}
  ...
/>
```

ถ้าไม่อยากมี bottom menu:

```tsx
<StaffSidebar bottomMenuItems={[]} ... />
```

### Props ทั้งหมด

| Prop | Type | Default | คำอธิบาย |
|------|------|---------|----------|
| `orgLogo` | `string?` | - | URL รูปตราองค์กร |
| `orgName` | `string` | **required** | ชื่อองค์กร |
| `orgSubtitle` | `string?` | - | ชื่อรอง เช่น จังหวัด |
| `menuItems` | `MenuItem[]` | **required** | เมนูหลัก |
| `bottomMenuItems` | `MenuItem[]?` | ตั้งค่าระบบ + ช่วยเหลือ | เมนูด้านล่าง |
| `user` | `User \| null` | **required** | ข้อมูลผู้ใช้ |
| `roleLabel` | `string` | **required** | ป้ายตำแหน่ง เช่น "เจ้าหน้าที่" |
| `onNavigate` | `(path) => void` | **required** | callback เมื่อคลิกเมนู |
| `onLogout` | `() => void` | **required** | callback ออกจากระบบ |
| `onProfile` | `() => void?` | - | callback เมื่อกดโปรไฟล์ผู้ใช้ |
| `currentPath` | `string?` | - | path ปัจจุบัน (highlight active) |
| `width` | `string?` | `'280px'` | ความกว้าง sidebar |
| `collapsible` | `boolean?` | `false` | เปิดโหมดพับ/กาง |
| `isOpen` | `boolean?` | - | controlled open/close |
| `onToggle` | `() => void?` | - | callback เมื่อกดพับ/กาง |

### Features

- ✅ Dropdown submenu (พับ/กางอัตโนมัติ)
- ✅ Auto-expand เมื่อ child active
- ✅ Active item highlight
- ✅ Collapsible — พับเป็น icon-only 64px, กางเป็น 280px
- ✅ Tooltip เมื่อพับ
- ✅ Default ตั้งค่าระบบ + ช่วยเหลือ (override ได้)
- ✅ โปรไฟล์ + ออกจากระบบ ล่างสุดเสมอ
- ✅ `dividerAfter` เส้นคั่นระหว่างกลุ่ม
- ✅ ใช้ Standard Avatar Placeholder กรณีที่ไม่มีรูปโปรไฟล์หรือโหลดรูปไม่สำเร็จ (v1.3.2+) 🆕

---

## 2. UserHeader (ผู้ใช้ทั่วไป)

Header ด้านบนพร้อม notification bell

```tsx
import { UserHeader } from 'gov-layout';

<UserHeader
  user={{
    firstName: 'ชนธัญ',
    pictureUrl: '/avatar.jpg',
    subtitle: 'ผู้สูงอายุ',        // แสดงใต้ข้อความทักทาย (optional)
  }}
  notifications={[
    {
      id: 1,
      title: 'คำร้องใหม่รอตรวจสอบ',
      description: 'มีคำร้องใหม่เข้ามา กรุณาตรวจสอบ',
      date: '2 ชม. ที่แล้ว',
      type: 'warning',
      isRead: false,
      category: 'action',           // ← แสดงในแท็บ "ต้องดำเนินการ"
    },
    {
      id: 2,
      title: 'คำร้องได้รับการอนุมัติ',
      description: 'คำร้องหมายเลข #1234 อนุมัติสำเร็จ',
      date: '5 ชม. ที่แล้ว',
      type: 'success',
      isRead: true,
      category: 'general',          // ← แสดงในแท็บ "แจ้งเตือนทั่วไป"
    },
  ]}
  onToggleSidebar={() => setOpen(true)}
  onMarkAllRead={() => markAllRead()}
  onViewAll={() => router.push('/notifications')}
  onNotificationClick={(notif) => router.push(`/notifications/${notif.id}`)}
  onProfile={() => router.push('/profile')}
/>
```

### Props

| Prop | Type | Default | คำอธิบาย |
|------|------|---------|----------|
| `user.firstName` | `string?` | - | ชื่อ |
| `user.lastName` | `string?` | - | นามสกุล |
| `user.pictureUrl` | `string?` | - | URL รูปโปรไฟล์ |
| `user.subtitle` | `string?` | - | ข้อความใต้ชื่อ เช่น "ผู้สูงอายุ" |
| `notifications` | `NotificationItem[]?` | `[]` | รายการแจ้งเตือน |
| `onToggleSidebar` | `() => void?` | - | callback เปิด sidebar |
| `onMarkAllRead` | `() => void?` | - | callback อ่านทั้งหมดแล้ว |
| `onViewAll` | `() => void?` | - | callback ดูทั้งหมด |
| `onNotificationClick` | `(notification) => void?` | - | callback เมื่อกดแจ้งเตือนแต่ละรายการ |
| `onProfile` | `() => void?` | - | callback เมื่อกดโปรไฟล์ |
| `notificationBell` | `ReactNode?` | - | custom bell icon |
| `className` | `string?` | - | className เพิ่มเติม |

### 🔔 Notification Filter Tabs (v1.2.25+)

Dropdown แจ้งเตือนมีแท็บกรอง 3 หมวด พร้อม badge ตัวเลข:

| แท็บ | กรองจาก `category` | ตัวอย่างใช้งาน |
|------|-------------------|----------------|
| **ทั้งหมด** | แสดงทุกรายการ | ดูภาพรวม |
| **ต้องดำเนินการ** | `'action'` | คำร้องใหม่รอตรวจสอบ, ต้องอัปโหลดเอกสาร, มีคิวใหม่ |
| **แจ้งเตือนทั่วไป** | `'general'` หรือไม่ระบุ | อนุมัติสำเร็จ, จองสำเร็จ, ยกเลิกแล้ว |

>  ถ้าไม่ส่ง `category` จะถูกจัดเป็น **แจ้งเตือนทั่วไป** อัตโนมัติ (backward compatible)

### Features

- ✅ Notification bell พร้อม badge (99+ เมื่อเกิน)
- ✅ ไม่มีแจ้งเตือน → ไม่แสดง badge
- ✅ Notification dropdown แบบ scroll
- ✅ **Filter tabs**: ทั้งหมด / ต้องดำเนินการ / แจ้งเตือนทั่วไป 🆕
- ✅ **Badge ตัวเลข** แต่ละแท็บ 🆕
- ✅ **Category badge** "ต้องดำเนินการ" ติดแต่ละรายการ 🆕
- ✅ **Empty state แยกตาม filter** 🆕
- ✅ กดแจ้งเตือนแต่ละรายการ → `onNotificationClick`
- ✅ Subtitle ใต้ข้อความทักทาย (เช่น "ผู้สูงอายุ")
- ✅ ปุ่มเปิด sidebar (☰)
- ✅ กดโปรไฟล์ผู้ใช้ (avatar + ชื่อ) → `onProfile`
- ✅ รองรับ Dark Mode

---

## 3. UserSidebar (ผู้ใช้ทั่วไป)

Sidebar ฝั่งขวาแบบ slide-in + overlay

```tsx
import { UserSidebar } from 'gov-layout';

<UserSidebar
  isOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
  user={{ firstName: 'สมหญิง', lastName: 'ใจดี', pictureUrl: '/avatar.jpg' }}
  roleLabel="ผู้สูงอายุ"
  menuItems={[
    { id: 'profile', title: 'ข้อมูลส่วนตัว', path: '/profile' },
    { id: 'services', title: 'บริการหลัก', path: '/services' },
    { id: 'settings', title: 'ตั้งค่าระบบ', path: '/settings' },
  ]}
  onNavigate={(path) => router.push(path)}
  onLogout={() => signOut()}
  onProfile={() => router.push('/profile')}
/>
```

> **หมายเหตุ:** `roleLabel` แต่ละระบบส่งค่าเองได้ เช่น "ผู้สูงอายุ", "ผู้ใช้ปกติ", "อาสาสมัคร"

---

## 4. SettingsPanel (ตั้งค่าระบบ) 🆕

ปรับขนาดตัวอักษร (5 ระดับ) + โหมดสว่าง/มืด — ค่าจำใน localStorage

### ขั้นตอนที่ 1: ครอบ SettingsProvider

```tsx
// app/providers.tsx ← ต้องเป็น 'use client'
'use client';
import { SettingsProvider } from 'gov-layout';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SettingsProvider>{children}</SettingsProvider>;
}
```

```tsx
// app/layout.tsx
import Providers from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### ขั้นตอนที่ 2: วาง SettingsPanel

```tsx
import { SettingsPanel } from 'gov-layout';

// ผู้ใช้ทั่วไป → ทั้ง font + theme
<SettingsPanel />

// เจ้าหน้าที่ → แค่ปรับขนาดฟอนต์
<SettingsPanel showTheme={false} />
```

| Prop | Type | Default | คำอธิบาย |
|------|------|---------|----------|
| `showTheme` | `boolean?` | `true` | แสดงตัวเลือกโหมดสว่าง/มืด |
| `className` | `string?` | - | className เพิ่มเติม |

### ขั้นตอนที่ 3: ใช้ useSettings() hook (ถ้าต้องการ)

```tsx
import { useSettings } from 'gov-layout';

function MyComponent() {
  const { theme, toggleTheme, fontSize, setFontSize, fontSizeOption } = useSettings();

  return (
    <div>
      <p>ธีม: {theme}</p>
      <p>ฟอนต์: {fontSize} (×{fontSizeOption.scale})</p>
      <button onClick={toggleTheme}>สลับธีม</button>
      <button onClick={() => setFontSize('large')}>ฟอนต์ใหญ่</button>
    </div>
  );
}
```

### ขนาดตัวอักษร (5 ระดับ)

| ค่า | Label | Scale | ผลลัพธ์ |
|-----|-------|-------|---------|
| `xsmall` | เล็กมาก | ×0.8 | ย่อทุกอย่าง 80% |
| `small` | เล็ก | ×0.9 | ย่อเล็กน้อย |
| `medium` | กลาง | ×1.0 | ค่าเริ่มต้น |
| `large` | ใหญ่ | ×1.2 | ขยาย 120% |
| `xlarge` | ใหญ่มาก | ×1.4 | ขยาย 140% |

### หลักการทำงาน

- **Theme** — เพิ่ม/ลบ class `dark` บน `<html>` ➜ ใช้ CSS `html.dark` จัดสี
- **Font size** — ปรับ `body.style.zoom` + CSS variables ตาม scale
- **Persistence** — เก็บใน localStorage (`app-theme`, `app-font-size`)

### Dark mode CSS ที่ต้องเพิ่ม

```css
/* globals.css — เพิ่มสำหรับ dark mode */
html.dark body          { background-color: #0f172a; color: #f1f5f9; }
html.dark aside         { background-color: #1e293b !important; }
html.dark header        { background-color: #1e293b !important; }
html.dark h1,
html.dark h2,
html.dark h3            { color: #f1f5f9 !important; }
html.dark p             { color: #94a3b8 !important; }
```

---

## 📐 Types

```ts
// เมนู
interface MenuItem {
  id: string;
  title: string;
  path?: string;           // path สำหรับ navigate
  icon?: React.ReactNode;  // icon component
  children?: MenuItem[];   // submenu → แสดงเป็น dropdown
  dividerAfter?: boolean;  // เส้นคั่นด้านล่าง
}

// ผู้ใช้
interface User {
  id?: string | number;
  firstName?: string;
  lastName?: string;
  pictureUrl?: string;
  role?: string;
}

// การแจ้งเตือน
type NotificationCategory = 'action' | 'general';

interface NotificationItem {
  id: string | number;
  title: string;
  description: string;
  date: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'reminder';
  isRead: boolean;
  category?: NotificationCategory;  // 🆕 หมวดหมู่: 'action' | 'general'
}

// ตั้งค่า
type Theme = 'light' | 'dark';
type FontSizeKey = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
```

---

## 📁 Layout Examples

### Staff Layout (เจ้าหน้าที่)

```tsx
'use client';
import { StaffSidebar, SettingsPanel } from 'gov-layout';

export default function AdminLayout({ children }) {
  const [currentPath, setCurrentPath] = useState('/');

  return (
    <div style={{ display: 'flex' }}>
      <StaffSidebar
        orgLogo="/logo.png"
        orgName="เทศบาลตำบล Biza"
        orgSubtitle="จังหวัดราชบุรี"
        menuItems={menuItems}
        user={user}
        roleLabel="เจ้าหน้าที่"
        currentPath={currentPath}
        onNavigate={(path) => setCurrentPath(path)}
        onLogout={() => signOut()}
        onProfile={() => setCurrentPath('/profile')}
        collapsible
      />
      <main style={{ marginLeft: 280, flex: 1, padding: 32 }}>
        {currentPath === '/settings' ? (
          <SettingsPanel showTheme={false} />
        ) : (
          children
        )}
      </main>
    </div>
  );
}
```

### User Layout (ผู้ใช้ทั่วไป)

```tsx
'use client';
import { UserHeader, UserSidebar, SettingsPanel } from 'gov-layout';

export default function UserLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  return (
    <>
      <UserHeader
        user={{ ...user, subtitle: 'ผู้สูงอายุ' }}
        notifications={notifications}
        onToggleSidebar={() => setOpen(true)}
        onNotificationClick={(notif) => setCurrentPath(`/notifications/${notif.id}`)}
        onProfile={() => setCurrentPath('/profile')}
      />
      <UserSidebar
        isOpen={open}
        onClose={() => setOpen(false)}
        user={user}
        roleLabel="ผู้ใช้ทั่วไป"
        menuItems={menuItems}
        onNavigate={(path) => setCurrentPath(path)}
        onLogout={() => signOut()}
        onProfile={() => setCurrentPath('/profile')}
      />
      <main style={{ padding: 32 }}>
        {currentPath === '/settings' ? (
          <SettingsPanel showTheme={true} />
        ) : (
          children
        )}
      </main>
    </>
  );
}
```

---

## 🔧 Sub-Components

ใช้แยกกันได้ถ้าต้องการ customize เฉพาะส่วน

```tsx
import {
  SidebarHeader,      // logo + ชื่อองค์กร
  SidebarMenu,        // เมนู dropdown
  SidebarUserProfile, // avatar + logout
  ThemeSettings,      // UI เลือก theme อย่างเดียว
  FontSizeSettings,   // UI เลือก font size อย่างเดียว
} from 'gov-layout';
```

---

##  Styling

- Components ใช้ **inline styles** + CSS variables จาก `gov-token-css`
- ถ้าไม่ได้ import `gov-token-css` จะใช้สี **fallback** อัตโนมัติ
- Dark mode ต้องเพิ่ม CSS เอง (ดู section Dark mode CSS ด้านบน)
- Font size ใช้ `body.style.zoom` → scale ทุกอย่างรวมถึง inline `px`
