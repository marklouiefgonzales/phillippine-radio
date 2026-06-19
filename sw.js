var CACHE_VERSION = 'v20'; // <-- change to whatever value to force devices to download the latest version of the script (just for rare cases that their device maintained old code

self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys.map(function(key) {
                return caches.delete(key);
            }));
        }).then(function() {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', function(event) {
    // Don't cache the splash image to prevent dimension issues
    if (event.request.url.includes('iconF.png')) {
        event.respondWith(fetch(event.request, { cache: 'no-store' }));
        return;
    }
    event.respondWith(fetch(event.request));
});
