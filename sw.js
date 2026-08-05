const CACHE_NAME = "weddba-v2.0.1";

const ASSETS = [
    "./",
    "./index.html",
    "./manifest.json",

    "./script.js",
    "./data.js",
    "./install.js",

    "./css/style.css",
    "./css/header.css",
    "./css/hero.css",
    "./css/cards.css",
    "./css/footer.css",
    "./css/pwa.css",
    "./css/responsive.css",

    "./images/logo.png",
    "./images/icon-192.png",
    "./images/icon-512.png",
    "./images/hero.png",
    "./images/hero-mobile.png"
];

// INSTALL
self.addEventListener("install", event => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

// ACTIVATE
self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys().then(keys =>

            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )

        ).then(() => self.clients.claim())
    );

});

// FETCH
self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") return;

    event.respondWith(

        caches.match(event.request)
            .then(cached => {

                if (cached) return cached;

                return fetch(event.request)
                    .then(response => {

                        const copy = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, copy));

                        return response;

                    });

            })

    );

});