# CLAUDE.md — Aamir Khan's Duolingo-Themed Portfolio

Personal portfolio for Aamir Khan, CS Master's student at UC Riverside and AI software
engineer. **Dark-only** Duolingo Night Mode visual design language: blue-navy canvas,
AI-generated soft-shaded cartoon character illustrations, signature green accents, bouncy
spring animations, rounded tactile shapes. Clean and professional — keeps Duolingo's DNA
(green, tactile shapes, warmth, the character) but avoids literal game mechanics (no
XP/streak/badge decoration; motion and UI must carry real meaning, not gimmicks). No light
theme, no theme toggle. Currently single-page, architected to grow into a multi-page site
over time. Vanilla HTML/CSS/JS — no framework, no bundler, no npm.

---

## Reference files — where the detail lives

This file holds the essentials that apply across the whole build. Deep detail is offloaded to
these reference docs — **read the relevant one before working in that area:**

| File | Contains |
|---|---|
| `tasks/todo.md` | The commit-by-commit build roadmap + current position. **Start here to resume.** |
| `tasks/duolingo-style.md` | **Character-art bible** — the image-generation pipeline: north-star style, base + per-asset ChatGPT prompts, consistency + transparency rules, raster animation reality. **Read before producing or wiring any character art.** |
| `tasks/build-specs.md` | Full implementation specs: HTML shell, nav/footer templates, component CSS, all section specs (navbar → footer), GSAP timelines, animation system. |
| `tasks/content.md` | Verbatim content data: projects, skills, and all section copy. |
| `tasks/lessons.md` | Correction lessons from this build — review at session start. |

---

## Owner Information

| Field | Value |
|---|---|
| Name | Aamir Khan |
| Role | AI Software Engineer |
| Subtitle | AI Trainer @ Handshake AI · AI Product Tester @ DeepLearning.AI |
| Tagline | CS Master's student at UC Riverside. Building applied AI and agentic systems; teaching others along the way. |
| GitHub | https://github.com/Akhan521 |
| LinkedIn | https://www.linkedin.com/in/aamir-khan-aak521/ |
| Email | aamirksfg@gmail.com |
| Resume | https://drive.google.com/file/d/1XmkXP_88RvogZ676RelvgUsJtfBq8vhm/view?usp=sharing |

**Resume note:** opens a Google Drive viewer, not a direct PDF. If a direct link becomes
available, replace it in both the hero Resume button and the footer.

---

## Tech Stack & load order

- **Vanilla HTML / CSS / JavaScript** — no framework, no bundler, no npm.
- **GSAP 3.12.5 + ScrollTrigger** — all scroll animations.
- **canvas-confetti 1.9.3** — footer only.
- **Raster character art** — soft-shaded cartoon PNGs generated with ChatGPT's image model
  (pipeline in `tasks/duolingo-style.md`), composited into the page and animated as **whole
  images only** (float/entrance + GSAP scroll). The laptop *device* stays CSS/SVG-drawn.
- **Google Fonts — Nunito only** (weights 400;700;800;900).
- **Deploy target:** Vercel (primary); also works unchanged on GitHub Pages / Netlify.

Scripts load in `<head>`/end-of-body in this **required order** (do not reorder — GSAP must
precede ScrollTrigger; confetti must precede `home.js`):
```
gsap.min.js → ScrollTrigger.min.js → confetti.browser.min.js → nav.js → footer.js → home.js
```
Full CDN URLs and the complete HTML shell are in `tasks/build-specs.md`.

---

## File Structure

```
portfolio/
├── CLAUDE.md
├── README.md
├── index.html                 ← entry point; stays at root
├── css/style.css              ← all shared styles: tokens, reset, typography, components
├── js/
│   ├── nav.js                 ← renders NAV_LINKS, handles active state + scroll shadow + mobile menu
│   ├── footer.js              ← renders footer HTML incl. copyright span + dynamic year
│   └── home.js                ← all JS for index.html
├── pages/                     ← future pages as standalone .html files
├── tasks/                     ← build plan, lessons, and reference docs (not shipped)
└── assets/
    ├── og-image.png           ← 1200×630 social preview
    │                              (no laptop.svg — the device is CSS-drawn in style.css, silver MacBook)
    ├── reference/owner-photo.jpg    ← real photo, for likeness reference
    └── character/             ← generated raster art (see tasks/duolingo-style.md)
        ├── src/               ← full-res generation masters
        ├── reference/         ← style-north-star.png (approved style target)
        ├── avatar.png         ← navbar, green circle, head+shoulders
        ├── hero.png           ← hero, transparent bg
        ├── seated-neutral.png ← laptop scene, transparent bg
        └── seated-excited.png ← laptop scene mood crossfade, transparent bg
```

**Conventions:** all stylesheets in `css/`, all scripts in `js/`, all static media in
`assets/`. Only `index.html` and the markdown docs sit at root — do not reintroduce loose
`.css`/`.js` files there. **`pages/` path rule:** shared assets use `../` prefix (e.g.
`../css/style.css`) — never absolute paths (Vercel may host in a subdirectory).

---

## Design System — tokens

Dark-only, faithful to Duolingo Night Mode neutrals; accents stay saturated. **`:root` in
`style.css` is the only place hex values live** (exception: confetti colors in `home.js`).

