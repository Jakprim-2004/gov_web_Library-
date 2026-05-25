import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, decodeSession, getSessionSecret } from '@/lib/session';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  try {
    const session = decodeSession(token, getSessionSecret());
    if (!session) {
      return NextResponse.json({ authenticated: false });
    }
    return NextResponse.json({
      authenticated: true,
      user: session.user,
      ssoPayload: session.ssoPayload,
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
