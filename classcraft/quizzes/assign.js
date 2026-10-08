/* assign.js — "Use this with a class" panel for teachers.

   On a mini-lesson page (loaded by lesson-nav.js, so no per-lesson edits) it
   adds a small "Teachers: assign this" button to the back strip. Course pages
   (teach/<course>.html) and the class-session page (teach/session.html) load
   it too and call AismAssign.openFor(course, topic).

   The teacher ticks what to set: confidence quiz, mini-lesson, games (steps
   that don't exist for the topic are greyed out with the reason). One tick
   links straight to that page; two or more link to teach/session.html with
   &s=<steps>, which shows only those steps, in the order quiz, lesson, games.

   Routes: copy link, Microsoft Teams (Share to Teams, which offers teachers
   "Create an assignment"), Google Classroom (share URL), and a full-screen QR
   code for projecting. Shared links carry
     utm_source=assign&utm_medium=<copy|teams|classroom|qr>&utm_campaign=<quiz|lesson|games|session>
   so visits from assigned links show in Plausible as source "assign".

   Plausible events: "Teacher: panel opened" and "Teacher: assign"
   (props: route, kind, steps). Course data: quizzes/lesson-next/<course>.json,
   built by tools/build-lesson-next.py. Held-back (noindex) lessons get no
   button. If data is missing it does nothing. */
