# คู่มือใช้งาน GOV Components Library (gov-token-css + gov-layout + gov-sso-login)

เอกสารนี้สอนวิธีประกอบทั้งสามแพ็กเกจในโปรเจค Next.js พร้อมตารางสี/class ที่ใช้บ่อย  
เว็บตัวอย่าง: รัน `npm run dev` ในโฟลเดอร์ `demo` แล้วเปิด http://localhost:3100

---

## สารบัญ

1. [ติดตั้งและโครงสร้าง](#1-ติดตั้งและโครงสร้าง)
2. [gov-token-css — สีและ CSS class](#2-gov-token-css--สีและ-css-class)
3. [gov-layout — Components](#3-gov-layout--components)
4. [gov-sso-login — เข้าสู่ระบบ](#4-gov-sso-login--เข้าสู่ระบบ)
5. [ประกอบทั้งสามใน app เดียว](#5-ประกอบทั้งสามใน-app-เดียว)

---

## 1. ติดตั้งและโครงสร้าง

```bash
npm install gov-token-css gov-layout gov-sso-login
```

| แพ็กเกจ | ประเภท | Build ก่อนใช้? |
|--------|--------|----------------|
| gov-token-css | CSS เท่านั้น | ไม่ต้อง |
| gov-layout | React (dist) | ใช่ — `npm run build` ใน package |
| gov-sso-login | React (dist) | ใช่ |

**next.config.ts**

```ts
const nextConfig = {
  transpilePackages: ['gov-layout', 'gov-sso-login'],
};
export default nextConfig;
```

**app/globals.css**

```css
@import "tailwindcss";
@import "gov-token-css/tokens";
@import "gov-token-css/base";
@import "gov-token-css/theme";
@import "gov-token-css/typography";
```

---

## 2. gov-token-css — สีและ CSS class

### วิธี import

| ไฟล์ | ได้อะไร |
|------|---------|
| `gov-token-css/tokens` | CSS variables (`:root`) |
| `gov-token-css/base` | shadcn vars, body, dark |
| `gov-token-css/theme` | Tailwind v4 `@theme` → ใช้ class `bg-brand-primary` ได้ |
| `gov-token-css/typography` | class `.typo-*` |
| `gov-token-css` | รวมทั้งหมด + tailwindcss |

### Brand — เรียก class แล้วได้สีพื้นหลัง/ข้อความ

| Tailwind class | ค่าสี | ใช้เมื่อ |
|----------------|-------|----------|
| `bg-brand-primary` / `text-brand-primary` | `#1e7d55` | ปุ่มหลัก, ลิงก์เน้น |
| `bg-brand-secondary` / `text-brand-secondary` | `#80d897` | hover, accent อ่อน |
| `bg-brand-surface` | `#faf9e5` | พื้นหลังหน้า |
| `text-brand-text-dark` | `#05010e` | ข้อความเข้มมาก |

**ตัวอย่าง**

```html
<button class="bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-square">
  ยืนยัน
</button>
```

### Semantic — ความหมายสถานะ

| Class | สี | ความหมาย |
|-------|-----|----------|
| `bg-semantic-success` / `text-semantic-success` | `#95c135` | สำเร็จ |
| `bg-semantic-warning` / `text-semantic-warning` | `#f1be25` | เตือน |
| `bg-semantic-critical` / `text-semantic-critical` | `#f21515` | ผิดพลาด |
| `bg-semantic-neutral` | `#707993` | ข้อมูลรอง |
| `bg-semantic-verified` | `#6982e1` | ยืนยันแล้ว |

```html
<span class="text-semantic-critical">กรุณากรอกข้อมูล</span>
```

### Text — สีข้อความ

| Class | Light | ใช้เมื่อ |
|-------|-------|----------|
| `text-text-primary` | `#060d26` | หัวข้อ, เนื้อหาหลัก |
| `text-text-secondary` | `#1e7d55` | คำรองแบบ brand |
| `text-text-tertiary` | `#475272` | คำอธิบาย |
| `text-text-placeholder` | `#707993` | placeholder input |
| `text-text-critical` | `#f21515` | ข้อความ error |
| `text-text-disable` | `#c8cedd` | ปิดใช้งาน |

ใน **dark mode** (`html` มี class `dark`) ค่า primary/tertiary สลับเป็นโทนอ่อนอัตโนมัติ

### ปุ่ม

| Class | สี |
|-------|-----|
| `bg-btn-primary` | `#1e7d55` |
| `hover:bg-btn-hover` | `#80d897` |
| `bg-btn-default` | `#fcfcff` |

### Border

| Class | ใช้เมื่อ |
|-------|----------|
| `border-border-default` | ขอบ input ปกติ |
| `border-border-hover` | focus |
| `border-border-neutral` | การ์ด, เส้นแบ่ง |
| `border-border-critical` | สถานะ error |

### Status (badge / chip)

| Class | สี |
|-------|-----|
| `bg-status-stable` | `#95c135` |
| `bg-status-warning` | `#f8842d` |
| `bg-status-danger` | `#991d1d` |
| `bg-status-default` | `#8df0ff` |

### Icon (โมดูล)

| Class | โมดูล |
|-------|--------|
| `text-icon-water` | ประปา |
| `text-icon-tax` | ภาษี |
| `text-icon-security` | ความปลอดภัย |
| `text-icon-success` / `text-icon-warning` / `text-icon-critical` | สถานะ |

### Typography — class → ลักษณะตัวอักษร

| Class | ผลลัพธ์ |
|-------|---------|
| `typo-h1` | หัวข้อใหญ่ (responsive 3 breakpoints) |
| `typo-h2` | หัวข้อรอง |
| `typo-h3` | หัวข้อย่อย |
| `typo-body` | เนื้อหาทั่วไป |
| `typo-sub` | คำบรรยายใต้หัวข้อ |
| `typo-button` | ข้อความบนปุ่ม |
| `typo-button-sm` | ปุ่มเล็ก |
| `typo-menu` | เมนู navigation |
| `typo-tags` | แท็ก / label เล็ก |
| `typo-logo` | โลโก้ข้อความ |
| `typo-text-button` | ลิงก์แบบปุ่มข้อความ |

```html
<h1 class="typo-h1 text-text-primary">หัวข้อหน้า</h1>
<p class="typo-body text-text-tertiary">รายละเอียด</p>
```

### Spacing

| Class | ค่า | ใช้กับ |
|-------|-----|--------|
| `p-1x` / `m-1x` / `gap-1x` | 8px | ช่องว่างเล็ก |
| `p-2x` | 16px | |
| `p-3x` | 24px | padding การ์ด |
| `p-4x` | 32px | margin หน้า |

### Border radius

| Class | ค่า |
|-------|-----|
| `rounded-square` | 8px |
| `rounded-square-hard` | 16px |
| `rounded-circle` | 100px (pill) |

### Shadow

| Class | ใช้เมื่อ |
|-------|----------|
| `shadow-smooth-low` | การ์ดเบา |
| `shadow-smooth-medium` | การ์ดทั่วไป |
| `shadow-smooth-high` | modal, dropdown |

### Foundation palettes (ใช้เป็น accent)

ตัวอย่างที่ใช้บ่อย: `bg-apple-medium`, `bg-fuji-light`, `bg-sky-soft`, `bg-fuan-medium`, `bg-take-medium`, `bg-saffron-medium`  
ดูรายการเต็มใน `gov-token-css/README.md`

### CSS variable โดยตรง (ไม่ผ่าน Tailwind)

```css
.custom {
  color: var(--color-alias-color-brand-primary);
  padding: var(--spacing-space3x);
  border-radius: var(--border-radius-square);
}
```

---

## 3. gov-layout — Components

ต้องมี `SettingsProvider` ถ้าใช้ `SettingsPanel` / `useSettings`

```tsx
'use client';
import { SettingsProvider } from 'gov-layout';

export function Providers({ children }) {
  return <SettingsProvider>{children}</SettingsProvider>;
}
```

### StaffSidebar (เจ้าหน้าที่)

| Prop | บังคับ | คำอธิบาย |
|------|--------|----------|
| `orgName` | ✅ | ชื่อองค์กร |
| `menuItems` | ✅ | เมนู (`MenuItem[]`) |
| `user` | ✅ | `{ firstName, lastName, pictureUrl }` |
| `roleLabel` | ✅ | เช่น "เจ้าหน้าที่" |
| `onNavigate` | ✅ | `(path) => void` |
| `onLogout` | ✅ | ออกจากระบบ |
| `collapsible` | | พับเป็น icon-only |
| `orgLogo` | | URL โลโก้ |

**MenuItem**

```ts
{ id: 'services', title: 'งานบริการ', path: '/x', children?: [...], icon?: <Icons.Folder /> }
```

- ไม่ส่ง `icon` → จับคู่จาก `id` อัตโนมัติ (เช่น `users` → UsersIcon)
- `dividerAfter: true` → เส้นคั่น

### UserHeader + UserSidebar (ผู้ใช้)

**UserHeader** — แจ้งเตือน + เปิด sidebar

| Prop | คำอธิบาย |
|------|----------|
| `notifications` | `{ id, title, description, date, type, isRead, category?: 'action' \| 'general' }[]` |
| `onToggleSidebar` | กด ☰ |
| `category: 'action'` | แสดงในแท็บ "ต้องดำเนินการ" |

**UserSidebar** — `isOpen`, `onClose`, `menuItems`, `onNavigate`, `onLogout`

### SettingsPanel

| Prop | Default | คำอธิบาย |
|------|---------|----------|
| `showTheme` | `true` | แสดงสลับ light/dark |

เก็บค่าใน localStorage: `app-theme`, `app-font-size`  
Font scale: `xsmall` (0.8) … `xlarge` (1.4)

### Icons

```tsx
import { Icons } from 'gov-layout';
<Icons.Folder size={24} />
```

รายการ: Home, Search, Bell, Folder, User, Users, Gear, MapPin, LogOut, … (33 ตัว) — ดู `gov-layout/README.md`

---

## 4. gov-sso-login — เข้าสู่ระบบ

### Config

```ts
export const ssoConfig: GovSsoConfig = {
  iamAuthUrl: 'https://auth.govcenter.co',
  serviceCode: 'your-service-code',
  apiBaseUrl: 'https://api.your-domain.com',
  callbackUrl: 'https://your-domain.com/auth/callback',
};
```

### Provider (แนะนำ)

```tsx
<GovSsoProvider config={ssoConfig} theme={{ primaryColor: '#1E7D55' }}>
  {children}
</GovSsoProvider>
```

### Components / Hooks

| API | ใช้เมื่อ |
|-----|----------|
| `SsoLoginButton` | ปุ่ม login สำเร็จรูป |
| `SsoCallbackHandler` | หน้า `/auth/callback` |
| `useGovSso()` | `{ login, getLoginUrl }` |
| `useGovSsoCallback()` | จัดการ callback + state |
| `GovSsoClient` | ใช้นอก React |

### Backend (จำเป็น)

`POST /auth/sso-callback` รับ `{ code }` → เรียก IAM `verify-code` ด้วย **x-api-key** (ห้ามใส่ใน browser)

รายละเอียด: `gov-sso-login/set-up.md`

---

## 5. ประกอบทั้งสามใน app เดียว

```
┌─────────────────────────────────────────┐
│ globals.css  ← gov-token-css            │
├─────────────────────────────────────────┤
│ layout.tsx   ← GovSsoProvider           │
│              ← SettingsProvider          │
├─────────────────────────────────────────┤
│ /login       ← SsoLoginButton            │
│ /auth/callback ← SsoCallbackHandler      │
├─────────────────────────────────────────┤
│ (app)        ← UserHeader / StaffSidebar │
│              ← user จาก session SSO      │
└─────────────────────────────────────────┘
```

**ลำดับแนะนำ**

1. ใส่ `gov-token-css` ใน globals.css
2. Wrap `GovSsoProvider` + `SettingsProvider`
3. ทำ login + callback
4. หลัง login ส่ง `user` เข้า layout components
5. ใช้ class `bg-brand-primary`, `typo-h1` ในหน้าที่เขียนเอง

**Demo ใน repo**

```bash
cd demo
npm install
npm run dev
```

- `/tokens` — ดู swatch สีและ typo
- `/layout/staff`, `/layout/user` — layout (กด "เข้าสู่ระบบ Demo" ก่อน)
- `/sso` — SSO + demo login
- `/guide` — สรุปสั้น

---

## อ้างอิงเพิ่มเติม

- `gov-token-css/README.md` — palette เต็ม
- `gov-layout/README.md` — props ทุก component
- `gov-sso-login/set-up.md` — env, NestJS, troubleshooting
- `gov-sso-login/E-Service Residence API Integration Flow.md` — API บ้าน/ที่อยู่ (backend proxy)
