/* Network-first, cache-fallback.
   Network-first on purpose: a cache-first worker would keep serving an old
   build after every deploy, which is worse than being briefly offline. */
const CACHE = 'tilt-2026-08-29.2';
const FILES = ['./', './index.html', './decks.js?v=2026-08-29.2', './manifest.json',
               './icon.svg', './icon-192.png', './icon-512.png'];
/* Images under img/ are cached on first use by the fetch handler below. */

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', e=>{
  if(e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res=>{
        const copy = res.clone();
        caches.open(CACHE).then(c=>c.put(e.request, copy)).catch(()=>{});
        return res;
      })
      .catch(()=>caches.match(e.request).then(r=>r || caches.match('./index.html')))
  );
});
