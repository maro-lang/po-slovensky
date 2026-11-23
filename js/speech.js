/*
 * speech.js — Reads Slovak text aloud with the phone's own voice.
 *
 * How to use:
 *   AppSpeech.speak("Dobrý deň")  -> says it in Slovak
 *   AppSpeech.speakLines([{ who: "A", line: "…" }, …], onDone)
 *                                  -> reads a dialogue; speaker B gets a higher
 *                                     voice so the two people sound different
 *   AppSpeech.stop()               -> stops talking
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
  // Voice pitch per speaker in dialogues (1 = normal). The phone has a single
  // Slovak voice, so a different pitch is the only way to tell people apart.
  const SPEAKER_PITCH = { A: 0.9, B: 1.35 };

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

  /** Builds one utterance with the Slovak voice and the learner-friendly speed. */
  function makeUtterance(text, pitch) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGE; // still set: some engines pick the voice from this alone
    utterance.rate = SPEAKING_RATE;
    if (pitch) utterance.pitch = pitch;
    if (slovakVoice) utterance.voice = slovakVoice;
    return utterance;
  }

  /** Says a Slovak text. Stops whatever was being said before. */
  function speak(text) {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(makeUtterance(text));
  }

  /**
   * Reads a dialogue line by line (the browser queues the utterances).
   * `onDone` runs when the last line ends (or at once if speech is not available).
   */
  function speakLines(lines, onDone) {
    if (!isSupported) { if (onDone) onDone(); return; }
    window.speechSynthesis.cancel();
    lines.forEach(function (entry, index) {
      const utterance = makeUtterance(entry.line, SPEAKER_PITCH[entry.who] || 1);
      if (index === lines.length - 1 && onDone) {
        utterance.onend = onDone;
        utterance.onerror = onDone;
      }
      window.speechSynthesis.speak(utterance);
    });
  }

  /** Stops whatever is being said (for example when leaving a screen). */
  function stop() {
    if (isSupported) window.speechSynthesis.cancel();
  }

  // ===== Public interface =====

  window.AppSpeech = {
    speak: speak,
    speakLines: speakLines,
    stop: stop,
    getStatus: function () { return status; },
    onStatusChange: function (listener) { listeners.push(listener); }
  };
})();