```css
:root {
  /* Accents — unchanged from Duo brand */
  --duo-green:        #58CC02;   /* primary brand / CTAs */
  --duo-green-dark:   #58A700;   /* button bottom shadow */
  --duo-green-muted:  #2A4A1A;   /* soft green fill on dark chrome (badges, outline hover, XP track) */
  --duo-green-light:  #D7F5B1;   /* light-island only: badges/pills on white laptop screen */
  --duo-yellow:       #FFD900;   /* focus rings, sparing highlight accents */
  --duo-blue:         #1CB0F6;   /* secondary accent + secondary CTA face (hero Resume button) */
  --duo-blue-dark:    #1488C4;   /* blue button bottom shadow (mirrors --duo-green-dark) */
  --duo-orange:       #FF9600;   /* in-progress badge */
  --duo-red:          #FF4B4B;   /* error states only */

  /* Night Mode neutrals */
  --duo-canvas:       #0F181C;   /* page background */
  --duo-surface:      #1B262C;   /* cards, elevated panels */
  --duo-surface-2:    #32414A;   /* higher elevation, desk, hover fills */
  --duo-surface-3:    #3E4E58;   /* raised neutral surface, one step lighter than surface-2 (available ramp step) */
  --duo-border:       #37464F;   /* card borders, nav rule, tactile shadows — one step lighter than surface-2 */
  --duo-text:         #FFFFFF;   /* primary text on dark chrome */
  --duo-text-muted:   #AFAFAF;   /* subtitles, meta, descriptions */
  --duo-snow:         #FFFFFF;   /* laptop screen face + footer button fills ONLY — never page chrome */

  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 16px; --radius-pill: 999px;
}
```

- **Retired tokens** (do not re-add): `--duo-white`, `--duo-off-white`.
- **Retired values** (do not revert): the neutral ramp was deepened one step from Duolingo's
  own `#131F24`/`#1F2C34`/`#37464F` to cut the navy cast; `--duo-border` stays `#37464F`, now
  deliberately one step lighter than `--duo-surface-2` so edges stay legible.
- The navbar background `rgba(15, 24, 28, 0.95)` is `--duo-canvas` at 95% — keep in sync if
  the canvas token ever changes.

Typography scale, button variants (`.duo-btn-base` + `.duo-btn`/`-outline`/`-footer`),
`.duo-card`, `.container`, and the reset all live in full in `tasks/build-specs.md`.

---

## Multi-Page Architecture

Nav and footer HTML are **injected at runtime** — `nav.js` into `#nav-root`, `footer.js` into
`#footer-root`. **Never write nav or footer HTML directly into any `.html` file.** Every page
uses the shared HTML shell, the same tokens/components/typography, and wraps section content
in `<div class="container">`. Shell, `NAV_LINKS`, footer template, and the new-page checklist
are in `tasks/build-specs.md`.

---

## Code Conventions

- Vanilla JS only — no TypeScript, no frameworks, no npm.
- Dark-only — no light theme, no `prefers-color-scheme` dual palette, no theme toggle.
- All hex in `:root` only, except confetti colors in `home.js` (documented exception).
- Never use `#F7F7F7` / raw `#FFFFFF` as page or card chrome — use `--duo-canvas` /
  `--duo-surface`; `--duo-snow` is for the laptop screen face and green-band button fills only.
- Section comments: `<!-- ===== SECTION: HERO ===== -->`. GSAP comments: what it targets + does.
- Mobile-first: base for 375px; breakpoints at 768px, 1024px, 1440px.
- All interactive elements: `:focus-visible` outline with `var(--duo-yellow)`.
- All SVGs: `role="img"` + descriptive `aria-label`. External links: `target="_blank" rel="noopener noreferrer"`.
- Copyright year: always `new Date().getFullYear()` in `footer.js` — never hardcoded.

---

## Critical Technical Notes

- **Dark theme:** canvas `#0F181C`, surfaces `#1B262C`/`#32414A`, text white/`#AFAFAF`. Accents
  stay bright — do not desaturate for dark mode. The laptop screen is the sole light island;
  in-screen cards use `--island-*` dark-text tokens. No theme toggle, no dual palette.
- **Laptop 3D (as built, Commit 11 — differs from the older spec below):** the device is a
  **CSS-drawn silver MacBook** (no `laptop.svg`, no green lid). `perspective` on
  `.laptop-3d-wrapper`; the `.laptop-lid` sits in a pre-tilted `.laptop-lid-pivot`, so **the lid's
  own `rotateX` runs `0deg` (closed, silver + engraved "AK" up) -> `110deg` (open)** — note **+110**,
  not -110. Keep the `translateX(-50%)` in the lid transform. The screen lives on
  `.laptop-screen-face` (a **`rotateX(180)` back face** so content reads upright when open) →
  `.laptop-screen` → `.laptop-screen-content` (carousel target). Add `-webkit-` prefixes and **test
  in Safari** — `preserve-3d` differs from Chrome.
- **Sticky scroll:** `#laptop-scene` height `300vh` must be in `style.css`, never inline
  (inline would override the mobile `height: auto` without needing `!important`). At only
  `100vh` ScrollTrigger has no room to scrub.
- **GSAP:** `gsap.registerPlugin(ScrollTrigger)` before any use; all init inside
  `DOMContentLoaded`; `ScrollTrigger.refresh()` after the carousel renders its first card.
- **`will-change`:** only on `.laptop-lid` and `.scene-container` — more causes GPU pressure
  and jank on mobile.
- **Reduced motion:** mandatory in both CSS and JS (snap all end-states immediately). See
  `tasks/build-specs.md`.

---

## Commands

```bash
python3 -m http.server 8080   # serve locally; open http://localhost:8080
npx serve .                   # alternative
npx vercel                    # deploy; or connect repo to Vercel dashboard
```

---

## Build Order

The authoritative, commit-by-commit sequence and current position live in **`tasks/todo.md`**.
High level: foundation (scaffold + tokens) → character SVGs → shared chrome (nav/footer) →
sections top-to-bottom (hero → about → laptop → carousel → mood → footer) → polish passes
(responsive → a11y → reduced-motion → SEO/OG → performance). To resume, read the "Current
Position" block in `tasks/todo.md` and jump to the first unchecked commit.
