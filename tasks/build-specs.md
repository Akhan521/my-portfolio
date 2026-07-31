# Build Specs — Reference

Detailed, section-by-section implementation specs. `CLAUDE.md` holds the essentials and
points here for depth. Design tokens, conventions, and critical gotchas live in `CLAUDE.md`;
character-art rules live in `tasks/duolingo-style.md`; content data lives in `tasks/content.md`.

---

## HTML Shell (use for every page)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Aamir Khan — Aspiring AI Engineer. CS Master's student at UC Riverside building applied AI and agentic systems.">
  <meta property="og:title" content="Aamir Khan — AI Engineer Portfolio">
  <meta property="og:description" content="CS Master's student at UC Riverside building applied AI and agentic systems.">
  <meta property="og:image" content="assets/og-image.png">
  <meta property="og:type" content="website">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🟢</text></svg>">
  <title>Aamir Khan — AI Engineer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div id="nav-root"></div>
  <main><!-- PAGE CONTENT --></main>
  <div id="footer-root"></div>

  <!-- Load order is required — do not reorder -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  <script src="js/nav.js"></script>
  <script src="js/footer.js"></script>
  <script src="js/home.js"></script><!-- replace with page-specific script on other pages -->
</body>
</html>
```

## `nav.js` — Navigation data + active-state rule

```javascript
const NAV_LINKS = [
  { label: 'About',    href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact',  href: '/#contact' },
  // Add future pages here, e.g.:
  // { label: 'Hobbies', href: '/pages/hobbies.html' },
];
```
Active state: anchor links (`/#about`, etc.) are NOT highlighted — they share pathname `/`
and can't indicate the active section without a scroll observer. Only full-path links (e.g.
`/pages/hobbies.html`) get `aria-current="page"` + green underline when
`window.location.pathname` matches their href.

## `footer.js` — Footer template contract

`footer.js` injects the full footer HTML into `#footer-root`. The copyright span must be in
that template for the dynamic-year JS to target:
```javascript
document.getElementById('footer-root').innerHTML = `
  <footer id="contact">
    <!-- footer content here -->
    <p class="footer-copyright">
      &copy; <span id="copyright-year"></span> Aamir Khan &middot;
      Built with &hearts; and too much Duolingo
    </p>
  </footer>
`;
document.getElementById('copyright-year').textContent = new Date().getFullYear();
```

## New Page Checklist
1. Create `pages/[name].html` from the shell with `../` prefixed on all asset paths
2. Write a specific `<title>` and `<meta name="description">` for the page
3. Add one entry to `NAV_LINKS` in `js/nav.js`
4. Create `js/[name].js` for page-specific JS; replace the `js/home.js` script tag
5. Use same tokens, `.duo-card`, `.duo-btn-base` variants, typography — identical language
6. Test `../` paths with `python3 -m http.server 8080`
7. Test nav active state highlights correctly on the new page

---

## Design System — full CSS

### Global reset (top of `style.css`)
```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
img, svg { display: block; max-width: 100%; }
```
`box-sizing: border-box` is required — without it, card padding and laptop-screen `inset`
break layouts. `scroll-behavior: smooth` powers anchor-scroll without JS.

### Container
```css
.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
@media (max-width: 767px) { .container { padding: 0 1rem; } }
```
Wrap every section's content in `<div class="container">`.

### Typography scale
| Element | size | weight |
|---|---|---|
| Hero name | `clamp(3rem, 8vw, 6rem)` | 900 |
| Section headings | `clamp(1.8rem, 4vw, 2.8rem)` | 800 |
| Card titles | `1.1rem` | 700 |
| Body / descriptions | `1rem` | 400 |
| Button labels | `0.95rem` | 700 + uppercase + `letter-spacing: 0.05em` |
| Muted / meta | `0.85rem` | 400 |

