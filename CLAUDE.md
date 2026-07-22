# CLAUDE.md — Aamir Khan's Duolingo-Themed Portfolio

Personal portfolio for Aamir Khan, CS Master's student at UC Riverside and aspiring AI
engineer. **Dark-only** Duolingo Night Mode visual design language: blue-navy canvas,
flat geometric SVG character, signature green accents, bouncy spring animations, XP/streak
gamification framing. No light theme, no theme toggle. Currently single-page, architected
to grow into a multi-page site over time.

---

## Owner Information

| Field | Value |
|---|---|
| Name | Aamir Khan |
| Role | Aspiring AI Engineer |
| Subtitle | AI Trainer @ Handshake AI · AI Product Tester @ DeepLearning.AI |
| Tagline | CS Master's student at UC Riverside. Building applied AI and agentic systems; teaching others along the way. |
| GitHub | https://github.com/Akhan521 |
| LinkedIn | https://www.linkedin.com/in/aamir-khan-aak521/ |
| Email | aamirksfg@gmail.com |
| Resume | https://drive.google.com/file/d/1XmkXP_88RvogZ676RelvgUsJtfBq8vhm/view?usp=sharing |

**Resume note:** Opens a Google Drive viewer, not a direct PDF download. If a direct link
becomes available, replace this URL in both the hero Resume button and the footer.

---

## Projects

Five projects power the carousel. Use this data verbatim.

```javascript
const projects = [
  {
    name: "GPT From Scratch",
    category: "Deep Learning",
    description: "Built multi-head self-attention, transformer blocks, and autoregressive decoding entirely from scratch in PyTorch.",
    stack: ["Python", "PyTorch", "Transformers"],
    demoUrl: "https://github.com/Akhan521/GPT-From-Scratch",   // verify before deploy
    githubUrl: "https://github.com/Akhan521/GPT-From-Scratch",
    characterMood: "excited",
    inProgress: false
  },
  {
    name: "Text2SQL LLaMA Analyst",
    category: "LLM Fine-Tuning",
    description: "Fine-tuned LLaMA-2-7B to translate natural language into SQL using LoRA and 4-bit quantization.",
    stack: ["Python", "LLaMA-2", "LoRA", "Quantization"],
    demoUrl: "https://github.com/Akhan521/Text2SQL-LLaMA",     // update with Colab demo link
    githubUrl: "https://github.com/Akhan521/Text2SQL-LLaMA",
    characterMood: "happy",
    inProgress: false
  },
  {
    name: "Snaption",
    category: "Computer Vision + NLP",
    description: "End-to-end image captioning system combining computer vision and NLP, trained on Flickr8k with PyTorch.",
    stack: ["Python", "PyTorch", "CNN", "LSTM"],
    demoUrl: "https://github.com/Akhan521/Snaption",            // update with live demo link
    githubUrl: "https://github.com/Akhan521/Snaption",
    characterMood: "surprised",
    inProgress: false
  },
  {
    name: "bat-code",
    category: "Agentic AI",
    description: "A Batman-themed AI coding TUI powered by agentic AI (deepagents). Currently in active development.",
    stack: ["Python", "Agentic AI", "TUI", "deepagents"],
    demoUrl: null,
    githubUrl: "https://github.com/Akhan521/bat-code",
    characterMood: "surprised",
    inProgress: true
  },
  {
    name: "Pixelate",
    category: "Accessibility + AI",
    description: "Colorblind-friendly pixel-art editor with an AI assistant and real-time accessibility filters.",
    stack: ["Python", "AI Assistant", "Accessibility"],
    demoUrl: "https://github.com/Akhan521/Pixelate",            // update with live demo link
    githubUrl: "https://github.com/Akhan521/Pixelate",
    characterMood: "happy",
    inProgress: false
  }
];
```

**`inProgress: true`:** Category badge renders as `"🚧 In Progress"` with `var(--duo-orange)`
background and `var(--duo-snow)` text. `demoUrl: null` → hide Live Demo button entirely (no
disabled state). GitHub button renders normally.

**`inProgress: false`:** Category badge uses `var(--duo-green-light)` background and
`var(--duo-green)` text (light-island recipe — cards sit on the white laptop screen), label
is the `category` value. Both buttons render normally.

**URL verification:** Repo slugs above are inferred. Confirm each URL before first deploy.

---

## Tech Stack

- **Vanilla HTML / CSS / JavaScript** — no framework, no bundler, no npm
- **GSAP 3.12.5 + ScrollTrigger** — all scroll animations. Load in `<head>` in this order
  (order is required — GSAP must precede ScrollTrigger):
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  ```
- **canvas-confetti 1.9.3** — footer only. Must load before `home.js` so `confetti` is
  defined when the ScrollTrigger callback registers:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  ```
- **Inline SVG** — all character art inlined into HTML for CSS animation access
- **CSS custom properties** — all design tokens in `:root` inside `style.css`. No hex
  values elsewhere except confetti colors in `home.js` (confetti does not accept CSS
  variables — this is the only documented exception). Never reintroduce `#F7F7F7` or
  `#FFFFFF` as page chrome; use `--duo-canvas` / `--duo-surface`. `--duo-snow` is for
  laptop screen face and green-band button fills only.
