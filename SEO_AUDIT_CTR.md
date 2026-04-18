# Audit SEO (focus CTR) — avis-invest.com

Date : 2026-04-18  
Objectif : améliorer le CTR organique (meilleure “snippet appeal” + meilleure adéquation requête/intention).

## 0) Snapshot GSC (exports du 2026-04-18)

Périodes exportées :
- **3 mois** (2026-01-17 → 2026-04-16) : **3 clics**, **4003 impressions**, **CTR 0,075 %**, **position moyenne 11,90**
- **28 jours** (2026-03-20 → 2026-04-16) : **1 clic**, **2018 impressions**, **CTR 0,050 %**, **position moyenne 9,72**

Constats rapides :
- Les impressions viennent surtout du **desktop** (28j : 1841 impr, pos 9,10) ; **mobile** est plus bas (28j : 177 impr, pos 16,18).
- Pays : très gros volume **US** (28j : 992 impr, 0 clic) → priorité aux pages **EN** (snippets plus “trust & compliance”).

### 0.1 Opportunités CTR (position <= 10)

Pages (28j, impr >= 30, CTR 0) :
- `/en/blog/etoro-guide-2025-fees-regulation` — 930 impr, pos 8,34
- `/en/guide-etoro` — 91 impr, pos 7,90
- `/es/blog/etoro-guia-2025-tarifas-regulacion` — 51 impr, pos 6,86
- `/etoro-fonctionnement-frais-regulations-2025` — 50 impr, pos 9,68
- `/en/blog/bitpanda-vs-etoro-2026` — 47 impr, pos 8,64
- `/de/blog/etoro-guide-2025-gebuehren-regulierung` — 30 impr, pos 6,13

Requêtes (28j, impr >= 10, pos <= 10, CTR 0) :
- `license # 109/10 ...` — 133 impr, pos 5,25 (gros mismatch snippet/intention)
- `etoro avis` — 26 impr, pos 5,58
- `avis etoro` — 15 impr, pos 3,40
- `etoro fees stocks europe 2025 or 2026` — 13 impr, pos 6,85

## 1) Ce qui influence le CTR (à ne pas confondre)

- Le CTR dépend fortement de la **position moyenne** : à position égale, on peut gagner du CTR via le snippet, mais si la position est >10, le CTR restera mécaniquement bas.
- Pour un vrai gain, le plus efficace est d’optimiser en priorité les pages/requêtes où :
  - **Impressions élevées**
  - **Position moyenne 1–10**
  - **CTR inférieur à la moyenne** (ou inférieur aux concurrents visibles dans la SERP)

## 2) Audit technique “snippet” (impact CTR direct)

### 2.1 Favicon + site name (SERP)

Le favicon et le “site name” (nom affiché au-dessus du titre sur Google) impactent directement le CTR, surtout mobile.

Correctifs ajoutés dans le repo :
- `public/favicon.ico` (multi-tailles dont 48x48)
- `public/favicon.png` (96x96)
- `public/apple-touch-icon.png` (180x180)
- Liens `<link rel="icon">` + `<link rel="apple-touch-icon">` dans les layouts
- JSON-LD `Organization` + `WebSite` (pour aider Google à afficher un **nom de site** cohérent)

### 2.2 International SEO : `html[lang]` vs `hreflang`

Constat : le site est multi-langues (`/en`, `/de`, `/es`) et expose bien les `hreflang`.  
Mais `html lang` doit aussi être **cohérent** (important pour l’interprétation linguistique).

Correctif : multi-root layouts (Next.js) avec `lang` serveur correct :
- FR : `<html lang="fr">`
- EN : `<html lang="en">`
- DE : `<html lang="de">`
- ES : `<html lang="es">`

## 3) Audit “snippets” : titles & meta descriptions (levier CTR #1)

### 3.1 Règles simples (qui marchent)

- Mettre le **mot-clé principal dès le début**.
- Garder les titles **courts** (idéalement ~50–65 caractères) : éviter la troncature.
- Ajouter un “hook” utile : `checklist`, `frais`, `sécurité`, `délais`, `risques`, `2026`, etc.
- Éviter le “bruit” (suffixe de domaine/branding trop long) : Google affiche déjà le nom de site.