### Buttons (apply both classes: `duo-btn-base` + variant)
```css
.duo-btn-base {
  display: inline-block; border-radius: var(--radius-md); padding: 12px 24px;
  font-family: inherit; font-size: 0.95rem; font-weight: 700; letter-spacing: 0.05em;
  text-transform: uppercase; text-decoration: none; cursor: pointer;
  transition: transform 0.08s ease, box-shadow 0.08s ease;
}
.duo-btn-base:focus-visible { outline: 3px solid var(--duo-yellow); outline-offset: 3px; }
.duo-btn-base:active        { transform: translateY(2px); }

.duo-btn { background: var(--duo-green); color: var(--duo-snow); border: none; box-shadow: 0 4px 0 var(--duo-green-dark); }
.duo-btn:hover  { transform: translateY(-2px); box-shadow: 0 6px 0 var(--duo-green-dark); }
.duo-btn:active { box-shadow: 0 2px 0 var(--duo-green-dark); }

.duo-btn-outline { background: transparent; color: var(--duo-green); border: 2px solid var(--duo-green); box-shadow: none; }
.duo-btn-outline:hover { background: var(--duo-green-muted); }

.duo-btn-footer { background: var(--duo-snow); color: var(--duo-green); border: 2px solid rgba(255,255,255,0.6); box-shadow: 0 4px 0 rgba(0,0,0,0.12); }
.duo-btn-footer:hover { background: var(--duo-green-light); }
```

### Card
```css
.duo-card {
  background: var(--duo-surface); border: 2px solid var(--duo-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 0 var(--duo-border);  /* Duolingo tactile depth — never omit */
  padding: 1.5rem;
}
```

---

## Section 1 — Navbar
`position: fixed; top: 0; z-index: 100; width: 100%`
- Left: `icon.svg` at 40px + "Aamir Khan" Nunito 700 (`var(--duo-text)`)
- Right: NAV_LINKS (`var(--duo-text-muted)` default) + `"Hire Me"` (`.duo-btn-base.duo-btn`,
  smooth-scrolls to `#contact` via `href="#contact"` — do NOT link to the email)
- Background: `rgba(15, 24, 28, 0.95)` + `backdrop-filter: blur(8px)` (this is `--duo-canvas`
  at 95% — keep in sync if the canvas token changes)
- `border-bottom: 2px solid var(--duo-border)` always visible
- Add `box-shadow: 0 2px 12px rgba(0,0,0,0.35)` after scrolling 60px (scroll listener in
  `nav.js` toggling a `.scrolled` class)
- Avatar hover: `transform: scale(1.1)` with `transition: transform 0.15s ease`
- Mobile (< 768px): hamburger collapses links to dropdown; avatar + name always visible

## Section 2 — Hero
`id="hero"` · `min-height: 100vh` · `padding-top: 80px`
```css
background-color: var(--duo-canvas);
background-image: radial-gradient(circle, rgba(55, 70, 79, 0.7) 1px, transparent 1px);
background-size: 28px 28px;
```
Layout: `display: flex; align-items: center; gap: 2rem` — 60% text left, 40% character right.
Copy: see `tasks/content.md` (hero). Streak badge: `background: var(--duo-yellow)`,
`color: var(--duo-canvas)` (dark text on yellow — not white), Nunito 700,
`border-radius: var(--radius-pill)`, `padding: 4px 14px`, `font-size: 0.85rem`.
Right column: `hero.png` (transparent-bg raster) — apply the `.hero-character` entrance
animation and an optional gentle idle float (whole-image transform only; no per-part motion).

Page-load animation (CSS only — not GSAP):
```css
@keyframes slide-in-right { from { transform: translateX(80px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes fade-up        { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.hero-character { animation: slide-in-right 600ms cubic-bezier(0.22, 1, 0.36, 1) both; }
.hero-greeting  { animation: fade-up 400ms ease-out 200ms both; }
.hero-role      { animation: fade-up 400ms ease-out 350ms both; }
.hero-bio       { animation: fade-up 400ms ease-out 450ms both; }
.hero-buttons   { animation: fade-up 400ms ease-out 550ms both; }
.hero-badge     { animation: fade-up 400ms ease-out 650ms both; }
```
Skip all animations under `prefers-reduced-motion: reduce` — final state immediately.

