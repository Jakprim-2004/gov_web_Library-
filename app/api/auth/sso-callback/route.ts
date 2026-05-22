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
      console.warn(`\n⚠️ IAM-GOV API responded with ${iamResponse.status}`);
      const errorText = await iamResponse.text();
      console.warn(`[SSO Error Text]`, errorText);
    }
  } catch (error) {
    console.error('\n🔴 [SSO Callback Error] Fetch failed, falling back to mock user:', error);
    isMock = true;
  }

  if (!iamData) {
    return NextResponse.json(
      { success: false, message: 'ไม่สามารถเชื่อมต่อกับ IAM-GOV API ได้' },
      { status: 502 },
    );
  }

  const user =
    (iamData.user as SessionPayload['user'] | undefined) ||
    (iamData.data as { user?: SessionPayload['user'] } | undefined)?.user;

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
    ssoPayload: iamData as Record<string, unknown>,
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
    ssoPayload: session.ssoPayload,
    message: 'เข้าสู่ระบบสำเร็จ',
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
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
