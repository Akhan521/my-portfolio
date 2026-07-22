# Portfolio Build — Commit Plan & Progress Tracker

A commit-by-commit roadmap for building Aamir Khan's Duolingo Night Mode portfolio.
The single source of truth is **`CLAUDE.md`** — every commit below implements a slice of
its spec. This file only sequences that work into digestible, resumable commits.

---

## How To Use This File

- **One session = one or more commits.** Do them in order; each is self-contained.
- **To resume after a break:** read the **Current Position** line below, then jump to the
  first unchecked commit. Everything above it is done and on `main`.
- **Definition of done for a commit:** its checklist items are all checked, the acceptance
  check passes in the browser (`python3 -m http.server 8080`), and it's committed with the
  suggested message.
- **Mark progress** by checking boxes and updating the Current Position line as you go.
- **If something feels wrong, stop and re-plan** rather than pushing through (per workflow rules).

---

## Current Position

> **Next up:** Commit 3 — icon.svg (navbar avatar)
> **Last completed:** Commit 2 — Design system in css/style.css

Update this block after every commit so a cold start knows exactly where to pick up.

---

## Prerequisites (one-time, before Commit 3)

- [x] Place `owner-photo.jpg` into `assets/reference/` — **required** before drawing any SVG.
      The character is a stylized version of Aamir's real appearance, not a generic avatar.
      Source photo: `C:\Users\aamir\OneDrive\Pictures\Screenshots\aamir-prof-small.png`
      (it's a PNG — convert to a real `.jpg`, don't just rename). This is created in Commit 1.
- [ ] Confirm the five project repo URLs in `CLAUDE.md` resolve (they are inferred slugs).

---

## Design Principle For This Build

Build **outside-in and foundation-first** so the site is viewable and correct as early as
possible, and each commit changes as little as possible:

1. Foundation (structure + design tokens) so everything after has a home and a palette.
2. Character art (SVGs) so later section commits can just inline finished assets.
3. Shared chrome (nav + footer) so every future page renders complete.
4. Sections top-to-bottom (hero → about → laptop → carousel → footer), each carrying its
   own slice of `js/home.js`. The page grows section by section, always in a working state.
5. Polish passes (responsive, a11y, reduced-motion, SEO, performance) last — each a focused,
   reviewable commit rather than scattered tweaks.

`js/home.js` grows alongside its section (its GSAP/interaction slice ships in that section's
commit) — no giant JS commit at the end.

---

## Phase 0 — Foundation

