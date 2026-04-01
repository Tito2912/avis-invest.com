import Link from 'next/link';
import type { Metadata } from 'next';
import { getLocalizedBlogPosts } from '@/lib/content';
import { buildAlternatesForHome, getOgImage } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'eToro & Bitpanda Guides (2026): Gebühren & Risiken',
  description: 'Praxisnahe eToro- und Bitpanda-Guides: Gebühren, CopyTrading, Risiken, Auszahlungen und Checkliste vor Einzahlung.',
  alternates: buildAlternatesForHome('de'),
  openGraph: {
    type: 'website',
    title: 'eToro & Bitpanda Guides (2026): Gebühren & Risiken',
    description: 'Praxisnahe eToro- und Bitpanda-Guides: Gebühren, CopyTrading, Risiken, Auszahlungen und Checkliste vor Einzahlung.',
    url: '/de',
    images: [{ url: getOgImage('de') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eToro & Bitpanda Guides (2026): Gebühren & Risiken',
    description: 'Praxisnahe eToro- und Bitpanda-Guides: Gebühren, CopyTrading, Risiken, Auszahlungen und Checkliste vor Einzahlung.',
    images: [getOgImage('de')],
  },
};

export default async function DeHomePage() {
  const posts = await getLocalizedBlogPosts('de');

  return (
    <div className="stack">
      <section className="hero">
        <h1>avis-invest.com: eToro &amp; Bitpanda Guides</h1>
        <p>
          Klare Checklisten, um Plattformen zu verstehen, Gebühren zu prüfen und Fehler vor der Einzahlung zu vermeiden. Educational content
          (keine Anlageberatung).
        </p>
      </section>

      <section className="card" aria-label="Start">
        <h2>Start</h2>
        <ul className="list">
          <li>
            <Link href="/de/guide-etoro">eToro Guide (Pillar)</Link>
            <div className="muted">Wie es funktioniert, CopyTrading, Safety-Checks.</div>
          </li>
          <li>
            <Link href="/de/blog/etoro-guide-2025-gebuehren-regulierung">eToro (2025): Gebühren &amp; Regulierung</Link>
            <div className="muted">Sourcierter Guide: Fees, Entities, wichtigste Risiken.</div>
          </li>
          <li>
            <Link href="/de/blog/etoro-copytrading-2026">eToro CopyTrading (2026)</Link>
            <div className="muted">Mindestbeträge, Methode und typische Fehler vor dem Kopieren.</div>
          </li>
          <li>
            <Link href="/de/blog/etoro-sicherheit-regulierung-2026">eToro Sicherheit &amp; Regulierung</Link>
            <div className="muted">CySEC, FCA, ASIC, MiCA, 2FA und Checkliste vor Einzahlung.</div>
          </li>
          <li>
            <Link href="/de/blog/etoro-einzahlung-auszahlung-2026">eToro Ein- und Auszahlungen</Link>
            <div className="muted">Dauer, Umrechnung, Verifizierung und echte Reibungspunkte.</div>
          </li>
          <li>
            <Link href="/de/blog/tradingview-etoro-alert-vorlagen-2025">TradingView + eToro Alert-Vorlagen</Link>
            <div className="muted">Vorlagen zum Klonen + minimaler Workflow.</div>
          </li>
          <li>
            <Link href="/de/bitpanda">Bitpanda Guide</Link>
            <div className="muted">Krypto-Alternative: Überblick + Risiken.</div>
          </li>
          <li>
            <Link href="/de/blog/bitpanda-gebuehren-2026">Bitpanda Gebühren</Link>
            <div className="muted">Premiums, echte Kosten und Checks vor dem Kauf.</div>
          </li>
          <li>
            <Link href="/de/blog/bitpanda-sicherheit-2026">Bitpanda Sicherheit</Link>
            <div className="muted">2FA, Phishing, Auszahlungen und Kontodisziplin.</div>
          </li>
          <li>
            <Link href="/de/blog/bitpanda-vs-etoro-2026">Bitpanda vs eToro</Link>
            <div className="muted">Vergleich nach Krypto-Zugang, CopyTrading und Langfrist-Nutzung.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Transparenz">
        <h2>Transparenz</h2>
        <ul className="list">
          <li>
            <Link href="/de/methodology">Methodik</Link>
            <div className="muted">Checkliste vor Einzahlung + Kriterien.</div>
          </li>
          <li>
            <Link href="/de/sources">Quellen</Link>
            <div className="muted">Claims schnell prüfen (Pricing, Docs, Risiken).</div>
          </li>
          <li>
            <Link href="/de/about">Über uns</Link>
            <div className="muted">Affiliate, Updates, Korrekturen.</div>
          </li>
          <li>
            <Link href="/de/contact">Kontakt</Link>
            <div className="muted">Fragen, Korrekturen, Hinweise.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Seiten der Website">
        <h2>Seiten</h2>
        <ul className="list">
          <li>
            <Link href="/de/guide-etoro">eToro Guide</Link>
            <div className="muted">CopyTrading, Gebühren, Sicherheit.</div>
          </li>
          <li>
            <Link href="/de/bitpanda">Bitpanda Guide</Link>
            <div className="muted">Bitpanda Review: Funktionen, Gebühren (Überblick) und Risiken.</div>
          </li>
          <li>
            <Link href="/de/blog">Blog</Link>
            <div className="muted">Alle Artikel und Guides.</div>
          </li>
          <li>
            <Link href="/de/legal-notice">Rechtliche Hinweise</Link>
            <div className="muted">Herausgeber, Hosting, Affiliate-Hinweis und Haftung.</div>
          </li>
          <li>
            <Link href="/de/privacy-policy">Datenschutz</Link>
            <div className="muted">Daten, Cookies und Ihre Rechte.</div>
          </li>
          <li>
            <Link href="/de/about">Über uns</Link>
            <div className="muted">Affiliate, Updates, Korrekturen.</div>
          </li>
          <li>
            <Link href="/de/methodology">Methodik</Link>
            <div className="muted">Checkliste vor Einzahlung.</div>
          </li>
          <li>
            <Link href="/de/sources">Quellen</Link>
            <div className="muted">Offizielle Docs und schneller Check.</div>
          </li>
          <li>
            <Link href="/de/contact">Kontakt</Link>
            <div className="muted">Fragen, Korrekturen, Hinweise.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Artikel">
        <h2>Artikel</h2>
        <ul className="list">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/de/blog/${p.slug}`}>{p.title}</Link>
              <div className="muted">{p.description}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
