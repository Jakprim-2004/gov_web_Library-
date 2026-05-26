'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { GlobalSidebar } from './GlobalSidebar';

const HIDE_NAV = ['/login', '/auth/callback'];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Hide global sidebar on auth pages
  const isAuthPage = HIDE_NAV.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  // User Layout already has its own sidebar, so we hide the global one
  const isUserLayout = pathname.startsWith('/layout/user');

  const showSidebar = !isAuthPage && !isUserLayout;

  return (
    <div className="app-shell">
      {showSidebar && (
        <GlobalSidebar
          isOpen={!sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((c) => !c)}
        />
      )}
      <div
        className="app-content"
        style={{ paddingLeft: showSidebar ? (sidebarCollapsed ? 64 : 280) : 0 }}
      >
        {children}
      </div>
    </div>
  );
}
