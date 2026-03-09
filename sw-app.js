// BedrockELA App - Service Worker for Offline Lessons
const CACHE_VERSION = 'bedrockela-app-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Core app files - always cached
const CORE_CACHE = [
  '/',
  '/student-login.html',
  '/student-dashboard.html',
  '/offline.html',
  '/manifest.json',
  '/css/lesson-viewer.css',
  '/js/billy-instructor.js',
  '/js/billy-mini-lesson.js',
  '/js/billy-games.js',
  '/js/billy-storybook.js',
  '/js/billy-simple-storybook.js',
  '/images/billy-avatar.jpg'
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Lessons: Cache first, network fallback
  lessons: /\/(1st|2nd|3rd|4th|5th|6th|7th|8th)-grade-day-\d+\.html$/,
  
  // Static assets: Cache first
  static: /\.(css|js|jpg|jpeg|png|gif|webp|svg|woff|woff2|ttf)$/,
  
  // Firebase: Network first, cache fallback
  firebase: /firebasestorage\.googleapis\.com|firebaseapp\.com/,
  
  // TTS Audio: Network only (don't cache - too large)
  tts: /localhost:3002\/tts/
};

// Install - cache core files
self.addEventListener('install', (event) => {
  console.log('[SW] Installing BedrockELA App Service Worker...');
  
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => {
        console.log('[SW] Caching core app files...');
        return cache.addAll(CORE_CACHE);
      })
      .then(() => {
        console.log('[SW] Core files cached! Activating...');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Cache failed:', error);
      })
  );
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating BedrockELA App Service Worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_VERSION)
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] BedrockELA App ready for offline learning!');
        return self.clients.claim();
      })
  );
});

// Fetch - smart caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // TTS Audio - network only (don't cache)
  if (CACHE_STRATEGIES.tts.test(url.href)) {
    event.respondWith(fetch(request));
    return;
  }
  
  // Lessons - Cache first, network fallback, update cache
  if (CACHE_STRATEGIES.lessons.test(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            console.log('[SW] Serving lesson from cache:', url.pathname);
            // Update cache in background
            fetch(request).then((networkResponse) => {
              if (networkResponse && networkResponse.ok) {
                caches.open(CACHE_VERSION).then((cache) => {
                  cache.put(request, networkResponse);
                });
              }
            });
            return cachedResponse;
          }
          
          // Not in cache - fetch and cache
          return fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_VERSION).then((cache) => {
                console.log('[SW] Caching lesson:', url.pathname);
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          });
        })
        .catch(() => {
          console.log('[SW] Offline, no cached lesson available');
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }
  
  // Static assets - Cache first
  if (CACHE_STRATEGIES.static.test(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_VERSION).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          });
        })
    );
    return;
  }
  
  // Firebase - Network first, cache fallback
  if (CACHE_STRATEGIES.firebase.test(url.hostname)) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_VERSION).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }
  
  // Everything else - network first, cache fallback
  event.respondWith(
    fetch(request)
      .catch(() => caches.match(request))
      .catch(() => caches.match(OFFLINE_URL))
  );
});

// Background sync (future feature)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncStudentProgress());
  }
});

async function syncStudentProgress() {
  // TODO: Sync offline lesson completions to Firebase
  console.log('[SW] Syncing student progress...');
}

// Push notifications (future feature)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New lesson available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200]
  };
  
  event.waitUntil(
    self.registration.showNotification('BedrockELA', options)
  );
});
