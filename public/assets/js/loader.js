(function () {
  "use strict";
  var $ = function (s, c) {
    return (c || document).querySelector(s);
  };
  var $$ = function (s, c) {
    return Array.prototype.slice.call((c || document).querySelectorAll(s));
  };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var loader = $("#loader");
  var strokes = $("#loaderStrokes");
  var hero = $("#hero");
  if (!loader || !strokes || document.documentElement.classList.contains("skip-loader")) {
    return;
  }

  for (var i = 0; i < 13; i++) {
    var s = document.createElement("i");
    if (i === 12) s.className = "thirteen";
    strokes.appendChild(s);
  }

  var items = $$("#loaderStrokes i");
  var pctEl = $("#loaderPct");
  if (!pctEl) {
    pctEl = document.createElement("div");
    pctEl.id = "loaderPct";
    pctEl.className = "loader__pct annot";
    pctEl.setAttribute("aria-hidden", "true");
    loader.appendChild(pctEl);
  }

  loader.setAttribute("role", "progressbar");
  loader.setAttribute("aria-valuemin", "0");
  loader.setAttribute("aria-valuemax", "100");
  loader.setAttribute("aria-label", "Loading");

  var ended = false;
  var finishing = false;
  var started = Date.now();
  var shown = 0;
  var fontReady = 0;
  var winReady = 0;

  function endIntro() {
    if (ended) return;
    ended = true;
    items[12] && items[12].classList.add("go");
    var logo = $("#loaderLogo");
    if (logo) logo.classList.add("in");
    strokes.style.transition = "opacity .45s";
    strokes.style.opacity = ".14";
    loader.classList.add("is-done");
    document.body.classList.remove("is-locked");
    setTimeout(function () {
      loader.hidden = true;
    }, 1100);
    if (hero) hero.classList.add("lit");
  }

  function eagerImgs() {
    return $$("img").filter(function (img) {
      return img.getAttribute("loading") !== "lazy";
    });
  }

  function rawPercent() {
    var imgs = eagerImgs();
    var imgP = 1;
    if (imgs.length) {
      var n = 0;
      imgs.forEach(function (img) {
        if (img.complete) n++;
      });
      imgP = n / imgs.length;
    }
    var ready = document.readyState === "complete" ? 1 : document.readyState === "interactive" ? 0.65 : 0.25;
    return Math.min(1, ready * 0.22 + fontReady * 0.28 + imgP * 0.28 + winReady * 0.22);
  }

  function paint(p) {
    shown = Math.max(shown, p);
    var filled = shown * 13;
    items.forEach(function (el, idx) {
      var h = Math.max(0, Math.min(1, filled - idx));
      el.style.height = h * 100 + "%";
      if (h > 0.08) el.classList.add("on");
    });
    var pct = Math.round(shown * 100);
    loader.setAttribute("aria-valuenow", String(pct));
    if (pctEl) pctEl.textContent = pct + "%";
    if (shown >= 0.55) {
      var logo = $("#loaderLogo");
      if (logo) logo.classList.add("in");
    }
  }

  function tick() {
    if (ended || finishing) return;
    paint(rawPercent());
    var waited = Date.now() - started;
    if (shown >= 1 && waited >= 420) {
      finishing = true;
      setTimeout(endIntro, 280);
      return;
    }
    if (waited > 9000) endIntro();
  }

  if (reduce) {
    loader.hidden = true;
    if (hero) hero.classList.add("lit");
    return;
  }

  document.body.classList.add("is-locked");
  paint(0.08);
  if (document.readyState === "complete") {
    winReady = 1;
    fontReady = 1;
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      fontReady = 1;
      tick();
    });
  } else {
    fontReady = 1;
  }
  eagerImgs().forEach(function (img) {
    if (!img.complete) {
      img.addEventListener("load", tick, { once: true });
      img.addEventListener("error", tick, { once: true });
    }
  });
  document.addEventListener("DOMContentLoaded", tick);
  window.addEventListener("load", function () {
    winReady = 1;
    fontReady = 1;
    tick();
  });
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") endIntro();
  });
  var pulse = setInterval(function () {
    if (ended) {
      clearInterval(pulse);
      return;
    }
    tick();
  }, 80);
  tick();
})();