### 3.2 Ajustements appliqués (réduction des titles trop longs)

Plusieurs pages clés avaient des titles >70–90 caractères (risque de troncature → CTR en baisse).  
Titres raccourcis sur les pages les plus longues (FR/EN/DE/ES), par ex. :
- `content/en/blog/etoro-deposit-withdrawal-2026/index.mdx`
- `content/de/blog/etoro-sicherheit-regulierung-2026/index.mdx`
- `content/bitpanda-securite-2026.mdx`
- `content/etoro-securite-regulation-2026.mdx`
- `content/etoro-depot-retrait-2026.mdx`
- `content/etoro-fonctionnement-frais-regulations-2025.mdx`
- `content/de/blog/etoro-einzahlung-auszahlung-2026/index.mdx`
- `content/de/blog/bitpanda-vs-etoro-2026/index.mdx`
- `content/es/blog/bitpanda-seguridad-2026/index.mdx`
- `content/es/blog/etoro-deposito-retiro-2026/index.mdx`

### 3.3 Optimisations déployées (2026-04-18) — focus requêtes “régulation/licences”

Objectif : améliorer l’adéquation snippet ↔ intention, surtout sur les requêtes “licence / regulation / fees”.

Changements appliqués :
- **Titles + meta descriptions** enrichis avec signaux de confiance (ex : **CySEC 109/10**, **FCA 583263**, **ASIC 491139**) sur les pages eToro les plus visibles.
- Ajout du champ `faq:` dans le frontmatter pour activer le JSON-LD **FAQPage** (quand disponible) sur les pages prioritaires.
- Correction des dates “Mis à jour / Updated” affichées dans les guides (cohérence avec `updatedAt`).

Fichiers concernés :
- `content/en/blog/etoro-guide-2025-fees-regulation/index.mdx`
- `content/en/guide-etoro.mdx`
- `content/guide-etoro.mdx`
- `content/etoro-fonctionnement-frais-regulations-2025.mdx`
- `content/es/blog/etoro-guia-2025-tarifas-regulacion/index.mdx`
- `content/de/blog/etoro-guide-2025-gebuehren-regulierung/index.mdx`
- `content/en/blog/bitpanda-vs-etoro-2026/index.mdx`

## 4) Données structurées (rich results → CTR)

Déjà présent :
- `Article`
- `BreadcrumbList`
- `FAQPage` (attention : Google affiche moins souvent les FAQ qu’avant, mais ça aide quand même pour la compréhension)

Ajouté :
- `Organization`
- `WebSite`
- `Article.mainEntityOfPage` au format **WebPage** (meilleure conformité Schema.org)

## 5) Comment mesurer (Google Search Console)

Workflow recommandé (sur 28 jours) :
1. Performance → **Pages** : trier par **Impressions**
2. Filtrer sur **Position** (ex : <=10) pour isoler ce qui a une chance réaliste de CTR élevé
3. Repérer :
   - pages avec **beaucoup d’impressions** mais **CTR faible**
   - requêtes “brandées” vs “non brandées”
4. Pour chaque page prioritaire :
   - proposer 2 variantes de title + 1 description (sans changer le contenu)
   - déployer, attendre 10–14 jours, comparer CTR à position comparable

## 6) Prochaines actions (priorisées)

1. Attendre **10–14 jours** (après déploiement) puis comparer **CTR à position comparable** sur les pages prioritaires.
2. Dans GSC (28 jours), refaire le tri **Pages (Impressions)** + filtre **Position <= 10** pour vérifier que les URLs eToro ciblées gagnent du CTR.
3. Vérifier dans GSC :
   - Apparence dans les résultats → Rich results / Données structurées
   - Indexation → anomalies `hreflang` / “page avec balise canonique incorrecte” (si présentes)
4. Option “impressions” : renforcer le maillage interne vers les pages eToro (depuis `/en/`, `/en/blog`, `/blog`) avec ancres orientées intention (fees/regulation/safety).