- **Google Fonts — Nunito only:**
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
  ```

**Deploy target:** Vercel (primary). Also works on GitHub Pages or Netlify unchanged.

---

## File Structure

```
portfolio/
├── CLAUDE.md
├── README.md
├── index.html                 ← entry point; stays at root
├── css/
│   └── style.css              ← all shared styles: tokens, reset, typography, components
├── js/
│   ├── nav.js                 ← renders NAV_LINKS, handles active state
│   ├── footer.js              ← renders footer HTML including copyright span
│   └── home.js                ← all JS for index.html
├── pages/                     ← future pages as standalone .html files
│   └── .gitkeep
├── tasks/                     ← build plan and lessons (not shipped)
│   ├── todo.md
│   └── lessons.md
└── assets/
    ├── og-image.png           ← 1200×630 social preview
    ├── laptop.svg             ← base and lid as separate SVG groups
    ├── reference/
    │   └── owner-photo.jpg    ← study before drawing any SVG (see Character Art section)
    └── character/
        ├── icon.svg           ← head + shoulders, circular clip, 40px navbar avatar
        ├── standing.svg       ← full body, waving, hero + footer
        └── seated.svg         ← waist-up, all four mood face groups
```

**Directory conventions:** all stylesheets live in `css/`, all scripts in `js/`, all static
media in `assets/`. Only `index.html` and the two markdown docs sit at the root. Keep it
that way — do not reintroduce loose `.css` / `.js` files at the root.

**`pages/` path rule:** All shared assets must use `../` prefix (e.g. `../css/style.css`,
`../js/nav.js`). Never absolute paths — Vercel may host in a subdirectory.

---

## Multi-Page Architecture

Nav and footer HTML are injected at runtime by `nav.js` (into `#nav-root`) and `footer.js`
(into `#footer-root`). Never write nav or footer HTML directly into any `.html` file.

### HTML Shell (use for every page)

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

### `nav.js` — Navigation

```javascript
const NAV_LINKS = [
  { label: 'About',    href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact',  href: '/#contact' },
  // Add future pages here, e.g.:
  // { label: 'Hobbies', href: '/pages/hobbies.html' },
];

// Active state rule:
// - Anchor links (/#about, /#projects, /#contact) are NOT highlighted —
//   they all share the same pathname '/' and cannot indicate which section
//   is "active" without a scroll observer. Leave them unstyled.
// - Only full-path links (e.g. /pages/hobbies.html) get aria-current="page"
//   + green underline when window.location.pathname matches their href.
```

### `footer.js` — Footer Template

`footer.js` injects the full footer HTML into `#footer-root`. The copyright span must be
present in that template for the dynamic year JS to target:

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

### New Page Checklist

1. Create `pages/[name].html` from the shell with `../` prefixed on all asset paths
2. Write a specific `<title>` and `<meta name="description">` for the page
3. Add one entry to `NAV_LINKS` in `js/nav.js`
4. Create `js/[name].js` for page-specific JS; replace the `js/home.js` script tag
5. Use same tokens, `.duo-card`, `.duo-btn-base` variants, typography — identical language
6. Test `../` paths with `python3 -m http.server 8080`
7. Test nav active state highlights correctly on the new page

---

## Design System

### Global CSS Reset (top of `style.css`)

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
img, svg { display: block; max-width: 100%; }
```

`box-sizing: border-box` is required — without it, `padding` on cards and `inset` on the
laptop screen overlay will produce broken layouts. `scroll-behavior: smooth` powers the
anchor-scroll on "View Projects" and "Hire Me" without any JS.

### Color Tokens (`:root` in `style.css` — the only place hex values live)

Dark-only, faithful to Duolingo Night Mode neutrals. Accents stay saturated.

```css
:root {
  /* Accents — unchanged from Duo brand */
  --duo-green:        #58CC02;   /* primary brand / CTAs */
  --duo-green-dark:   #58A700;   /* button bottom shadow (Duo night) */
  --duo-green-muted:  #2A4A1A;   /* soft green fill on dark chrome (badges, outline hover, XP track) */
  --duo-green-light:  #D7F5B1;   /* light-island only: badges/pills on white laptop screen */
  --duo-yellow:       #FFD900;   /* XP badges, streak, focus rings */
  --duo-blue:         #1CB0F6;   /* secondary accent */
  --duo-orange:       #FF9600;   /* in-progress badge */
  --duo-red:          #FF4B4B;   /* error states only */

  /* Night Mode neutrals */
  --duo-canvas:       #131F24;   /* page background */
  --duo-surface:      #1F2C34;   /* cards, elevated panels */
  --duo-surface-2:    #37464F;   /* higher elevation, desk, hover fills */
  --duo-border:       #37464F;   /* card borders, nav rule, tactile shadows */
  --duo-text:         #FFFFFF;   /* primary text on dark chrome */
  --duo-text-muted:   #AFAFAF;   /* subtitles, meta, descriptions */
  --duo-snow:         #FFFFFF;   /* laptop screen face + footer button fills only — never page chrome */

  --radius-sm:        8px;
  --radius-md:        12px;
  --radius-lg:        16px;
  --radius-pill:      999px;
}
```

**Retired tokens:** `--duo-white` and `--duo-off-white`. Do not add them back.

**Contrast checklist:** white/`--duo-text` on `--duo-canvas`; muted `#AFAFAF` on canvas;
green buttons with white labels; yellow streak badge uses `--duo-canvas` text (not white).

