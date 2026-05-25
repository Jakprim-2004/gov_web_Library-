'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { GovSsoProvider, type GovSsoConfig } from 'gov-sso-login';
import { getSsoConfig } from '@/lib/sso-config';

export function ClientGovSsoProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<GovSsoConfig>(() => getSsoConfig());

  useEffect(() => {
    setConfig(getSsoConfig());
  }, []);

  return (
    <GovSsoProvider config={config} theme={{ primaryColor: '#1E7D55' }}>
      {children}
    </GovSsoProvider>
  );
}
