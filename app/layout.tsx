import type { Metadata } from 'next';
import { Inter, Noto_Sans_Thai } from 'next/font/google';
import { AppShell } from '@/components/AppShell';
import { AppProviders } from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-sans-thai',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GOV Components Library ',
  description: 'ตัวอย่าง gov-token-css, gov-layout, gov-sso-login',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link href="https://db.onlinewebfonts.com/c/5ac3fe7c6abd2f62067f266d89671492?family=HelveticaNowDisplay-Medium" rel="stylesheet" />
        <link href="https://db.onlinewebfonts.com/c/1aa3377e489837a26d019bba501e779d?family=HelveticaNowDisplayW01-Rg" rel="stylesheet" />
      </head>
      <body className={`min-h-screen gov-body ${inter.variable} ${notoSansThai.variable}`}>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
