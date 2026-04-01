import type { Metadata } from 'next';
import '../globals.css';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { LangHtmlUpdater } from '@/components/LangHtmlUpdater';
import { SiteJsonLd } from '@/components/SiteJsonLd';
import { getOgImage } from '@/lib/seo';

const SITE_NAME = 'Avis Invest';
const BASE_URL = 'https://avis-invest.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_NAME,
    template: '%s',
  },
  description:
    'eToro- und Bitpanda-Guides: Gebühren, CopyTrading, Auszahlungen, Sicherheitschecks, Regulierung und zentrale Risiken (nur Information).',
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
    description: 'eToro- und Bitpanda-Guides: Gebühren, CopyTrading, Auszahlungen, Sicherheitschecks, Regulierung und Risiken.',
    url: BASE_URL,
    siteName: SITE_NAME,
    images: [{ url: getOgImage('de') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'eToro- und Bitpanda-Guides: Gebühren, CopyTrading, Auszahlungen, Sicherheitschecks, Regulierung und Risiken.',
    images: [getOgImage('de')],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        <SiteJsonLd lang="de" />
        <LangHtmlUpdater />
        <SiteHeader />
        <main className="container">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

