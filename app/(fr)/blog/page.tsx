import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/content';
import { buildAlternatesForBlogIndex, getOgImage } from '@/lib/seo';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog — guides eToro & Bitpanda',
  description: 'Guides, comparatifs et avis pour débuter et progresser.',
  alternates: buildAlternatesForBlogIndex('fr'),
  openGraph: {
    type: 'website',
    title: 'Blog — guides eToro & Bitpanda',
    description: 'Guides, comparatifs et avis pour débuter et progresser.',
    url: '/blog',
    images: [{ url: getOgImage('fr') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — guides eToro & Bitpanda',
    description: 'Guides, comparatifs et avis pour débuter et progresser.',
    images: [getOgImage('fr')],
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="stack">
      <section className="hero">
        <h1>Blog</h1>
        <p>Guides, comparatifs et avis pour débuter et progresser.</p>
      </section>

      <section className="card" aria-label="Liste des articles">
        <h2>Articles</h2>
        <ul className="list">
          {posts.map((p) => (
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
