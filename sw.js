var CACHE_VERSION = 'v31'; // <-- change to whatever value to force devices to download the latest version of the script (just for rare cases that their device maintained old code

var CACHE_NAME = 'my-cache-' + CACHE_VERSION;

// Install - cache your files
self.addEventListener('install', function(event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html'
                // Add other important files here if needed
            ]);
        })
    );
});

// Activate - delete old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys.map(function(key) {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        }).then(function() {
            return self.clients.claim();
        })
    );
});

// Fetch - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
