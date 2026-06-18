var CACHE_VERSION = 'v3'; // <-- change to whatever value to force devices to download the latest version of the script (just for rare cases that their device maintained old code

self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys.map(function(key) {
                if (key !== CACHE_VERSION) return caches.delete(key);
            }));
        })
    );
});

self.addEventListener('fetch', function(event) {});
