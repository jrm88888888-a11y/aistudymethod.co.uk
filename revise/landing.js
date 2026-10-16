/* Revision-guide landing helpers (2026-10-15). Progressive enhancement only:
   the blocks are in the HTML (built by _dev/scripts/landing-2026-10-15/landing.py),
   so the page reads the same without JavaScript.
   1. Quick check: makes the two options under "Quick check" answerable.
   2. Key concepts: the "Show all" button on phones.
   3. Plausible events for the landing blocks (data-lp attributes). */
(function () {
  'use strict';
  function track(name, props) {
    try { if (window.plausible) window.plausible(name, { props: props }); } catch (e) {}
  }
  /* Quick check: the card is in the HTML (built from the page's first common
     mistake); this only makes the two options answerable. */
  function quickCheck() {
    var box = document.querySelector('.lp-qc');
    if (!box) return;
    var row = box.querySelector('.opts'), fb = box.querySelector('.fb');
    var btns = row ? row.querySelectorAll('button') : [];
    Array.prototype.forEach.call(btns, function (b) {
      b.addEventListener('click', function () {
        var ok = b.getAttribute('data-ok') === '1';
        Array.prototype.forEach.call(btns, function (x) {
          x.disabled = true;
          if (x.getAttribute('data-ok') === '1') x.classList.add('ok'); else if (x === b) x.classList.add('no');
        });
        var lead = fb.querySelector('.lead');
        if (lead) lead.textContent = ok ? 'Correct. ' : 'Not quite: that is the tempting wrong answer. ';
        fb.hidden = false;
        track('Quick check', { result: ok ? 'right' : 'wrong' });
      });
    });
  }

  /* Key concepts on phones: the HTML marks items 5+ (lp-more); CSS hides them
     below 720px until "Show all" is tapped. Content stays in the page. */
  function foldConcepts() {
    var btn = document.querySelector('.lp-showall');
    var list = document.querySelector('.rv-concepts.lp-folded');
    if (!btn || !list) return;
    btn.addEventListener('click', function () { list.classList.remove('lp-folded'); btn.remove(); track('Landing click', { block: 'show-all-concepts' }); });
  }

  function wire() {
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest && ev.target.closest('[data-lp]');
      if (a) track('Landing click', { block: a.getAttribute('data-lp') });
    });
  }

  function init() { try { quickCheck(); } catch (e) {} try { foldConcepts(); } catch (e) {} wire(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
