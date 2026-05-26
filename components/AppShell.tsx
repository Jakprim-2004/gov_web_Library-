'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { GlobalSidebar } from './GlobalSidebar';

const HIDE_NAV = ['/login', '/auth/callback'];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarCollapsed(true);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Hide global sidebar on auth pages
  const isAuthPage = HIDE_NAV.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  // User Layout already has its own sidebar, so we hide the global one
  const isUserLayout = pathname.startsWith('/layout/user');

  const showSidebar = !isAuthPage && !isUserLayout;

  const sidebarWidth = isMobile ? 0 : sidebarCollapsed ? 64 : 280;

  return (
    <div className="app-shell">
      {showSidebar && (
        <>
          {/* Mobile hamburger button */}
          {isMobile && (
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              style={{
                position: 'fixed',
                top: 12,
                left: 12,
                zIndex: 200,
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'var(--gradient-primary)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                fontSize: 20,
              }}
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          )}

          {/* Mobile overlay */}
          {isMobile && mobileOpen && (
            <div
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 109,
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(4px)',
              }}
            />
          )}

          {/* Sidebar wrapper for mobile */}
          <div
            style={{
              ...(isMobile
                ? {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    zIndex: 110,
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease',
                    width: 280,
                  }
                : {}),
            }}
          >
            <GlobalSidebar
              isOpen={isMobile ? true : !sidebarCollapsed}
              onToggle={() => {
                if (isMobile) {
                  setMobileOpen(false);
                } else {
                  setSidebarCollapsed((c) => !c);
                }
              }}
            />
          </div>
        </>
      )}
      <div
        className="app-content"
        style={{ paddingLeft: showSidebar ? sidebarWidth : 0 }}
      >
        {children}
      </div>
    </div>
  );
}

