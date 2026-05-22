import type { GovSsoConfig } from 'gov-sso-login';

function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_FRONTEND_URL?.replace(/\/$/, '') || 'http://localhost:3100';
}

function getCallbackUrl(): string {
  const base =
    process.env.NEXT_PUBLIC_FRONTEND_URL?.replace(/\/$/, '') ||
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3100');
  return `${base}/auth/callback`;
}

/** SSO config สำหรับ service webdemolibrary */
export const ssoConfig: GovSsoConfig = {
  iamAuthUrl: process.env.NEXT_PUBLIC_IAM_GOV_FRONTEND_URL || 'https://auth.govcenter.co',
  serviceCode: process.env.NEXT_PUBLIC_E_SERVICE_CODE || 'webdemolibrary',
  apiBaseUrl: getApiBaseUrl(),
  callbackUrl: getCallbackUrl(),
  ssoCallbackPath: '/api/auth/sso-callback',
};
