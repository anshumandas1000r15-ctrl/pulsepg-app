// Service Worker for Offline Caching of Static Assets & Loaded Questions
const CACHE_NAME = 'pulsepg-static-v1';
const QUESTION_CACHE = 'pulsepg-questions-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sample_questions_template.csv'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME && k !== QUESTION_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Cache Supabase REST queries for questions/subjects/chapters for offline practice
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  // Stale-while-revalidate for Supabase question/subject/chapter reads
  if (url.pathname.includes('/rest/v1/questions') || url.pathname.includes('/rest/v1/subjects') || url.pathname.includes('/rest/v1/chapters')) {
    event.respondWith(
      caches.open(QUESTION_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const networkPromise = fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || networkPromise;
      })
    );
    return;
  }

  // Network-first with cache fallback for app shell
  event.respondWith(
    fetch(request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return res;
      })
      .catch(() => caches.match(request))
  );
});