### Layout Container

All sections wrap content in a `.container` to prevent layout from stretching on wide screens:

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
```

Apply `<div class="container">` inside every section's `<section>` element.
On mobile (< 768px), the `2rem` padding becomes `1rem`.

### Typography

```css
body {
  font-family: 'Nunito', system-ui, sans-serif;
  font-size: 1rem; font-weight: 400; line-height: 1.7;
  color: var(--duo-text); background: var(--duo-canvas);
}
```

| Element | size | weight |
|---|---|---|
| Hero name | `clamp(3rem, 8vw, 6rem)` | 900 |
| Section headings | `clamp(1.8rem, 4vw, 2.8rem)` | 800 |
| Card titles | `1.1rem` | 700 |
| Body / descriptions | `1rem` | 400 |
| Button labels | `0.95rem` | 700 + uppercase + `letter-spacing: 0.05em` |
| Muted / meta | `0.85rem` | 400 |

### Button Components

Use a shared base class to avoid duplicated CSS. Apply both classes to every button element.

```css
/* Base — shared by all three variants */
.duo-btn-base {
  display: inline-block;
  border-radius: var(--radius-md);
  padding: 12px 24px;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.08s ease, box-shadow 0.08s ease;
}
.duo-btn-base:focus-visible { outline: 3px solid var(--duo-yellow); outline-offset: 3px; }
.duo-btn-base:active        { transform: translateY(2px); }

/* Primary CTA — usage: class="duo-btn-base duo-btn" */
.duo-btn {
  background: var(--duo-green); color: var(--duo-snow); border: none;
  box-shadow: 0 4px 0 var(--duo-green-dark);
}
.duo-btn:hover  { transform: translateY(-2px); box-shadow: 0 6px 0 var(--duo-green-dark); }
.duo-btn:active { box-shadow: 0 2px 0 var(--duo-green-dark); }

/* Secondary — usage: class="duo-btn-base duo-btn-outline" */
.duo-btn-outline {
  background: transparent; color: var(--duo-green);
  border: 2px solid var(--duo-green); box-shadow: none;
}
.duo-btn-outline:hover { background: var(--duo-green-muted); }

/* Footer variant — usage: class="duo-btn-base duo-btn-footer" (on green band) */
.duo-btn-footer {
  background: var(--duo-snow); color: var(--duo-green);
  border: 2px solid rgba(255,255,255,0.6);
  box-shadow: 0 4px 0 rgba(0,0,0,0.12);
}
.duo-btn-footer:hover { background: var(--duo-green-light); }
```

### Card Component

Page chrome cards use Night Mode surface — never snow/white as page cards.

```css
.duo-card {
  background: var(--duo-surface);
  border: 2px solid var(--duo-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 0 var(--duo-border);  /* Duolingo tactile depth — never omit */
  padding: 1.5rem;
}
```

---

## Section Specifications

### Section 1 — Navbar

`position: fixed; top: 0; z-index: 100; width: 100%`

- Left: `icon.svg` at 40px + "Aamir Khan" Nunito 700 (`var(--duo-text)`)
- Right: NAV_LINKS rendered by `nav.js` (`var(--duo-text-muted)` default) + `"Hire Me"`
  (`.duo-btn-base.duo-btn`, smooth-scrolls to `#contact` via `href="#contact"` — do NOT
  link to the email address)
- Background: `rgba(19, 31, 36, 0.95)` + `backdrop-filter: blur(8px)`
- `border-bottom: 2px solid var(--duo-border)` always visible
- Add `box-shadow: 0 2px 12px rgba(0,0,0,0.35)` after scrolling 60px (via scroll listener
  in `nav.js` toggling a `.scrolled` class)
- Avatar hover: `transform: scale(1.1)` with `transition: transform 0.15s ease`
- Mobile (< 768px): hamburger collapses links to dropdown; avatar + name always visible
- Future full-path active underline: still `var(--duo-green)`

### Section 2 — Hero

`id="hero"` · `min-height: 100vh` · `padding-top: 80px`

Background:
```css
background-color: var(--duo-canvas);
background-image: radial-gradient(circle, rgba(55, 70, 79, 0.7) 1px, transparent 1px);
background-size: 28px 28px;
```

Layout: `display: flex; align-items: center; gap: 2rem` — 60% text left, 40% character right.

**Left column content (use verbatim):**
- `"Hi, I'm Aamir Khan 👋"` — Nunito 900, hero clamp size, `var(--duo-text)`
- `"Aspiring AI Engineer"` — Nunito 700, 1.4rem, `var(--duo-green)`
- `"AI Trainer @ Handshake AI · AI Product Tester @ DeepLearning.AI"` — `var(--duo-text-muted)`
- `"CS Master's student at UC Riverside. Building applied AI and agentic systems; teaching others along the way."` — body, `var(--duo-text)`
- Buttons: `"View Projects"` (`.duo-btn-base.duo-btn`, `href="#projects"`) + `"Resume"` (`.duo-btn-base.duo-btn-outline`, opens resume URL in new tab)
- XP badge: `"🔥 Streak: 365 days"` — `background: var(--duo-yellow)`, `color: var(--duo-canvas)` (dark text on yellow for contrast — do not use white), Nunito 700, `border-radius: var(--radius-pill)`, `padding: 4px 14px`, `font-size: 0.85rem`

