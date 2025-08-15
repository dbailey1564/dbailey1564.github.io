self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('rollit-cache-v1').then((cache) => {
      return cache.addAll(['index.html', 'manifest.webmanifest', 'icon-192.png']);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});