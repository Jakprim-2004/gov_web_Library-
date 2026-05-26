import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  SESSION_COOKIE,
  encodeSession,
  getSessionSecret,
  type SessionPayload,
} from '@/lib/session';

const IAM_VERIFY_PATH = '/e-services/sso/verify-code';

export async function POST(request: Request) {
  const apiKey = process.env.E_SERVICE_API_KEY;
  const iamApiUrl = process.env.IAM_GOV_API_URL?.replace(/\/$/, '');
  // ตรวจสอบการตั้งค่า Environment Variables เบื้องต้นตามเอกสาร
  if (!apiKey || !iamApiUrl) {
    console.error('🔴 [SSO Callback Error] Missing IAM_GOV_API_URL or E_SERVICE_API_KEY in environment');
    return NextResponse.json(
      { success: false, message: 'การตั้งค่าระบบไม่สมบูรณ์' },
      { status: 500 },
    );
  }



  let body: { code?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'ข้อมูล request ไม่ถูกต้อง' },
      { status: 400 },
    );
  }

  const code = body.code?.trim();
  if (!code) {
    return NextResponse.json(
      { success: false, message: 'ไม่พบ authorization code' },
      { status: 400 },
    );
  }

  let iamData: Record<string, unknown> | null = null;
  let isMock = false;

  try {
    const iamResponse = await fetch(`${iamApiUrl}${IAM_VERIFY_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ code }),
    });

    if (iamResponse.ok) {
      iamData = await iamResponse.json();
    } else {
      const errorText = await iamResponse.text();
      console.warn(`\n⚠️ IAM-GOV API responded with ${iamResponse.status}`);
      console.warn(`[SSO Error Text]`, errorText);
      if (iamResponse.status === 403 && errorText.includes('already been used')) {
        return NextResponse.json(
          {
            success: false,
            message: 'รหัส SSO ถูกใช้แล้ว กรุณาเข้าสู่ระบบใหม่',
          },
          { status: 400 },
        );
      }
    }
  } catch (error) {
    console.error('\n🔴 [SSO Callback Error] Fetch failed, falling back to mock user:', error);
    isMock = true;
  }

  if (!iamData && process.env.NODE_ENV === 'development') {
    console.warn('[SSO] IAM unavailable — using dev mock session');
    isMock = true;
    iamData = {
      user: {
        id: 'dev-mock-user',
        name: 'Dev Mock User',
        email: 'dev@localhost',
        systemRole: 'USER',
        memberships: [],
      },
      residences: [],
    };
  }

  if (!iamData) {
    return NextResponse.json(
      { success: false, message: 'ไม่สามารถเชื่อมต่อกับ IAM-GOV API ได้' },
      { status: 502 },
    );
  }

  const normalizedPayload =
    (iamData as { data?: Record<string, unknown> }).data ??
    (iamData as Record<string, unknown>);

  const user =
    (normalizedPayload as { user?: SessionPayload['user'] }).user ||
    (iamData as { user?: SessionPayload['user'] }).user;

  if (!user?.id) {
    return NextResponse.json(
      { success: false, message: 'IAM-GOV ไม่ส่งข้อมูลผู้ใช้กลับมา' },
      { status: 502 },
    );
  }

  // Map IAM-GOV fields → SsoUser (API ส่ง name, systemRole, avatarUrl)
  const rawUser = user as Record<string, any>;
  const fullName: string = rawUser.name || '';
  const [firstName, ...lastParts] = fullName.split(' ');

  const slimPayload = {
    message: (normalizedPayload as { message?: string }).message,
    user: (normalizedPayload as { user?: Record<string, unknown> }).user,
    membershipsCount: Array.isArray((rawUser as any)?.memberships)
      ? (rawUser as any).memberships.length
      : 0,
    residencesCount: Array.isArray((normalizedPayload as any)?.residences)
      ? (normalizedPayload as any).residences.length
      : 0,
  };

  const session: SessionPayload = {
    user: {
      id: String(user.id),
      firstName: rawUser.firstName || firstName || '',
      lastName: rawUser.lastName || lastParts.join(' ') || '',
      role: rawUser.role || rawUser.systemRole,
      phone: rawUser.phone,
      pictureUrl: rawUser.pictureUrl || rawUser.avatarUrl,
      email: rawUser.email,
    },
    ssoPayload: slimPayload as Record<string, unknown>,
  };

  let token: string;
  try {
    token = encodeSession(session, getSessionSecret());
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        message: e instanceof Error ? e.message : 'ตั้งค่า SESSION_SECRET ไม่ครบ',
      },
      { status: 500 },
    );
  }

  const res = NextResponse.json({
    success: true,
    user: session.user,
    ssoPayload: normalizedPayload,
    message: isMock ? 'เข้าสู่ระบบสำเร็จ (dev mock)' : 'เข้าสู่ระบบสำเร็จ',
  });

  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}

/** สำหรับ debug — ไม่เปิดใน production */
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: 'POST /api/auth/sso-callback' });
}
