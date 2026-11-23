/*
 * speech.js — Reads Slovak text aloud with the phone's own voice.
 *
 * How to use:
 *   AppSpeech.speak("Dobrý deň")  -> says it in Slovak
 *   AppSpeech.getStatus()          -> "ok", "no-voice", "unsupported" or
 *                                     "checking" (voices still loading)
 *   AppSpeech.onStatusChange(fn)   -> fn(status) runs when the voices load
 *
 * Why the phone's voice: it is free, needs no server and, once the Slovak
 * voice is downloaded on the phone, works offline. On Android it is the
 * Google text-to-speech engine; the Slovak voice may need downloading in
 * Android's settings (text-to-speech output).
 *
 * Depends on: the browser's Web Speech API (speechSynthesis).
 */

(function () {
  "use strict";

  // ===== Configuration =====

  const LANGUAGE = "sk-SK";
  const SPEAKING_RATE = 0.9; // slightly slower than normal, easier for learners
  const VOICE_WAIT_MS = 2000; // some phones load the voice list late

  // ===== State =====

  const isSupported = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  let slovakVoice = null;
  let status = isSupported ? "checking" : "unsupported";
  const listeners = [];

  // ===== Finding the Slovak voice =====

  /** Picks the first voice whose language is Slovak ("sk", "sk-SK", "sk_SK"). */
  function findSlovakVoice() {
    const voices = window.speechSynthesis.getVoices();
    return voices.find(function (voice) {
      return voice.lang.toLowerCase().replace("_", "-").startsWith("sk");
    }) || null;
  }

  /** Updates the status and tells whoever is listening. */
  function updateStatus() {
    slovakVoice = findSlovakVoice();
    const voicesLoaded = window.speechSynthesis.getVoices().length > 0;
    const newStatus = slovakVoice ? "ok" : (voicesLoaded ? "no-voice" : "checking");
    if (newStatus !== status) {
      status = newStatus;
      listeners.forEach(function (listener) { listener(status); });
    }
  }

  if (isSupported) {
    updateStatus();
    // Browsers fill the voice list asynchronously and announce it with this event.
    window.speechSynthesis.addEventListener("voiceschanged", updateStatus);
    // If no event ever comes, decide after a short wait.
    setTimeout(function () {
      updateStatus();
      if (status === "checking") {
        status = "no-voice";
        listeners.forEach(function (listener) { listener(status); });
      }
    }, VOICE_WAIT_MS);
  }

  // ===== Speaking =====

  /** Says a Slovak text. Stops whatever was being said before. */
  function speak(text) {
    if (!isSupported) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGE; // still set: some engines pick the voice from this alone
    utterance.rate = SPEAKING_RATE;
    if (slovakVoice) utterance.voice = slovakVoice;
    window.speechSynthesis.speak(utterance);
  }

  // ===== Public interface =====

  window.AppSpeech = {
    speak: speak,
    getStatus: function () { return status; },
    onStatusChange: function (listener) { listeners.push(listener); }
  };
})();
