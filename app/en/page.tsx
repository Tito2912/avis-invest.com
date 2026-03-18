import Link from 'next/link';
import type { Metadata } from 'next';
import { getLocalizedBlogPosts } from '@/lib/content';
import { buildAlternatesForHome, getOgImage } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'eToro & Bitpanda Guides (2026) — avis-invest.com',
  description: 'Practical eToro and Bitpanda guides: fees, CopyTrading, risks, withdrawals, and a “before you deposit” checklist.',
  alternates: buildAlternatesForHome('en'),
  openGraph: {
    type: 'website',
    title: 'eToro & Bitpanda Guides (2026) — avis-invest.com',
    description: 'Practical eToro and Bitpanda guides: fees, CopyTrading, risks, withdrawals, and a “before you deposit” checklist.',
    url: '/en',
    images: [{ url: getOgImage('en') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eToro & Bitpanda Guides (2026) — avis-invest.com',
    description: 'Practical eToro and Bitpanda guides: fees, CopyTrading, risks, withdrawals, and a “before you deposit” checklist.',
    images: [getOgImage('en')],
  },
};

export default async function EnHomePage() {
  const posts = await getLocalizedBlogPosts('en');

  return (
    <div className="stack">
      <section className="hero">
        <h1>avis-invest.com: eToro &amp; Bitpanda guides</h1>
        <p>
          Clear checklists to understand a platform, verify fees, and avoid mistakes before you deposit. Educational content
          (not financial advice).
        </p>
      </section>

      <section className="card" aria-label="Start here">
        <h2>Start here</h2>
        <ul className="list">
          <li>
            <Link href="/en/guide-etoro">eToro guide (pillar)</Link>
            <div className="muted">How it works, CopyTrading, safety checks.</div>
          </li>
          <li>
            <Link href="/en/blog/etoro-guide-2025-fees-regulation">eToro (2025): fees &amp; regulation</Link>
            <div className="muted">A sourced guide focused on fees, entities, and key risks.</div>
          </li>
          <li>
            <Link href="/en/blog/etoro-copytrading-2026">eToro CopyTrading (2026)</Link>
            <div className="muted">Minimums, method, and mistakes to avoid before copying.</div>
          </li>
          <li>
            <Link href="/en/blog/etoro-safety-regulation-2026">eToro safety &amp; regulation</Link>
            <div className="muted">CySEC, FCA, ASIC, MiCA, 2FA, and a pre-funding checklist.</div>
          </li>
          <li>
            <Link href="/en/blog/etoro-deposit-withdrawal-2026">eToro deposits &amp; withdrawals</Link>
            <div className="muted">Timing, FX conversion, verification, and real friction points.</div>
          </li>
          <li>
            <Link href="/en/blog/tradingview-etoro-alert-templates-2025">TradingView + eToro alert templates</Link>
            <div className="muted">Ready-to-clone templates and a minimal workflow.</div>
          </li>
          <li>
            <Link href="/en/bitpanda">Bitpanda guide</Link>
            <div className="muted">Crypto alternative: overview + risks.</div>
          </li>
          <li>
            <Link href="/en/blog/bitpanda-fees-2026">Bitpanda fees</Link>
            <div className="muted">Premiums, effective costs, and what to verify before you buy.</div>
          </li>
          <li>
            <Link href="/en/blog/bitpanda-security-2026">Bitpanda security</Link>
            <div className="muted">2FA, phishing, withdrawals, and account hygiene.</div>
          </li>
          <li>
            <Link href="/en/blog/bitpanda-vs-etoro-2026">Bitpanda vs eToro</Link>
            <div className="muted">How to choose between crypto access, CopyTrading, and long-term use.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Transparency">
        <h2>Transparency</h2>
        <ul className="list">
          <li>
            <Link href="/en/methodology">Methodology</Link>
            <div className="muted">“Before you deposit” checklist + criteria.</div>
          </li>
          <li>
            <Link href="/en/sources">Sources</Link>
            <div className="muted">How to verify a claim fast (pricing, docs, risks).</div>
          </li>
          <li>
            <Link href="/en/about">About</Link>
            <div className="muted">Affiliates, updates, corrections.</div>
          </li>
          <li>
            <Link href="/en/contact">Contact</Link>
            <div className="muted">Questions, corrections, reports.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Site pages">
        <h2>Pages</h2>
        <ul className="list">
          <li>
            <Link href="/en/guide-etoro">eToro guide</Link>
            <div className="muted">CopyTrading, fees, safety.</div>
          </li>
          <li>
            <Link href="/en/bitpanda">Bitpanda guide</Link>
            <div className="muted">Bitpanda review: features, fees (high-level) and risks.</div>
          </li>
          <li>
            <Link href="/en/blog">Blog</Link>
            <div className="muted">All articles and guides.</div>
          </li>
          <li>
            <Link href="/en/legal-notice">Legal notice</Link>
            <div className="muted">Publisher, hosting, affiliation and liability.</div>
          </li>
          <li>
            <Link href="/en/privacy-policy">Privacy policy</Link>
            <div className="muted">Data, cookies and your rights.</div>
          </li>
          <li>
            <Link href="/en/about">About</Link>
            <div className="muted">Affiliate disclosure, updates, corrections.</div>
          </li>
          <li>
            <Link href="/en/methodology">Methodology</Link>
            <div className="muted">Our checklist before you deposit.</div>
          </li>
          <li>
            <Link href="/en/sources">Sources</Link>
            <div className="muted">Official docs and fast verification method.</div>
          </li>
          <li>
            <Link href="/en/contact">Contact</Link>
            <div className="muted">Questions, corrections, reports.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Articles">
        <h2>Articles</h2>
        <ul className="list">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/en/blog/${p.slug}`}>{p.title}</Link>
              <div className="muted">{p.description}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
