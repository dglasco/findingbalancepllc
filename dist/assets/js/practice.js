/* The seven steps of Effort-less Self-Care, as a guided practice.
   Progressive enhancement: without this file every step is already on the page
   as plain readable HTML. With it, the page becomes one step at a time, with a
   breathing guide, two timers and answers saved to localStorage.
   Nothing here ever leaves the browser. */
(function () {
  "use strict";

  var KEY = "fb_practice_v1";
  var steps = Array.prototype.slice.call(document.querySelectorAll("[data-step]"));
  if (!steps.length) return;

  /* ---------- storage ---------- */
  // Private browsing and blocked site data both make this throw, so every read
  // and write is guarded and the practice still works, just without saving.
  var storageOk = true;
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { storageOk = false; return {}; }
  }
  function save(data) {
    try { localStorage.setItem(KEY, JSON.stringify(data)); }
    catch (e) { storageOk = false; }
  }
  var db = load();

  function today() {
    var d = new Date();
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }
  function dayData() {
    if (!db[today()]) db[today()] = {};
    return db[today()];
  }
  function prettyDate(key) {
    var p = key.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
  }

  /* ---------- step navigation ---------- */
  var current = 0;
  var dots = document.querySelector("[data-practice-dots]");
  var closing = document.querySelector("[data-closing]");

  function answered(i) {
    var day = db[today()] || {};
    return steps[i].querySelectorAll("[data-field]").length > 0 &&
      Array.prototype.some.call(steps[i].querySelectorAll("[data-field]"), function (t) {
        var v = day[t.getAttribute("data-field")];
        return v && v.trim();
      });
  }

  function buildDots() {
    dots.innerHTML = "";
    steps.forEach(function (step, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "practice-dots__dot";
      b.setAttribute("aria-label", "Step " + (i + 1));
      b.addEventListener("click", function () { show(i); });
      dots.appendChild(b);
    });
    dots.hidden = false;
  }

  function paintDots() {
    Array.prototype.forEach.call(dots.children, function (b, i) {
      b.classList.toggle("is-current", i === current);
      b.classList.toggle("is-done", i !== current && answered(i));
      if (i === current) b.setAttribute("aria-current", "step");
      else b.removeAttribute("aria-current");
    });
  }

  function show(i, scroll) {
    current = i;
    steps.forEach(function (step, n) { step.hidden = n !== i; });
    if (closing) closing.hidden = true;
    paintDots();
    if (scroll !== false) {
      steps[i].scrollIntoView({ behavior: "smooth", block: "start" });
      var h = steps[i].querySelector("h2");
      if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    }
  }

  function finish() {
    steps.forEach(function (step) { step.hidden = true; });
    if (closing) {
      closing.hidden = false;
      closing.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    paintDots();
    renderReflections();
  }

  /* ---------- prompts ---------- */
  var savedTimer;
  function flagSaved(step) {
    var hint = step.querySelector("[data-saved]");
    if (!hint) return;
    hint.textContent = storageOk ? "Saved on this device" : "Not saved: this browser is blocking local storage";
    clearTimeout(savedTimer);
    savedTimer = setTimeout(function () { hint.textContent = ""; }, 2200);
  }

  function wirePrompts(step) {
    var day = db[today()] || {};
    step.querySelectorAll("[data-field]").forEach(function (box) {
      var field = box.getAttribute("data-field");
      if (day[field]) box.value = day[field];
      var t;
      box.addEventListener("input", function () {
        clearTimeout(t);
        t = setTimeout(function () {
          var d = dayData();
          if (box.value.trim()) d[field] = box.value;
          else delete d[field];
          save(db);
          flagSaved(step);
          paintDots();
          renderReflections();
        }, 500);
      });
    });
  }

  /* ---------- breathing ---------- */
  function wireBreathing(step) {
    var wrap = step.querySelector("[data-breathe]");
    if (!wrap) return;
    wrap.hidden = false;
    var circle = wrap.querySelector("[data-breathe-circle]");
    var label = wrap.querySelector("[data-breathe-label]");
    var btn = wrap.querySelector('[data-action="breathe"]');
    var running = false;

    btn.addEventListener("click", function () {
      if (running) return;
      running = true;
      btn.disabled = true;
      var round = 0;
      var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      function phase(inhale) {
        if (inhale && round === 3) {
          circle.classList.remove("is-big");
          circle.textContent = "breathe";
          label.textContent = "Three rounds done. Notice what changed, if anything.";
          btn.disabled = false;
          btn.textContent = "Again";
          running = false;
          return;
        }
        if (inhale) round++;
        circle.classList.toggle("is-big", inhale);
        circle.textContent = inhale ? "in" : "out";
        label.textContent = inhale
          ? "I know I am breathing in fresh air."
          : "I know I am breathing out stress.";
        setTimeout(function () { phase(!inhale); }, reduced ? 1200 : 4000);
      }
      phase(true);
    });
  }

  /* ---------- timers ---------- */
  function wireTimer(step) {
    var wrap = step.querySelector("[data-timer]");
    if (!wrap) return;
    wrap.hidden = false;
    var total = parseInt(wrap.getAttribute("data-timer"), 10);
    var num = wrap.querySelector("[data-timer-num]");
    var btn = wrap.querySelector('[data-action="timer"]');
    var ticking = false;

    btn.addEventListener("click", function () {
      if (ticking) return;
      ticking = true;
      btn.disabled = true;
      var left = total;
      num.textContent = left;
      var id = setInterval(function () {
        left--;
        num.textContent = left > 0 ? left : "done";
        if (left <= 0) {
          clearInterval(id);
          ticking = false;
          btn.disabled = false;
          btn.textContent = "Again";
          setTimeout(function () { num.textContent = total; }, 2500);
        }
      }, 1000);
    });
  }

  /* ---------- emotions ---------- */
  function wireEmotions(step) {
    var set = step.querySelector("[data-emotions]");
    if (!set) return;
    set.hidden = false;
    var buttons = Array.prototype.slice.call(set.querySelectorAll("[data-emotion]"));
    var day = db[today()] || {};

    function paint() {
      var chosen = (db[today()] || {}).emotion;
      buttons.forEach(function (b) {
        var on = b.getAttribute("data-emotion") === chosen;
        b.classList.toggle("is-chosen", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        var d = dayData();
        var v = b.getAttribute("data-emotion");
        if (d.emotion === v) delete d.emotion; else d.emotion = v;
        save(db);
        paint();
        flagSaved(step);
        renderReflections();
      });
    });
    if (day.emotion) paint(); else paint();
  }

  /* ---------- reflections ---------- */
  var panel = document.querySelector("[data-reflections]");
  var panelActions = document.querySelector("[data-reflections-actions]");

  function labelFor(field) {
    var box = document.querySelector('[data-field="' + field + '"]');
    if (!box) return field;
    var lab = document.querySelector('label[for="' + box.id + '"]');
    return lab ? lab.textContent : field;
  }

  function dayText(key) {
    var d = db[key] || {};
    var lines = [];
    if (d.emotion) lines.push("How it felt\n" + d.emotion);
    Object.keys(d).forEach(function (f) {
      if (f === "emotion") return;
      lines.push(labelFor(f) + "\n" + d[f]);
    });
    return lines;
  }

  function renderReflections() {
    if (!panel) return;
    var keys = Object.keys(db).filter(function (k) { return dayText(k).length; }).sort().reverse();
    if (!keys.length) {
      panel.innerHTML = '<p class="note">Nothing saved yet. Anything you write above appears here.</p>';
      if (panelActions) panelActions.hidden = true;
      return;
    }
    panel.innerHTML = keys.map(function (k) {
      var items = dayText(k).map(function (line) {
        var parts = line.split("\n");
        return "<div><dt>" + esc(parts[0]) + "</dt><dd>" + esc(parts.slice(1).join("\n")) + "</dd></div>";
      }).join("");
      return '<article class="reflection"><h3>' + esc(prettyDate(k)) + "</h3>" +
        '<dl class="facts">' + items + "</dl></article>";
    }).join("");
    if (panelActions) panelActions.hidden = false;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---------- wire it all up ---------- */
  buildDots();
  steps.forEach(function (step) {
    wirePrompts(step);
    wireBreathing(step);
    wireTimer(step);
    wireEmotions(step);
    var nav = step.querySelector("[data-practice-nav]");
    if (nav) {
      nav.hidden = false;
      var prev = nav.querySelector('[data-action="prev"]');
      var next = nav.querySelector('[data-action="next"]');
      var i = parseInt(step.getAttribute("data-step"), 10);
      if (i === 0 && prev) prev.hidden = true;
      if (prev) prev.addEventListener("click", function () { show(i - 1); });
      if (next) next.addEventListener("click", function () {
        if (i === steps.length - 1) finish(); else show(i + 1);
      });
    }
  });

  var start = document.querySelector("[data-practice-start]");
  if (start) {
    start.hidden = false;
    start.querySelector('[data-action="begin"]').addEventListener("click", function () {
      var first = 0;
      for (var i = 0; i < steps.length; i++) { if (!answered(i)) { first = i; break; } }
      show(first);
    });
  }
  var nojs = document.querySelector("[data-practice-nojs]");
  if (nojs) nojs.remove();

  var restart = document.querySelector('[data-action="restart"]');
  if (restart) restart.addEventListener("click", function () { show(0); });

  var copyBtn = document.querySelector('[data-action="copy"]');
  var copyHint = document.querySelector("[data-copy-hint]");
  if (copyBtn) copyBtn.addEventListener("click", function () {
    var text = prettyDate(today()) + "\n\n" + dayText(today()).join("\n\n");
    navigator.clipboard.writeText(text).then(function () {
      if (copyHint) copyHint.textContent = "Copied to your clipboard.";
    }, function () {
      if (copyHint) copyHint.textContent = "Could not copy. Select the text above instead.";
    });
  });

  var clearBtn = document.querySelector('[data-action="clear"]');
  if (clearBtn) clearBtn.addEventListener("click", function () {
    if (clearBtn.getAttribute("data-armed") !== "yes") {
      clearBtn.setAttribute("data-armed", "yes");
      clearBtn.textContent = "Tap again to delete everything";
      setTimeout(function () {
        clearBtn.removeAttribute("data-armed");
        clearBtn.textContent = "Delete everything saved";
      }, 5000);
      return;
    }
    db = {};
    try { localStorage.removeItem(KEY); } catch (e) {}
    document.querySelectorAll("[data-field]").forEach(function (b) { b.value = ""; });
    document.querySelectorAll("[data-emotion]").forEach(function (b) {
      b.classList.remove("is-chosen");
      b.setAttribute("aria-pressed", "false");
    });
    clearBtn.removeAttribute("data-armed");
    clearBtn.textContent = "Delete everything saved";
    if (copyHint) copyHint.textContent = "Deleted.";
    paintDots();
    renderReflections();
  });

  // Start collapsed to the intro; the steps open when you choose to begin.
  steps.forEach(function (step) { step.hidden = true; });
  renderReflections();
  paintDots();
})();
