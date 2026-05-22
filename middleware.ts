import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE } from '@/lib/session-constants';

const PUBLIC_PATHS = ['/login', '/auth/callback', '/sso'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Exact match for '/' since startsWith('//') doesn't make sense for root
  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || (p !== '/' && pathname.startsWith(`${p}/`)),
  );
  const hasSession = !!request.cookies.get(SESSION_COOKIE)?.value;

  if (!hasSession && !isPublic) {
    const login = new URL('/login', request.url);
    login.searchParams.set('from', pathname);
    return NextResponse.redirect(login);
  }

  if (hasSession && pathname === '/login') {
    return NextResponse.redirect(new URL('/layout/staff', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
