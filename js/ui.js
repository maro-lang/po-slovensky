/*
 * ui.js — Small helpers to build the screens safely.
 *
 * How to use:
 *   AppUI.el("button", { className: "btn", onClick: doSomething }, ["Text"])
 *     -> creates a <button class="btn">Text</button> with a click handler
 *   AppUI.icon("home")        -> returns a small line icon (SVG)
 *   AppUI.showToast("Saved.") -> shows a short message at the bottom
 *
 * Why build elements this way instead of writing HTML strings: text is
 * always inserted as plain text, so a nickname like "<b>" can never break
 * the page or run code.
 *
 * Depends on: nothing.
 */

(function () {
  "use strict";

  // ===== Element builder =====

  /**
   * Creates an element.
   *   tagName  -> "div", "button", ...
   *   props    -> attributes; keys starting with "on" become event handlers
   *               (onClick -> "click"), className sets the class
   *   children -> array of elements or strings (strings become plain text)
   */
  function el(tagName, props, children) {
    const element = document.createElement(tagName);

    Object.entries(props || {}).forEach(function (entry) {
      const name = entry[0];
      const value = entry[1];
      if (value === undefined || value === null || value === false) return;

      if (name === "className") {
        element.className = value;
      } else if (name.startsWith("on") && typeof value === "function") {
        element.addEventListener(name.slice(2).toLowerCase(), value);
      } else if (value === true) {
        element.setAttribute(name, ""); // boolean attribute, e.g. disabled
      } else {
        element.setAttribute(name, String(value));
      }
    });

    (children || []).forEach(function (child) {
      if (child === null || child === undefined) return;
      element.append(typeof child === "string" ? document.createTextNode(child) : child);
    });

    return element;
  }

  // ===== Icons =====

  // Line icons drawn on a 24×24 grid. Each icon is a list of shapes:
  // ["path", d] draws a line path, ["circle", cx, cy, r] draws a circle.
  // Drawn as SVG (not emoji) so they look the same on every phone.
  const ICONS = {
    home: [["path", "M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z"]],
    settings: [
      ["path", "M4 7h9M17 7h3M4 12h3M11 12h9M4 17h11M19 17h1"],
      ["circle", 15, 7, 2], ["circle", 9, 12, 2], ["circle", 17, 17, 2]
    ],
    chevronRight: [["path", "M10 6l6 6-6 6"]],
    back: [["path", "M15 6l-6 6 6 6"]],
    download: [["path", "M12 4v11M7.5 10.5 12 15l4.5-4.5M5 20h14"]],
    upload: [["path", "M12 20V9M7.5 13.5 12 9l4.5 4.5M5 4h14"]],
    clock: [["circle", 12, 12, 8], ["path", "M12 8v4l2.5 2.5"]],
    speaker: [["path", "M4 9.5h3.5L12 6v12l-4.5-3.5H4z"], ["path", "M15.5 9.5a3.5 3.5 0 0 1 0 5M18 7a7 7 0 0 1 0 10"]],
    table: [["path", "M4 5h16v14H4zM4 10h16M4 15h16M10 5v14"]],
    play: [["path", "M8 5.5v13l10-6.5z"]],
    share: [["circle", 6, 12, 2.5], ["circle", 17, 6, 2.5], ["circle", 17, 18, 2.5], ["path", "M8.2 10.8l6.6-3.6M8.2 13.2l6.6 3.6"]],
    copy: [["path", "M9 9h10v11H9zM5 15V4h10"]],
    refresh: [["path", "M19 12a7 7 0 1 1-2.05-4.95M19 4v4h-4"]]
  };

  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

  /** Returns an <svg> element for one of the icons above. */
  function icon(name) {
    const svg = document.createElementNS(SVG_NAMESPACE, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");

    (ICONS[name] || []).forEach(function (shape) {
      const element = document.createElementNS(SVG_NAMESPACE, shape[0]);
      if (shape[0] === "path") {
        element.setAttribute("d", shape[1]);
      } else {
        element.setAttribute("cx", shape[1]);
        element.setAttribute("cy", shape[2]);
        element.setAttribute("r", shape[3]);
      }
      svg.append(element);
    });
    return svg;
  }

  // ===== Toast message =====

  let toastTimer = null;

  /** Shows a short message at the bottom of the screen for 2.5 seconds. */
  function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = el("div", { id: "toast", className: "toast", role: "status" });
      document.body.append(toast);
    }
    toast.textContent = message;
    toast.classList.add("toast--visible");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("toast--visible");
    }, 2500);
  }

  window.AppUI = {
    el: el,
    icon: icon,
    showToast: showToast
  };
})();
