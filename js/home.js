// home.js — page JS for index.html. Grows section by section.
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero: under reduced motion, skip the staggered entrance/float and show the final state now.
  if (reduceMotion) {
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll(
        '#hero .hero-greeting, #hero .hero-role, #hero .hero-subtitle, ' +
        '#hero .hero-bio, #hero .hero-buttons, #hero .hero-badge, ' +
        '#hero .hero-character, #hero .hero-character img, #hero .hero-greeting .wave'
      ).forEach(function (el) {
        el.style.animation = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    });
  }
})();
