// home.js — page JS for index.html. Grows section by section.
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero: under reduced motion, skip the staggered entrance/float/pulse and show final state now.
  if (reduceMotion) {
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll(
        '#hero .hero-greeting, #hero .hero-role, #hero .hero-value, ' +
        '#hero .hero-creds, #hero .hero-buttons, #hero .hero-status, ' +
        '#hero .hero-status .status-dot, #hero .hero-portrait, #hero .hero-frame'
      ).forEach(function (el) {
        el.style.animation = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    });
  }
})();