## Section 3 — About / Skills
`id="about"` · `background: var(--duo-canvas)` · `padding: 5rem 0`
Canvas page + surface cards. Eyebrow `"SKILL TREE"` (`var(--duo-green)`, `0.8rem`, weight 800,
`letter-spacing: 0.15em`); heading `"What I've Learned"`. Layout 45% bio left / 55% skill grid
right (stacked on mobile). Copy + skills data: `tasks/content.md`.

Each skill: `.duo-card.skill-card` with icon + name (Nunito 700) + `"[level] XP"` right-aligned
(`var(--duo-text-muted)`) + XP bar (`height: 10px`, `border-radius: var(--radius-pill)`, track
`--duo-green-muted`, fill `--duo-green`). Set `width: 0` on `.skill-bar-fill` in CSS;
`data-level="[level]"` on each fill.

```javascript
gsap.from('.skill-card', {
  scrollTrigger: { trigger: '#about', start: 'top 75%' },
  y: 28, opacity: 0, duration: 0.55, stagger: 0.07, ease: 'power2.out'
});
document.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
  gsap.to(bar, {
    scrollTrigger: { trigger: '#about', start: 'top 75%' },
    width: bar.dataset.level + '%', duration: 0.8, delay: i * 0.07, ease: 'power2.out'
  });
});
```
Skill grid: `display: grid; grid-template-columns: 1fr 1fr; gap: 12px`.

## Section 4 — Laptop Scene
`id="projects"` · **Read every line before implementing.**

