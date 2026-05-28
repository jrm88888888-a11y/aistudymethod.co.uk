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
