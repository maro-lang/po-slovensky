/*
 * screens-friends.js — Friends' group: progress table and chat (module "friends").
 *
 * Addresses (after #/module/friends):
 *   (nothing)     -> without a group: create one or join one with a code
 *                    with a group: each friend's progress (bars per level,
 *                    study time, last mock exam, streak)
 *   join/<code>   -> same as above, with the code already typed in
 *                    (used by the link that "Share" sends to friends)
 *   chat          -> the group chat
 *
 * What the table shows of each person: nickname, percent of sections
 * completed in A1, A2 and B1, minutes with the app open today and this week,
 * the last mock exam result and the streak. Nothing else leaves the phone.
 *
 * Depends on: friends.js (AppFriends, talks to Firebase), progress.js
 * (AppProgress.bar), ui.js, i18n.js and screens.js (AppScreens.parts).
 */

(function () {
  "use strict";

  const el = AppUI.el;
  const icon = AppUI.icon;
  const t = AppText.t;

  // ===== Configuration =====

  // Public address of the app, used in the invitation sent to friends.
  const APP_URL = "https://maro-lang.github.io/po-slovensky/";

  const CHAT_REFRESH_MS = 8000; // how often the open chat looks for new messages

  // How the table is sorted. Kept while the app is open.
  let tableMode = "progress"; // "progress" or "time"

  // Timer that refreshes the chat while it is on screen.
  let chatTimer = null;

  function stopChatTimer() {
    if (chatTimer) clearInterval(chatTimer);
    chatTimer = null;
  }

  // ===== Small helpers =====

  /** "25 min" or "3 h 10 min". */
  function durationText(minutes) {
    if (minutes < 60) return t("friends.minutes", { minutes: minutes });
    return t("friends.hoursMinutes", { hours: Math.floor(minutes / 60), minutes: minutes % 60 });
  }

  /** "YYYY-MM-DD" of today, in the phone's time zone. */
  function todayText() { return AppSRS.today(); }

  /** Yellow notice shown when the phone has no internet. */
  function offlineNotice() {
    return navigator.onLine ? null : el("p", { className: "notice" }, [t("friends.offline")]);
  }

  /**
   * A button that asks for a second tap before doing something that cannot
   * be undone, instead of a browser pop-up.
   */
  function confirmButton(label, confirmLabel, className, action) {
    let armed = false;
    const button = el("button", { className: className, type: "button" }, [label]);
    button.addEventListener("click", function (event) {
      event.stopPropagation();
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
  function enterGroup(groupCode, nickname, context) {
    const data = context.getData();
    data.settings.nickname = nickname;
    data.settings.friends = { groupCode: groupCode };
    data.progress.friendsSync = { pending: true };

    return AppFriends.upload(data).then(function () {
      context.saveData();
      context.navigate("module/friends");
    }).catch(function (error) {
      data.settings.friends = { groupCode: null };
      data.progress.friendsSync = { pending: false };
      context.saveData();
      throw error;
    });
  }

  // ===== Page without a group: create or join =====

  function setupPage(container, context, prefilledCode) {
    const parts = AppScreens.parts;
    const data = context.getData();

    const nicknameInput = el("input", {
      type: "text", id: "friends-nickname", maxlength: "20", autocomplete: "nickname",
      placeholder: t("settings.nicknamePlaceholder"), value: data.settings.nickname
    });
    const codeInput = el("input", {
      type: "text", id: "friends-code", maxlength: "32", autocapitalize: "characters",
      autocomplete: "off", spellcheck: "false", placeholder: "AHOJ-XXXX-XXXX", value: prefilledCode || ""
    });
    const errorLine = el("p", { className: "form-error", role: "alert" });

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
        console.warn("Friends' group error.", error);
        errorLine.textContent = error && error.message === "empty-group" ? t("friends.codeUnknown") : t("friends.connectionFailed");
        buttons.forEach(function (b) { b.disabled = false; });
        button.textContent = originalText;
      });
    }

    const createButton = el("button", { className: "btn btn--block", type: "button" }, [t("friends.createGroup")]);
    createButton.addEventListener("click", function () {
      const nickname = readNickname();
      if (!nickname) return;
      runBusy(createButton, function () { return enterGroup(AppFriends.newGroupCode(), nickname, context); });
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
            return enterGroup(code, nickname, context);
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
        el("div", { className: "card field" }, [
          el("label", { for: "friends-nickname" }, [t("friends.nicknameLabel")]),
          nicknameInput
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

  // ===== Page with a group: the progress table =====

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

  /**
   * Fills in the values that only count for today / this week: a row
   * uploaded yesterday shows 0 minutes today.
   */
  function currentValues(row) {
    const thisWeek = AppFriends.weekId(new Date());
    return {
      today: row.dayId === todayText() ? row.todayMinutes : 0,
      week: row.weekId === thisWeek ? row.weekMinutes : 0,
      progress: row.a1 + row.a2 + row.b1
    };
  }

  /** Sorts the rows: by total progress or by time this week. */
  function sortRows(rows, mode) {
    return rows.slice().sort(function (a, b) {
      const valuesA = currentValues(a), valuesB = currentValues(b);
      const difference = mode === "time" ? valuesB.week - valuesA.week : valuesB.progress - valuesA.progress;
      return difference || valuesB.week - valuesA.week;
    });
  }

  /** One friend: name, bars per level, study time, exam, streak. */
  function playerCard(row, position, b1HasContent) {
    const values = currentValues(row);
    // Rows from version 0.5.0 have no level or total: those exams were A2 with 4 parts.
    const exam = row.examPercent >= 0
      ? t("friends.examResult", { level: row.examLevel || "A2", percent: row.examPercent, parts: row.examParts, total: row.examTotal || 4 })
      : t("friends.noExam");

    return el("li", { className: "player" + (row.isMe ? " player--me" : "") }, [
      el("div", { className: "player__head" }, [
        el("span", { className: "player__rank" }, [String(position)]),
        el("span", { className: "player__name" }, [row.nickname + (row.isMe ? " " + t("friends.you") : "")]),
        el("span", { className: "pill" }, [t("friends.streak", { days: row.streak })])
      ]),
      el("div", { className: "level-bars level-bars--compact" }, [
        AppProgress.bar("A1", row.a1, row.a1 + " %"),
        AppProgress.bar("A2", row.a2, row.a2 + " %"),
        b1HasContent ? AppProgress.bar("B1", row.b1, row.b1 + " %") : AppProgress.bar("B1", null, t("progress.soon"))
      ]),
      el("p", { className: "player__facts muted small" }, [
        t("friends.timeLine", { today: durationText(values.today), week: durationText(values.week) }) + " · " + exam
      ])
    ]);
  }

  function tablePage(container, context) {
    const parts = AppScreens.parts;
    const data = context.getData();
    const groupCode = data.settings.friends.groupCode;
    const b1HasContent = AppProgress.levelStats(data, "B1").total > 0;

    const listHolder = el("div", { className: "card" }, [el("p", { className: "muted field" }, [t("friends.loading")])]);
    const hintHolder = el("div");
    const updatedLine = el("p", { className: "muted small note" });
    let lastRows = null;

    /** Draws the rows kept in lastRows with the current sort mode. */
    function drawTable() {
      if (!lastRows) return;
      listHolder.replaceChildren(el("ul", { className: "list players" }, sortRows(lastRows, tableMode).map(function (row, index) {
        return playerCard(row, index + 1, b1HasContent);
      })));
      hintHolder.replaceChildren(lastRows.length <= 1 ? el("p", { className: "notice notice--info" }, [t("friends.aloneHint")]) : "");
    }

    /** Uploads this learner's row (always, so it is current) and downloads the table. */
    function refresh() {
      if (!navigator.onLine) {
        listHolder.replaceChildren(el("p", { className: "muted field" }, [t("friends.offline")]));
        return;
      }
      listHolder.replaceChildren(el("p", { className: "muted field" }, [t("friends.loading")]));
      data.progress.friendsSync.pending = true;

      // A failed upload must not hide the table, so its error is only logged.
      AppFriends.upload(data).then(context.saveData).catch(function (error) { console.warn("Upload failed.", error); })
        .then(function () { return AppFriends.fetchTable(groupCode); })
        .then(function (rows) {
          lastRows = rows;
          drawTable();
          updatedLine.textContent = t("friends.updatedAt", { time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) });
        })
        .catch(function (error) {
          console.warn("Could not load the table.", error);
          listHolder.replaceChildren(el("p", { className: "muted field" }, [t("friends.connectionFailed")]));
        });
    }

    // "Progress" / "Time this week" switch.
    const modeHolder = el("div");
    function drawModes() {
      modeHolder.replaceChildren(el("div", { className: "segmented", role: "group" }, ["progress", "time"].map(function (mode) {
        const isActive = mode === tableMode;
        return el("button", {
          type: "button",
          className: "segmented__option" + (isActive ? " segmented__option--active" : ""),
          "aria-pressed": isActive ? "true" : "false",
          onClick: function () { tableMode = mode; drawModes(); drawTable(); }
        }, [t(mode === "time" ? "friends.sortTime" : "friends.sortProgress")]);
      })));
    }
    drawModes();

    const leaveButton = confirmButton(t("friends.leave"), t("friends.leaveConfirm"), "btn btn--secondary btn--danger", function (button) {
      button.disabled = true;
      AppFriends.leave(groupCode).then(function () {
        data.settings.friends.groupCode = null;
        data.progress.friendsSync = { pending: false };
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
        el("button", { className: "btn btn--block chat-open", type: "button", onClick: function () { context.navigate("module/friends/chat"); } }, [icon("chat"), t("friends.openChat")]),
        parts.sectionLabel(t("friends.tableTitle")),
        modeHolder,
        el("div", { className: "card--spaced" }, [listHolder]),
        hintHolder,
        updatedLine,
        el("button", { className: "btn btn--secondary btn--block", type: "button", onClick: refresh }, [icon("refresh"), t("friends.refresh")]),
        el("p", { className: "muted small note" }, [t("friends.howCounted")]),
        el("p", { className: "muted small note" }, [t("friends.privacy")]),
        el("div", { className: "danger-zone" }, [leaveButton])
      ]),
      parts.buildBottomNav("home", context)
    );

    refresh();
  }

  // ===== Chat =====

  /** "14:05", or "23/11 14:05" for messages of another day. */
  function messageTime(date) {
    const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const sameDay = date.toDateString() === new Date().toDateString();
    return sameDay ? time : date.toLocaleDateString([], { day: "2-digit", month: "2-digit" }) + " " + time;
  }

  function chatPage(container, context) {
    const parts = AppScreens.parts;
    const data = context.getData();
    const groupCode = data.settings.friends.groupCode;

    const messageList = el("div", { className: "chat__messages", "aria-live": "polite" }, [
      el("p", { className: "muted small chat__empty" }, [t("friends.loading")])
    ]);
    const statusLine = el("p", { className: "form-error", role: "alert" });
    let shownIds = null; // ids of the messages on screen, to redraw only on changes

    /** One message bubble; own messages can be deleted with two taps. */
    function bubble(message) {
      const children = [];
      if (!message.isMine) children.push(el("span", { className: "chat__author" }, [message.nickname]));
      children.push(el("span", { className: "chat__text" }, [message.text]));
      const meta = el("span", { className: "chat__time" }, [messageTime(message.date)]);
      children.push(meta);
      if (message.isMine) {
        children.push(confirmButton(t("friends.deleteMessage"), t("friends.deleteConfirm"), "link-btn chat__delete", function (button) {
          button.disabled = true;
          AppFriends.deleteMessage(groupCode, message.id).then(load).catch(function () {
            button.disabled = false;
            AppUI.showToast(t("friends.connectionFailed"));
          });
        }));
      }
      return el("div", { className: "chat__bubble" + (message.isMine ? " chat__bubble--mine" : "") }, children);
    }

    /** Downloads the last messages and redraws them if something changed. */
    function load() {
      if (!navigator.onLine) { statusLine.textContent = t("friends.offline"); return Promise.resolve(); }
      return AppFriends.fetchMessages(groupCode).then(function (messages) {
        statusLine.textContent = "";
        const ids = messages.map(function (m) { return m.id; }).join(",");
        if (ids === shownIds) return;
        const firstLoad = shownIds === null;
        shownIds = ids;
        // Keep the view at the bottom if the learner was already there.
        const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 80;
        messageList.replaceChildren.apply(messageList, messages.length
          ? messages.map(bubble)
          : [el("p", { className: "muted small chat__empty" }, [t("friends.chatEmpty")])]);
        if (atBottom || firstLoad) window.scrollTo(0, document.body.scrollHeight);
      }).catch(function (error) {
        console.warn("Could not load the chat.", error);
        statusLine.textContent = t("friends.connectionFailed");
      });
    }

    // Writing box: up to 500 characters, sent with the button.
    const input = el("textarea", {
      className: "chat__input", rows: "1", maxlength: String(AppFriends.MAX_MESSAGE_LENGTH),
      placeholder: t("friends.chatPlaceholder"), "aria-label": t("friends.chatPlaceholder")
    });
    const sendButton = el("button", { className: "btn chat__send", type: "submit", "aria-label": t("friends.send") }, [icon("send")]);
    const form = el("form", {
      className: "chat__form",
      onSubmit: function (event) {
        event.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        sendButton.disabled = true;
        AppFriends.sendMessage(groupCode, data.settings.nickname, text).then(function () {
          input.value = "";
          return load();
        }).catch(function (error) {
          console.warn("Could not send.", error);
          statusLine.textContent = t("friends.sendFailed");
        }).then(function () { sendButton.disabled = false; });
      }
    }, [input, sendButton]);

    container.append(
      parts.buildHeader(t("friends.chatTitle"), "module/friends", context),
      el("section", { className: "content chat" }, [
        el("p", { className: "muted small" }, [t("friends.chatNote")]),
        messageList,
        statusLine
      ]),
      form
    );

    load();
    stopChatTimer();
    chatTimer = setInterval(function () { if (!document.hidden) load(); }, CHAT_REFRESH_MS);
  }

  // ===== Router for this module =====

  function route(container, context, subParts) {
    stopChatTimer();
    const friends = context.getData().settings.friends;
    if (friends && friends.groupCode) {
      if (subParts[0] === "chat") chatPage(container, context);
      else tablePage(container, context);
      return;
    }
    const prefilledCode = subParts[0] === "join" ? AppFriends.normalizeCode(subParts[1]) : "";
    setupPage(container, context, prefilledCode);
  }

  window.AppModuleScreens = window.AppModuleScreens || {};
  window.AppModuleScreens.friends = route;

  // Leaving the chat (e.g. with the back arrow) stops its refresh timer.
  window.addEventListener("hashchange", function () {
    if (window.location.hash.indexOf("#/module/friends/chat") !== 0) stopChatTimer();
  });
})();
