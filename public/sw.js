// Denta.Health service worker — minimal, network-first navigations with offline fallback.
// Intentionally NOT caching app shell aggressively to avoid stale builds.
const VERSION = 'denta-v1';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(VERSION);
      try { await cache.add(OFFLINE_URL); } catch (e) {}
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Never intercept OAuth or API
  if (url.pathname.startsWith('/~oauth') || url.pathname.startsWith('/api')) return;

  // Navigation requests — network first, offline fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          return fresh;
        } catch {
          const cache = await caches.open(VERSION);
          const cached = await cache.match(OFFLINE_URL);
          return cached || new Response('Offline', { status: 503 });
        }
      })()
    );
  }
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
