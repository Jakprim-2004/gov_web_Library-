'use client';

import type { ReactNode, SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function BaseIcon({ size = 20, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconHome(props: IconProps) { return <BaseIcon {...props}><path d="M4 10.5 12 4l8 6.5" /><path d="M6.5 9.5V20h11V9.5" /><path d="M10 20v-5h4v5" /></BaseIcon>; }
export function IconSearch(props: IconProps) { return <BaseIcon {...props}><circle cx="10.5" cy="10.5" r="5.5" /><path d="m15 15 4 4" /></BaseIcon>; }
export function IconBell(props: IconProps) { return <BaseIcon {...props}><path d="M12 4a4 4 0 0 0-4 4v2c0 1.5-.4 2.9-1.2 4.1L5.8 16h12.4l-.9-1.9A8 8 0 0 1 16 10V8a4 4 0 0 0-4-4Z" /><path d="M9.5 18a2.5 2.5 0 0 0 5 0" /></BaseIcon>; }
export function IconFolder(props: IconProps) { return <BaseIcon {...props}><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H10l2 2h5.5A2.5 2.5 0 0 1 20 9.5v7A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5z" /></BaseIcon>; }
export function IconClipboard(props: IconProps) { return <BaseIcon {...props}><rect x="7" y="5" width="10" height="14" rx="2" /><path d="M9.5 5.8h5a1 1 0 0 1 1 1V8h-7V6.8a1 1 0 0 1 1-1Z" /></BaseIcon>; }
export function IconFileText(props: IconProps) { return <BaseIcon {...props}><path d="M7 4.5h7l4 4V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1Z" /><path d="M14 4.5V8h4" /><path d="M9 11h6" /><path d="M9 14h6" /><path d="M9 17h4" /></BaseIcon>; }
export function IconCalendar(props: IconProps) { return <BaseIcon {...props}><rect x="4.5" y="6" width="15" height="13" rx="2" /><path d="M8 4.5v3M16 4.5v3M4.5 10h15" /></BaseIcon>; }
export function IconUser(props: IconProps) { return <BaseIcon {...props}><circle cx="12" cy="8.5" r="3.2" /><path d="M6.5 19a5.5 5.5 0 0 1 11 0" /></BaseIcon>; }
export function IconUsers(props: IconProps) { return <BaseIcon {...props}><path d="M9 11.2a2.8 2.8 0 1 0-2.8-2.8A2.8 2.8 0 0 0 9 11.2Z" /><path d="M16.5 11a2.5 2.5 0 1 0-2.5-2.5A2.5 2.5 0 0 0 16.5 11Z" /><path d="M4.8 19a4.2 4.2 0 0 1 8.4 0" /><path d="M13.2 19a3.7 3.7 0 0 1 6.0 0" /></BaseIcon>; }
export function IconGear(props: IconProps) { return <BaseIcon {...props}><circle cx="12" cy="12" r="3.2" /><path d="m19 12-.9-.5a1.2 1.2 0 0 1-.6-1.3l.2-1.1-1.4-2.4-1 .3a1.2 1.2 0 0 1-1.3-.4l-.6-.9h-2.8l-.6.9a1.2 1.2 0 0 1-1.3.4l-1-.3-1.4 2.4.2 1.1a1.2 1.2 0 0 1-.6 1.3L5 12l.9.5a1.2 1.2 0 0 1 .6 1.3l-.2 1.1 1.4 2.4 1-.3a1.2 1.2 0 0 1 1.3.4l.6.9h2.8l.6-.9a1.2 1.2 0 0 1 1.3-.4l1 .3 1.4-2.4-.2-1.1a1.2 1.2 0 0 1 .6-1.3Z" /></BaseIcon>; }
export function IconShield(props: IconProps) { return <BaseIcon {...props}><path d="M12 3.8 18.5 6.2V11c0 4.1-2.5 7.5-6.5 9-4-1.5-6.5-4.9-6.5-9V6.2L12 3.8Z" /></BaseIcon>; }
export function IconTokens(props: IconProps) { return <BaseIcon {...props}><rect x="4.5" y="4.5" width="6.2" height="6.2" rx="1.4" /><rect x="13.3" y="4.5" width="6.2" height="6.2" rx="1.4" /><rect x="4.5" y="13.3" width="6.2" height="6.2" rx="1.4" /><rect x="13.3" y="13.3" width="6.2" height="6.2" rx="1.4" /></BaseIcon>; }
export function IconLayout(props: IconProps) { return <BaseIcon {...props}><rect x="4" y="4" width="16" height="16" rx="2.2" /><path d="M8 4v16" /><path d="M4 9.5h4" /><path d="M4 14.5h4" /><path d="M8 9.5h12" /><path d="M8 14.5h7" /></BaseIcon>; }
export function IconSSO(props: IconProps) { return <BaseIcon {...props}><path d="M12 3.8 18.5 6.2V11c0 4.1-2.5 7.5-6.5 9-4-1.5-6.5-4.9-6.5-9V6.2L12 3.8Z" /><path d="M9.2 12.1 11 14l3.8-4" /></BaseIcon>; }
export function IconGuide(props: IconProps) { return <BaseIcon {...props}><path d="M5 4.8h7.4c1.7 0 3 1.3 3 3V19c-.7-.5-1.7-.8-3-.8H5z" /><path d="M19 4.8h-6.6c-1.7 0-3 1.3-3 3V19c.7-.5 1.7-.8 3-.8H19z" /><path d="M8 8.5h4.2" /><path d="M8 11.5h4.2" /><path d="M8 14.5h3" /></BaseIcon>; }
export function IconWrench(props: IconProps) { return <BaseIcon {...props}><path d="M14.7 6.2a4 4 0 0 0-5.4 5.4L5 15.9l3.1 3.1 4.3-4.3a4 4 0 0 0 5.4-5.4l-2.2 2.2-2.1-.5-.5-2.1 2.1-2.7Z" /></BaseIcon>; }
export function IconHelpCircle(props: IconProps) { return <BaseIcon {...props}><circle cx="12" cy="12" r="8.2" /><path d="M9.8 9.4a2.4 2.4 0 1 1 3.7 2c-.8.5-1.5 1.1-1.5 2.1" /><path d="M12 17h.01" /></BaseIcon>; }
export function IconBarChart(props: IconProps) { return <BaseIcon {...props}><path d="M5 19V9" /><path d="M10 19V5" /><path d="M15 19v-7" /><path d="M20 19H4" /></BaseIcon>; }
export function IconHistory(props: IconProps) { return <BaseIcon {...props}><path d="M4.8 12a7.2 7.2 0 1 0 2.1-5.1" /><path d="M5 5.2v2.8h2.8" /><path d="M12 7v5l3 1.8" /></BaseIcon>; }
export function IconDatabase(props: IconProps) { return <BaseIcon {...props}><ellipse cx="12" cy="6" rx="7" ry="2.8" /><path d="M5 6v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6" /><path d="M5 12v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" /></BaseIcon>; }
export function IconBuilding(props: IconProps) { return <BaseIcon {...props}><rect x="5" y="4.5" width="14" height="15" rx="2" /><path d="M9 19.5v-4h6v4" /><path d="M8 8h.01M12 8h.01M16 8h.01M8 11.5h.01M12 11.5h.01M16 11.5h.01" /></BaseIcon>; }
export function IconMapPin(props: IconProps) { return <BaseIcon {...props}><path d="M12 21s5-4.7 5-10a5 5 0 0 0-10 0c0 5.3 5 10 5 10Z" /><circle cx="12" cy="11" r="1.7" /></BaseIcon>; }
export function IconPhone(props: IconProps) { return <BaseIcon {...props}><path d="M7.5 4.8 6 6.4c.4 5.4 5.2 10.2 10.6 10.6l1.6-1.5c.5-.5.6-1.3.2-1.9l-1.3-1.9c-.4-.6-1.2-.8-1.8-.5l-1.3.7a9.7 9.7 0 0 1-3.2-3.2l.7-1.3c.3-.6.1-1.4-.5-1.8L8.8 4.6c-.6-.4-1.4-.3-1.9.2Z" /></BaseIcon>; }
export function IconMail(props: IconProps) { return <BaseIcon {...props}><rect x="4.5" y="6" width="15" height="12" rx="2" /><path d="m5 7 7 6 7-6" /></BaseIcon>; }
export function IconCheckCircle(props: IconProps) { return <BaseIcon {...props}><circle cx="12" cy="12" r="8" /><path d="m8.5 12 2.2 2.3 4.8-5.2" /></BaseIcon>; }
export function IconAlertTriangle(props: IconProps) { return <BaseIcon {...props}><path d="M12 4.5 20 18H4z" /><path d="M12 9v4" /><path d="M12 16.5h.01" /></BaseIcon>; }
export function IconXCircle(props: IconProps) { return <BaseIcon {...props}><circle cx="12" cy="12" r="8" /><path d="m9 9 6 6" /><path d="m15 9-6 6" /></BaseIcon>; }
export function IconPlusCircle(props: IconProps) { return <BaseIcon {...props}><circle cx="12" cy="12" r="8" /><path d="M12 8v8" /><path d="M8 12h8" /></BaseIcon>; }
export function IconLogOut(props: IconProps) { return <BaseIcon {...props}><path d="M10 5H6.8A1.8 1.8 0 0 0 5 6.8v10.4A1.8 1.8 0 0 0 6.8 19H10" /><path d="M14 8l4 4-4 4" /><path d="M18 12H10" /></BaseIcon>; }
export function IconDownload(props: IconProps) { return <BaseIcon {...props}><path d="M12 4v9" /><path d="m8.5 9.5 3.5 3.5 3.5-3.5" /><path d="M5 19h14" /></BaseIcon>; }
export function IconUpload(props: IconProps) { return <BaseIcon {...props}><path d="M12 20V11" /><path d="m8.5 14.5 3.5-3.5 3.5 3.5" /><path d="M5 5h14" /></BaseIcon>; }
export function IconPrinter(props: IconProps) { return <BaseIcon {...props}><rect x="7" y="4.8" width="10" height="5" rx="1" /><rect x="5" y="10" width="14" height="8" rx="2" /><path d="M8 14h8" /></BaseIcon>; }
export function IconStar(props: IconProps) { return <BaseIcon {...props}><path d="m12 4.8 2.6 5.1 5.6.8-4.1 4 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4.1-4 5.6-.8z" /></BaseIcon>; }
export function IconHeart(props: IconProps) { return <BaseIcon {...props}><path d="M12 19s-6.5-4.2-8.2-8.4A4.6 4.6 0 0 1 12 5.8a4.6 4.6 0 0 1 8.2 4.8C18.5 14.8 12 19 12 19Z" /></BaseIcon>; }
export function IconEye(props: IconProps) { return <BaseIcon {...props}><path d="M2.8 12s3-5.5 9.2-5.5 9.2 5.5 9.2 5.5-3 5.5-9.2 5.5S2.8 12 2.8 12Z" /><circle cx="12" cy="12" r="2.5" /></BaseIcon>; }
export function IconEdit(props: IconProps) { return <BaseIcon {...props}><path d="M4.8 19.2 5.7 15l8.9-8.9a1.2 1.2 0 0 1 1.7 0l1.6 1.6a1.2 1.2 0 0 1 0 1.7L9 18.2l-4.2 1Z" /><path d="M13.5 6.5 17 10" /></BaseIcon>; }
export function IconTrash(props: IconProps) { return <BaseIcon {...props}><path d="M5 7h14" /><path d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7" /><path d="M8 7l.7 12h6.6L16 7" /></BaseIcon>; }
export function IconChevronRight(props: IconProps) { return <BaseIcon {...props}><path d="m9 6 6 6-6 6" /></BaseIcon>; }