**Right column:** `standing.svg` inlined — no recolor required; `#1A1A1A` outlines remain
visible on the navy canvas.

**Page-load animation (CSS only — not GSAP):**
```css
@keyframes slide-in-right {
  from { transform: translateX(80px); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
@keyframes fade-up {
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
.hero-character { animation: slide-in-right 600ms cubic-bezier(0.22, 1, 0.36, 1) both; }
.hero-greeting  { animation: fade-up 400ms ease-out 200ms both; }
.hero-role      { animation: fade-up 400ms ease-out 350ms both; }
.hero-bio       { animation: fade-up 400ms ease-out 450ms both; }
.hero-buttons   { animation: fade-up 400ms ease-out 550ms both; }
.hero-badge     { animation: fade-up 400ms ease-out 650ms both; }
```
Skip all animations when `prefers-reduced-motion: reduce` is set — show elements in final
state immediately.

### Section 3 — About / Skills

`id="about"` · `background: var(--duo-canvas)` · `padding: 5rem 0`

Canvas page + surface cards (avoids a flat elevated slab for the whole section).

- Eyebrow label: `"SKILL TREE"` — `var(--duo-green)`, `0.8rem`, weight 800, `letter-spacing: 0.15em`
- Heading: `"What I've Learned"` — Nunito 800, `var(--duo-text)`
- Layout: 45% bio left / 55% skill grid right (stacked on mobile)
- Bio text: `var(--duo-text-muted)` (or body `--duo-text` for primary sentences)

**Bio (verbatim):**
> I'm Aamir — a CS Master's student at UC Riverside with a focus on applied AI and agentic systems. I've built transformers from scratch, fine-tuned LLMs, and shipped AI-powered tools. Currently training AI models at Handshake AI and testing AI products at DeepLearning.AI. Open to SWE and AI/ML internships.

**Skills (levels are estimates — adjust if requested):**
```javascript
const skills = [
  { name: "Python",           level: 90, icon: "🐍" },
  { name: "PyTorch",          level: 85, icon: "🔥" },
  { name: "Machine Learning", level: 80, icon: "🧠" },
  { name: "LLMs / NLP",       level: 75, icon: "💬" },
  { name: "Agentic AI",       level: 70, icon: "🤖" },
  { name: "JavaScript",       level: 65, icon: "⚡" },
];
```

Each skill: `.duo-card` with icon + name (Nunito 700, `var(--duo-text)`) + `"[level] XP"`
right-aligned (`var(--duo-text-muted)`) + XP bar (`height: 10px`,
`border-radius: var(--radius-pill)`, track `--duo-green-muted`, fill `--duo-green`).
Add class `skill-card` to each card.

XP bar and card animations — use a single GSAP batch call per section, not a global
index accumulator (which causes excessive delays on later cards):
```javascript
gsap.from('.skill-card', {
  scrollTrigger: { trigger: '#about', start: 'top 75%' },
  y: 28, opacity: 0, duration: 0.55, stagger: 0.07, ease: 'power2.out'
});

// Animate XP bar fills separately on the same trigger
document.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
  gsap.to(bar, {
    scrollTrigger: { trigger: '#about', start: 'top 75%' },
    width: bar.dataset.level + '%',
    duration: 0.8, delay: i * 0.07, ease: 'power2.out'
  });
});
```
Set `width: 0` on `.skill-bar-fill` in CSS as the initial state. Set `data-level="[level]"`
on each `.skill-bar-fill` element so the JS can read the target width.

Skill grid: `display: grid; grid-template-columns: 1fr 1fr; gap: 12px`

### Section 4 — Laptop Scene

`id="projects"` · **Read every line before implementing.**

The section uses two IDs in the HTML for two distinct purposes — this is handled with a
separate invisible anchor element, since an element cannot have two `id` attributes:

```html
<!-- Invisible anchor so /#projects nav link and hero button scroll here correctly -->
<div id="projects" style="position: relative; top: -80px;"></div>

<!-- The actual section — id used by GSAP trigger -->
<section id="laptop-scene">
  ...
</section>
```

The `-80px` top offset on the anchor compensates for the fixed navbar height so the
section heading is not hidden behind it when scrolled to.

**Concept:** Character sits at a desk. Laptop starts flat/closed (green lid visible from
above). Scrolling opens the lid. Scene zooms in. Project carousel appears on screen.

**CSS 3D — implement exactly:**

