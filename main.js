/* main.js — avis-invest.com
   - Burger menu (accessible)
   - Language detection & switch (with bot bypass)
   - Consent Mode v2 banner (GA4 loaded only after consent)
   - Cookie preferences (accept / refuse / personalize)
   - YouTube gating until consent (FR/EN locales)
   - Smooth scroll & minor UX helpers
*/

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const storage = {
  get(key, def = null) {
    try { return JSON.parse(localStorage.getItem(key)) ?? def; } catch { return def; }
  },
  set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  },
  del(key) { try { localStorage.removeItem(key); } catch {} }
};

const isBot = () => {
  const ua = (navigator.userAgent || "").toLowerCase();
  return /(bot|crawler|spider|bingpreview|google|yahoo|duckduckbot|baiduspider|yandex|sogou|exabot|facebot|ia_archiver|headlesschrome|semrush)/.test(ua);
};

const isFrenchNavigator = () => {
  const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
  return langs.some(l => /^fr(-|$)/i.test(l));
};

const pathIsEnglish = () => location.pathname === "/en/" || location.pathname.startsWith("/en/");
const pathIsFrench  = () => !pathIsEnglish();

const runWhenIdle = (cb, timeout = 800) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => { try { cb(); } catch (e) {} }, { timeout });
  } else {
    setTimeout(() => { try { cb(); } catch (e) {} }, 0);
  }
};

/* ---------- Burger menu ---------- */
(function initBurger() {
  const burger = $('.burger');
  const nav = $('#nav-menu');
  if (!burger || !nav) return;

  const open = () => {
    burger.setAttribute('aria-expanded', 'true');
    nav.classList.add('open');
    // Focus the first focusable in menu
    const first = nav.querySelector('a, button');
    if (first) first.focus();
  };

  const close = () => {
    burger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  };

  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    expanded ? close() : open();
  });

  // Close on link click
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) close();
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();

/* ---------- Smooth scroll for on-page anchors ---------- */
(function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, "", `#${id}`);
    }
  });
})();

/* ---------- External links: ensure noopener & sponsored rel ---------- */
(function hardenExternalLinks() {
  $$('a[target="_blank"]').forEach(a => {
    const rel = (a.getAttribute('rel') || '').toLowerCase();
    const tokens = new Set(rel.split(/\s+/).filter(Boolean));
    tokens.add('noopener');
    if (/med\.etoro\.com/.test(a.href)) { tokens.add('sponsored'); }
    a.setAttribute('rel', Array.from(tokens).join(' '));
  });
})();

/* ---------- Affiliate targets (centralized) ---------- */
const AFFILIATE_TARGETS = {
  // TODO: replace with your Bitpanda affiliate URL
  bitpanda: 'https://www.bitpanda.com/'
};

