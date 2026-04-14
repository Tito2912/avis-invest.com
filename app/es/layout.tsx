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
  description:
    'Guías de eToro y Bitpanda: comisiones, CopyTrading, retiros, seguridad, regulación y riesgos clave (contenido educativo).',
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
    description: 'Guías de eToro y Bitpanda: comisiones, CopyTrading, retiros, seguridad, regulación y riesgos clave.',
    url: BASE_URL,
    siteName: SITE_NAME,
    images: [{ url: getOgImage('es') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'Guías de eToro y Bitpanda: comisiones, CopyTrading, retiros, seguridad, regulación y riesgos clave.',
    images: [getOgImage('es')],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <SiteJsonLd lang="es" />
        <LangHtmlUpdater />
        <SiteHeader />
        <main className="container">{children}</main>
        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  );
}
