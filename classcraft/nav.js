/* ============================================
   AI Study Method — nav.js
   Shared navigation + footer, injected via JS.
   Include on every parchment-themed page:
     <script src="nav.js"></script>        (root pages)
     <script src="../nav.js"></script>      (sub-folder pages)
   ============================================ */

(function () {
  'use strict';

  /* ── Detect path depth ── */
  var scripts = document.getElementsByTagName('script');
  var prefix = '';
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].getAttribute('src') || '';
    if (src === '../nav.js' || src.indexOf('../nav.js?') === 0) {
      prefix = '../';
      break;
    }
  }

  function link(path) {
    return prefix ? '../' + path : path;
  }

  /* ── Determine active page ── */
  var loc = window.location.pathname.split('/').pop() || 'index.html';

  function isActive(filename) {
    return loc === filename ? ' class="active"' : '';
  }

  /* ── Nav HTML ── */
  var navHTML = '' +
    '<nav class="site-nav">\n' +
    '  <div class="nav-inner">\n' +
    '    <a href="' + link('index.html') + '" class="nav-logo">Class<span>Craft</span></a>\n' +
    '    <div class="nav-overlay" id="nav-overlay"></div>\n' +
    '    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode"></button>\n' +
    '    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">\n' +
    '      <span></span><span></span><span></span>\n' +
    '    </button>\n' +
    '    <ul class="nav-links" id="nav-links">\n' +
    '      <li><a href="' + link('index.html') + '"' + isActive('index.html') + '>Home</a></li>\n' +
    '\n' +
    '      <li class="nav-dropdown">\n' +
    '        <button class="nav-drop-btn" aria-expanded="false">Revision <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>\n' +
    '        <ul class="nav-drop-menu">\n' +
    '          <li><a href="' + link('games.html') + '"' + isActive('games.html') + '>Games</a></li>\n' +
    '          <li><a href="' + link('vocab-hub/vocab-hub.html') + '"' + isActive('vocab-hub.html') + '>Terms</a></li>\n' +
    '          <li><a href="' + link('vocab-hub/vocab.html') + '"' + isActive('vocab.html') + '>Vocab</a></li>\n' +
    '          <li><a href="' + link('draw-it.html') + '"' + isActive('draw-it.html') + '>Draw It</a></li>\n' +
    '          <li><a href="' + link('roleplay.html') + '"' + isActive('roleplay.html') + '>Roleplay</a></li>\n' +
    '          <li><a href="' + link('books.html') + '"' + isActive('books.html') + '>Books</a></li>\n' +
    '        </ul>\n' +
    '      </li>\n' +
    '\n' +
    '      <li class="nav-dropdown">\n' +
    '        <button class="nav-drop-btn" aria-expanded="false">Explore <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>\n' +
    '        <ul class="nav-drop-menu">\n' +
    '          <li><a href="' + link('simulations.html') + '"' + isActive('simulations.html') + '>Simulations</a></li>\n' +
    '          <li><a href="' + link('homeroom.html') + '"' + isActive('homeroom.html') + '>Homeroom</a></li>\n' +
    '          <li><a href="' + link('nature.html') + '"' + isActive('nature.html') + '>Nature</a></li>\n' +
    '          <li><a href="' + link('jokes.html') + '"' + isActive('jokes.html') + '>Jokes</a></li>\n' +
    '        </ul>\n' +
    '      </li>\n' +
    '\n' +
    '      <li><a href="' + link('about.html') + '"' + isActive('about.html') + '>Contributors</a></li>\n' +
    '      <li><a href="' + link('contact.html') + '"' + isActive('contact.html') + '>Contact</a></li>\n' +
    '    </ul>\n' +
    '  </div>\n' +
    '</nav>';

  /* ── Footer HTML ── */
  var footerHTML = '' +
    '<footer>\n' +
    '  <div class="container">\n' +
    '    <p>&copy; ' + new Date().getFullYear() + ' AI Study Method &nbsp;&middot;&nbsp; aistudymethod.com &nbsp;&middot;&nbsp; Created by <a href="' + link('about.html') + '" style="color:inherit;text-decoration:underline;text-underline-offset:3px;">James Martin</a> &nbsp;&middot;&nbsp; <a href="' + link('privacy.html') + '" style="color:inherit;text-decoration:underline;text-underline-offset:3px;">Privacy</a></p>\n' +
    '  </div>\n' +
    '</footer>';

  /* ── Inject into page ── */
  var navSlot = document.getElementById('nav-slot');
  var footerSlot = document.getElementById('footer-slot');

  if (navSlot) {
    navSlot.outerHTML = navHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }

  if (footerSlot) {
    footerSlot.outerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  /* ── Mobile hamburger menu ── */
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  var overlay = document.getElementById('nav-overlay');

  if (!toggle || !links || !overlay) return; // bail if nav injection failed

  function openMenu() {
    toggle.classList.add('open');
    links.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    toggle.classList.remove('open');
    links.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    toggle.classList.contains('open') ? closeMenu() : openMenu();
  });
  overlay.addEventListener('click', closeMenu);

  var allNavLinks = links.querySelectorAll('a');
  for (var j = 0; j < allNavLinks.length; j++) {
    allNavLinks[j].addEventListener('click', closeMenu);
  }

  /* ── Dropdown behaviour ── */
  var dropdowns = document.querySelectorAll('.nav-dropdown');

  function closeAllDropdowns() {
    for (var k = 0; k < dropdowns.length; k++) {
      dropdowns[k].classList.remove('drop-open');
      dropdowns[k].querySelector('.nav-drop-btn').setAttribute('aria-expanded', 'false');
    }
  }

  for (var d = 0; d < dropdowns.length; d++) {
    (function (dd) {
      var btn = dd.querySelector('.nav-drop-btn');
      var menu = dd.querySelector('.nav-drop-menu');

      // Highlight parent button if a child link is active
      if (menu.querySelector('.active')) {
        btn.classList.add('has-active');
      }

      // Click/tap to toggle
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = dd.classList.contains('drop-open');
        closeAllDropdowns();
        if (!isOpen) {
          dd.classList.add('drop-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    })(dropdowns[d]);
  }

  // Close dropdowns on outside click
  document.addEventListener('click', closeAllDropdowns);

  // Close dropdowns on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAllDropdowns();
      closeMenu();
    }
  });

})();

/* ── Scroll-reveal via IntersectionObserver ── */
(function () {
  'use strict';
  if (typeof IntersectionObserver === 'undefined') {
    // Fallback: just show everything immediately
    var els = document.querySelectorAll('.reveal');
    for (var i = 0; i < els.length; i++) els[i].classList.add('visible');
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('visible');
        observer.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.12 });
  var targets = document.querySelectorAll('.reveal');
  for (var j = 0; j < targets.length; j++) observer.observe(targets[j]);
})();

/* ── Dark mode toggle ── */
(function () {
  'use strict';
  var STORAGE_KEY = 'classcraft-theme';
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    btn.textContent = theme === 'dark' ? '☀' : '☾';   // ☀ / ☾
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Load saved preference (or default to light)
  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  applyTheme(saved === 'dark' ? 'dark' : 'light');

  btn.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
  });
})();