function resolveAffiliateTarget(value) {
  if (!value) return null;
  // direct URL
  if (/^https?:\/\//i.test(value)) return value;
  // key -> URL
  return AFFILIATE_TARGETS[value] || null;
}

/* ---------- Liens affiliés : éviter les 403 pour les bots ---------- */
function hydrateAffiliateLinks() {
  if (isBot()) return;
  $$('a[data-aff]').forEach((link) => {
    const target = resolveAffiliateTarget(link.getAttribute('data-aff'));
    if (!target || link.dataset.affHydrated) return;

    link.setAttribute('href', target);
    link.dataset.affHydrated = '1';

    const relTokens = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
    relTokens.add('sponsored');
    relTokens.add('noopener');
    link.setAttribute('rel', Array.from(relTokens).join(' '));
  });
}

/* ---------- Language detection & switch ---------- */
function initLang() {
  const stored = storage.get('preferred_lang'); // 'fr' | 'en'
  const langLinks = $$('.lang-switch [data-lang]');
  const mapToEN = (path) => {
    // Support legacy .html URLs and new canonical clean paths
    if (path === '/' || path === '/index.html') return '/en/';
    if (path === '/bitpanda' || path === '/bitpanda/index.html') return '/en/bitpanda/';
    if (path === '/blog.html' || path === '/blog') return '/en/blog/';
    if (path === '/blog-1.html' || path === '/blog-1') return '/en/blog-1/';
    if (path === '/mentions-legales.html' || path === '/mentions-legales') return '/en/legal-notice/';
    if (path === '/politiques-de-confidentialite.html' || path === '/politiques-de-confidentialite') return '/en/privacy-policy/';
    return '/en/'; // fallback : page d'accueil EN
  };
  const mapToFR = (path) => {
    if (path === '/en/' || path === '/en/index.html') return '/';
    if (path === '/en/bitpanda' || path === '/en/bitpanda/index.html') return '/bitpanda/';
    if (path === '/en/blog.html' || path === '/en/blog') return '/blog/';
    if (path === '/en/blog-1.html' || path === '/en/blog-1') return '/blog-1/';
    if (path === '/en/legal-notice.html' || path === '/en/legal-notice') return '/mentions-legales/';
    if (path === '/en/privacy-policy.html' || path === '/en/privacy-policy') return '/politiques-de-confidentialite/';
    return '/'; // fallback : accueil FR
  };

  // Mémoriser la préférence linguistique sans forcer la navigation côté JS
  langLinks.forEach(link => {
    link.addEventListener('click', () => {
      const to = link.getAttribute('data-lang');
      storage.set('preferred_lang', to === 'en' ? 'en' : 'fr');
    });
  });

  // Respecter la préférence déjà exprimée (stockée) tout en laissant les bots tranquilles
  if (!isBot() && stored) {
    const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
    if (stored === 'en' && pathIsFrench()) {
      const target = mapToEN(normalizedPath);
      if (target && target !== normalizedPath) {
        location.replace(target);
        return;
      }
    }
    if (stored === 'fr' && pathIsEnglish()) {
      const target = mapToFR(normalizedPath);
      if (target && target !== normalizedPath) {
        location.replace(target);
      }
    }
  }
}
runWhenIdle(hydrateAffiliateLinks, 200);
runWhenIdle(initLang, 400);

/* ---------- Cookie banner & Consent Mode v2 ---------- */
const consentKeys = ['analytics_storage', 'ad_storage', 'ad_user_data', 'ad_personalization'];
const defaultConsent = {
  functionality_storage: 'granted',
  security_storage: 'granted',
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
};

function getConsentState() {
  return storage.get('cookie_consent', { ...defaultConsent, setAt: 0 });
}

function saveConsentState(state) {
  storage.set('cookie_consent', { ...state, setAt: Date.now() });
}

function applyConsentToGtag(state) {
  if (typeof gtag !== 'function') return;
  gtag('consent', 'update', {
    functionality_storage: state.functionality_storage,
    security_storage: state.security_storage,
    analytics_storage: state.analytics_storage,
    ad_storage: state.ad_storage,
    ad_user_data: state.ad_user_data,
    ad_personalization: state.ad_personalization
  });
}

/* ---- GA4 loader (only after analytics consent GRANTED) ---- */
let gaLoaded = false;
function loadGA() {
  if (gaLoaded) return;
  const id = window.__GA_MEASUREMENT_ID__;
  if (!id) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  s.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function g(){ dataLayer.push(arguments); }
    window.gtag = window.gtag || g;
    g('js', new Date());
    g('config', id, { transport_type: 'beacon', anonymize_ip: true });
  };
  document.head.appendChild(s);
  gaLoaded = true;
}

