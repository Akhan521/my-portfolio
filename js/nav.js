// nav.js: renders the fixed navbar into #nav-root; handles scroll shadow + mobile menu.
// Nav/footer HTML is injected at runtime (never written into .html files).
(function () {
  'use strict';

  const NAV_LINKS = [
    { label: 'About',    href: '/#about' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Contact',  href: '/#contact' },
    // Future full pages go here, e.g. { label: 'Hobbies', href: '/pages/hobbies.html' }
  ];

  const root = document.getElementById('nav-root');
  if (!root) return;

  // Assets are referenced relative to the page. Pages in /pages/ need a ../ prefix.
  const BASE = location.pathname.includes('/pages/') ? '../' : '';
  const path = location.pathname;

  // Active state: only full-path links (not #anchors) get highlighted.
  const linksHtml = NAV_LINKS.map(function (link) {
    const isFullPath = link.href.indexOf('#') === -1;
    const current = isFullPath && path === link.href ? ' aria-current="page"' : '';
    return '<a class="nav-link" href="' + link.href + '"' + current + '>' + link.label + '</a>';
  }).join('');

  root.innerHTML =
    '<nav class="site-nav" id="site-nav">' +
      '<div class="nav-inner container">' +
        '<a class="nav-brand" href="/">' +
          '<img class="nav-avatar" src="' + BASE + 'assets/character/avatar.png"' +
               ' alt="Aamir Khan" width="40" height="40">' +
          '<span class="nav-name">Aamir Khan</span>' +
        '</a>' +
        '<button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu"' +
                ' aria-expanded="false" aria-controls="nav-links">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
        '<div class="nav-links" id="nav-links">' +
          linksHtml +
          // Wrapper stays put while the button presses inside it, so the focus ring
          // (anchored to the wrapper) doesn't cancel the tactile press motion.
          '<span class="nav-cta-wrap">' +
            '<a class="nav-cta duo-btn-base duo-btn" href="#contact">Hire Me</a>' +
          '</span>' +
        '</div>' +
      '</div>' +
    '</nav>';

  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  // Mobile menu toggle
  toggle.addEventListener('click', function () {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Collapse the menu after tapping a link (mobile)
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Elevated shadow after scrolling 60px (passive + rAF-throttled).
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
