import type { Post } from '@/lib/types';
import { blogIndexHref, homeHref, type Lang } from '@/lib/site';

const BASE_URL = 'https://avis-invest.com';
const BRAND = 'avis-invest.com';
const PUBLISHER = 'E-Com Shop';

export function buildArticleJsonLd(post: Post) {
  const url = new URL(post.canonical ?? `/${post.slug}`, BASE_URL).toString();
  const published = post.date ?? post.updatedAt ?? new Date().toISOString();
  const modified = post.updatedAt ?? published;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    mainEntityOfPage: url,
    datePublished: published,
    dateModified: modified,
    author: [{ '@type': 'Organization', name: BRAND }],
    publisher: {
      '@type': 'Organization',
      name: PUBLISHER,
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: new URL('/images/logo.png', BASE_URL).toString() },
    },
  };
}

const HOME_LABEL: Record<Lang, string> = { fr: 'Accueil', en: 'Home', es: 'Inicio', de: 'Startseite' };
const BLOG_LABEL: Record<Lang, string> = { fr: 'Blog', en: 'Blog', es: 'Blog', de: 'Blog' };

export function buildBreadcrumbJsonLd(post: Post, opts?: { lang?: Lang; includeBlog?: boolean }) {
  const lang = opts?.lang ?? 'fr';
  const url = new URL(post.canonical ?? `/${post.slug}`, BASE_URL).toString();
  const homeUrl = new URL(homeHref(lang), BASE_URL).toString();

  const items: any[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: HOME_LABEL[lang],
      item: homeUrl,
    },
  ];

  if (opts?.includeBlog) {
    const blogUrl = new URL(blogIndexHref(lang), BASE_URL).toString();
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: BLOG_LABEL[lang],
      item: blogUrl,
    });
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: post.title,
      item: url,
    });
  } else {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: post.title,
      item: url,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}
