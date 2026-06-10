const CACHE = 'cashcalc-v10';
const BASE = '/Cash-info';
const ASSETS = [
  BASE+'/',
  BASE+'/index.html',
  BASE+'/manifest.json',
  BASE+'/sw.js',
  BASE+'/icons/icon-192.png',
  BASE+'/icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => {
      if (r) return r;
      return fetch(e.request).catch(() => {
        if (e.request.mode === 'navigate') return caches.match(BASE+'/index.html');
      });
    })
  );
});
