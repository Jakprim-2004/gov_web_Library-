import type { Metadata } from 'next';
import { Chakra_Petch, Noto_Sans_Thai, Noto_Serif_Thai } from 'next/font/google';
import { AppShell } from '@/components/AppShell';
import { AppProviders } from './providers';
import './globals.css';

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

const notoSerifThai = Noto_Serif_Thai({
  subsets: ['thai', 'latin'],
  weight: ['500', '600', '700'],
  variable: '--font-serif',
});

const chakraPetch = Chakra_Petch({
  subsets: ['thai', 'latin'],
  weight: ['500', '600', '700'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'GOV Components Library ',
  description: 'ตัวอย่าง gov-token-css, gov-layout, gov-sso-login',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body
        className={`min-h-screen gov-body ${notoSansThai.variable} ${notoSerifThai.variable} ${chakraPetch.variable}`}
      >
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
