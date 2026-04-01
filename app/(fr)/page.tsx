import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPages } from '@/lib/content';
import { buildAlternatesForHome, getOgImage } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Guides eToro & Bitpanda (2026) : frais & risques',
  description:
    'Guides pratiques eToro et Bitpanda : frais, CopyTrading, risques, retraits et checklist avant dépôt. Contenu informatif (pas un conseil financier).',
  alternates: buildAlternatesForHome('fr'),
  openGraph: {
    type: 'website',
    title: 'Guides eToro & Bitpanda (2026) : frais & risques',
    description:
      'Guides pratiques eToro et Bitpanda : frais, CopyTrading, risques, retraits et checklist avant dépôt.',
    url: '/',
    images: [{ url: getOgImage('fr') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guides eToro & Bitpanda (2026) : frais & risques',
    description:
      'Guides pratiques eToro et Bitpanda : frais, CopyTrading, risques, retraits et checklist avant dépôt.',
    images: [getOgImage('fr')],
  },
};

export default async function HomePage() {
  const pages = await getAllPages();
  const pinned = new Set(['guide-etoro', 'bitpanda', 'blog', 'methodologie', 'sources', 'a-propos', 'contact']);

  return (
    <div className="stack">
      <section className="hero">
        <h1>avis-invest.com : guides eToro &amp; Bitpanda</h1>
        <p>
          Des checklists claires pour comprendre une plateforme, vérifier les frais et éviter les erreurs avant de déposer.
          Contenu informatif (pas un conseil financier).
        </p>
      </section>

      <section className="card" aria-label="Commencer">
        <h2>Commencer</h2>
        <ul className="list">
          <li>
            <Link href="/guide-etoro">Guide eToro (pilier)</Link>
            <div className="muted">Fonctionnement, CopyTrading, sécurité et points de vigilance.</div>
          </li>
          <li>
            <Link href="/etoro-fonctionnement-frais-regulations-2025">eToro (2025) : frais &amp; régulations</Link>
            <div className="muted">Guide sourcé : frais, entités, risques, bonnes pratiques.</div>
          </li>
          <li>
            <Link href="/copytrading-etoro-2026">CopyTrading eToro (2026)</Link>
            <div className="muted">Minimums, méthode et erreurs à éviter avant de copier.</div>
          </li>
          <li>
            <Link href="/etoro-securite-regulation-2026">eToro : sécurité &amp; régulation</Link>
            <div className="muted">CySEC, FCA, ASIC, MiCA, 2FA et checklist avant dépôt.</div>
          </li>
          <li>
            <Link href="/etoro-depot-retrait-2026">eToro : dépôt &amp; retrait</Link>
            <div className="muted">Délais, conversion, vérification et vraies frictions.</div>
          </li>
          <li>
            <Link href="/tradingview-etoro-alertes-templates-2025">TradingView + eToro : templates d’alertes</Link>
            <div className="muted">Modèles prêts à cloner + workflow simple.</div>
          </li>
          <li>
            <Link href="/bitpanda">Guide Bitpanda</Link>
            <div className="muted">Alternative crypto : fonctionnement, frais (vue d’ensemble) et risques.</div>
          </li>
          <li>
            <Link href="/bitpanda-frais-2026">Bitpanda : frais</Link>
            <div className="muted">Premiums, coûts réels et points à vérifier avant achat.</div>
          </li>
          <li>
            <Link href="/bitpanda-securite-2026">Bitpanda : sécurité</Link>
            <div className="muted">2FA, phishing, retraits et discipline de compte.</div>
          </li>
          <li>
            <Link href="/bitpanda-vs-etoro-2026">Bitpanda vs eToro</Link>
            <div className="muted">Quel outil regarder selon crypto, copy trading et usage long terme.</div>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
            <div className="muted">Tous les articles et guides.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Transparence">
        <h2>Transparence</h2>
        <ul className="list">
          <li>
            <Link href="/methodologie">Méthodologie</Link>
            <div className="muted">Checklist “avant dépôt” et critères d’évaluation.</div>
          </li>
          <li>
            <Link href="/sources">Sources</Link>
            <div className="muted">Comment vérifier rapidement une info (pricing, docs, risques).</div>
          </li>
          <li>
            <Link href="/a-propos">À propos</Link>
            <div className="muted">Affiliation, mises à jour, corrections.</div>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
            <div className="muted">Question, correction, signalement.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Pages du site">
        <h2>Toutes les pages</h2>
        <ul className="list">
          <li>
            <Link href="/guide-etoro">Guide eToro</Link>
            <div className="muted">Page principale : CopyTrading, frais et sécurité.</div>
          </li>
          <li>
            <Link href="/bitpanda">Guide Bitpanda</Link>
            <div className="muted">Avis Bitpanda : fonctionnalités, frais (vue d’ensemble) et risques.</div>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
            <div className="muted">Tous les articles et guides.</div>
          </li>
          {pages
            .filter((p) => !pinned.has(p.slug))
            .map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`}>{p.title}</Link>
                <div className="muted">{p.description}</div>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
