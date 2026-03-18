import Link from 'next/link';
import type { Metadata } from 'next';
import { getLocalizedBlogPosts } from '@/lib/content';
import { buildAlternatesForBlogIndex, getOgImage } from '@/lib/seo';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Guides, Vergleiche und Reviews, um zu starten und besser zu werden.',
  alternates: buildAlternatesForBlogIndex('de'),
  openGraph: {
    type: 'website',
    title: 'Blog',
    description: 'Guides, Vergleiche und Reviews, um zu starten und besser zu werden.',
    url: '/de/blog',
    images: [{ url: getOgImage('de') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog',
    description: 'Guides, Vergleiche und Reviews, um zu starten und besser zu werden.',
    images: [getOgImage('de')],
  },
};

export default async function DeBlogPage() {
  const posts = await getLocalizedBlogPosts('de');

  return (
    <div className="stack">
      <section className="hero">
        <h1>Blog</h1>
        <p>Guides, Vergleiche und Reviews zum Starten und Weiterkommen.</p>
      </section>

      <section className="card" aria-label="Artikelliste">
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
