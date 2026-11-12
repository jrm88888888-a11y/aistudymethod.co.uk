/* sort-drag.js — adds drag-and-drop (mouse + touch) to the "sort into boxes" activities
   in the mini-lessons, on top of the existing tap-then-tap logic. It never changes the
   scoring: a drop simply replays "tap the card, then tap the box".

   Family A: .chips > .chip  +  .bins > .bin           (tap chip, tap bin; no drag before)
   Family B: .sortbox .sort-card(.sort-item) + .sort-bin(.sort-binbtn)
             (already has native HTML5 drag for mouse; this adds touch dragging)      */
(function () {
  'use strict';
  if (window.__aismSortDrag) return;
  window.__aismSortDrag = true;

  var css =
    '.sort-hint{font-size:.92rem;color:var(--soft,#666);margin:0 0 10px}' +
    '.chips .chip{touch-action:none;-webkit-user-select:none;user-select:none;cursor:grab}' +
    '.sortbox .sort-item{touch-action:none;-webkit-user-select:none;user-select:none}' +
    '.sd-ghost{position:fixed;left:0;top:0;z-index:99999;pointer-events:none;margin:0;opacity:.92;' +
    'box-shadow:0 10px 24px rgba(0,0,0,.25);transform-origin:center;will-change:transform}' +
    '.sd-dragging{opacity:.35}' +
    '.sd-over{outline:3px dashed var(--ink,#222);outline-offset:3px}' +
    'body.sd-active,body.sd-active *{cursor:grabbing!important}';

  function addStyle() {
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ---------- hint text for Family A (Family B already has its own .sort-help) ----------
  function addHints() {
    var seen = [];
    document.querySelectorAll('.chips').forEach(function (chips) {
      var box = chips.closest('.activity') || chips.parentElement;
      if (!box || !box.querySelector('.bins') || seen.indexOf(box) > -1) return;
      seen.push(box);
      var scope = chips.closest('section') || box;
      var said = false;
      scope.querySelectorAll('p, .qline, .sort-help, .sort-hint').forEach(function (p) {
        if (/\b(tap|drag|click)\b/i.test(p.textContent)) said = true;
      });
      if (said) return;
      var hint = document.createElement('p');
      hint.className = 'sort-hint';
      hint.textContent = '✋ Drag each card into the right box, or tap a card and then tap the box.';
      var host = chips.parentElement;
      host.insertBefore(hint, chips);
    });
  }

  // ---------- dragging ----------
  var drag = null;          // current drag state
  var suppressUntil = 0;    // swallow the stray click that follows a drag
  var suppressEl = null;

  function familyOf(target) {
    var chip = target.closest('.chip');
    if (chip) {
      var box = chip.closest('.activity') || chip.parentElement && chip.parentElement.parentElement;
      if (chip.closest('.chips') && box && box.querySelector('.bins')) return { fam: 'A', item: chip, box: box };
      return null;
    }
    var card = target.closest('.sortbox .sort-card');
    if (card && !card.classList.contains('ok')) return { fam: 'B', item: card, box: card.closest('.sortbox') };
    return null;
  }

  function binAt(x, y) {
    var el = document.elementFromPoint(x, y);
    if (!el || !drag) return null;
    var bin = drag.fam === 'A' ? el.closest('.bin') : el.closest('.sort-bin');
    if (!bin || !drag.box.contains(bin)) return null;
    return bin;
  }

  function setOver(bin) {
    if (drag.over === bin) return;
    if (drag.over) drag.over.classList.remove('sd-over');
    drag.over = bin;
    if (bin) bin.classList.add('sd-over');
  }

  function startDrag(e) {
    var r = drag.item.getBoundingClientRect();
    var g = drag.item.cloneNode(true);
    g.removeAttribute('id');
    g.classList.add('sd-ghost');
    g.style.width = r.width + 'px';
    g.style.height = r.height + 'px';
    document.body.appendChild(g);
    drag.ghost = g;
    drag.dx = drag.x0 - r.left;
    drag.dy = drag.y0 - r.top;
    drag.on = true;
    drag.item.classList.add('sd-dragging');
    document.body.classList.add('sd-active');
    moveGhost(e.clientX, e.clientY);
  }

  function moveGhost(x, y) {
    drag.ghost.style.transform =
      'translate(' + (x - drag.dx) + 'px,' + (y - drag.dy) + 'px) rotate(-2deg) scale(1.04)';
  }

  function autoScroll(y) {
    var edge = 70, h = window.innerHeight;
    if (y > h - edge) window.scrollBy(0, Math.min(18, (y - (h - edge)) / 3 + 4));
    else if (y < edge) window.scrollBy(0, -Math.min(18, (edge - y) / 3 + 4));
  }

  function selectItem() {
    if (drag.fam === 'A') {
      drag.item.click();                       // chip click always selects (no toggle)
    } else {
      if (!drag.item.classList.contains('sel')) drag.item.querySelector('.sort-item').click();
    }
  }

  function dropOn(bin) {
    if (drag.fam === 'A') {
      (bin.querySelector('.drop') || bin).click();
    } else {
      var btn = bin.querySelector('.sort-binbtn');
      (btn || bin).click();
    }
  }

  function cleanup() {
    if (!drag) return;
    if (drag.ghost) drag.ghost.remove();
    if (drag.over) drag.over.classList.remove('sd-over');
    drag.item.classList.remove('sd-dragging');
    document.body.classList.remove('sd-active');
    try { drag.item.releasePointerCapture(drag.id); } catch (_) {}
    drag = null;
  }

  document.addEventListener('pointerdown', function (e) {
    if (drag || (e.pointerType === 'mouse' && e.button !== 0)) return;
    var f = familyOf(e.target);
    if (!f) return;
    // Family B already supports mouse dragging natively; only add touch / pen there.
    if (f.fam === 'B' && e.pointerType === 'mouse') return;
    if (f.item.disabled) return;
    drag = { fam: f.fam, item: f.item, box: f.box, id: e.pointerId,
             x0: e.clientX, y0: e.clientY, on: false, over: null };
    try { f.item.setPointerCapture(e.pointerId); } catch (_) {}
  }, true);

  document.addEventListener('pointermove', function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.on) {
      if (Math.abs(e.clientX - drag.x0) + Math.abs(e.clientY - drag.y0) < 8) return;
      startDrag(e);
    }
    e.preventDefault();
    moveGhost(e.clientX, e.clientY);
    setOver(binAt(e.clientX, e.clientY));
    autoScroll(e.clientY);
  }, { capture: true, passive: false });

  document.addEventListener('pointerup', function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.on) { cleanup(); return; }       // a plain tap: leave it to the click handler
    var bin = binAt(e.clientX, e.clientY);
    var item = drag.item, d = drag;
    suppressEl = item; suppressUntil = Date.now() + 500;
    if (bin) {
      selectItem();
      dropOn(bin);
    }
    drag = d; cleanup();
  }, true);

  document.addEventListener('pointercancel', function (e) {
    if (drag && e.pointerId === drag.id) cleanup();
  }, true);

  // Swallow the click the browser fires on the dragged card after pointerup.
  document.addEventListener('click', function (e) {
    if (suppressEl && Date.now() < suppressUntil && e.isTrusted && suppressEl.contains(e.target)) {
      e.stopPropagation(); e.preventDefault();
      suppressEl = null;
    }
  }, true);

  // Stop the page scrolling while a touch drag is in progress (iOS ignores touch-action sometimes).
  document.addEventListener('touchmove', function (e) {
    if (drag && drag.on) e.preventDefault();
  }, { passive: false });

  function init() { addStyle(); addHints(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