```css
#laptop-scene   { height: 300vh; background: var(--duo-canvas); }  /* scroll distance — never inline */
.laptop-sticky  { position: sticky; top: 0; height: 100vh; overflow: hidden; background: var(--duo-canvas); }

.laptop-3d-wrapper {
  perspective: 1400px;
  perspective-origin: 50% 20%;  /* viewer looking slightly downward at the desk */
  -webkit-perspective: 1400px;
}

.laptop-lid {
  position: relative;            /* required: .laptop-screen-content is position:absolute inside */
  transform-origin: top center;  /* hinge at back edge of lid */
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  will-change: transform;
  transform: rotateX(0deg);      /* START: flat on desk, green side up */
}                                /* GSAP animates to rotateX(-110deg): open, screen toward viewer */

.laptop-screen-content {
  position: absolute;  /* overlays the screen surface inside the lid */
  inset: 10px;         /* matches the bezel inset */
  opacity: 0;          /* fades in during Phase 2 of the GSAP timeline */
}

.desk-surface {
  background: var(--duo-surface-2);  /* slate desk strip under laptop */
}

.scene-container { will-change: transform; }
```

**Why `rotateX(0deg)` → `rotateX(-110deg)`:**
- `0deg` + `transform-origin: top center` = lid lies flat on desk, green exterior faces up.
- `-110deg` = lid rotated 110° backward, ~20° past vertical. Screen faces the viewer at a
  natural open-laptop angle.
- Do NOT use `rotateX(90deg)` as start — that means the lid is vertical like a wall.

**Mobile override (in `style.css` — no `!important` needed since height is not inline):**
```css
@media (max-width: 767px) {
  #laptop-scene          { height: auto; }
  .laptop-sticky         { position: static; height: auto; }
  .laptop-lid            { transform: rotateX(-110deg); }
  .laptop-screen-content { opacity: 1; }
  .scene-container       { transform: none; }
}
```

**HTML structure:**
```html
<div id="projects" style="position: relative; top: -80px;"></div>
<section id="laptop-scene">
  <div class="laptop-sticky">
    <div class="scene-container">
      <div class="character-seated"><!-- INLINE seated.svg --></div>
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

**GSAP timeline:**
```javascript
gsap.registerPlugin(ScrollTrigger);

const laptopTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#laptop-scene",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.5,
    onUpdate: (self) => {
      updateCharacterMood(self.progress > 0.55 ? 'excited' : 'neutral');
    }
  }
});

laptopTl
  /* Phase 1 — 65% of scroll: rotate lid from flat to open */
  .to(".laptop-lid",            { rotateX: -110, ease: "none",        duration: 0.65 })
  /* Phase 2 — 15% of scroll: screen fades in */
  .to(".laptop-screen-content", { opacity: 1,    ease: "power2.in",   duration: 0.15 })
  /* Phase 3 — 20% of scroll: camera zooms toward screen */
  .to(".scene-container",       { scale: 1.85, y: "-18%", ease: "power2.inOut", duration: 0.2 });
```

**Laptop visual (CSS-drawn — no image files):**
- Base: `#BDBDBD` rounded rect, trackpad, key grid via `repeating-linear-gradient` (physical object — keep)
- Lid exterior: `var(--duo-green)`, `border-radius: 12px 12px 0 0`
- Screen bezel: `#2C2C2C`, inset 10px, `border-radius: 8px`
- Screen surface: `var(--duo-snow)` — bright app window on the dark scene (intentional)
- Camera dot: `#2C2C2C` circle at top-center of bezel
- Glow at 30–70% open: `filter: drop-shadow(0 0 24px rgba(88,204,2,0.5))` on `.laptop-lid`
  (slightly stronger than light-era 0.4 so it reads on navy); toggle via `onUpdate` progress check

### Section 5 — Project Carousel (inside `.laptop-screen-content`)

**Light island:** The laptop screen is the only light surface on the site. Project cards use
a light mini-theme (dark body copy, light badge chrome) so the device reads like a real
app window. Do not restyle in-screen cards with `--duo-text` (white) — that would vanish
on snow. Scope light-island overrides under `.laptop-screen-content` / `.project-card`.

All five project cards are pre-rendered in the DOM. Only one is visible at a time via
CSS class switching. The `.laptop-screen-content` container must be
`position: relative; overflow: hidden` so absolute-positioned cards clip correctly.

**Card CSS — required for transitions to work:**
```css
.project-card {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: translateX(100%);
  transition: transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 380ms ease;
  pointer-events: none;
}
.project-card.active     { transform: translateX(0);     opacity: 1; pointer-events: auto; }
.project-card.exit-left  { transform: translateX(-100%); opacity: 0; pointer-events: none; }
.project-card.exit-right { transform: translateX(100%);  opacity: 0; pointer-events: none; }
.project-card.enter-left { transform: translateX(-100%); opacity: 0; pointer-events: none; }
.project-card.enter-right{ transform: translateX(100%);  opacity: 0; pointer-events: none; }
```

**Card structure:**
```
[CATEGORY BADGE]             ← green-light pill (inProgress=false) or orange "🚧 In Progress" pill
Project Name          h3     ← Nunito 800, 1.1rem, dark text (#3C3C3C or local --island-text)
Description           p      ← body, muted dark (#777777 or local --island-muted)
[Python] [PyTorch]           ← tech stack pills (same pill style as badge; light-island greens)
[View Demo] [GitHub]         ← .duo-btn-base.duo-btn + .duo-btn-base.duo-btn-outline
                             ← omit View Demo entirely when demoUrl is null
```

