import Link from 'next/link';
import type { Metadata } from 'next';
import { getLocalizedBlogPosts } from '@/lib/content';
import { buildAlternatesForBlogIndex, getOgImage } from '@/lib/seo';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog — eToro & Bitpanda guides',
  description: 'Guides, comparisons and reviews on eToro and Bitpanda to help you get started, understand investing platforms and improve your decisions.',
  alternates: buildAlternatesForBlogIndex('en'),
  openGraph: {
    type: 'website',
    title: 'Blog — eToro & Bitpanda guides',
    description: 'Guides, comparisons and reviews on eToro and Bitpanda to help you get started, understand investing platforms and improve your decisions.',
    url: '/en/blog',
    images: [{ url: getOgImage('en') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — eToro & Bitpanda guides',
    description: 'Guides, comparisons and reviews on eToro and Bitpanda to help you get started, understand investing platforms and improve your decisions.',
    images: [getOgImage('en')],
  },
};

export default async function EnBlogPage() {
  const posts = await getLocalizedBlogPosts('en');

  return (
    <div className="stack">
      <section className="hero">
        <h1>Blog</h1>
        <p>Guides, comparisons and reviews to get started and improve.</p>
      </section>

      <section className="card" aria-label="Articles list">
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
