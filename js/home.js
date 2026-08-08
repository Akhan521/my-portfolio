// home.js: page JS for index.html. Grows section by section.
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reduced motion: skip the hero staggered entrance/float/pulse, show final state now,
  // and skip all GSAP scroll animations (sections render at their natural final state).
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
    return;
  }

  // Motion path: GSAP scroll animations.
  document.addEventListener('DOMContentLoaded', function () {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // About / Skills: gentle scroll-in reveal as the section enters the viewport.
    // Bio column fades up; category labels and chips stagger in. No XP-bar fills.
    const aboutTrigger = { trigger: '#about', start: 'top 75%' };

    // Timing: "Balanced" (SaaS-marketing standard): 0.55s fades, ~50ms chip stagger, ease-out.
    gsap.from('#about .about-bio > *', {
      scrollTrigger: aboutTrigger,
      y: 18, opacity: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out'
    });
    gsap.from('#about .skill-cat-label', {
      scrollTrigger: aboutTrigger,
      y: 14, opacity: 0, duration: 0.55, stagger: 0.10, ease: 'power2.out'
    });
    gsap.from('#about .skill-chip', {
      scrollTrigger: aboutTrigger,
      y: 12, opacity: 0, duration: 0.55, stagger: 0.05, ease: 'power2.out'
    });
  });
})();
