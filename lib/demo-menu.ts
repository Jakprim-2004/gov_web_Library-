import type { MenuItem } from 'gov-layout';

export const STAFF_MENU: MenuItem[] = [
  { id: 'home', title: 'หน้าแรก', path: '/' },
  { id: 'tools', title: 'Design Tokens', path: '/tokens' },
  { id: 'organization', title: 'Layout ผู้ใช้', path: '/layout/user' },
  { id: 'security', title: 'SSO (Login)', path: '/sso' },
  { id: 'docs', title: 'คู่มือใช้งาน', path: '/guide', dividerAfter: true },
  { id: 'dashboard', title: 'แดชบอร์ดเจ้าหน้าที่', path: '/layout/staff' },
  {
    id: 'services',
    title: 'งานบริการ',
    children: [
      { id: 'water', title: 'ประปา', path: '/layout/staff/water' },
      { id: 'tax', title: 'ภาษี', path: '/layout/staff/tax' },
    ],
    dividerAfter: true,
  },
  { id: 'users', title: 'จัดการผู้ใช้', path: '/layout/staff/users' },
  { id: 'reports', title: 'รายงาน', path: '/layout/staff/reports' },
];

export const USER_MENU: MenuItem[] = [
  { id: 'home', title: 'หน้าแรก', path: '/' },
  { id: 'tools', title: 'Design Tokens', path: '/tokens' },
  { id: 'organization', title: 'Layout เจ้าหน้าที่', path: '/layout/staff' },
  { id: 'security', title: 'SSO (Login)', path: '/sso' },
  { id: 'docs', title: 'คู่มือใช้งาน', path: '/guide', dividerAfter: true },
  { id: 'profile', title: 'ข้อมูลส่วนตัว', path: '/layout/user/profile' },
  { id: 'services', title: 'บริการหลัก', path: '/layout/user/services' },
  { id: 'settings', title: 'ตั้งค่าระบบ', path: '/layout/user?panel=settings' },
];

export const DEMO_NOTIFICATIONS = [
  {
    id: 1,
    title: 'คำร้องใหม่รอตรวจสอบ',
    description: 'มีคำร้องเข้ามา กรุณาตรวจสอบ',
    date: '2 ชม. ที่แล้ว',
    type: 'warning' as const,
    isRead: false,
    category: 'action' as const,
  },
  {
    id: 2,
    title: 'คำร้องอนุมัติแล้ว',
    description: 'คำร้อง #1234 สำเร็จ',
    date: 'เมื่อวาน',
    type: 'success' as const,
    isRead: true,
    category: 'general' as const,
  },
];