/* ---- YouTube gating (tie to analytics_storage consent) ---- */
function gateYouTube(consented) {
  const iframes = $$('section.video-section iframe');
  if (!iframes.length) return;

  // Localize overlay strings
  const lang = (document.documentElement.getAttribute('lang') || 'fr').toLowerCase();
  const t = lang.startsWith('fr')
    ? {
        msg: "Pour afficher cette vidéo YouTube, veuillez autoriser le chargement de contenus externes (statistiques).",
        manage: "Gérer mes préférences",
        allow: "Autoriser pour cette session"
      }
    : {
        msg: "To display this YouTube video, please allow external content (analytics) to load.",
        manage: "Manage preferences",
        allow: "Allow for this session"
      };

  iframes.forEach((iframe) => {
    // store original src once
    if (!iframe.dataset.srcOriginal) {
      const dataSrc = iframe.getAttribute('data-src');
      const currentSrc = iframe.getAttribute('src');
      const original = dataSrc && dataSrc !== 'about:blank'
        ? dataSrc
        : (currentSrc && currentSrc !== 'about:blank' ? currentSrc : '');
      iframe.dataset.srcOriginal = original || '';
    }
    const originalSrc = iframe.dataset.srcOriginal;
    const parent = iframe.parentElement;
    let overlay = parent.querySelector('.yt-consent-overlay');

    if (!consented) {
      // pause/unload iframe
      if (iframe.getAttribute('src') && iframe.getAttribute('src') !== 'about:blank') {
        iframe.setAttribute('src', 'about:blank');
      }
      // add overlay if not exists
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'yt-consent-overlay';
        overlay.innerHTML = `
          <div class="yt-consent-box">
            <p>${t.msg}</p>
            <div class="actions">
              <button class="btn cta" data-action="open-prefs">${t.manage}</button>
              <button class="btn ghost" data-action="allow-now">${t.allow}</button>
            </div>
          </div>`;
        if (getComputedStyle(parent).position === 'static') {
          parent.style.position = 'relative';
        }
        parent.appendChild(overlay);
      }
      if (!overlay.dataset.listenerAttached) {
        overlay.addEventListener('click', (e) => {
          const btn = e.target.closest('button[data-action]');
          if (!btn) return;
          const action = btn.getAttribute('data-action');
          if (action === 'open-prefs') {
            openCookieBanner(true);
          } else if (action === 'allow-now') {
            // temporary session allowance (does not persist Analytics consent)
            if (iframe.dataset.srcOriginal) {
              iframe.setAttribute('src', iframe.dataset.srcOriginal);
            }
            overlay.remove();
          }
        });
        overlay.dataset.listenerAttached = 'true';
      }
    } else {
      // consented: remove overlay and restore src
      if (overlay) overlay.remove();
      if (originalSrc && iframe.getAttribute('src') !== originalSrc) {
        iframe.setAttribute('src', originalSrc);
      }
    }
  });
}

/* ---- Cookie Banner UI logic ---- */
let banner, btnAccept, btnDecline, btnCustomize, btnSave, prefsForm, openPrefsLink;


/* Populate checkboxes (all checked on first open, except functional) */
function populatePrefs(precheckAll = false) {
  if (!prefsForm) return;
  const state = getConsentState();
  $$('input[data-consent]').forEach(cb => {
    const key = cb.getAttribute('data-consent');
    if (precheckAll && key !== 'functionality_storage') {
      cb.checked = true; // UI defaults: all checked on first open
    } else {
      cb.checked = (state[key] || 'denied') === 'granted';
    }
  });
}

function openCookieBanner(showPrefs = false) {
  if (!banner) return;
  banner.hidden = false;
  document.body.style.overflow = 'hidden';
  if (showPrefs && prefsForm) {
    prefsForm.hidden = false;
    // Ensure inline display:none from HTML is overridden
    prefsForm.style.display = '';
    populatePrefs(window.__CONSENT_NEVER_SET);
  }
  setTimeout(() => banner.querySelector('.cookie-content')?.focus(), 0);
}

function closeCookieBanner() {
  if (!banner) return;
  banner.hidden = true;
  document.body.style.overflow = '';
}

function grantAll() {
  const state = { ...defaultConsent,
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted'
  };
  saveConsentState(state);
  applyConsentToGtag(state);
  if (state.analytics_storage === 'granted') loadGA();
  gateYouTube(state.analytics_storage === 'granted');
  closeCookieBanner();
  window.__CONSENT_NEVER_SET = false;
}

function denyAll() {
  const state = { ...defaultConsent,
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  };
  saveConsentState(state);
  applyConsentToGtag(state);
  gateYouTube(false);
  closeCookieBanner();
  window.__CONSENT_NEVER_SET = false;
}