Define local island tokens on `.laptop-screen-content` (hex still only via CSS variables):
```css
.laptop-screen-content {
  --island-text: #3C3C3C;
  --island-muted: #777777;
  --island-border: #E5E5E5;
  color: var(--island-text);
}
```

**Carousel state machine:**
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

  // Double rAF: ensures enter class is painted before active triggers the transition
  requestAnimationFrame(() => requestAnimationFrame(() => {
    incoming.classList.add('active');
  }));

  updateDots(currentIndex);
  updateCharacterMood(projects[currentIndex].characterMood);
}
```

Navigation: left/right arrow buttons outside the screen bezel (on the dark scene —
`var(--duo-green)` icons/borders, not light-chrome assumptions).
Dots: `var(--duo-green)` active, `var(--duo-border)` inactive.
Keyboard: `ArrowLeft` → `goTo(currentIndex - 1)`, `ArrowRight` → `goTo(currentIndex + 1)`.
Touch swipe — note correct direction mapping:
```javascript
let touchStartX = 0;
carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
carousel.addEventListener('touchend', e => {
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (delta > 50)  goTo(currentIndex + 1);  // swiped left  → next card
  if (delta < -50) goTo(currentIndex - 1);  // swiped right → previous card
});
```

### Section 6 — Character Reaction System

`data-mood` on `#character-face` in `seated.svg` drives CSS visibility switching.
Adding a new mood requires no JS changes — only one SVG group and one CSS rule.

**`seated.svg` internal structure (must match exactly):**
```svg
<g id="character-face" data-mood="neutral">
  <g class="face" data-face="neutral">  </g>
  <g class="face" data-face="happy">    </g>
  <g class="face" data-face="excited">  </g>
  <g class="face" data-face="surprised"></g>
</g>
```

**CSS:**
```css
.face { display: none; }
#character-face[data-mood="neutral"]   .face[data-face="neutral"]   { display: block; }
#character-face[data-mood="happy"]     .face[data-face="happy"]     { display: block; }
#character-face[data-mood="excited"]   .face[data-face="excited"]   { display: block; }
#character-face[data-mood="surprised"] .face[data-face="surprised"] { display: block; }
```

**JS:**
```javascript
function updateCharacterMood(mood) {
  const face = document.getElementById('character-face');
  if (face) face.dataset.mood = mood;
}
```

To add a new mood: (1) add `<g class="face" data-face="[mood]">` to `seated.svg`,
(2) add one CSS rule, (3) use the string in `characterMood` or `updateCharacterMood()`.

Mood faces and jacket fills stay identical on the navy canvas — no SVG recolor required
unless contrast QA fails. Navy increases perceived saturation of jacket blue; that is fine.

### Section 7 — Footer / CTA

`id="contact"` · `background: var(--duo-green)` · `color: var(--duo-snow)`

Keep the full green band — bold Duo CTA punctuation at the bottom of the dark site.

Rendered entirely by `footer.js` into `#footer-root`. Template must include:

- Heading: `"Let's build something."` — Nunito 900, white, 2.5rem
- Subheading: `"Open to SWE and AI/ML internships · Let's talk."` — white, 80% opacity
- Gamification pill: `"🎉 Lesson complete! You've unlocked: Aamir Khan"` — `var(--duo-snow)` bg,
  `var(--duo-green)` text, Nunito 800, `border-radius: var(--radius-pill)`, `padding: 8px 20px`
- Buttons (2×2 grid desktop / stacked mobile, all `.duo-btn-base.duo-btn-footer`):
  - `"📄 Resume"` → resume Google Drive URL, new tab
  - `"💼 LinkedIn"` → `https://www.linkedin.com/in/aamir-khan-aak521/`, new tab
  - `"🐙 GitHub"` → `https://github.com/Akhan521`, new tab
  - `"✉️ Email"` → `mailto:aamirksfg@gmail.com`
- Character: `standing.svg` inlined, bottom-right, `.char-arm-right` wave active
- Copyright: `<p class="footer-copyright">&copy; <span id="copyright-year"></span> Aamir Khan &middot; Built with &hearts; and too much Duolingo</p>` — white, 60% opacity, 0.85rem, centered
- `footer.js` sets `document.getElementById('copyright-year').textContent = new Date().getFullYear()` after injecting the HTML

**Confetti (in `home.js` — fires once when footer enters viewport):**
```javascript
ScrollTrigger.create({
  trigger: "#contact", start: "top 70%", once: true,
  onEnter: () => confetti({
    particleCount: 140, spread: 85, origin: { y: 0.3 },
    colors: ['#58CC02', '#FFD900', '#1CB0F6', '#FFFFFF', '#FF9600']
    // hex required — confetti does not accept CSS variables
  })
});
```

---

## Character Art Specification

**Open `assets/reference/owner-photo.jpg` before drawing anything.** The character is a
Duolingo-style stylized version of Aamir's actual appearance — not a generic avatar.

### Visual Profile

