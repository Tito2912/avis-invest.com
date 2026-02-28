import type { Metadata } from 'next';
import './globals.css';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: {
    default: 'Avis eToro',
    template: '%s | Avis eToro',
  },
  description:
    'Avis eToro : CopyTrading, actions (0% commission selon pays), crypto, frais, sécurité et régulation. Guide pas à pas + risques pour bien débuter.',
  metadataBase: new URL('https://avis-invest.com'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'Avis eToro',
    description:
      'Avis eToro : CopyTrading, actions (0% commission selon pays), crypto, frais, sécurité et régulation. Guide pas à pas + risques pour bien débuter.',
    url: 'https://avis-invest.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SiteHeader />
        <main className="container">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
