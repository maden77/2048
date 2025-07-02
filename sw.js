const CACHE_NAME = '2048-pwa-v2'; // ganti versi untuk update
const URLS_TO_CACHE = [
  '/index.html',
  '/classic.html',
  '/tetris.html',
  '/manifest.json',
  '/sw.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
  // tambahkan JS/CSS lain jika perlu
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
