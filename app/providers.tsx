'use client';

import { GovSsoProvider } from 'gov-sso-login';
import { SettingsProvider } from 'gov-layout';
import { DemoAuthProvider } from '@/lib/demo-auth';
import { ssoConfig } from '@/lib/sso-config';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <GovSsoProvider config={ssoConfig} theme={{ primaryColor: '#1E7D55' }}>
      <SettingsProvider>
        <DemoAuthProvider>{children}</DemoAuthProvider>
      </SettingsProvider>
    </GovSsoProvider>
  );
}
