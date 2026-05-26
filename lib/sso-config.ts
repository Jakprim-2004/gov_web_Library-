import type { GovSsoConfig } from 'gov-sso-login';

/** API base สำหรับ POST sso-callback — บน browser ใช้ origin ปัจจุบันเสมอ */
export function getSsoConfig(): GovSsoConfig {
  const envOrigin = (process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3100').replace(
    /\/$/,
    '',
  );
  const origin =
    typeof window !== 'undefined' ? window.location.origin.replace(/\/$/, '') : envOrigin;

  // SSO callback must be same-origin to store the session cookie correctly.
  const callbackBaseEnv = process.env.NEXT_PUBLIC_SSO_CALLBACK_BASE?.trim();
  const callbackBaseUrl = callbackBaseEnv ? callbackBaseEnv.replace(/\/$/, '') : origin;

  return {
    iamAuthUrl: process.env.NEXT_PUBLIC_IAM_GOV_FRONTEND_URL || 'https://auth.govcenter.co',
    serviceCode: process.env.NEXT_PUBLIC_E_SERVICE_CODE || 'webdemolibrary',
    apiBaseUrl: callbackBaseUrl,
    callbackUrl: `${origin}/auth/callback`,
    ssoCallbackPath: '/api/auth/sso-callback',
  };
}

/** @deprecated ใช้ getSsoConfig() ใน client แทน — ค่าจาก module load อาจไม่ตรง origin */
export const ssoConfig = getSsoConfig();
