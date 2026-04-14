import type { Metadata } from 'next';
import '../globals.css';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { LangHtmlUpdater } from '@/components/LangHtmlUpdater';
import { SiteJsonLd } from '@/components/SiteJsonLd';
import { CookieBanner } from '@/components/CookieBanner';
import { getOgImage } from '@/lib/seo';

const SITE_NAME = 'Avis Invest';
const BASE_URL = 'https://avis-invest.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_NAME,
    template: '%s',
  },
  description: 'eToro & Bitpanda guides: fees, CopyTrading, withdrawals, safety checks, regulation, and key risks (educational content).',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    title: SITE_NAME,
    description: 'eToro & Bitpanda guides: fees, CopyTrading, withdrawals, safety checks, regulation, and key risks.',
    url: BASE_URL,
    siteName: SITE_NAME,
    images: [{ url: getOgImage('en') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'eToro & Bitpanda guides: fees, CopyTrading, withdrawals, safety checks, regulation, and key risks.',
    images: [getOgImage('en')],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteJsonLd lang="en" />
        <LangHtmlUpdater />
        <SiteHeader />
        <main className="container">{children}</main>
        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  );
}
