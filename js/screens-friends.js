/*
 * screens-friends.js — Friends' leaderboard (module "friends").
 *
 * Addresses (after #/module/friends):
 *   (nothing)     -> without a group: create one or join one with a code
 *                    with a group: the group's table
 *   join/<code>   -> same as above, with the code already typed in
 *                    (used by the link that "Share" sends to friends)
 *
 * What the table shows of each person: nickname, level, points of this
 * week, total points and streak. Nothing else leaves the phone.
 *
 * Depends on: friends.js (AppFriends, talks to Firebase), ui.js, i18n.js
 * and screens.js (AppScreens.parts).
 */

(function () {
  "use strict";

  const el = AppUI.el;
  const icon = AppUI.icon;
  const t = AppText.t;

  // ===== Configuration =====

  const LEVELS = ["A1", "A2", "B1"];

  // Public address of the app, used in the invitation sent to friends.
  const APP_URL = "https://maro-lang.github.io/po-slovensky/";

  // Which column the table is sorted by. Kept while the app is open.
  let tableMode = "week"; // "week" or "total"

  // ===== Small builders =====

  /** Three joined buttons to choose the level (A1, A2, B1). */
  function levelSelector(currentLevel, onChoose) {
    return el("div", { className: "segmented segmented--three", role: "group", "aria-label": t("friends.level") },
      LEVELS.map(function (level) {
        const isActive = level === currentLevel;
        return el("button", {
          type: "button",
          className: "segmented__option" + (isActive ? " segmented__option--active" : ""),
          "aria-pressed": isActive ? "true" : "false",
          onClick: function () { onChoose(level); }
        }, [level]);
      })
    );
  }

  /** Yellow notice shown when the phone has no internet. */
  function offlineNotice() {
    return navigator.onLine ? null : el("p", { className: "notice" }, [t("friends.offline")]);
  }

  /**
   * A button that asks for a second tap before doing something that cannot
   * be undone (leaving the group), instead of a browser pop-up.
   */
  function confirmButton(label, confirmLabel, action) {
    let armed = false;
    const button = el("button", { className: "btn btn--secondary btn--danger", type: "button" }, [label]);
    button.addEventListener("click", function () {
      if (armed) { action(button); return; }
      armed = true;
      button.textContent = confirmLabel;
      setTimeout(function () { armed = false; button.textContent = label; }, 4000);
    });
    return button;
  }

  // ===== Joining a group =====

  /**
   * Saves the group in the settings and uploads this learner's first row.
   * If the upload fails, the group is forgotten again so the learner stays
   * on the "create or join" page. Returns a Promise.
   */
  function enterGroup(groupCode, nickname, level, context) {
    const data = context.getData();
    data.settings.nickname = nickname;
    data.settings.friends = { groupCode: groupCode, level: level };
    data.progress.friendsSync = { pending: true, lastPushedTotal: null };

    return AppFriends.upload(data).then(function () {
      context.saveData();
      context.navigate("module/friends");
    }).catch(function (error) {
      data.settings.friends = { groupCode: null, level: level };
      data.progress.friendsSync = { pending: false, lastPushedTotal: null };
      context.saveData();
      throw error;
    });
  }

  // ===== Page without a group: create or join =====

  function setupPage(container, context, prefilledCode) {
    const parts = AppScreens.parts;
    const data = context.getData();
    let chosenLevel = (data.settings.friends && data.settings.friends.level) || "A1";

    const nicknameInput = el("input", {
      type: "text", id: "friends-nickname", maxlength: "20", autocomplete: "nickname",
      placeholder: t("settings.nicknamePlaceholder"), value: data.settings.nickname
    });
    const codeInput = el("input", {
      type: "text", id: "friends-code", maxlength: "32", autocapitalize: "characters",
      autocomplete: "off", spellcheck: "false", placeholder: "AHOJ-XXXX-XXXX", value: prefilledCode || ""
    });
    const errorLine = el("p", { className: "form-error", role: "alert" });

    // The level buttons are redrawn when one is chosen.
    const levelHolder = el("div");
    function drawLevels() {
      levelHolder.replaceChildren(levelSelector(chosenLevel, function (level) { chosenLevel = level; drawLevels(); }));
    }
    drawLevels();

    /** Checks the nickname; shows a message and returns "" if it is empty. */
    function readNickname() {
      const nickname = nicknameInput.value.trim().slice(0, 20);
      if (!nickname) { errorLine.textContent = t("friends.needNickname"); nicknameInput.focus(); }
      return nickname;
    }

    /** Disables the buttons while waiting for Firebase, and shows errors. */
    function runBusy(button, work) {
      errorLine.textContent = "";
      const buttons = container.querySelectorAll("button");
      buttons.forEach(function (b) { b.disabled = true; });
      const originalText = button.textContent;
      button.textContent = t("friends.connecting");
      work().catch(function (error) {
        console.warn("Leaderboard error.", error);
        errorLine.textContent = error && error.message === "empty-group" ? t("friends.codeUnknown") : t("friends.connectionFailed");
        buttons.forEach(function (b) { b.disabled = false; });
        button.textContent = originalText;
      });
    }

    const createButton = el("button", { className: "btn btn--block", type: "button" }, [t("friends.createGroup")]);
    createButton.addEventListener("click", function () {
      const nickname = readNickname();
      if (!nickname) return;
      runBusy(createButton, function () {
        return enterGroup(AppFriends.newGroupCode(), nickname, chosenLevel, context);
      });
    });

    const joinButton = el("button", { className: "btn", type: "submit" }, [t("friends.join")]);
    const joinForm = el("form", {
      className: "field__row",
      onSubmit: function (event) {
        event.preventDefault();
        const nickname = readNickname();
        if (!nickname) return;
        const code = AppFriends.normalizeCode(codeInput.value);
        if (!code) { errorLine.textContent = t("friends.codeInvalid"); codeInput.focus(); return; }

        // Check first that someone is already in that group, so a typo
        // does not silently create a new, empty group.
        runBusy(joinButton, function () {
          return AppFriends.fetchTable(code).then(function (rows) {
            if (!rows.length) throw new Error("empty-group");
            return enterGroup(code, nickname, chosenLevel, context);
          });
        });
      }
    }, [codeInput, joinButton]);

    container.append(
      parts.buildHeader(t("friends.title"), "home", context),
      el("section", { className: "content" }, [
        offlineNotice(),
        el("div", { className: "card field" }, [
          el("p", { className: "today-card__title" }, [t("friends.introTitle")]),
          el("p", { className: "muted" }, [t("friends.introBody")])
        ]),
        parts.sectionLabel(t("friends.aboutYou")),
        el("div", { className: "card field stack-small" }, [
          el("label", { for: "friends-nickname" }, [t("friends.nicknameLabel")]),
          nicknameInput,
          el("label", {}, [t("friends.levelLabel")]),
          levelHolder
        ]),
        parts.sectionLabel(t("friends.newGroup")),
        el("div", { className: "card field" }, [
          el("p", { className: "muted small" }, [t("friends.createHint")]),
          createButton
        ]),
        parts.sectionLabel(t("friends.haveCode")),
        el("div", { className: "card field" }, [
          el("label", { for: "friends-code", className: "muted" }, [t("friends.joinHint")]),
          joinForm
        ]),
        errorLine,
        el("p", { className: "muted small note" }, [t("friends.privacy")])
      ]),
      parts.buildBottomNav("home", context)
    );
  }

  // ===== Page with a group: the table =====

  /** Text for the invitation that "Share" sends. */
  function invitationText(groupCode) {
    return t("friends.inviteText", { code: groupCode, url: APP_URL + "#/module/friends/join/" + groupCode });
  }

  /** Shares the invitation with Android's share menu, or copies it. */
  function shareCode(groupCode) {
    const text = invitationText(groupCode);
    if (navigator.share) {
      navigator.share({ title: t("app.name"), text: text }).catch(function () { /* closed by the user */ });
      return;
    }
    copyText(text);
  }

  /** Copies a text to the clipboard and confirms it with a toast. */
  function copyText(text) {
    if (!navigator.clipboard) { AppUI.showToast(text); return; }
    navigator.clipboard.writeText(text)
      .then(function () { AppUI.showToast(t("friends.copied")); })
      .catch(function () { AppUI.showToast(text); });
  }

  /** Sorts the rows for the chosen mode; ties are broken by total points. */
  function sortRows(rows, mode) {
    const thisWeek = AppFriends.weekId(new Date());
    rows.forEach(function (row) {
      // Points of an older week do not count for "this week".
      row.shownWeekPoints = row.weekId === thisWeek ? row.weekPoints : 0;
    });
    return rows.slice().sort(function (a, b) {
      const difference = mode === "week" ? b.shownWeekPoints - a.shownWeekPoints : b.totalPoints - a.totalPoints;
      return difference || b.totalPoints - a.totalPoints;
    });
  }

  /** The table itself: position, name and level, points, streak. */
  function buildTable(rows, mode) {
    const sorted = sortRows(rows, mode);
    return el("table", { className: "table leaderboard" }, [
      el("thead", {}, [el("tr", {}, [
        el("th", { scope: "col" }, ["#"]),
        el("th", { scope: "col" }, [t("friends.colName")]),
        el("th", { scope: "col", className: "num" }, [t("friends.colPoints")]),
        el("th", { scope: "col", className: "num" }, [t("friends.colStreak")])
      ])]),
      el("tbody", {}, sorted.map(function (row, index) {
        const points = mode === "week" ? row.shownWeekPoints : row.totalPoints;
        return el("tr", { className: row.isMe ? "leaderboard__me" : null }, [
          el("td", { className: "leaderboard__rank" }, [String(index + 1)]),
          el("td", {}, [
            el("span", { className: "leaderboard__name" }, [row.nickname + (row.isMe ? " " + t("friends.you") : "")]),
            el("span", { className: "pill leaderboard__level" }, [row.level])
          ]),
          el("td", { className: "num" }, [String(points)]),
          el("td", { className: "num" }, [String(row.streak)])
        ]);
      }))
    ]);
  }

  function tablePage(container, context) {
    const parts = AppScreens.parts;
    const data = context.getData();
    const groupCode = data.settings.friends.groupCode;

    const tableHolder = el("div", { className: "card table-card" }, [
      el("p", { className: "muted field" }, [t("friends.loading")])
    ]);
    const hintHolder = el("div");
    const updatedLine = el("p", { className: "muted small note" });
    let lastRows = null;

    /** Draws the rows kept in lastRows with the current mode. */
    function drawTable() {
      if (!lastRows) return;
      tableHolder.replaceChildren(buildTable(lastRows, tableMode));
      hintHolder.replaceChildren(lastRows.length <= 1 ? el("p", { className: "notice notice--info" }, [t("friends.aloneHint")]) : "");
    }

    /** Uploads this learner's points (if needed) and downloads the table. */
    function refresh() {
      if (!navigator.onLine) {
        tableHolder.replaceChildren(el("p", { className: "muted field" }, [t("friends.offline")]));
        return;
      }
      tableHolder.replaceChildren(el("p", { className: "muted field" }, [t("friends.loading")]));

      // A failed upload must not hide the table, so its error is only logged.
      const uploadFirst = data.progress.friendsSync.pending
        ? AppFriends.upload(data).then(context.saveData).catch(function (error) { console.warn("Upload failed.", error); })
        : Promise.resolve();

      uploadFirst
        .then(function () { return AppFriends.fetchTable(groupCode); })
        .then(function (rows) {
          lastRows = rows;
          drawTable();
          updatedLine.textContent = t("friends.updatedAt", { time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) });
        })
        .catch(function (error) {
          console.warn("Could not load the table.", error);
          tableHolder.replaceChildren(el("p", { className: "muted field" }, [t("friends.connectionFailed")]));
        });
    }

    // "This week" / "Total" switch.
    const modeHolder = el("div");
    function drawModes() {
      modeHolder.replaceChildren(el("div", { className: "segmented", role: "group" }, ["week", "total"].map(function (mode) {
        const isActive = mode === tableMode;
        return el("button", {
          type: "button",
          className: "segmented__option" + (isActive ? " segmented__option--active" : ""),
          "aria-pressed": isActive ? "true" : "false",
          onClick: function () { tableMode = mode; drawModes(); drawTable(); }
        }, [t(mode === "week" ? "friends.thisWeek" : "friends.total")]);
      })));
    }
    drawModes();

    // Level change: saved now, sent with the next upload.
    const levelHolder = el("div");
    function drawLevels() {
      levelHolder.replaceChildren(levelSelector(data.settings.friends.level, function (level) {
        data.settings.friends.level = level;
        data.progress.friendsSync.pending = true;
        context.saveData();
        drawLevels();
        refresh();
      }));
    }
    drawLevels();

    const leaveButton = confirmButton(t("friends.leave"), t("friends.leaveConfirm"), function (button) {
      button.disabled = true;
      AppFriends.leave(groupCode).then(function () {
        data.settings.friends.groupCode = null;
        data.progress.friendsSync = { pending: false, lastPushedTotal: null };
        context.saveData();
        AppUI.showToast(t("friends.left"));
        context.navigate("module/friends");
      }).catch(function () {
        button.disabled = false;
        AppUI.showToast(t("friends.connectionFailed"));
      });
    });

    container.append(
      parts.buildHeader(t("friends.title"), "home", context),
      el("section", { className: "content" }, [
        offlineNotice(),
        el("div", { className: "card field group-card" }, [
          el("p", { className: "muted small" }, [t("friends.yourGroup")]),
          el("p", { className: "group-card__code" }, [groupCode]),
          el("div", { className: "button-row" }, [
            el("button", { className: "btn", type: "button", onClick: function () { shareCode(groupCode); } }, [icon("share"), t("friends.share")]),
            el("button", { className: "btn btn--secondary", type: "button", onClick: function () { copyText(groupCode); } }, [icon("copy"), t("friends.copy")])
          ])
        ]),
        parts.sectionLabel(t("friends.tableTitle")),
        modeHolder,
        el("div", { className: "card--spaced" }, [tableHolder]),
        hintHolder,
        updatedLine,
        el("button", { className: "btn btn--secondary btn--block", type: "button", onClick: refresh }, [icon("refresh"), t("friends.refresh")]),
        parts.sectionLabel(t("friends.levelLabel")),
        levelHolder,
        el("p", { className: "muted small note" }, [t("friends.privacy")]),
        el("div", { className: "danger-zone" }, [leaveButton])
      ]),
      parts.buildBottomNav("home", context)
    );

    refresh();
  }

  // ===== Router for this module =====

  function route(container, context, subParts) {
    const friends = context.getData().settings.friends;
    if (friends && friends.groupCode) {
      tablePage(container, context);
      return;
    }
    const prefilledCode = subParts[0] === "join" ? AppFriends.normalizeCode(subParts[1]) : "";
    setupPage(container, context, prefilledCode);
  }

  window.AppModuleScreens = window.AppModuleScreens || {};
  window.AppModuleScreens.friends = route;
})();
