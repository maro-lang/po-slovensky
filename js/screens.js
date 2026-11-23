/*
 * screens.js — Draws each screen of the app inside <main id="app">.
 *
 * Screens:
 *   onboarding -> first launch: choose Spanish or English as base language
 *   home       -> greeting, points, streak, the 3 phrases of the day and
 *                 the list of modules
 *   module     -> one module: built modules are drawn by their own file
 *                 (screens-cases.js, screens-lessons.js…, registered in
 *                 AppModuleScreens); the rest show "coming in stage N"
 *   settings   -> language, nickname, progress backup, version
 *
 * How to use: main.js calls AppScreens.<name>(container, context), where
 * `context` gives access to the saved data and to navigation.
 *
 * Depends on: storage.js (AppStorage), i18n.js (AppText), progress.js
 * (AppProgress, level bars), study-time.js (AppStudyTime, minutes today),
 * modules-list.js (AppModules), ui.js (AppUI), srs.js (AppSRS, phrases of
 * the day) and quiz.js (AppQuiz.speakButton, used when drawing). Classes come from
 * css/styles.css.
 */

(function () {
  "use strict";

  const el = AppUI.el;
  const icon = AppUI.icon;
  const t = AppText.t;

  // ===== Shared pieces =====

  /** Top bar: logo and title, or a back arrow and title on inner pages. */
  function buildHeader(titleText, backTarget, context) {
    const leftPart = backTarget
      ? el("button", {
          className: "header__back",
          "aria-label": t("common.back"),
          onClick: function () { context.navigate(backTarget); }
        }, [icon("back")])
      : el("img", { className: "brand-mark", src: "icons/icon-192.png", alt: "" });

    return el("header", { className: "header" }, [
      leftPart,
      el("h1", { className: "header__title" }, [titleText])
    ]);
  }

  /** Bottom navigation bar shared by the main screens. */
  function buildBottomNav(activeRoute, context) {
    const items = [
      { route: "home", label: t("nav.home"), iconName: "home" },
      { route: "settings", label: t("nav.settings"), iconName: "settings" }
    ];

    return el("nav", { className: "bottom-nav", "aria-label": "Main" }, items.map(function (item) {
      const isActive = item.route === activeRoute;
      return el("button", {
        className: "bottom-nav__item" + (isActive ? " bottom-nav__item--active" : ""),
        "aria-current": isActive ? "page" : null,
        onClick: function () { context.navigate(item.route); }
      }, [icon(item.iconName), el("span", {}, [item.label])]);
    }));
  }

  /** Grey uppercase label above a group of cards. */
  function sectionLabel(text) {
    return el("h3", { className: "section-label" }, [text]);
  }

  // ===== Onboarding screen =====

  /** First screen: the learner picks the language they will learn from. */
  function onboarding(container, context) {
    // Each option is written in its own language, so both are understandable.
    const languageRows = ["es", "en"].map(function (code) {
      return el("li", {}, [
        el("button", {
          className: "list-row",
          "data-language": code,
          onClick: function () { context.chooseBaseLanguage(code); }
        }, [
          el("span", { className: "list-row__text" }, [
            el("span", { className: "list-row__title" }, [AppText.LANGUAGE_NAMES[code]]),
            el("span", { className: "list-row__subtitle" }, [AppText.LANGUAGE_HINTS[code]])
          ]),
          el("span", { className: "list-row__chevron" }, [icon("chevronRight")])
        ])
      ]);
    });

    container.append(
      el("section", { className: "onboarding" }, [
        el("img", { className: "brand-mark", src: "icons/icon-192.png", alt: "" }),
        el("h1", { className: "onboarding__title" }, [t("app.name")]),
        // Nothing is chosen yet, so the texts are shown in both languages.
        el("p", { className: "onboarding__tagline muted" }, [AppText.tIn("es", "app.tagline") + " · " + AppText.tIn("en", "app.tagline")]),
        el("p", { className: "onboarding__question" }, [AppText.tIn("es", "onboarding.question")]),
        el("p", { className: "onboarding__question" }, [AppText.tIn("en", "onboarding.question")]),
        el("ul", { className: "card list onboarding__choices" }, languageRows),
        el("p", { className: "onboarding__hint muted small" }, [AppText.tIn("es", "onboarding.hint") + " · " + AppText.tIn("en", "onboarding.hint")])
      ])
    );
  }

  // ===== Home screen =====

  /** One row of the module list: symbol, name, description and its stage. */
  function buildModuleRow(module, context) {
    const language = AppText.getLanguage();
    const stagePill = module.ready
      ? null
      : el("span", { className: "pill", title: t("module.comingInStage", { stage: module.stage }) },
          [t("module.stageLabel", { stage: module.stage })]);

    return el("li", {}, [
      el("button", {
        className: "list-row",
        "data-module": module.id,
        onClick: function () { context.navigate("module/" + module.id); }
      }, [
        el("span", { className: "chip", "aria-hidden": "true" }, [module.symbol]),
        el("span", { className: "list-row__text" }, [
          el("span", { className: "list-row__title" }, [module.title[language]]),
          el("span", { className: "list-row__subtitle" }, [module.description[language]])
        ]),
        stagePill,
        el("span", { className: "list-row__chevron" }, [icon("chevronRight")])
      ])
    ]);
  }

  /** Main screen: greeting, a card with two counters and the module list. */
  function home(container, context) {
    const data = context.getData();
    const nickname = data.settings.nickname.trim();
    const greeting = nickname
      ? t("home.greetingWithName", { name: nickname })
      : t("home.greeting");

    const statsCard = el("div", { className: "card stats" }, [
      el("div", { className: "stat" }, [
        el("span", { className: "stat__value" }, [String(data.progress.totalPoints)]),
        el("span", { className: "stat__label" }, [t("home.points")])
      ]),
      el("div", { className: "stat" }, [
        el("span", { className: "stat__value" }, [String(context.getStreak())]),
        el("span", { className: "stat__label" }, [t("home.streak") + " (" + t("home.days") + ")"])
      ])
    ]);

    // The 3 phrases of the day: the same all day, new ones tomorrow (see srs.js).
    const language = AppText.getLanguage();
    const phrasesCard = el("ul", { className: "card list" }, AppSRS.dailyPhrases(AppSRS.today(), 3).map(function (phrase) {
      return el("li", { className: "phrase-row" }, [
        el("div", { className: "phrase-row__text" }, [
          el("span", { className: "phrase-row__sk" }, [phrase.sk]),
          el("span", { className: "muted small" }, [phrase[language]])
        ]),
        AppQuiz.speakButton(phrase.sk)
      ]);
    }));

    const moduleList = el("ul", { className: "card list" }, AppModules.ALL.map(function (module) {
      return buildModuleRow(module, context);
    }));

    container.append(
      buildHeader(t("app.name"), null, context),
      el("section", { className: "content" }, [
        el("h2", { className: "greeting" }, [greeting]),
        el("p", { className: "greeting-sub muted" }, [t("home.subtitle")]),
        statsCard,
        sectionLabel(t("home.progressTitle")),
        el("div", { className: "card field" }, [
          AppProgress.levelBars(data),
          el("p", { className: "muted small home-time" }, [t("home.timeLine", {
            today: AppStudyTime.minutesToday(data), week: AppStudyTime.minutesThisWeek(data)
          })])
        ]),
        sectionLabel(t("home.phrasesTitle")),
        phrasesCard,
        sectionLabel(t("home.modulesTitle")),
        moduleList
      ]),
      buildBottomNav("home", context)
    );
  }

  // ===== Module screen =====

  /**
   * Page for one module. A module that is ready hands over to its own
   * screen file; the others show which stage brings them.
   * `subParts` is the rest of the address, e.g. ["case", "gen"].
   */
  function module(container, context, moduleId, subParts) {
    const moduleInfo = AppModules.findById(moduleId);
    if (!moduleInfo) {
      context.navigate("home"); // unknown address: go back home
      return;
    }

    const moduleScreen = window.AppModuleScreens && window.AppModuleScreens[moduleId];
    if (moduleInfo.ready && moduleScreen) {
      moduleScreen(container, context, subParts || []);
      return;
    }

    const language = AppText.getLanguage();
    container.append(
      buildHeader(moduleInfo.title[language], "home", context),
      el("section", { className: "content module-page" }, [
        el("div", { className: "chip chip--large", "aria-hidden": "true" }, [moduleInfo.symbol]),
        el("h2", {}, [t("module.notReadyTitle")]),
        el("p", {}, [t("module.notReadyBody", { stage: moduleInfo.stage })]),
        el("div", { className: "card" }, [
          el("span", { className: "muted" }, [icon("clock")]),
          el("span", {}, [t("module.comingInStage", { stage: moduleInfo.stage })])
        ])
      ]),
      buildBottomNav("home", context)
    );
  }

  // ===== Settings screen =====

  /** Base language selector: two options, the active one highlighted. */
  function buildLanguageSelector(context) {
    const current = context.getData().settings.baseLanguage;
    return el("div", { className: "segmented", role: "group", "aria-label": t("settings.language") },
      ["es", "en"].map(function (code) {
        return el("button", {
          className: "segmented__option" + (code === current ? " segmented__option--active" : ""),
          "aria-pressed": code === current ? "true" : "false",
          onClick: function () {
            context.updateSettings({ baseLanguage: code });
            context.navigate("settings"); // redraw in the new language
          }
        }, [AppText.LANGUAGE_NAMES[code]]);
      })
    );
  }

  /** Nickname field with its save button. */
  function buildNicknameForm(context) {
    const input = el("input", {
      id: "nickname",
      type: "text",
      maxlength: "20", // keeps the leaderboard tidy
      autocomplete: "nickname",
      placeholder: t("settings.nicknamePlaceholder"),
      value: context.getData().settings.nickname
    });

    return el("form", {
      className: "field",
      onSubmit: function (event) {
        event.preventDefault(); // stay on the page instead of reloading it
        context.updateSettings({ nickname: input.value.trim() });
        AppUI.showToast(t("settings.saved"));
      }
    }, [
      el("label", { for: "nickname", className: "muted" }, [t("settings.nicknameHint")]),
      el("div", { className: "field__row" }, [input, el("button", { className: "btn", type: "submit" }, [t("settings.save")])])
    ]);
  }

  /** Export and import buttons for the progress backup file. */
  function buildBackupCard(context) {
    // Hidden file picker, opened by the "Load" button.
    const fileInput = el("input", {
      type: "file",
      accept: "application/json,.json",
      className: "visually-hidden",
      onChange: function () {
        const file = fileInput.files[0];
        if (!file) return;
        file.text().then(function (fileText) {
          const worked = AppStorage.importFromText(fileText);
          AppUI.showToast(t(worked ? "settings.importOk" : "settings.importFail"));
          if (worked) context.reloadData();
        });
      }
    });

    return el("div", { className: "card field" }, [
      el("p", { className: "muted small" }, [t("settings.backupHint")]),
      el("div", { className: "button-row", style: "margin-top: 12px" }, [
        el("button", { className: "btn", onClick: AppStorage.exportToFile }, [icon("download"), t("settings.export")]),
        el("button", { className: "btn btn--secondary", onClick: function () { fileInput.click(); } }, [icon("upload"), t("settings.import")])
      ]),
      fileInput
    ]);
  }

  /** Settings screen: language, nickname, backup and app information. */
  function settings(container, context) {
    const offlineText = context.isOfflineReady() ? t("settings.offlineReady") : t("settings.offlineNotReady");

    container.append(
      buildHeader(t("settings.title"), null, context),
      el("section", { className: "content" }, [
        sectionLabel(t("settings.language")),
        buildLanguageSelector(context),
        sectionLabel(t("settings.nickname")),
        el("div", { className: "card" }, [buildNicknameForm(context)]),
        sectionLabel(t("settings.backupTitle")),
        buildBackupCard(context),
        sectionLabel(t("settings.aboutTitle")),
        el("div", { className: "card field" }, [
          el("p", { className: "small" }, [t("settings.version", { version: context.appVersion })]),
          el("p", { className: "muted small", id: "offline-status" }, [offlineText]),
          el("p", { className: "muted small" }, [t("settings.credits")])
        ])
      ]),
      buildBottomNav("settings", context)
    );
  }

  // ===== Public interface =====

  window.AppScreens = {
    onboarding: onboarding,
    home: home,
    module: module,
    settings: settings,
    // Shared pieces, used by the module screen files.
    parts: {
      buildHeader: buildHeader,
      buildBottomNav: buildBottomNav,
      sectionLabel: sectionLabel
    }
  };
})();
