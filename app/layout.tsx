import type { Metadata } from 'next';
import { AppShell } from '@/components/AppShell';
import { AppProviders } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'GOV Components Library ',
  description: 'ตัวอย่าง gov-token-css, gov-layout, gov-sso-login',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-brand-surface text-text-primary">
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
