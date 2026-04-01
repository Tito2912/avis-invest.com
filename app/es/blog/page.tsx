import Link from 'next/link';
import type { Metadata } from 'next';
import { getLocalizedBlogPosts } from '@/lib/content';
import { buildAlternatesForBlogIndex, getOgImage } from '@/lib/seo';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog — guías eToro y Bitpanda',
  description: 'Guías, comparativas y reseñas para empezar y mejorar.',
  alternates: buildAlternatesForBlogIndex('es'),
  openGraph: {
    type: 'website',
    title: 'Blog — guías eToro y Bitpanda',
    description: 'Guías, comparativas y reseñas para empezar y mejorar.',
    url: '/es/blog',
    images: [{ url: getOgImage('es') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — guías eToro y Bitpanda',
    description: 'Guías, comparativas y reseñas para empezar y mejorar.',
    images: [getOgImage('es')],
  },
};

export default async function EsBlogPage() {
  const posts = await getLocalizedBlogPosts('es');

  return (
    <div className="stack">
      <section className="hero">
        <h1>Blog</h1>
        <p>Guías, comparativas y reseñas para empezar y progresar.</p>
      </section>

      <section className="card" aria-label="Lista de artículos">
        <h2>Artículos</h2>
        <ul className="list">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/es/blog/${p.slug}`}>{p.title}</Link>
              <div className="muted">{p.description}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
