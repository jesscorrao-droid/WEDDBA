const CACHE_NAME = "weddba-v1";

const FILES = [

"/WEDDBA/",
"/WEDDBA/index.html",
"/WEDDBA/style.css",
"/WEDDBA/script.js",
"/WEDDBA/data.js",
"/WEDDBA/manifest.json"

];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES))

    );

    self.skipWaiting();

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys =>

            Promise.all(

                keys.map(key => {

                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            )

        )

    );

    self.clients.claim();

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

        .then(response => response || fetch(event.request))

    );

});