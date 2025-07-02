const CACHE_NAME = '2048-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './classic.html',
  './tertis.html',
  './manifest.json',
  './sw.js',
  './icon2048-72x72.png',
  './icon2048-96x96.png',
  './icon2048-128x128.png',
  './icon2048-144x144.png',
  './icon2048-152x152.png',
  './icon2048-192x192.png',
  './icon2048-384x384.png',
  './icon2048-512x512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
