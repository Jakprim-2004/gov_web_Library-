export type TokenSwatch = {
  name: string;
  className: string;
  hex: string;
  usage: string;
};

export type TokenGroup = {
  id: string;
  title: string;
  description: string;
  items: TokenSwatch[];
};

export const TOKEN_GROUPS: TokenGroup[] = [
  {
    id: 'brand',
    title: 'Brand',
    description: 'สีหลักของระบบภาครัฐ',
    items: [
      { name: 'brand-primary', className: 'bg-brand-primary', hex: '#1e7d55', usage: 'ปุ่มหลัก, accent' },
      { name: 'brand-secondary', className: 'bg-brand-secondary', hex: '#80d897', usage: 'hover, highlight' },
      { name: 'brand-surface', className: 'bg-brand-surface', hex: '#faf9e5', usage: 'พื้นหลังอ่อน' },
      { name: 'brand-text-dark', className: 'bg-brand-text-dark', hex: '#05010e', usage: 'ข้อความเข้ม' },
    ],
  },
  {
    id: 'semantic',
    title: 'Semantic',
    description: 'สถานะความหมาย (สำเร็จ / เตือน / ผิดพลาด)',
    items: [
      { name: 'semantic-success', className: 'bg-semantic-success', hex: '#95c135', usage: 'สำเร็จ' },
      { name: 'semantic-warning', className: 'bg-semantic-warning', hex: '#f1be25', usage: 'คำเตือน' },
      { name: 'semantic-critical', className: 'bg-semantic-critical', hex: '#f21515', usage: 'ข้อผิดพลาด' },
      { name: 'semantic-neutral', className: 'bg-semantic-neutral', hex: '#707993', usage: 'ข้อมูลรอง' },
      { name: 'semantic-verified', className: 'bg-semantic-verified', hex: '#6982e1', usage: 'ยืนยันแล้ว' },
    ],
  },
  {
    id: 'text',
    title: 'Text',
    description: 'สีข้อความ — ใช้ text-*',
    items: [
      { name: 'text-primary', className: 'text-text-primary', hex: '#060d26', usage: 'หัวข้อ / เนื้อหาหลัก' },
      { name: 'text-secondary', className: 'text-text-secondary', hex: '#1e7d55', usage: 'ลิงก์ / คำรอง' },
      { name: 'text-tertiary', className: 'text-text-tertiary', hex: '#475272', usage: 'คำอธิบาย' },
      { name: 'text-placeholder', className: 'text-text-placeholder', hex: '#707993', usage: 'placeholder' },
      { name: 'text-critical', className: 'text-text-critical', hex: '#f21515', usage: 'ข้อความ error' },
    ],
  },
  {
    id: 'btn',
    title: 'Button',
    description: 'สีปุ่ม — bg-btn-*',
    items: [
      { name: 'btn-primary', className: 'bg-btn-primary', hex: '#1e7d55', usage: 'ปุ่ม submit' },
      { name: 'btn-hover', className: 'bg-btn-hover', hex: '#80d897', usage: 'hover state' },
      { name: 'btn-default', className: 'bg-btn-default border border-border-neutral', hex: '#fcfcff', usage: 'ปุ่มรอง' },
    ],
  },
  {
    id: 'status',
    title: 'Status',
    description: 'แถบสถานะ / badge',
    items: [
      { name: 'status-stable', className: 'bg-status-stable', hex: '#95c135', usage: 'ใช้งานปกติ' },
      { name: 'status-warning', className: 'bg-status-warning', hex: '#f8842d', usage: 'รอดำเนินการ' },
      { name: 'status-danger', className: 'bg-status-danger', hex: '#991d1d', usage: 'อันตราย' },
      { name: 'status-default', className: 'bg-status-default', hex: '#8df0ff', usage: 'ค่าเริ่มต้น' },
    ],
  },
];

export const TYPO_CLASSES = [
  { className: 'typo-h1', label: 'typo-h1', desc: 'หัวข้อระดับ 1 (responsive)' },
  { className: 'typo-h2', label: 'typo-h2', desc: 'หัวข้อระดับ 2' },
  { className: 'typo-h3', label: 'typo-h3', desc: 'หัวข้อระดับ 3' },
  { className: 'typo-body', label: 'typo-body', desc: 'เนื้อหาทั่วไป' },
  { className: 'typo-sub', label: 'typo-sub', desc: 'คำบรรยายใต้หัวข้อ' },
  { className: 'typo-button', label: 'typo-button', desc: 'ข้อความบนปุ่ม' },
  { className: 'typo-button-sm', label: 'typo-button-sm', desc: 'ปุ่มขนาดเล็ก' },
  { className: 'typo-menu', label: 'typo-menu', desc: 'เมนู / navigation' },
  { className: 'typo-tags', label: 'typo-tags', desc: 'แท็ก / label' },
];

export const SPACING_CLASSES = [
  { className: 'p-1x', value: '8px' },
  { className: 'p-2x', value: '16px' },
  { className: 'p-3x', value: '24px' },
  { className: 'p-4x', value: '32px' },
];

export const RADIUS_CLASSES = [
  { className: 'rounded-square', value: '8px' },
  { className: 'rounded-square-hard', value: '16px' },
  { className: 'rounded-circle', value: '100px' },
];

export const SHADOW_CLASSES = [
  { className: 'shadow-smooth-low', desc: 'เงาเบา — การ์ดเล็ก' },
  { className: 'shadow-smooth-medium', desc: 'เงากลาง — การ์ดทั่วไป' },
  { className: 'shadow-smooth-high', desc: 'เงาสูง — modal / dropdown' },
];
