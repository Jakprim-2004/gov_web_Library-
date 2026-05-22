'use client';

import { usePathname } from 'next/navigation';
import { GlobalSidebar } from './GlobalSidebar';

const HIDE_NAV = ['/login', '/auth/callback'];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide global sidebar on auth pages
  const isAuthPage = HIDE_NAV.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  // User Layout already has its own sidebar, so we hide the global one
  const isUserLayout = pathname.startsWith('/layout/user');
  
  const showSidebar = !isAuthPage && !isUserLayout;

  return (
    <div className="flex min-h-screen">
      {showSidebar && <GlobalSidebar />}
      <div 
        className="flex-1 transition-all duration-300" 
        style={{ marginLeft: showSidebar ? 280 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}
