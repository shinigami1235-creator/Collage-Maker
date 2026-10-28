/* Bump CACHE_VERSION on every deploy, since that is what tells browsers a new
   version exists. */
const CACHE_VERSION = 'v38';
const CACHE = `collage-maker-${CACHE_VERSION}`;

const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './vendor/pdf-lib.min.js',
  './vendor/jsfeat.min.js',
  './vendor/mediapipe/face_detection.js',
  './vendor/mediapipe/face_detection_solution_simd_wasm_bin.js',
  './vendor/mediapipe/face_detection_solution_simd_wasm_bin.wasm',
  './vendor/mediapipe/face_detection_solution_simd_wasm_bin.data',
  './vendor/mediapipe/face_detection_short.binarypb',
  './vendor/mediapipe/face_detection_short_range.tflite',
  './vendor/mediapipe/face_detection_full.binarypb',
  './vendor/mediapipe/face_detection_full_range_sparse.tflite',
  './vendor/mediapipe-selfie/selfie_segmentation.js',
  './vendor/mediapipe-selfie/selfie_segmentation.binarypb',
  './vendor/mediapipe-selfie/selfie_segmentation.tflite',
  './vendor/mediapipe-selfie/selfie_segmentation_landscape.tflite',
  './vendor/mediapipe-selfie/selfie_segmentation_solution_simd_wasm_bin.js',
  './vendor/mediapipe-selfie/selfie_segmentation_solution_simd_wasm_bin.wasm',
  './vendor/mediapipe-selfie/selfie_segmentation_solution_simd_wasm_bin.data',
];

/* cache: 'reload' goes past the browser's own copy to the server. GitHub Pages
   lets a browser keep a file for ten minutes, so without it a new version could
   fill its cache with the old page and then serve that old page for good. */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(FILES.map((file) => new Request(file, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  /* The page itself comes from the server whenever there is a connection, so a
     new version shows on the next visit. The copy kept here is for when there is
     no connection. */
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request.url, { cache: 'no-cache', credentials: 'same-origin' })
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put('./index.html', copy));
          }
          return response;
        })
        .catch(() => caches.match('./index.html').then((hit) => hit || caches.match('./')))
    );
    return;
  }

  /* Icons and the libraries change only with a new version, so the cache
     answers first and the network fills any gap. */
  event.respondWith(
    caches.match(request).then((hit) => {
      if (hit) return hit;
      return fetch(request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
