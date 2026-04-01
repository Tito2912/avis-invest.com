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
  description: 'Guides eToro & Bitpanda : frais, CopyTrading, retraits, sécurité, régulation et risques (contenu informatif).',
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
    description: 'Guides eToro & Bitpanda : frais, CopyTrading, retraits, sécurité, régulation et risques.',
    url: BASE_URL,
    siteName: SITE_NAME,
    images: [{ url: getOgImage('fr') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'Guides eToro & Bitpanda : frais, CopyTrading, retraits, sécurité, régulation et risques.',
    images: [getOgImage('fr')],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <SiteJsonLd lang="fr" />
        <LangHtmlUpdater />
        <SiteHeader />
        <main className="container">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

