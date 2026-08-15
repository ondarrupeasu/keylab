/* KeyLab service worker — cache básica para uso offline.
   Sube CACHE cuando cambien los assets para forzar actualización. */
const CACHE = 'keylab-v5';
const ASSETS = [
  './',
  './index.html',
  './styles.css?v=6',
  './app.js?v=6',
  './scopes.js?v=6',
  './manifest.webmanifest',
  './icon.svg',
  './demo.jpg',
  './demo-blue.jpg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// network-first: intenta red (y refresca caché); si no hay red, tira de caché.
// Así cada deploy se ve al instante y la app sigue funcionando offline.
self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;
  e.respondWith(
    fetch(request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(request))
  );
});
