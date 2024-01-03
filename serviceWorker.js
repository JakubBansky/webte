var cacheName = 'gameCache';
var static_files = [
    "./",
    "./main.js",
    "./style.css",
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(static_files);
        }).then(function() {
            localStorage.setItem('task', taskNum);
            localStorage.setItem('levelOrder', levelOrder);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log("service worker activated", event)
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});