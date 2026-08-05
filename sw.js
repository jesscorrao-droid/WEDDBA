const CACHE = "weddba-v1.0.4";

const FILES = [

"./",
"./index.html",
"./style.css",
"./script.js",
"./data.js",
"./manifest.json",

"./photos.html",
"./photos.css",
"./photos.js",

"./picture.html",
"./picture.css",
"./picture.js",

"./halftime.html",
"./halftime.css",

"./celibato.html",
"./celibato.js",

"./nubilato.html",
"./nubilato.js",

"./player.html"

];

self.addEventListener("install",event=>{

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE).then(cache=>cache.addAll(FILES))

    );

});

self.addEventListener("activate",event=>{

    event.waitUntil(

        caches.keys().then(keys=>{

            return Promise.all(

                keys.filter(key=>key!==CACHE)

                .map(key=>caches.delete(key))

            );

        })

    );

    self.clients.claim();

});

self.addEventListener("fetch",event=>{

    event.respondWith(

        caches.match(event.request)

        .then(response=>response || fetch(event.request))

    );

});