| Feature | Value |
|---|---|
| Skin base | `#C68642` warm medium-brown |
| Skin shadow | `#A0652A` |
| Hair | `#1C1008` very dark brown-black; short, close-cropped; simple rounded cap |
| Beard | `#1C1008` same as hair; full but neatly trimmed — connects to the hairline at the sideburns, wraps the jaw, includes a moustache, leaves the lips clear |
| Face shape | Full and rounded — wider than a typical narrow cartoon face |
| Eye iris | `#3D2000` dark brown |
| Eye sclera | `#FFFFFF` large, expressive |
| Jacket | `#2D5FA6` blue suit jacket with visible lapels |
| Shirt | `#FFFFFF` white, visible at collar |
| Tie | `#2C3440` dark charcoal, narrow — visible in `icon.svg` and `standing.svg` |
| Blush | `#F0A080` at 35% opacity — happy and excited states only |

**Beard is a defining feature — never omit it.** Draw it as one flat shape behind the mouth
so mood swaps only need to change the mouth and eyes, not the beard. It must still read as
a beard at the 40px navbar size, so keep the jaw silhouette bold and avoid thin whiskers.

### Style Rules

- Flat fills only — zero gradients, zero drop shadows on character shapes
- Outlines: `stroke="#1A1A1A"` `stroke-width="2.5"` `stroke-linejoin="round"` on all shapes
- Head ~40% of total body height; body compact; limbs short and thick
- Expressions must be clearly distinct from each other at a glance
- Character fills are designed for the navy Night Mode canvas — do not lighten skin/jacket
  for dark mode; only recolor if a contrast QA failure is found

### SVG Specs

**`icon.svg`** — `viewBox="0 0 80 80"`, circular `<clipPath>`, head + shoulders only, rendered 40px

**`standing.svg`** — `viewBox="0 0 200 320"`, full body, right arm raised in relaxed wave,
default calm-happy expression. Animation hooks: `.char-body`, `.char-arm-right`, `.char-eyes`

**`seated.svg`** — `viewBox="0 0 280 300"`, waist-up, arms resting on desk surface strip at
bottom, eyes directed slightly downward toward laptop. Contains `#character-face` with all
four `[data-face]` groups (see Reaction System section). Do NOT draw the laptop in this SVG.

**`laptop.svg`** — `viewBox="0 0 340 260"`.
`<g id="laptop-base">`: gray keyboard body, trackpad, key grid — bottom ~80px of viewBox.
`<g id="laptop-lid">`: green lid, dark bezel, white screen surface — top ~180px.
Inline these two groups into separate HTML elements. Hinge gap between base and lid should
be visually clear (~2px).

### Idle Animations

```css
@keyframes char-breathe {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-5px); }
}
@keyframes char-blink {
  0%, 88%, 100% { transform: scaleY(1); }
  93%           { transform: scaleY(0.08); }
}
@keyframes char-wave {
  0%, 100% { transform: rotate(0deg); }
  30%      { transform: rotate(22deg); }
  70%      { transform: rotate(-8deg); }
}
.char-body      { animation: char-breathe 3.5s ease-in-out infinite; }
.char-eyes      { transform-origin: center; animation: char-blink 5s ease-in-out infinite; }
.char-arm-right { transform-origin: top center; animation: char-wave 1.4s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .char-body, .char-eyes, .char-arm-right { animation: none; }
}
```

**Blink:** Animate the iris `<ellipse>` with `transform: scaleY()`.
`transform-origin: center center` required — without it the blink collapses to the wrong axis.

---

## Animation System

GSAP ScrollTrigger handles all scroll-driven behavior (including confetti).
CSS `@keyframes` handles character idle loops and hero entrance only.
No `IntersectionObserver`. No raw `scroll` listeners anywhere.

| Use case | Tool | Easing |
|---|---|---|
| Laptop lid rotation | GSAP scrub | `"none"` |
| Scene camera zoom | GSAP scrub | `"power2.inOut"` |
| Skill cards + XP bars | GSAP ScrollTrigger | `"power2.out"` |
| Hero entrance | CSS animation | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Carousel transition | CSS transition | `cubic-bezier(0.34, 1.56, 0.64, 1)` 380ms |
| Button hover/active | CSS transition | `ease` 80ms |
| Confetti | GSAP ScrollTrigger `once` | — |

**Reduced motion — mandatory in both CSS and JS:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
```javascript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Skip GSAP — apply all end states immediately
  document.querySelector('.laptop-lid').style.transform = 'rotateX(-110deg)';
  document.querySelector('.laptop-screen-content').style.opacity = '1';
  document.querySelector('.scene-container').style.transform = 'none';
  document.querySelectorAll('.hero-character, .hero-greeting, .hero-role, .hero-bio, .hero-buttons, .hero-badge')
    .forEach(el => el.style.opacity = '1');
} else {
  // Initialize all GSAP timelines here
}
```

---

## Code Conventions

- Vanilla JS only — no TypeScript, no frameworks, no npm
- Dark-only theme — no light theme, no `prefers-color-scheme` dual palette, no theme toggle
- All hex values in `:root` only, except confetti colors in `home.js` (documented exception)
- Never use `#F7F7F7` / raw `#FFFFFF` as page or card chrome — `--duo-canvas` / `--duo-surface`;
  `--duo-snow` only for laptop screen face and green-band button fills