function saveCustom() {
  const state = { ...defaultConsent };
  $$('input[data-consent]').forEach(cb => {
    const key = cb.getAttribute('data-consent');
    state[key] = cb.checked ? 'granted' : 'denied';
  });
  saveConsentState(state);
  applyConsentToGtag(state);
  if (state.analytics_storage === 'granted') loadGA();
  gateYouTube(state.analytics_storage === 'granted');
  closeCookieBanner();
  window.__CONSENT_NEVER_SET = false;
}

function applyStoredConsent() {
  const state = getConsentState();
  const neverSet = !state.setAt || typeof state.setAt !== 'number' || state.setAt <= 0;

  // expose “never chosen” state for UI logic
  window.__CONSENT_NEVER_SET = neverSet;

  applyConsentToGtag(state);

  if (state.analytics_storage === 'granted') {
    loadGA();
  }

  // gate YT based on analytics consent
  gateYouTube(state.analytics_storage === 'granted');

  if (neverSet) {
    // Show banner; keep preferences panel hidden by default
    openCookieBanner(false);
  }
}

function initConsentSuite() {
  banner = $('#cookie-banner');
  btnAccept = $('#cookie-accept');
  btnDecline = $('#cookie-decline');
  btnCustomize = $('#cookie-customize');
  btnSave = $('#cookie-save');
  prefsForm = $('#cookie-preferences');
  openPrefsLink = $('#open-cookie-settings');

  window.__CONSENT_NEVER_SET = true;

  if (btnAccept) btnAccept.addEventListener('click', grantAll);
  if (btnDecline) btnDecline.addEventListener('click', denyAll);
  if (btnCustomize) {
    btnCustomize.addEventListener('click', () => {
      if (!prefsForm) return;
      prefsForm.hidden = false;
      prefsForm.style.display = '';
      populatePrefs(window.__CONSENT_NEVER_SET);
    });
  }
  if (btnSave) btnSave.addEventListener('click', saveCustom);
  if (openPrefsLink) {
    openPrefsLink.addEventListener('click', (e) => {
      e.preventDefault();
      openCookieBanner(true);
    });
  }

  applyStoredConsent();
}

runWhenIdle(initConsentSuite, 400);


/* ---------- Minor: focus skip link support (if present) ---------- */
(function initSkipLink() {
  const skip = $('a[href="#main-content"]');
  if (!skip) return;
  skip.addEventListener('click', (e) => {
    const target = $('#main-content');
    if (!target) return;
    target.setAttribute('tabindex', '-1');
    target.focus();
    setTimeout(() => target.removeAttribute('tabindex'), 1000);
  });
})();

