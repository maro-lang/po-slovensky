/*
 * screens-pronunciation.js — Pronunciation module (module "pronunciation").
 *
 * One page with every topic: a short rule and example words. Tapping a
 * word reads it aloud with the phone's Slovak voice. A notice at the top
 * explains what to do if the phone has no Slovak voice.
 *
 * Depends on: data/pronunciation.js (AppData.pronunciation), ui.js,
 * i18n.js, speech.js, screens.js (AppScreens.parts), quiz.js (speakButton).
 */

(function () {
  "use strict";

  const el = AppUI.el;
  const t = AppText.t;

  /** Notice about the Slovak voice; updates itself when the voices load. */
  function buildVoiceNotice() {
    const notice = el("div", { className: "notice", role: "status" });

    function refresh(status) {
      notice.hidden = status === "ok" || status === "checking";
      notice.textContent = status === "unsupported" ? t("speech.unsupported") : t("speech.noVoice");
    }

    refresh(AppSpeech.getStatus());
    AppSpeech.onStatusChange(refresh);
    return notice;
  }

  /** One example word: the word, an optional "sounds like" hint, its meaning, a speaker. */
  function wordRow(word) {
    const language = AppText.getLanguage();
    return el("li", {}, [
      el("button", { className: "phrase-row phrase-row--button", type: "button", onClick: function () { AppSpeech.speak(word.sk); } }, [
        el("span", { className: "phrase-row__text" }, [
          el("span", { className: "phrase-row__sk" }, [word.sk]),
          el("span", { className: "muted small" }, [
            word[language] + (word.sounds ? " · " + t("pron.soundsLike", { sounds: word.sounds }) : "")
          ])
        ]),
        el("span", { className: "speak-btn", "aria-hidden": "true" }, [AppUI.icon("speaker")])
      ])
    ]);
  }

  function route(container, context) {
    const parts = AppScreens.parts;
    const language = AppText.getLanguage();

    const sections = [];
    AppData.pronunciation.SECTIONS.forEach(function (section) {
      sections.push(parts.sectionLabel(section.title[language]));
      const key = "pron:" + section.id;
      const card = el("div", { className: "card" + AppProgress.doneClass(context.getData(), key) });
      // The outline appears or disappears as soon as the button is tapped.
      const button = AppProgress.completeButton(context, key, function (done) { card.classList.toggle("is-done", done); });
      card.append(
        el("p", { className: "field rule" }, [section.rule[language]]),
        el("ul", { className: "list list--inset" }, section.words.map(wordRow)),
        el("div", { className: "field complete-row" }, [button])
      );
      sections.push(card);
    });

    container.append(
      parts.buildHeader(t("pron.title"), "home", context),
      el("section", { className: "content" }, [
        buildVoiceNotice(),
        el("p", { className: "muted" }, [t("pron.intro")])
      ].concat(sections)),
      parts.buildBottomNav("home", context)
    );
  }

  window.AppModuleScreens = window.AppModuleScreens || {};
  window.AppModuleScreens.pronunciation = route;
})();