- Section comments: `<!-- ===== SECTION: HERO ===== -->`
- GSAP timeline comments: what it targets and what it does
- Mobile-first: base for 375px; breakpoints at 768px, 1024px, 1440px
- All interactive elements: `:focus-visible` outline with `var(--duo-yellow)`
- All SVGs: `role="img"` + descriptive `aria-label`
- External links: `target="_blank" rel="noopener noreferrer"`
- Copyright year: always `new Date().getFullYear()` in `footer.js` — never hardcoded

---

## Commands

```bash
python3 -m http.server 8080   # serve locally; open http://localhost:8080
npx serve .                   # alternative
npx vercel                    # deploy; or connect repo to Vercel dashboard
```

---

## Build Order

1. Place `owner-photo.jpg` in `assets/reference/` — study before drawing anything
2. `icon.svg` — establishes skin tone, hair, face shape for all other SVGs
3. `standing.svg` — full body; verify proportions match icon at 200×320 on navy canvas
4. `seated.svg` — waist-up; all four `[data-face]` groups; verify mood swap via console: `updateCharacterMood('happy')`
5. `laptop.svg` — base + lid; verify they separate cleanly into two HTML elements
6. `style.css` — reset + `box-sizing`, `scroll-behavior`, **Night Mode `:root` tokens first**, body on `--duo-canvas`, `.container`, typography, all button variants (outline hover → `--duo-green-muted`), `.duo-card` on `--duo-surface`, `#laptop-scene` height + canvas bg, `.laptop-sticky`, light-island variables on `.laptop-screen-content`, `.project-card` transition CSS, character idle keyframes, mobile laptop override
7. `index.html` skeleton — full shell, all section IDs including the `#projects` anchor div, semantic structure, no JS yet
8. Inline all SVGs; verify sizing and contrast at 375px and 1280px in browser (dark chrome)
9. `nav.js` — NAV_LINKS render + dark scrolled shadow + mobile hamburger
10. `footer.js` — footer HTML template with `#copyright-year` span + dynamic year
11. Hero — layout + CSS page-load animations; streak badge uses `--duo-canvas` text on yellow
12. About / Skills — surface card grid, XP bars with `--duo-green-muted` track, GSAP batch stagger
13. Laptop scene — static HTML + CSS 3D; desk `--duo-surface-2`; verify `rotateX(0deg)` looks correctly flat before adding GSAP
14. GSAP laptop timeline — lid rotation, screen fade, zoom; test `scrub: 0.5` feel
15. Carousel — light-island card chrome, CSS card states, JS state machine, dark-scene arrows/dots, keyboard, touch
16. Character mood wiring — `updateCharacterMood()` from carousel `goTo()` and GSAP `onUpdate`
17. Footer — green band + confetti via ScrollTrigger
18. `og-image.png` — 1200×630px, `--duo-canvas` (`#131F24`) background, Feather Green accents, white "Aamir Khan" Nunito 900, role text below
19. Mobile pass — 375px + 768px; laptop static fallback; carousel touch swipe
20. Accessibility pass — `:focus-visible`, `aria-label` on all SVGs, keyboard carousel nav; verify white-on-canvas, muted-on-canvas, green CTA, yellow streak contrast
21. Reduced motion pass — test with OS reduced motion enabled; verify both CSS and JS paths
22. Performance pass — `will-change` on `.laptop-lid` + `.scene-container` only; all GSAP inside `DOMContentLoaded`; confirm no layout shift on load

---

## Critical Technical Notes

**Dark theme (Night Mode):**
- Site is dark-only — canvas `#131F24`, surfaces `#1F2C34` / `#37464F`, text white / `#AFAFAF`
- Accents stay bright (`#58CC02`, yellow, blue, orange) — do not desaturate for dark mode
- Do not reintroduce `#F7F7F7` or `#FFFFFF` as page chrome; `--duo-snow` is for laptop screen
  face and footer button fills only
- Laptop screen is the sole light island; in-screen cards use `--island-*` dark text tokens
- No theme toggle and no `prefers-color-scheme` dual token sets

**Laptop 3D:**
- `perspective` on `.laptop-3d-wrapper`; `transform-style: preserve-3d` on `.laptop-lid`
- `transform-origin: top center` = hinge at back edge
- Start `rotateX(0deg)` (flat/closed), end `rotateX(-110deg)` (open toward viewer)
- `.laptop-screen-content` is `position: absolute; inset: 10px` inside `.laptop-lid`
  which is `position: relative` — this relationship is required for correct overlay
- Add `-webkit-perspective` and `-webkit-transform-style: preserve-3d` for Safari
- Test in Safari — `preserve-3d` behaves differently from Chrome

**GSAP:**
- Load order: `gsap.min.js` → `ScrollTrigger.min.js` → `canvas-confetti` → `nav.js` → `footer.js` → `home.js`
- `gsap.registerPlugin(ScrollTrigger)` before any ScrollTrigger usage
- All GSAP init inside `DOMContentLoaded`
- `ScrollTrigger.refresh()` after carousel renders its first card

**Sticky scroll:**
- `#laptop-scene` height `300vh` must be in `style.css`, never inline — inline style
  would override the mobile `height: auto` override without needing `!important`
- If `#laptop-scene` is only `100vh`, ScrollTrigger has no room to scrub

**`will-change`:** Only on `.laptop-lid` and `.scene-container` — more causes GPU
pressure and jank on mobile devices
