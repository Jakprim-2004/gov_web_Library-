'use client';

import { SettingsProvider } from 'gov-layout';
import { DemoAuthProvider } from '@/lib/demo-auth';
import { ClientGovSsoProvider } from '@/components/ClientGovSsoProvider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ClientGovSsoProvider>
      <SettingsProvider>
        <DemoAuthProvider>{children}</DemoAuthProvider>
      </SettingsProvider>
    </ClientGovSsoProvider>
  );
}
