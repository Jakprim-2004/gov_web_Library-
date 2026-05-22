'use client';

import { usePathname, useRouter } from 'next/navigation';
import { StaffSidebar } from 'gov-layout';
import { useDemoAuth } from '@/lib/demo-auth';
import { STAFF_MENU } from '@/lib/demo-menu';

export function GlobalSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoggedIn, logout } = useDemoAuth();

  const displayUser = isLoggedIn ? {
    firstName: user?.firstName,
    lastName: user?.lastName,
    pictureUrl: user?.pictureUrl,
  } : undefined;

  return (
    <StaffSidebar
      orgLogo="https://att-mybiz.s3.ap-southeast-1.amazonaws.com/webblock/de10796c-34f3-40f8-9168-7fe6903e2256/image_en/small-401f994d33c028d17d7417de801031bb.png"
      orgName="เทศบาลตำบล Biza"
      orgSubtitle="จังหวัด Biza enterprise"
      menuItems={STAFF_MENU}
      user={displayUser || null}
      roleLabel="เจ้าหน้าที่"
      currentPath={pathname}
      onNavigate={(path) => router.push(path)}
      onLogout={() => void logout()}
      collapsible
    />
  );
}
