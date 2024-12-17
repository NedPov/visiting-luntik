const CACHE_NAME = 'selected-cache-v2.3';
const FILES_TO_CACHE = [
    'visiting-luntik.html',
    'visiting-luntik.css',
    'visiting-luntik.js',
    './img/Ant.jpg',
    './img/AntAndAnthill.jpg',
    './img/Anthill.jpg',
    './img/Aquarium.jpg',
    './img/Bee.jpg',
    './img/Beehive.png',
    './img/bees.jpg',
    './img/Booth.jpg',
    './img/boothAndDog.jpg',
    './img/Dog.jpg',
    './img/Fish.jpg',
    './img/FishAndAquarium.jpg',
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
        .catch(err => console.error('Ошибка', err))
    );
    self.skipWaiting(); 
});


self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) =>{

    e.respondWith(
        caches.match(e.request).then((cachedResponse) =>{
            if(cachedResponse) return cachedResponse;
            return fetch(e.request);
        })
    );


});
