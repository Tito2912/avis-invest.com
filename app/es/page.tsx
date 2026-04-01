import Link from 'next/link';
import type { Metadata } from 'next';
import { getLocalizedBlogPosts } from '@/lib/content';
import { buildAlternatesForHome, getOgImage } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Guías eToro y Bitpanda (2026): comisiones y riesgos',
  description: 'Guías prácticas sobre eToro y Bitpanda: comisiones, CopyTrading, riesgos, retiros y checklist antes de depositar.',
  alternates: buildAlternatesForHome('es'),
  openGraph: {
    type: 'website',
    title: 'Guías eToro y Bitpanda (2026): comisiones y riesgos',
    description: 'Guías prácticas sobre eToro y Bitpanda: comisiones, CopyTrading, riesgos, retiros y checklist antes de depositar.',
    url: '/es',
    images: [{ url: getOgImage('es') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guías eToro y Bitpanda (2026): comisiones y riesgos',
    description: 'Guías prácticas sobre eToro y Bitpanda: comisiones, CopyTrading, riesgos, retiros y checklist antes de depositar.',
    images: [getOgImage('es')],
  },
};

export default async function EsHomePage() {
  const posts = await getLocalizedBlogPosts('es');

  return (
    <div className="stack">
      <section className="hero">
        <h1>avis-invest.com: guías de eToro y Bitpanda</h1>
        <p>
          Checklists claras para entender una plataforma, verificar comisiones y evitar errores antes de depositar. Contenido
          educativo (no es asesoramiento financiero).
        </p>
      </section>

      <section className="card" aria-label="Empieza aquí">
        <h2>Empieza aquí</h2>
        <ul className="list">
          <li>
            <Link href="/es/guide-etoro">Guía de eToro (pilar)</Link>
            <div className="muted">Cómo funciona, CopyTrading, checks de seguridad.</div>
          </li>
          <li>
            <Link href="/es/blog/etoro-guia-2025-tarifas-regulacion">eToro (2025): comisiones y regulación</Link>
            <div className="muted">Guía con foco en tarifas, entidades y riesgos clave.</div>
          </li>
          <li>
            <Link href="/es/blog/copytrading-etoro-2026">CopyTrading eToro (2026)</Link>
            <div className="muted">Mínimos, método y errores frecuentes antes de copiar.</div>
          </li>
          <li>
            <Link href="/es/blog/etoro-seguridad-regulacion-2026">eToro: seguridad y regulación</Link>
            <div className="muted">CySEC, FCA, ASIC, MiCA, 2FA y checklist antes de depositar.</div>
          </li>
          <li>
            <Link href="/es/blog/etoro-deposito-retiro-2026">eToro: depósito y retiro</Link>
            <div className="muted">Plazos, conversión, verificación y fricciones reales.</div>
          </li>
          <li>
            <Link href="/es/blog/tradingview-etoro-alertas-plantillas-2025">TradingView + eToro: plantillas de alertas</Link>
            <div className="muted">Plantillas listas para clonar y workflow mínimo.</div>
          </li>
          <li>
            <Link href="/es/bitpanda">Guía de Bitpanda</Link>
            <div className="muted">Alternativa cripto: overview + riesgos.</div>
          </li>
          <li>
            <Link href="/es/blog/bitpanda-comisiones-2026">Comisiones de Bitpanda</Link>
            <div className="muted">Premiums, coste real y checks antes de comprar.</div>
          </li>
          <li>
            <Link href="/es/blog/bitpanda-seguridad-2026">Seguridad de Bitpanda</Link>
            <div className="muted">2FA, phishing, retiradas y disciplina de cuenta.</div>
          </li>
          <li>
            <Link href="/es/blog/bitpanda-vs-etoro-2026">Bitpanda vs eToro</Link>
            <div className="muted">Cómo elegir según uso cripto, CopyTrading y horizonte.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Transparencia">
        <h2>Transparencia</h2>
        <ul className="list">
          <li>
            <Link href="/es/methodology">Metodología</Link>
            <div className="muted">Checklist antes de depositar + criterios.</div>
          </li>
          <li>
            <Link href="/es/sources">Fuentes</Link>
            <div className="muted">Cómo verificar un dato (pricing, docs, riesgos).</div>
          </li>
          <li>
            <Link href="/es/about">Acerca de</Link>
            <div className="muted">Afiliación, actualizaciones, correcciones.</div>
          </li>
          <li>
            <Link href="/es/contact">Contacto</Link>
            <div className="muted">Preguntas, correcciones, reportes.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Páginas del sitio">
        <h2>Páginas</h2>
        <ul className="list">
          <li>
            <Link href="/es/guide-etoro">Guía eToro</Link>
            <div className="muted">CopyTrading, comisiones y seguridad.</div>
          </li>
          <li>
            <Link href="/es/bitpanda">Guía Bitpanda</Link>
            <div className="muted">Reseña Bitpanda: funciones, comisiones (visión general) y riesgos.</div>
          </li>
          <li>
            <Link href="/es/blog">Blog</Link>
            <div className="muted">Todos los artículos y guías.</div>
          </li>
          <li>
            <Link href="/es/legal-notice">Aviso legal</Link>
            <div className="muted">Editor, hosting, afiliación y responsabilidad.</div>
          </li>
          <li>
            <Link href="/es/privacy-policy">Política de privacidad</Link>
            <div className="muted">Datos, cookies y tus derechos.</div>
          </li>
          <li>
            <Link href="/es/about">Acerca de</Link>
            <div className="muted">Afiliación, actualizaciones, correcciones.</div>
          </li>
          <li>
            <Link href="/es/methodology">Metodología</Link>
            <div className="muted">Checklist antes de depositar.</div>
          </li>
          <li>
            <Link href="/es/sources">Fuentes</Link>
            <div className="muted">Docs oficiales y verificación rápida.</div>
          </li>
          <li>
            <Link href="/es/contact">Contacto</Link>
            <div className="muted">Preguntas, correcciones, reportes.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Artículos">
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
