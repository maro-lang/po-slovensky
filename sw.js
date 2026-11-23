/*
 * sw.js — Service worker: keeps a copy of the app on the phone so it opens
 * without internet.
 *
 * How it works:
 *   - On install, it downloads every file listed in APP_FILES into a cache.
 *   - On each request, it answers from that cache first; if the file is not
 *     there, it asks the network.
 *   - When CACHE_VERSION changes, the old copy is deleted and a new one is
 *     downloaded. CHANGE CACHE_VERSION EVERY TIME ANY APP FILE CHANGES,
 *     otherwise phones keep showing the old version.
 *
 * Depends on: the files listed below. Registered by js/main.js.
 */

// ===== Configuration =====

const CACHE_VERSION = "0.2.0"; // keep equal to APP_VERSION in js/main.js
const CACHE_NAME = "po-slovensky-" + CACHE_VERSION;

// Every file the app needs to work offline (paths relative to this file).
const APP_FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "css/styles.css",
  "js/storage.js",
  "js/i18n.js",
  "js/speech.js",
  "js/modules-list.js",
  "js/ui.js",
  "js/data/cases.js",
  "js/data/pronunciation.js",
  "js/data/lessons-a1.js",
  "js/screens.js",
  "js/quiz.js",
  "js/screens-cases.js",
  "js/screens-pronunciation.js",
  "js/screens-lessons.js",
  "js/main.js",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "fonts/inter-latin-wght-normal.woff2",
  "fonts/inter-latin-ext-wght-normal.woff2"
];

// ===== Install: save the app files =====

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(APP_FILES); })
      .then(function () { return self.skipWaiting(); }) // use the new version at once
  );
});

// ===== Activate: delete copies from older versions =====

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (cacheNames) {
        const oldNames = cacheNames.filter(function (name) {
          return name.startsWith("po-slovensky-") && name !== CACHE_NAME;
        });
        return Promise.all(oldNames.map(function (name) { return caches.delete(name); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

// ===== Fetch: answer from the saved copy first =====

self.addEventListener("fetch", function (event) {
  // Only simple downloads of our own files are cached. Anything else
  // (for example the future Firebase connection) goes straight to the network.
  const isOwnFile = new URL(event.request.url).origin === self.location.origin;
  if (event.request.method !== "GET" || !isOwnFile) return;

  event.respondWith(
    // ignoreSearch: "index.html?x=1" uses the same saved copy as "index.html"
    caches.match(event.request, { ignoreSearch: true }).then(function (savedResponse) {
      return savedResponse || fetch(event.request);
    })
  );
});