/* ---------- Style tweaks for YT overlay (injected minimal CSS) ---------- */
(function injectOverlayStyles() {
  const css = `
  .yt-consent-overlay{
    position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    background: rgba(0,0,0,0.6); color:#fff; text-align:center; padding:1rem; z-index:2;
  }
  .yt-consent-box{ max-width:720px; background:rgba(0,0,0,0.35); backdrop-filter:saturate(120%) blur(2px); border-radius:16px; padding:1rem; }
  .yt-consent-box .actions{ margin-top:0.75rem; display:flex; gap:0.5rem; justify-content:center; flex-wrap:wrap; }
  .btn.cta{ cursor:pointer; }
  .btn.ghost{ cursor:pointer; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
})();

/* ---------- Fallback language redirect (safe & SEO-friendly) ----------
   Only when:
   - not a bot,
   - user has not explicitly chosen a language before,
   - current path is FR,
   - browser is not French.
   This avoids double-redirects and respects server-side rules (_redirects).
*/
(function () {
  try {
    if (isBot()) return;
    if (pathIsEnglish()) return;
    if (storage.get('preferred_lang')) return;
    if (isFrenchNavigator()) return;

    const map = {
      '/': '/en/',
      '/index.html': '/en/',
      '/blog': '/en/blog/',
      '/blog.html': '/en/blog/',
      '/blog-1': '/en/blog-1/',
      '/blog-1.html': '/en/blog-1/',
      '/mentions-legales': '/en/legal-notice/',
      '/mentions-legales.html': '/en/legal-notice/',
      '/politiques-de-confidentialite': '/en/privacy-policy/',
      '/politiques-de-confidentialite.html': '/en/privacy-policy/'
    };
    const path = (location.pathname.replace(/\/+$/, '') || '/');
    if (map[path]) location.replace(map[path]);
  } catch (e) {}
})();

/* ------- Mobile: hide risk banner on scroll (non-bots only) ------- */
/* Works with CSS:
   - body{padding-top: var(--risk-h)} on mobile
   - body.risk-hidden removes padding and banner slides up
*/
(function mobileHideRiskOnScroll(){
  try{
    if ((/bot|crawl|spider/i).test((navigator.userAgent||""))) return; // leave bots alone
    const mq = window.matchMedia('(max-width: 720px)');
    if (!mq.matches) return;

    let lastY = window.scrollY || 0;
    let hidden = false;
    let ticking = false;

    function update(){
      const y = window.scrollY || 0;
      const delta = y - lastY;
      lastY = y;

      // Always show at the very top
      if (y < 10){
        if (hidden){ document.body.classList.remove('risk-hidden'); hidden = false; }
        ticking = false; return;
      }

      // Scrolling down -> hide, up -> show
      if (delta > 4 && !hidden){
        document.body.classList.add('risk-hidden'); hidden = true;
      } else if (delta < -6 && hidden){
        document.body.classList.remove('risk-hidden'); hidden = false;
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking){ ticking = true; requestAnimationFrame(update); }
    }, { passive: true });

    // If user rotates/resizes into desktop, ensure class is cleared
    window.addEventListener('resize', () => {
      if (!window.matchMedia('(max-width: 720px)').matches){
        document.body.classList.remove('risk-hidden');
      }
    });
  }catch(e){}
})();

/* ---------- IndexNow ping (once par 24h, humains uniquement) ---------- */
function pingIndexNow(){
  try{
    if (isBot()) return;
    const lastPing = storage.get('indexnow_ping_ts', 0);
    const now = Date.now();
    if (lastPing && (now - lastPing) < 86400000) return;

    const key = 'fdc6bf2419b4402ca76ec51012a209e2';
    const origin = location.origin.replace(/\/+$/, '');
    if (!/^https?:/i.test(origin)) return;
    const currentUrl = `${origin}${location.pathname}${location.search || ''}`;
    const keyLocation = `${origin}/fdc6bf2419b4402ca76ec51012a209e2.txt`;
    const query = `url=${encodeURIComponent(currentUrl)}&key=${key}&keyLocation=${encodeURIComponent(keyLocation)}`;
    const endpoints = [
      `https://api.indexnow.org/indexnow?${query}`,
      `https://www.bing.com/indexnow?${query}`
    ];

    const retainImage = (img) => {
      const bucket = window.__indexnowImgs || (window.__indexnowImgs = []);
      bucket.push(img);
      const release = () => {
        const idx = bucket.indexOf(img);
        if (idx !== -1) bucket.splice(idx, 1);
      };
      img.onload = img.onerror = img.onabort = release;
    };

    const pingViaPixel = (url) => {
      try{
        const img = new Image();
        img.referrerPolicy = 'no-referrer';
        retainImage(img);
        img.src = url;
        return true;
      }catch(e){
        return false;
      }
    };

    const pingEndpoint = (url) => {
      let dispatched = false;
      if ('fetch' in window){
        try{
          fetch(url, { method: 'GET', mode: 'no-cors', keepalive: true, cache: 'no-store' })
            .catch(() => { pingViaPixel(url); });
          dispatched = true;
        }catch(e){
          dispatched = pingViaPixel(url) || dispatched;
        }
      } else {
        dispatched = pingViaPixel(url) || dispatched;
      }
      return dispatched;
    };

    let atLeastOne = false;
    endpoints.forEach((url) => {
      if (pingEndpoint(url)) atLeastOne = true;
    });

    if (atLeastOne) storage.set('indexnow_ping_ts', now);
  }catch(e){}
}

runWhenIdle(pingIndexNow, 2000);