### [x] Commit 1 — Project scaffold & HTML shell
Lay down the full file tree and the empty page skeleton. No styling, no content yet.
- [x] Create dirs: `css/`, `js/`, `pages/` (+ `.gitkeep`), `assets/reference/`
      (`assets/character/` skipped — git can't track empty dirs; created in Commit 3)
- [x] `index.html` from the CLAUDE.md HTML shell: head/meta/fonts/favicon, `#nav-root`,
      empty `<main>`, `#footer-root`, all script tags in the required load order
- [x] Create empty placeholder files: `css/style.css`, `js/nav.js`, `js/footer.js`, `js/home.js`
- [x] Replace stub `README.md` with a short project intro + local-run instructions
- **Done when:** page loads at `localhost:8080` with no console errors (blank but valid).
- **Commit:** `Scaffold project structure and HTML shell.`

### [x] Commit 2 — Design system in css/style.css
The entire visual language, before any section uses it.
- [x] Global reset + `box-sizing` + `scroll-behavior` + `img,svg` base
- [x] Night Mode `:root` color tokens + radius tokens (the only place hex lives)
- [x] Body typography on `--duo-canvas`, `.container`, type scale
- [x] `.duo-btn-base` + `.duo-btn` / `.duo-btn-outline` / `.duo-btn-footer`
- [x] `.duo-card` with tactile shadow
- [x] Global `prefers-reduced-motion` reset block
- **Done when:** a throwaway test button/card renders with correct colors, shadow, hover.
- **Commit:** `Add Night Mode design system: tokens, typography, buttons, card.`

---

## Phase 1 — Character Art (SVGs)

Study `assets/reference/owner-photo.jpg` before each. Flat fills, `#1A1A1A` outlines,
head ~40% of body height. Tune all four to read correctly on the navy canvas.

### [ ] Commit 3 — icon.svg (navbar avatar)
- [ ] `viewBox="0 0 80 80"`, circular clipPath, head + shoulders, `role="img"` + aria-label
- [ ] Establishes skin `#C68642`, hair `#1C1008`, jacket `#2D5FA6` for all later SVGs
- **Done when:** renders cleanly clipped at 40px on a dark swatch.
- **Commit:** `Add character icon SVG (navbar avatar).`

### [ ] Commit 4 — standing.svg (hero + footer)
- [ ] `viewBox="0 0 200 320"`, full body, right arm raised in relaxed wave
- [ ] Animation hooks: `.char-body`, `.char-arm-right`, `.char-eyes`
- **Done when:** proportions match icon; outlines read on navy.
- **Commit:** `Add standing character SVG with animation hooks.`

### [ ] Commit 5 — seated.svg (laptop scene, mood system)
- [ ] `viewBox="0 0 280 300"`, waist-up, arms on desk strip, eyes toward laptop
- [ ] `#character-face` containing all four `[data-face]` groups (neutral/happy/excited/surprised)
- [ ] No laptop drawn in this SVG
- **Done when:** temporary CSS shows only the `neutral` face; each mood clearly distinct.
- **Commit:** `Add seated character SVG with four mood face groups.`

### [ ] Commit 6 — laptop.svg (base + lid groups)
- [ ] `viewBox="0 0 340 260"`, `#laptop-base` (keys/trackpad) + `#laptop-lid` (green/bezel/screen)
- [ ] ~2px hinge gap; groups separate cleanly into two HTML elements
- **Done when:** both groups render and can be split without visual glue.
- **Commit:** `Add laptop SVG with separable base and lid groups.`

---

## Phase 2 — Shared Chrome

### [ ] Commit 7 — js/nav.js (navigation)
- [ ] Render `NAV_LINKS` + avatar + name + "Hire Me" CTA into `#nav-root`
- [ ] Fixed navbar CSS in `css/style.css`; `.scrolled` shadow after 60px scroll
- [ ] Mobile (<768px) hamburger → dropdown; active-state rule (full-path links only)
- **Done when:** navbar is fixed, blurred, gains shadow on scroll, hamburger works at 375px.
- **Commit:** `Add navbar rendering, scroll shadow, and mobile menu.`

### [ ] Commit 8 — js/footer.js (footer template + green band)
- [ ] Inject full footer HTML into `#footer-root`: heading, subheading, gamification pill,
      2×2 button grid, inlined `standing.svg`, `#copyright-year` span
- [ ] Footer CSS (green band) in `css/style.css`; dynamic year via `getFullYear()`
- [ ] Confetti wiring is deferred to Commit 15
- **Done when:** green footer renders with live year and working links.
- **Commit:** `Add footer template, green CTA band, and dynamic year.`

---

## Phase 3 — Sections (top to bottom)

### [ ] Commit 9 — Hero section
- [ ] `#hero` markup: greeting, role, subtitle, bio, View Projects + Resume buttons, streak badge
- [ ] Dotted radial background; 60/40 text-left / character-right flex layout
- [ ] Inline `standing.svg`; CSS page-load entrance keyframes (staggered)
- [ ] `home.js`: reduced-motion guard that snaps hero elements to final state
- **Done when:** hero fills viewport, animates in once, links work, respects reduced motion.
- **Commit:** `Build hero section with entrance animations.`

### [ ] Commit 10 — About / Skills section
- [ ] `#about` markup: eyebrow, heading, bio, 2-col skill grid of `.skill-card`s w/ XP bars
- [ ] `.skill-bar-fill` starts at `width:0`, carries `data-level`
- [ ] `home.js`: GSAP batch stagger for cards + separate XP-bar fill tween on one trigger
- **Done when:** cards stagger in and bars animate to correct widths on scroll.
- **Commit:** `Build about/skills section with animated XP bars.`

### [ ] Commit 11 — Laptop scene (static 3D)
- [ ] `#projects` invisible anchor + `#laptop-scene` (300vh) / `.laptop-sticky` structure
- [ ] Inline seated + laptop groups; CSS 3D (`perspective`, `preserve-3d`, hinge origin)
- [ ] Lid starts `rotateX(0deg)` (flat); desk strip; mobile static override
- [ ] `-webkit-` prefixes for Safari; **no GSAP yet**
- **Done when:** flat closed laptop looks correct; mobile shows static open fallback.
- **Commit:** `Build laptop scene structure and CSS 3D (static).`

### [ ] Commit 12 — Laptop GSAP timeline
- [ ] `home.js`: scrub timeline — lid `rotateX -110`, screen fade-in, scene zoom
- [ ] Green glow toggle at 30–70% open via `onUpdate`
- [ ] Reduced-motion branch snaps to final open/zoomed state
- **Done when:** scrolling opens lid → fades screen → zooms; feels smooth at `scrub:0.5`.
- **Commit:** `Add GSAP scroll timeline for laptop open and zoom.`

### [ ] Commit 13 — Project carousel
- [ ] Pre-render all 5 project cards (light-island theme) in `.laptop-screen-content`
- [ ] Card transition CSS states; local `--island-*` tokens
- [ ] `home.js`: `goTo()` state machine, dots, arrow buttons, keyboard, touch swipe
- [ ] `ScrollTrigger.refresh()` after first card renders
- **Done when:** all nav methods cycle cards; In-Progress card hides Demo button.
- **Commit:** `Build project carousel with full navigation.`

### [ ] Commit 14 — Character mood reactions
- [ ] `.face` visibility CSS driven by `#character-face[data-mood]`
- [ ] `home.js`: `updateCharacterMood()`; wire to carousel `goTo()` + laptop `onUpdate`
- **Done when:** face changes per active project and at scroll zoom threshold.
- **Commit:** `Wire character mood reactions to carousel and scroll.`

### [ ] Commit 15 — Footer confetti
- [ ] `home.js`: `ScrollTrigger` `once` firing `confetti(...)` when `#contact` enters view
- [ ] Reduced-motion: skip confetti
- **Done when:** confetti bursts once on first footer reveal, not on reduced motion.
- **Commit:** `Add one-time confetti burst on footer reveal.`

---

## Phase 4 — Polish Passes

### [ ] Commit 16 — Responsive pass
- [ ] Verify + fix 375px, 768px, 1024px, 1440px; container padding; laptop static fallback;
      carousel touch; footer button grid stacking
- **Commit:** `Responsive pass across all breakpoints.`

### [ ] Commit 17 — Accessibility pass
- [ ] `:focus-visible` yellow outlines everywhere; `role="img"` + `aria-label` on all SVGs;
      keyboard carousel nav; contrast QA (white/muted on canvas, green CTA, yellow badge)
- **Commit:** `Accessibility pass: focus, ARIA, keyboard, contrast.`

### [ ] Commit 18 — Reduced-motion pass
- [ ] Test with OS reduced motion on; verify both CSS and JS end-state paths for hero,
      laptop, skills, confetti
- **Commit:** `Reduced-motion pass across CSS and JS paths.`

### [ ] Commit 19 — SEO / OG image / meta polish
- [ ] Create `assets/og-image.png` (1200×630, canvas bg, green accents, Nunito 900 name)
- [ ] Confirm meta description / OG tags; verify favicon
- **Commit:** `Add OG image and finalize SEO metadata.`

### [ ] Commit 20 — Performance pass & deploy config
- [ ] `will-change` only on `.laptop-lid` + `.scene-container`; all GSAP inside `DOMContentLoaded`;
      confirm no layout shift on load
- [ ] Add `vercel.json` if needed; final README with deploy notes
- **Commit:** `Performance pass and Vercel deploy config.`

---

## Review Log

Append a one-line note per completed commit (date + what shipped + anything to revisit).

- 2026-07-20 — Commit 0: created this task tracker and lessons file.
- 2026-07-21 — Commit 1: scaffold + shell. Reference photo converted PNG→JPG and placed.
  Photo confirms navy suit / white shirt / dark tie, short dark hair, **full beard** — the
  beard is not in the CLAUDE.md visual profile; add it to the SVGs in Commit 3.
- 2026-07-21 — Reorg: `style.css` → `css/`, `nav.js`/`footer.js` → `js/` (all refs updated).
  Beard + tie added to CLAUDE.md Visual Profile. README rewritten as UTF-8 (was UTF-16).
- 2026-07-21 — Commit 2: design system. 19 tokens, zero hex outside `:root`. Scratch
  `preview.html` (gitignored) renders every token, button variant, and card for eyeballing.
