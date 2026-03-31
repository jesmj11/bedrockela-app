// BedrockELA Service Worker - Offline Learning Support
const CACHE_NAME = 'bedrockela-v2.3-fresh-2026-03-31';
const OFFLINE_URL = '/offline.html';

// Force immediate activation
self.addEventListener('install', (event) => {
  console.log('BedrockELA Service Worker installing (v2.1)...');
  self.skipWaiting(); // Force immediate activation
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching essential resources...');
        return cache.addAll(ESSENTIAL_CACHE).catch((error) => {
          console.error('Failed to cache essential resources:', error);
        });
      })
  );
});

// Essential files to cache for offline functionality
const ESSENTIAL_CACHE = [
  '/',
  '/index.html',
  '/mountain-student-signin.html', 
  '/parent-dashboard.html',
  '/1st-grade-lessons.html',
  '/2nd-grade-lessons.html',
  '/3rd-grade-lessons.html',
  '/4th-grade-lessons.html',
  '/interactive-village-dashboard.html',
  '/writing-summit-portal.html',
  '/mountain-lesson-interface.html',
  '/portal.html',
  '/offline.html',
  '/manifest.json',
  '/images/bedrockela-homepage-hero.jpg',
  '/images/little-billy-goat.jpg',
  '/images/billy-medium-goat.jpg',
  '/images/big-gruff-goat.jpg',
  '/images/bedrock-village.jpg',
  '/images/new-village-map-2026.jpg',
  '/images/lesson-background-universal.png'
];

// Curriculum content that can be cached when accessed
const CURRICULUM_CACHE = [
  '/sight-word-speedrun-game.html',
  '/sentence-builder-workshop.html', 
  '/vocabulary-word-explorer.html',
  '/story-adventure-creator.html',
  '/reading-quest-adventure.html'
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('BedrockELA Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching essential BedrockELA resources...');
        return cache.addAll(ESSENTIAL_CACHE);
      })
      .then(() => {
        console.log('BedrockELA ready for offline learning!');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to cache essential resources:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('BedrockELA Service Worker activating (v2.1)...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('BedrockELA Service Worker ready! Force-claiming all clients...');
        // Force immediate control of all pages
        return self.clients.claim();
      })
      .then(() => {
        // Force reload all open pages
        return self.clients.matchAll({ type: 'window' });
      })
      .then((clients) => {
        clients.forEach(client => {
          console.log('Reloading client:', client.url);
          client.postMessage({ type: 'RELOAD' });
        });
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and chrome-extension requests
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Handle navigation requests (page loads)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // NEVER cache lesson HTML files - always fetch fresh
          const url = event.request.url;
          const isLessonFile = url.includes('-grade-day-') || url.includes('-grade-lesson-') || url.includes('-grade-week-');
          
          if (!isLessonFile && response.status === 200) {
            // Only cache non-lesson pages (homepage, portals, etc.)
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseClone))
              .catch(console.error);
          }
          return response;
        })
        .catch(() => {
          // If offline, try to serve from cache (but lessons won't be cached)
          return caches.match(event.request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // If not in cache, serve offline page
              return caches.match(OFFLINE_URL);
            });
        })
    );
    return;
  }

  // Handle all other requests (assets, API calls, etc.)
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache
          return cachedResponse;
        }
        
        // Try to fetch from network
        return fetch(event.request)
          .then((response) => {
            // Only cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              const url = event.request.url;
              const isLessonFile = url.includes('-grade-day-') || url.includes('-grade-lesson-') || url.includes('-grade-week-');
              
              // Cache curriculum content for offline access (EXCEPT lesson HTML files)
              if (!isLessonFile && (
                  CURRICULUM_CACHE.some(url => event.request.url.includes(url)) ||
                  event.request.url.includes('.html') ||
                  event.request.url.includes('.css') ||
                  event.request.url.includes('.js') ||
                  event.request.url.includes('/images/'))) {
                
                caches.open(CACHE_NAME)
                  .then((cache) => cache.put(event.request, responseClone))
                  .catch(console.error);
              }
            }
            
            return response;
          })
          .catch(() => {
            // If network fails and it's an HTML request, serve offline page
            if (event.request.headers.get('Accept').includes('text/html')) {
              return caches.match(OFFLINE_URL);
            }
            
            // For other resources, just fail gracefully
            throw new Error('Network unavailable and resource not cached');
          });
      })
  );
});

// Background sync for progress data
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-progress') {
    console.log('Syncing BedrockELA progress data...');
    event.waitUntil(syncProgressData());
  }
});

// Sync progress data when back online
async function syncProgressData() {
  try {
    // Get stored progress from IndexedDB
    const progressData = await getStoredProgress();
    
    if (progressData && progressData.length > 0) {
      // Send to server when online
      const response = await fetch('/api/sync-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress: progressData })
      });
      
      if (response.ok) {
        console.log('Progress data synced successfully!');
        // Clear local storage after successful sync
        await clearSyncedProgress();
      }
    }
  } catch (error) {
    console.log('Progress sync will retry later:', error.message);
  }
}

// Progressive enhancement - Show install prompt
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Push notifications for learning reminders (future feature)
self.addEventListener('push', (event) => {
  const options = {
    body: 'Time for your Norwegian mountain learning adventure! 🏔️',
    icon: '/images/little-billy-goat.jpg',
    badge: '/images/billy-medium-goat.jpg',
    data: {
      url: '/interactive-village-dashboard.html'
    },
    actions: [
      {
        action: 'start-learning',
        title: 'Start Learning',
        icon: '/images/little-billy-goat.jpg'
      },
      {
        action: 'dismiss',
        title: 'Later'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('BedrockELA Learning Time!', options)
  );
});

console.log('BedrockELA Service Worker loaded - Ready for offline Norwegian mountain learning! 🏔️🐐');<!-- Force SW deploy Wed Feb  4 03:08:45 AM UTC 2026 -->
