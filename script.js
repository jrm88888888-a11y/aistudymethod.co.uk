// ============================================
// AI Study Method — Shared JS
// ============================================

// Mark active nav link based on current page
(function() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && path.endsWith(href)) {
      link.classList.add('active');
    }
    if (path === '/' || path.endsWith('index.html')) {
      if (href === 'index.html') link.classList.add('active');
    }
  });
})();

// Scroll-triggered fade-up animations
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})();

// Inject mobile hamburger toggle + drawer behavior.
// Idempotent — runs once and tolerates pages that don't have nav.
(function() {
  function init() {
    const navInner = document.querySelector('nav .nav-inner');
    const navLinks = document.querySelector('nav .nav-links');
    if (!navInner || !navLinks || navInner.querySelector('.nav-toggle')) return;

    // Hamburger button
    const btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';

    // Insert as the last child of nav-inner (right side)
    navInner.appendChild(btn);

    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

    // Append the "View the Course" CTA into the drawer for mobile reach
    const navRight = navInner.querySelector('.nav-right');
    const primaryCta = navRight && navRight.querySelector('.btn-primary');
    if (primaryCta && !navLinks.querySelector('.nav-drawer-cta')) {
      const drawerCta = document.createElement('a');
      drawerCta.className = 'nav-drawer-cta';
      drawerCta.href = primaryCta.getAttribute('href') || '#';
      drawerCta.textContent = primaryCta.textContent.trim();
      navLinks.appendChild(drawerCta);
    }

    // iOS Safari scroll-lock: `overflow:hidden` on body alone doesn't lock the
    // page (it still scrolls), AND jumps the scroll position on close. Use the
    // `position: fixed` body pattern: snapshot scrollY on open, restore on close.
    let savedScrollY = 0;
    function setOpen(open) {
      navLinks.classList.toggle('mobile-open', open);
      backdrop.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      btn.innerHTML = open
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M6 18L18 6"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
      if (open) {
        savedScrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, savedScrollY);
      }
    }

    btn.addEventListener('click', () => setOpen(!navLinks.classList.contains('mobile-open')));
    backdrop.addEventListener('click', () => setOpen(false));
    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) setOpen(false);
    });
    // Close drawer on resize to desktop
    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
      if (window.innerWidth > 820 && lastWidth <= 820) setOpen(false);
      lastWidth = window.innerWidth;
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
