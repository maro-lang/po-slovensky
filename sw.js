/*
 * sw.js — Service worker: keeps a copy of the app on the phone so it opens
 * without internet.
 *
 * How it works:
 *   - On install, it downloads every file listed in APP_FILES into a cache,
 *     plus the card drawings listed in img/openmoji/files.json. These
 *     downloads skip the browser's own HTTP cache (see freshRequest), so a
 *     new version never mixes in files the browser kept from the old one.
 *   - On each request, it answers from that cache first; if the file is not
 *     there, it asks the network.
 *   - When CACHE_VERSION changes, the old copy is deleted and a new one is
 *     downloaded. CHANGE CACHE_VERSION EVERY TIME ANY APP FILE CHANGES,
 *     otherwise phones keep showing the old version.
 *
 * Depends on: the files listed below. Registered by js/main.js.
 */

// ===== Configuration =====

const CACHE_VERSION = "0.6.6"; // keep equal to APP_VERSION in js/main.js
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
  "js/data/lessons-a2.js",
  "js/data/lessons-b1.js",
  "js/data/vocabulary.js",
  "js/data/vocabulary-a1.js",
  "js/data/verbs.js",
  "js/data/exam-a2.js",
  "js/data/exam-a1.js",
  "js/data/exam-b1.js",
  "js/data/real-life.js",
  "js/srs.js",
  "js/friends.js",
  "js/progress.js",
  "js/study-time.js",
  "js/vendor/firebase-lite.js",
  "js/screens.js",
  "js/quiz.js",
  "js/screens-cases.js",
  "js/screens-pronunciation.js",
  "js/screens-lessons.js",
  "js/screens-review.js",
  "js/screens-friends.js",
  "js/screens-verbs.js",
  "js/screens-exam.js",
  "js/screens-real.js",
  "js/main.js",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "fonts/inter-latin-wght-normal.woff2",
  "fonts/inter-latin-ext-wght-normal.woff2"
];

// ===== Install: save the app files =====

/**
 * A request that always goes to the server and skips the browser's HTTP
 * cache. Why: GitHub Pages lets the browser keep each file for 10 minutes.
 * Without this, a new version installed shortly after the old one was
 * opened would save the browser's old copies of some files (this happened
 * with version 0.6.2: new sw.js, old main.js and i18n.js).
 */
function freshRequest(path) {
  return new Request(path, { cache: "reload" });
}

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(APP_FILES.map(freshRequest)).then(function () { return cacheCardPictures(cache); });
      })
      .then(function () { return self.skipWaiting(); }) // use the new version at once
  );
});

/**
 * Saves every OpenMoji drawing of the vocabulary cards. Their names are
 * listed in img/openmoji/files.json (written by herramientas/copy_icons.py).
 */
function cacheCardPictures(cache) {
  return fetch(freshRequest("img/openmoji/files.json"))
    .then(function (response) { return response.json(); })
    .then(function (fileNames) {
      return cache.addAll(fileNames.map(function (name) { return freshRequest("img/openmoji/" + name); }));
    });
}

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
  // (for example the Firebase leaderboard connection) goes straight to the network.
  const isOwnFile = new URL(event.request.url).origin === self.location.origin;
  if (event.request.method !== "GET" || !isOwnFile) return;

  event.respondWith(
    // ignoreSearch: "index.html?x=1" uses the same saved copy as "index.html"
    caches.match(event.request, { ignoreSearch: true }).then(function (savedResponse) {
      return savedResponse || fetch(event.request);
    })
  );
});