(function () {
  "use strict";
  if (window.AismAssign) return;

  var ME = (document.currentScript && document.currentScript.src) || "";
  var BASE = ME ? ME.replace(/assign\.js.*$/, "") : "/classcraft/quizzes/";
  var SITE = "https://aistudymethod.com";
  var SUF = "-mini-lesson.html";
  var RX = /^(.+?)-(ks3|gcse|a-level|ibdp)-(edexcel-igcse|cambridge-igcse|general|edexcel|eduqas|wjec|ccea|aqa|ocr|hl|sl|ib)-(.+)$/;
  var ORDER = ["quiz", "lesson", "games"];

  function track(name, props) {
    try { if (window.plausible) { if (props) window.plausible(name, { props: props }); else window.plausible(name); } } catch (e) {}
  }
  function esc(t) {
    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function cut(t, n) { t = String(t); return t.length > n ? t.slice(0, n - 1) + "…" : t; }

  /* ---------- course data ---------- */
  var cache = {};
  function loadCourse(group) {
    if (!cache[group]) {
      cache[group] = fetch(BASE + "lesson-next/" + group + ".json")
        .then(function (r) { return r.ok ? r.json() : null; })
        .catch(function () { return null; });
    }
    return cache[group];
  }
  function lessonUrl(group, slug) { return SITE + "/classcraft/adventures/" + group + "-" + slug + SUF; }
  function sessionUrl(group, slug, ids) {
    var u = SITE + "/teach/session.html?c=" + encodeURIComponent(group) + "&t=" + encodeURIComponent(slug);
    return ids && ids.length ? u + "&s=" + ids.join(",") : u;
  }
  function courseUrl(group) { return SITE + "/teach/" + group + ".html"; }
  function rowFor(data, slug) {
    var t = (data && data.t) || [];
    for (var k = 0; k < t.length; k++) if (t[k][0] === slug) return t[k];
    return null;
  }

  /* All three steps for a topic, each with ok = available, or why not. Games
     count only when the arcade has this exact topic. */
  function stepOptions(group, data, slug) {
    var row = rowFor(data, slug);
    if (!row) return [];
    var q = "subject=" + data.s + "&level=" + data.l + "&board=" + data.b + "&topic=" + encodeURIComponent(slug);
    return [
      { id: "quiz", label: "Confidence quiz", lead: "Check what you know", url: SITE + "/classcraft/evaluate/confidence-quiz-v2.html?" + q,
        ok: !!row[3], why: "No quiz for this topic yet" },
      { id: "lesson", label: "Mini-lesson", lead: "Learn it", url: lessonUrl(group, slug), ok: true, why: "" },
      { id: "games", label: "Revision games", lead: "Practise it", url: SITE + "/classcraft/arcade.html?" + q + "&at=top",
        ok: !!(row[2] && data.a), why: data.a ? "No games matched to this topic yet" : "No games for this course yet" }
    ];
  }
  /* The available steps, optionally limited to the ids given, in fixed order. */
  function sessionSteps(group, data, slug, only) {
    return stepOptions(group, data, slug).filter(function (s) {
      return s.ok && (!only || !only.length || only.indexOf(s.id) >= 0);
    });
  }

  /* ---------- share routes ---------- */
  var KIND_TEXT = {
    quiz: { name: "Confidence quiz", instr: "Answer every question and rate how confident you are in each answer." },
    lesson: { name: "Mini-lesson", instr: "Work through the mini-lesson and answer every question as you go." },
    games: { name: "Revision games", instr: "Play the revision games on this topic and try to beat your score." },
    session: { name: "Class session", instr: "Open the link and complete the steps in order. Answer every question as you go." }
  };
  function tagged(url, route, kind) {
    try {
      var u = new URL(url);
      u.searchParams.set("utm_source", "assign");
      u.searchParams.set("utm_medium", route);
      u.searchParams.set("utm_campaign", kind);
      return u.toString();
    } catch (e) { return url; }
  }
  function teamsUrl(link, title, kind) {
    var p = {
      href: link,
      msgText: cut(title, 200),
      assignTitle: cut(title, 50),
      assignInstr: cut(KIND_TEXT[kind].instr, 200),
      preview: "true"
    };
    var qs = Object.keys(p).map(function (k) { return k + "=" + encodeURIComponent(p[k]); }).join("&");
    return "https://teams.microsoft.com/share?" + qs + "&s=" + Date.now();
  }
  function classroomUrl(link) { return "https://classroom.google.com/share?url=" + encodeURIComponent(link); }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (res, rej) {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy") ? res() : rej(); } catch (e) { rej(e); }
      ta.remove();
    });
  }

  var qrLib = null;
  function loadQr() {
    if (window.qrcode) return Promise.resolve(window.qrcode);
    if (!qrLib) {
      qrLib = new Promise(function (res, rej) {
        var s = document.createElement("script");
        s.src = BASE + "vendor/qrcode.min.js";
        s.onload = function () { window.qrcode ? res(window.qrcode) : rej(); };
        s.onerror = rej;
        document.head.appendChild(s);
      });
    }
    return qrLib;
  }

  /* ---------- styles ---------- */
  function injectStyle() {
    if (document.getElementById("aa-style")) return;
    var s = document.createElement("style");
    s.id = "aa-style";
    s.textContent =
      ".aa-back{position:fixed;inset:0;z-index:2000;background:rgba(26,26,46,.55);display:flex;align-items:flex-start;justify-content:center;padding:4vh 12px;overflow:auto}" +
      ".aa-dlg{position:relative;width:100%;max-width:500px;background:#fff;color:#1a1a2e;border-radius:18px;padding:22px 20px 18px;" +
        "box-shadow:0 18px 50px rgba(0,0,0,.28);font:16px/1.45 'DM Sans','Nunito',system-ui,-apple-system,'Segoe UI',sans-serif;text-align:left}" +
      ".aa-dlg h2{margin:0 34px 2px 0;font:700 1.3rem/1.25 'Playfair Display',Georgia,serif;color:#1a1a2e}" +
      ".aa-sub{margin:0 0 14px;color:#5b5b70;font-size:.92rem}" +
      ".aa-x{position:absolute;top:10px;right:10px;width:36px;height:36px;border:none;border-radius:50%;background:#f1f0f6;color:#1a1a2e;font-size:1.3rem;line-height:1;cursor:pointer}" +
      ".aa-h3{margin:0 0 6px;font:700 .72rem/1.3 'DM Mono',ui-monospace,monospace;letter-spacing:1px;text-transform:uppercase;color:#0a6b5e}" +
      ".aa-t{margin:0 0 12px;font-weight:700}" +
      ".aa-picks{display:flex;flex-direction:column;gap:6px;margin:0 0 10px;padding:0;border:none}" +
      ".aa-pick{display:flex;align-items:center;gap:12px;padding:10px 12px;border:1.5px solid #e2e0ec;border-radius:12px;cursor:pointer}" +
      ".aa-pick:hover{border-color:#0a6b5e}" +
      ".aa-pick input{width:20px;height:20px;margin:0;accent-color:#0a6b5e;flex-shrink:0;cursor:pointer}" +
      ".aa-pick b{display:block;font-weight:700;font-size:.97rem}" +
      ".aa-pick small{display:block;color:#5b5b70;font-size:.84rem}" +
      ".aa-pick.off{cursor:not-allowed;background:#f7f7fa;border-style:dashed}.aa-pick.off b{color:#8a8a9c}.aa-pick.off input{cursor:not-allowed}" +
      ".aa-pick:has(input:focus-visible){outline:3px solid #4a3fa0;outline-offset:2px}" +
      ".aa-get{margin:0 0 10px;padding:9px 12px;border-radius:10px;background:#f1f6f5;font-size:.9rem;color:#1a1a2e}" +
      ".aa-get a{color:#4a3fa0;font-weight:600}" +
      ".aa-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}" +
      ".aa-b{display:flex;align-items:center;justify-content:center;gap:6px;min-height:42px;padding:8px 10px;border-radius:10px;border:1.5px solid #1a1a2e;" +
        "background:#fff;color:#1a1a2e;font:600 .92rem/1.2 inherit;font-family:inherit;cursor:pointer;text-decoration:none}" +
      ".aa-b:hover{background:#f4f3fa}.aa-b:focus-visible,.aa-x:focus-visible{outline:3px solid #4a3fa0;outline-offset:2px}" +
      ".aa-b.aa-main{background:#0a6b5e;border-color:#0a6b5e;color:#fff}.aa-b.aa-main:hover{background:#085a4f}" +
      ".aa-b:disabled{opacity:.4;cursor:not-allowed}" +
      ".aa-links{margin:14px 0 0;display:flex;flex-direction:column;gap:6px;font-size:.92rem}" +
      ".aa-links a{color:#0a6b5e;font-weight:600;text-decoration:none}.aa-links a:hover{text-decoration:underline}" +
      ".aa-msg{min-height:1.2em;margin:8px 0 0;font-size:.9rem;font-weight:600;color:#0a6b5e;word-break:break-word}" +
      ".aa-qr{position:fixed;inset:0;z-index:2100;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;" +
        "font-family:'DM Sans','Nunito',system-ui,sans-serif;color:#1a1a2e;text-align:center}" +
      ".aa-qr h2{margin:0 0 4px;font:700 clamp(1.2rem,3.4vw,2.2rem)/1.2 'Playfair Display',Georgia,serif;max-width:90vw}" +
      ".aa-qr p{margin:0 0 12px;font-size:clamp(.95rem,2vw,1.3rem);color:#5b5b70}" +
      ".aa-qr .aa-code{width:min(72vh,86vw);height:min(72vh,86vw)}.aa-qr .aa-code svg{width:100%;height:100%;display:block}" +
      ".aa-qr .aa-x{top:16px;right:16px;width:44px;height:44px}" +
      ".aa-tb{background:none;border:2px solid currentColor;border-radius:14px;padding:6px 12px;font:inherit;cursor:pointer;color:inherit}" +
      ".backstrip.aa-has{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px}" +
      ".backstrip .aa-tb{color:var(--soft,#5b5b70);border:2px solid var(--ink,#2c2840);background:#fff;box-shadow:0 3px 0 var(--ink,#2c2840);font-family:'Fredoka',sans-serif;font-weight:500;font-size:.95rem}" +
      "@media(max-width:420px){.aa-row{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  }

  /* ---------- QR overlay ---------- */
  function showQr(link, title, caption) {
    var ov = document.createElement("div");
    ov.className = "aa-qr";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "QR code for " + title);
    ov.innerHTML = '<button type="button" class="aa-x" aria-label="Close">×</button><h2>' + esc(title) + "</h2><p>" +
      esc(caption) + '</p><div class="aa-code" aria-hidden="true"></div>';
    document.body.appendChild(ov);
    var close = function () { ov.remove(); document.removeEventListener("keydown", onKey, true); };
    var onKey = function (e) { if (e.key === "Escape") { e.stopPropagation(); close(); } };
    document.addEventListener("keydown", onKey, true);
    ov.querySelector(".aa-x").addEventListener("click", close);
    ov.querySelector(".aa-x").focus();
    loadQr().then(function (qrcode) {
      var qr = qrcode(0, "M");
      qr.addData(link);
      qr.make();
      ov.querySelector(".aa-code").innerHTML = qr.createSvgTag({ cellSize: 8, margin: 4, scalable: true });
    }).catch(function () {
      ov.querySelector(".aa-code").outerHTML = '<p style="word-break:break-all;max-width:90vw">' + esc(link) + "</p>";
    });
  }

  /* ---------- panel ---------- */
  /* opts: { group, slug, title, options: stepOptions(...), course:{url,name}|null,
             preselect: [ids] | null } */
  function open(opts) {
    injectStyle();
    var prev = document.activeElement;
    var options = opts.options;
    var pre = opts.preselect && opts.preselect.length ? opts.preselect : null;

    var picks = options.map(function (o) {
      var on = o.ok && (!pre || pre.indexOf(o.id) >= 0);
      return '<label class="aa-pick' + (o.ok ? "" : " off") + '"><input type="checkbox" value="' + o.id + '"' +
        (on ? " checked" : "") + (o.ok ? "" : " disabled") + "><span><b>" + esc(o.label) + "</b><small>" +
        esc(o.ok ? o.lead : o.why) + "</small></span></label>";
    }).join("");

    var html = '<button type="button" class="aa-x" aria-label="Close">×</button>' +
      '<h2 id="aa-h">Use this with a class</h2>' +
      '<p class="aa-sub">Free. No student login. No AI tools needed.</p>' +
      '<p class="aa-t">' + esc(opts.title) + "</p>" +
      '<fieldset class="aa-picks"><legend class="aa-h3">What to set</legend>' + picks + "</fieldset>" +
      '<p class="aa-get" aria-live="polite"></p>' +
      '<div class="aa-row">' +
        '<button type="button" class="aa-b aa-main" data-r="copy">📋 Copy link</button>' +
        '<button type="button" class="aa-b" data-r="teams">Microsoft Teams</button>' +
        '<button type="button" class="aa-b" data-r="classroom">Google Classroom</button>' +
        '<button type="button" class="aa-b" data-r="qr">▦ QR code</button>' +
      "</div>" +
      '<p class="aa-msg" role="status" aria-live="polite"></p><p class="aa-links">';
    if (opts.course) html += '<a href="' + esc(opts.course.url) + '">All ' + esc(opts.course.name) + " lessons, in order →</a>";
    html += '<a href="' + SITE + "/teachers.html?from=" + encodeURIComponent(opts.group + "/" + opts.slug) + '#contact">Teaching with this? Tell us what you need →</a></p>';

    var back = document.createElement("div");
    back.className = "aa-back";
    back.innerHTML = '<div class="aa-dlg" role="dialog" aria-modal="true" aria-labelledby="aa-h">' + html + "</div>";
    document.body.appendChild(back);
    var dlg = back.firstChild, msg = dlg.querySelector(".aa-msg"), get = dlg.querySelector(".aa-get");
    var shareBtns = dlg.querySelectorAll("button[data-r]");

    /* What the current ticks produce: one step -> that page; 2+ -> session. */
    function selection() {
      var ids = [].slice.call(dlg.querySelectorAll(".aa-picks input:checked")).map(function (i) { return i.value; });
      ids.sort(function (a, b) { return ORDER.indexOf(a) - ORDER.indexOf(b); });
      if (!ids.length) return null;
      if (ids.length === 1) {
        var o = options.filter(function (x) { return x.id === ids[0]; })[0];
        return { kind: o.id, ids: ids, url: o.url };
      }
      var all = options.filter(function (x) { return x.ok; }).map(function (x) { return x.id; });
      var subset = ids.length < all.length ? ids : null;   // full set: no &s=, shorter link
      return { kind: "session", ids: ids, url: sessionUrl(opts.group, opts.slug, subset) };
    }
    function refresh() {
      var sel = selection();
      for (var i = 0; i < shareBtns.length; i++) shareBtns[i].disabled = !sel;
      msg.textContent = "";
      if (!sel) { get.textContent = "Tick at least one."; return; }
      if (sel.kind === "session") {
        var names = sel.ids.map(function (id) { return options.filter(function (x) { return x.id === id; })[0].label.toLowerCase(); });
        get.innerHTML = "Students get one page with " + sel.ids.length + " steps: " + esc(names.join(", then ")) +
          '. <a href="' + esc(sel.url) + '" target="_blank" rel="noopener">Preview ↗</a>';
      } else {
        get.innerHTML = "Students go straight to the " + esc(KIND_TEXT[sel.kind].name.toLowerCase()) +
          '. <a href="' + esc(sel.url) + '" target="_blank" rel="noopener">Preview ↗</a>';
      }
    }
    dlg.querySelector(".aa-picks").addEventListener("change", refresh);
    refresh();

    function close() {
      back.remove();
      document.removeEventListener("keydown", onKey, true);
      try { prev && prev.focus && prev.focus(); } catch (e) {}
    }
    function onKey(e) {
      if (e.key === "Escape" && !document.querySelector(".aa-qr")) { e.stopPropagation(); close(); return; }
      if (e.key === "Tab") {   // keep focus inside the dialog
        var f = [].filter.call(dlg.querySelectorAll("button,a[href],input"), function (x) { return !x.disabled; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      e.stopPropagation(); // keep lesson keyboard shortcuts (e.g. M = mute) out of the dialog
    }
    document.addEventListener("keydown", onKey, true);
    back.addEventListener("click", function (e) { if (e.target === back) close(); });
    dlg.querySelector(".aa-x").addEventListener("click", close);

    dlg.querySelector(".aa-row").addEventListener("click", function (e) {
      var b = e.target && e.target.closest ? e.target.closest("button[data-r]") : null;
      if (!b || b.disabled) return;
      var sel = selection();
      if (!sel) return;
      var route = b.getAttribute("data-r");
      var title = KIND_TEXT[sel.kind].name + ": " + opts.title;
      var link = tagged(sel.url, route, sel.kind);
      track("Teacher: assign", { route: route, kind: sel.kind, steps: sel.ids.join("+") });
      if (route === "copy") {
        copyText(link).then(function () { msg.textContent = "Link copied. Paste it wherever you set work."; },
          function () { msg.textContent = "Copy didn't work here. The link is: " + link; });
      } else if (route === "teams") {
        window.open(teamsUrl(link, title, sel.kind), "_blank", "width=700,height=600,noopener");
      } else if (route === "classroom") {
        window.open(classroomUrl(link), "_blank", "width=700,height=600,noopener");
      } else if (route === "qr") {
        showQr(link, opts.title, "Scan to open the " + KIND_TEXT[sel.kind].name.toLowerCase());
      }
    });

    track("Teacher: panel opened");
    dlg.querySelector(".aa-x").focus();
  }

  /* Load the course data and open the panel for one topic. */
  function openFor(group, slug, extra) {
    extra = extra || {};
    return loadCourse(group).then(function (data) {
      var row = rowFor(data, slug);
      if (!row) return;
      open({
        group: group,
        slug: slug,
        title: row[1],
        options: stepOptions(group, data, slug),
        course: extra.noCourseLink ? null : { url: courseUrl(group), name: data.d },
        preselect: extra.preselect || null
      });
    });
  }

  window.AismAssign = {
    open: open,
    openFor: openFor,
    loadCourse: loadCourse,
    stepOptions: stepOptions,
    sessionSteps: sessionSteps,
    lessonUrl: lessonUrl,
    sessionUrl: sessionUrl,
    courseUrl: courseUrl,
    rowFor: rowFor,
    track: track
  };

  /* ---------- auto-inject on mini-lesson pages ---------- */
  function initLesson() {
    var file = decodeURIComponent(location.pathname.split("/").pop() || "");
    if (file.slice(-SUF.length) !== SUF) return;
    var m = RX.exec(file.slice(0, -SUF.length));
    if (!m) return;
    // Held-back lessons (noindex) are not offered to teachers and have no course page.
    var rb = document.querySelector('meta[name="robots"]');
    if (rb && /noindex/i.test(rb.getAttribute("content") || "")) return;
    var group = m[1] + "-" + m[2] + "-" + m[3], slug = m[4];

    injectStyle();
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "aa-tb";
    btn.textContent = "👩‍🏫 Teachers: assign this";
    var strip = document.querySelector(".backstrip");
    if (strip) { strip.classList.add("aa-has"); strip.appendChild(btn); }
    else {
      var app = document.querySelector(".app") || document.body;
      var wrap = document.createElement("div");
      wrap.className = "backstrip aa-has";
      wrap.style.justifyContent = "flex-end";
      wrap.appendChild(btn);
      app.insertBefore(wrap, app.firstChild);
    }
    btn.addEventListener("click", function () { openFor(group, slug); });
  }

  if (document.readyState !== "loading") initLesson();
  else document.addEventListener("DOMContentLoaded", initLesson);
})();