Two IDs, two purposes — use a separate invisible anchor (an element can't have two `id`s):
```html
<div id="projects" style="position: relative; top: -80px;"></div>  <!-- nav/hero scroll anchor -->
<section id="laptop-scene"> ... </section>                         <!-- id used by GSAP trigger -->
```
`-80px` offset compensates for the fixed navbar so the heading isn't hidden.

Concept: character sits at a desk; laptop starts flat/closed (green lid up); scrolling opens
the lid; scene zooms in; project carousel appears on screen.

```css
#laptop-scene   { height: 300vh; background: var(--duo-canvas); }  /* scroll distance — never inline */
.laptop-sticky  { position: sticky; top: 0; height: 100vh; overflow: hidden; background: var(--duo-canvas); }
.laptop-3d-wrapper { perspective: 1400px; perspective-origin: 50% 20%; -webkit-perspective: 1400px; }
.laptop-lid {
  position: relative; transform-origin: top center;         /* hinge at back edge */
  transform-style: preserve-3d; -webkit-transform-style: preserve-3d;
  will-change: transform; transform: rotateX(0deg);          /* START: flat, green side up */
}                                                            /* GSAP → rotateX(-110deg): open */
.laptop-screen-content { position: absolute; inset: 10px; opacity: 0; }  /* fades in Phase 2 */
.desk-surface { background: var(--duo-surface-2); }
.scene-container { will-change: transform; }
```
`rotateX(0deg)` + `transform-origin: top center` = lid flat on desk, green up. `-110deg` =
open, screen toward viewer (~20° past vertical). Do NOT start at `rotateX(90deg)` (wall-like).

Mobile override (no `!important` since height isn't inline):
```css
@media (max-width: 767px) {
  #laptop-scene          { height: auto; }
  .laptop-sticky         { position: static; height: auto; }
  .laptop-lid            { transform: rotateX(-110deg); }
  .laptop-screen-content { opacity: 1; }
  .scene-container       { transform: none; }
}
```
HTML structure:
```html
<div id="projects" style="position: relative; top: -80px;"></div>
<section id="laptop-scene">
  <div class="laptop-sticky">
    <div class="scene-container">
      <div class="character-seated"><!-- seated-neutral.png + seated-excited.png stacked (see Section 6) --></div>
      <div class="desk-surface"></div>
      <div class="laptop-3d-wrapper">
        <div class="laptop-base"><!-- INLINE #laptop-base SVG group --></div>
        <div class="laptop-lid">
          <div class="laptop-screen-face"><!-- bezel + screen surface --></div>
          <div class="laptop-screen-content"><!-- carousel renders here --></div>
        </div>
      </div>
    </div>
  </div>
</section>
```
GSAP timeline:
```javascript
gsap.registerPlugin(ScrollTrigger);
const laptopTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#laptop-scene", start: "top top", end: "bottom bottom", scrub: 0.5,
    onUpdate: (self) => { updateCharacterMood(self.progress > 0.55 ? 'excited' : 'neutral'); }
  }
});
laptopTl
  .to(".laptop-lid",            { rotateX: -110, ease: "none",       duration: 0.65 }) /* Phase 1 — 65% */
  .to(".laptop-screen-content", { opacity: 1,    ease: "power2.in",  duration: 0.15 }) /* Phase 2 — 15% */
  .to(".scene-container",       { scale: 1.85, y: "-18%", ease: "power2.inOut", duration: 0.2 }); /* Phase 3 — 20% */
```
Laptop visual (CSS-drawn, no image files): base `#BDBDBD` rounded rect + trackpad + key grid
via `repeating-linear-gradient`; lid exterior `var(--duo-green)`, `border-radius: 12px 12px 0 0`;
screen bezel `#2C2C2C` inset 10px `border-radius: 8px`; screen surface `var(--duo-snow)`; camera
dot `#2C2C2C` at top-center; glow at 30–70% open:
`filter: drop-shadow(0 0 24px rgba(88,204,2,0.5))` on `.laptop-lid`, toggled via `onUpdate`.

## Section 5 — Project Carousel (inside `.laptop-screen-content`)
**Light island:** the laptop screen is the only light surface. Cards use a light mini-theme
(dark body copy, light badge chrome). Scope overrides under `.laptop-screen-content` /
`.project-card`. Container must be `position: relative; overflow: hidden`.

All five cards pre-rendered; one visible at a time via class switching.
```css
.project-card {
  position: absolute; inset: 0; opacity: 0; transform: translateX(100%);
  transition: transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 380ms ease;
  pointer-events: none;
}
.project-card.active     { transform: translateX(0);     opacity: 1; pointer-events: auto; }
.project-card.exit-left  { transform: translateX(-100%); opacity: 0; pointer-events: none; }
.project-card.exit-right { transform: translateX(100%);  opacity: 0; pointer-events: none; }
.project-card.enter-left { transform: translateX(-100%); opacity: 0; pointer-events: none; }
.project-card.enter-right{ transform: translateX(100%);  opacity: 0; pointer-events: none; }
.laptop-screen-content { --island-text: #3C3C3C; --island-muted: #777777; --island-border: #E5E5E5; color: var(--island-text); }
```
Card layout: [category badge] → name (`h3`, Nunito 800, 1.1rem, `--island-text`) → description
(`p`, `--island-muted`) → stack pills → [View Demo] [GitHub] (`.duo-btn-base.duo-btn` +
`.duo-btn-outline`; omit View Demo when `demoUrl` is null). Badge recipes: see `tasks/content.md`.

State machine:
```javascript
let currentIndex = 0;
function goTo(newIndex) {
  const total = projects.length;
  const cards = document.querySelectorAll('.project-card');
  const direction = newIndex > currentIndex ? 'left' : 'right';
  const outgoing = cards[currentIndex];
  outgoing.classList.remove('active');
  outgoing.classList.add(`exit-${direction}`);
  outgoing.addEventListener('transitionend', () => {
    outgoing.classList.remove('exit-left', 'exit-right');
  }, { once: true });
  currentIndex = ((newIndex % total) + total) % total;
  const incoming = cards[currentIndex];
  incoming.classList.remove('active', 'exit-left', 'exit-right', 'enter-left', 'enter-right');
  incoming.classList.add(`enter-${direction === 'left' ? 'right' : 'left'}`);
  requestAnimationFrame(() => requestAnimationFrame(() => { incoming.classList.add('active'); }));
  updateDots(currentIndex);
  updateCharacterMood(projects[currentIndex].characterMood);
}
```
Navigation: left/right arrow buttons outside the bezel (dark scene — `var(--duo-green)` icons/
borders). Dots: `var(--duo-green)` active, `var(--duo-border)` inactive. Keyboard: `ArrowLeft`
→ `goTo(currentIndex - 1)`, `ArrowRight` → `goTo(currentIndex + 1)`. Touch swipe:
```javascript
let touchStartX = 0;
carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
carousel.addEventListener('touchend', e => {
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (delta > 50)  goTo(currentIndex + 1);  // swiped left  → next
  if (delta < -50) goTo(currentIndex - 1);  // swiped right → previous
});
```

## Section 6 — Character Reaction System (raster crossfade)
Raster art can't swap face groups, so mood is a **two-image opacity crossfade**. Stack
`seated-neutral.png` and `seated-excited.png` in the same box; both are transparent-bg PNGs
generated to align pixel-for-pixel (see `tasks/duolingo-style.md` §4–5). Only ONE mood beat
exists — neutral ↔ excited, tied to the laptop opening — not per-project moods.
```html
<div class="character-seated">
  <img class="mood mood-neutral" src="assets/character/seated-neutral.png" alt="Aamir at his laptop" aria-hidden="false">
  <img class="mood mood-excited" src="assets/character/seated-excited.png" alt="" aria-hidden="true">
</div>
```
```css
.character-seated { position: relative; }
.character-seated .mood { position: absolute; inset: 0; transition: opacity 300ms ease; }
.character-seated .mood-excited { opacity: 0; }               /* hidden until triggered */
.character-seated.excited .mood-neutral { opacity: 0; }
.character-seated.excited .mood-excited { opacity: 1; }
```
```javascript
// Called from the laptop GSAP onUpdate (excited past ~55% scroll)
function updateCharacterMood(mood) {
  const el = document.querySelector('.character-seated');
  if (el) el.classList.toggle('excited', mood === 'excited');
}
```
Fallback: if two aligned generations prove too hard, ship one static `seated.png` and drop
`updateCharacterMood`.

## Section 7 — Footer / CTA
`id="contact"` · `background: var(--duo-green)` · `color: var(--duo-snow)`. Full green band.
Rendered entirely by `footer.js` into `#footer-root`. Copy + buttons: see `tasks/content.md`.
Layout: heading Nunito 900 white 2.5rem; subheading white 80% opacity; gamification pill
(`var(--duo-snow)` bg, `var(--duo-green)` text, Nunito 800, pill radius, `padding: 8px 20px`);
buttons 2×2 grid desktop / stacked mobile, all `.duo-btn-base.duo-btn-footer`; `hero.png`
(or a dedicated footer image) bottom-right, static or gentle float (no wave — raster art);
copyright white 60% opacity 0.85rem centered.

Confetti (in `home.js` — once when footer enters viewport):
```javascript
ScrollTrigger.create({
  trigger: "#contact", start: "top 70%", once: true,
  onEnter: () => confetti({
    particleCount: 140, spread: 85, origin: { y: 0.3 },
    colors: ['#58CC02', '#FFD900', '#1CB0F6', '#FFFFFF', '#FF9600']  // hex required — confetti won't take CSS vars
  })
});
```

---

## Animation System
GSAP ScrollTrigger handles all scroll-driven behavior (incl. confetti). CSS `@keyframes`
handles character idle loops + hero entrance only. No `IntersectionObserver`. No raw `scroll`
listeners anywhere (except the nav `.scrolled` toggle).

| Use case | Tool | Easing |
|---|---|---|
| Laptop lid rotation | GSAP scrub | `"none"` |
| Scene camera zoom | GSAP scrub | `"power2.inOut"` |
| Skill cards + XP bars | GSAP ScrollTrigger | `"power2.out"` |
| Hero entrance | CSS animation | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Carousel transition | CSS transition | `cubic-bezier(0.34, 1.56, 0.64, 1)` 380ms |
| Button hover/active | CSS transition | `ease` 80ms |
| Confetti | GSAP ScrollTrigger `once` | — |

Reduced motion — mandatory in both CSS and JS:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```
```javascript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelector('.laptop-lid').style.transform = 'rotateX(-110deg)';
  document.querySelector('.laptop-screen-content').style.opacity = '1';
  document.querySelector('.scene-container').style.transform = 'none';
  document.querySelectorAll('.hero-character, .hero-greeting, .hero-role, .hero-bio, .hero-buttons, .hero-badge')
    .forEach(el => el.style.opacity = '1');
} else {
  // Initialize all GSAP timelines here
}
```
