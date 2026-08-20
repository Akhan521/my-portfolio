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

> **DIRECTION LOCKED (2026-08-18): retro TERMINAL / vintage-computer theme, AI work as the hero.**
> The Duolingo Night Mode build below (Commits 1-11 done; 12-20 unbuilt) remains **PARKED, not
> abandoned**, fully backed up (tag `duolingo-night-mode-v1`, branch `backup/duolingo-night-mode`,
> offline copy `~/Developer/my-portfolio-duolingo-backup-2026-08-18`, `origin/main`). **Do NOT
> resume Commit 12** unless the revamp is called off; if it is, everything below is still valid on `main`.
>
> **The concept, refined:** We first went toward a Game Boy Color *console* theme (inspired by
> Branon Eusebio, branon.dev) and PROVED we can emulate that craft (near-pixel-perfect replica
> built, in scratchpad). But a *game* console misreads as a game-dev portfolio, which is wrong for
> an AI software engineer. So the device pivots to a **retro terminal / vintage computer /
> workstation**: same retro-hardware craft, warmth, and delight, but it reads as "a machine an
> engineer built," and AI content (agents, models, code) sits natively in a terminal. **AI work is
> the hero; the retro shell is the frame.**
>
> **Carry over from Branon (what Aamir loves):** his warm paper palette + colors, his interaction
> quality/polish, and above all the "**feels original, hand-made, NOT AI-generated**" quality. Fold
> these into the terminal direction meaningfully — inspiration, not copy.
>
> **AI-SWE scoping decisions (this session):**
> - Sections (classic, recruiter-legible; AI signal lives in the content): ABOUT · PROJECTS ·
>   EXPERIENCE · WRITING · CONTACT.
> - "AI flavor at the seams": boot sequence reframed as an AI system initializing; the screen is a
>   TERMINAL (monospace log/output), not a game title screen.
> - No live AI demo in v1, but architect the terminal screen as a swappable surface so a live
>   agent/chat demo can drop in later.
> - Drop game tropes (PLAYER 1 / LV / XP / streaks / "unlocked"); keep retro HARDWARE (boot, screen,
>   tactile chrome). Projects framed as "programs/disks."
> - Bonus synergy: Pixelate (pixel-art editor) + bat-code (themed TUI) are natively on-theme.
>
> **Stack (unchanged):** Next.js + React + TypeScript + GSAP + MDX. New app; `main` here stays
> vanilla until cutover. Reference clone: `~/Developer/branon-portfolio-ref`. Full plan:
> `~/.claude/plans/as-i-was-working-deep-crayon.md`.
>
> **Next up:** mock up the retro-terminal direction with Aamir's real content, and compare it side
> by side against the Game Boy replica and the Duolingo original before committing to the build.
>
> **Git state:** `main` = Duolingo build, tree clean; no revamp code committed yet.
> **Last activity:** 2026-08-18 — pivoted from game console to retro terminal; AI-SWE scoping locked.

Update this block whenever the position changes so a cold start knows exactly where to pick up.

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

## Phase 1 — Character Art (generated raster images)

**Approach changed 2026-07-27:** character art is no longer hand-drawn SVG — it's generated
with ChatGPT's image model. **Read `tasks/duolingo-style.md` first** (north-star style, base +
per-asset prompts, consistency + transparent-bg rules). Owner runs the prompts and drops
outputs in; Claude processes/wires them. Generate the whole set in one session for consistency.

### [x] Commit 3 — Generate character images (ChatGPT, owner)
- [x] Copy the approved north-star into `assets/character/reference/style-north-star.png`
- [x] Generate with the prompts in `tasks/duolingo-style.md` §3–4, attaching the reference:
      `avatar` ✅ (north-star doubles as avatar) · `hero` ✅ · `seated-neutral` ✅ ·
      `seated-excited` ✅ — all transparent cutouts (macOS subject lift), seated pair
      aligned within ~4px for a seamless crossfade, all verified over the dark canvas
- [x] Save full-res masters to `assets/character/src/` (avatar, hero, seated-neutral, seated-excited)
- **Done when:** all four masters exist, each clearly Aamir and on-style; the two seated
      images align pose/framing for a clean crossfade.
- **Commit:** `Add generated character image masters.`

### [ ] Commit 4 — Import avatar + hero
- [ ] Process with `sips`: `avatar.png` (navbar sizes @1x/@2x) + `hero.png` (transparent, sized)
- [ ] Confirm hero transparency composites cleanly over the dark canvas
- **Done when:** avatar + hero render crisp at their display sizes on the dark chrome.
- **Commit:** `Import and size avatar and hero character images.`

### [x] Commit 5 — Import seated pair (mood crossfade assets)  *(done in the laptop-scene commit)*
- [x] Process `seated-neutral.png` + `seated-excited.png` (both 720x720, scaled identically from the
      1254px masters so they stay pixel-aligned); stacked in `.character-seated` for the crossfade
- **Done when:** stacking + toggling `.excited` crossfades in place with no jump (per build-specs §6).

### [~] Commit 6 — laptop device  *(SUPERSEDED: CSS-drawn, no SVG file)*
- Owner chose a **CSS-drawn silver MacBook** over an `assets/laptop.svg`, after rendering both.
  No `laptop.svg` exists; the device is built from CSS boxes/gradients in `css/style.css` with a
  hinged `.laptop-lid` (silver `.laptop-lid-back` + engraved "AK" `.laptop-mark`, and a
  `.laptop-screen-face`). Base/lid are separate elements, so the lid rotates independently.
- **Superseded, not built as spec'd.** Design decisions live in `docs/HANDOFF.md` §5.

---

## Phase 2 — Shared Chrome

### [x] Commit 7 — js/nav.js (navigation)  *(built ahead of Commits 4–6 for a visible win)*
- [x] Render `NAV_LINKS` + avatar + name + "Hire Me" CTA into `#nav-root`
- [x] Fixed navbar CSS; scroll elevation after 60px — note: on the dark theme a drop shadow
      is invisible, so `.scrolled` uses a **tonal lift** (bar → lighter surface tone) + shadow
- [x] Mobile (<768px) hamburger → dropdown; active-state rule (full-path links only)
- [x] Also imported `avatar.png` (from the master) — the Commit-4 avatar half, done here
- Focus a11y: spaced rounded rings; primary CTA ring anchored to a non-transforming wrapper
      (`:has(:focus-visible)`) so the tactile press stays visible while focused
- **Done when:** navbar is fixed, blurred, elevates on scroll, hamburger works. ✅ verified in
      headless Chrome (desktop + mobile).
- **Commit:** `Add navbar rendering, scroll elevation, and mobile menu.`

### [ ] Commit 8 — js/footer.js (footer template + green band)
- [ ] Inject full footer HTML into `#footer-root`: heading, subheading, gamification pill,
      2×2 button grid, inlined `standing.svg`, `#copyright-year` span
- [ ] Footer CSS (green band) in `css/style.css`; dynamic year via `getFullYear()`
- [ ] Confetti wiring is deferred to Commit 15
- **Done when:** green footer renders with live year and working links.
- **Commit:** `Add footer template, green CTA band, and dynamic year.`

---

## Phase 3 — Sections (top to bottom)

### [x] Commit 9 — Hero section  *(built, then REDESIGNED — Approach B)*
- [x] `#hero` markup: greeting, role, value, credentials, matched buttons, status chip
- [x] Dotted radial background; text-left / framed-character-right flex layout
- [x] `hero.png` raster (framed via `hero-tight.png`); CSS staggered entrance keyframes
- [x] `home.js`: reduced-motion guard that snaps hero elements to final state
- **Redesign (2026-08-05):** dropped the waving emoji + streak badge + mismatched buttons
      (read as AI-generic). Now: warm "Hi, I'm Aamir!", green-tinted framed portrait (green edge
      + glow), matched tactile pair (`.duo-btn` + new `.duo-btn-neutral`), real availability
      status chip. Spec: `docs/superpowers/specs/2026-08-04-hero-redesign-design.md`.
- **Done when:** hero fills viewport, animates in once, links work, respects reduced motion. ✅

### [x] Commit 10 — About / Skills section  *(REDESIGNED — chips, not XP bars)*
Redesigned away from the original XP-bar spec (game-y/AI-generic) per the clean-professional
north star. Design doc: `docs/superpowers/specs/2026-08-07-about-skills-design.md`.
- [x] `#about` markup: `About Me` eyebrow, `What I've Learned` heading, bio, + 3 categorized
      `.skill-group`s of solid-tactile `.skill-chip`s (Languages / AI·ML / Tools & Frameworks)
- [x] Curated, owner-confirmed skill set — no XP, no %, no emoji, no cards/bars
- [x] `home.js`: reduced-motion-guarded GSAP ScrollTrigger reveal (bio + labels + chips stagger)
- **Done when:** bio left / skills right on desktop, stacked on mobile; chips stagger in on
      scroll; reduced motion snaps to final. ✅ verified in headless (desktop + mobile + reveal).
- **Commit:** `Build About/Skills section with categorized skill chips.`

### [x] Commit 11 — Laptop scene (static 3D)
- [x] `#projects` invisible anchor + `#laptop-scene` (300vh, in CSS) / `.laptop-sticky` structure
- [x] Seated character + CSS-drawn laptop; CSS 3D (`perspective`, `preserve-3d`, hinge origin)
- [x] Lid starts `rotateX(0deg)` (closed, silver + AK up); flat desk band; mobile static open override
- [x] `-webkit-` prefixes; `will-change` only on `.laptop-lid` + `.scene-container`; **no GSAP yet**
- **Done when:** closed MacBook looks correct on desktop; mobile shows static open fallback. ✅
      Verified in headless (desktop closed + mobile open). TEMP spacer removed.
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
- 2026-07-21 — Neutral ramp deepened one step to cut the navy cast: canvas `#131F24`→`#0F181C`,
  surface `#1F2C34`→`#1B262C`, surface-2 `#37464F`→`#32414A`. `--duo-border` stays `#37464F`,
  now deliberately one step lighter than surface-2 so edges stay legible. Navbar rgba in
  CLAUDE.md updated to match. Old values documented as retired.
- 2026-07-26 — Commit 3: two icon.svg attempts (realistic-ish, then a "full Duolingo"
  redraw). Owner rejected both — direction wasn't right. **Icon SCRATCHED entirely.**
- 2026-07-26 — Ingested Duolingo's OFFICIAL design guidelines (shape-language + characters
  /body-types pages, extracted from the site's JS bundle since it's a client-rendered SPA)
  and rewrote `tasks/duolingo-style.md` with the real verbatim rules — three rounded shapes,
  no pointy edges, fewest shapes, rhythm, 1–2 shapes per feature, geometric eyes (no ovals),
  asymmetric mouths, etc. Corrected the earlier doc, which had used generic shape theory the
  official guide does not teach. Commit 3 reset to a fresh start; next icon must follow the
  updated doc.
- 2026-07-26 — Refactored the bloated `CLAUDE.md` (1032 → ~195 lines): kept essentials
  (summary, reference-file index, owner info, tech stack + load order, file structure, design
  tokens, conventions, critical notes, commands, build-order pointer) and offloaded detail to
  new reference docs: `tasks/build-specs.md` (HTML shell, nav/footer templates, component CSS,
  all section specs, animation system), `tasks/content.md` (projects/skills/copy), and folded
  character SVG specs + idle animations into `tasks/duolingo-style.md`. No spec content lost —
  just reorganized. **END OF DAY 2026-07-26: committed + pushed to GitHub.**
- 2026-07-27 — **PIVOT: character art → AI-generated raster images.** Hand-drawn SVG scrapped
  (a 3rd fresh icon attempt was also rejected). Owner will generate soft-shaded cartoon
  portraits with ChatGPT's image model from an approved north-star reference; Claude wires the
  PNGs in. Reworked `tasks/duolingo-style.md` into an image-generation guide, updated
  `CLAUDE.md` + `tasks/build-specs.md` for raster (whole-image motion only; a single
  neutral↔excited seated crossfade replaces the 4-group SVG mood system). Phase 1 re-slotted:
  Commits 3–5 = generate/import images, Commit 6 = laptop.svg (device) unchanged. Docs pivot
  committed separately (66c78be); this todo update is its own commit. Next: draft the prompts.
- 2026-07-30 — Locked the **avatar**: the owner-approved image
  (`aamir-prof-duo-style.png`) meets all criteria, so no regen. Copied into the repo as
  `assets/character/reference/style-north-star.png` (the fixed style/likeness reference for
  every prompt) and `assets/character/src/avatar-src.png` (avatar master).
- 2026-07-31 — **Commit 3 complete: all 4 character images generated & locked.** hero,
  seated-neutral, seated-excited each generated in ChatGPT, cut out with macOS subject lift,
  and verified (true RGBA, transparent corners, ~1–2% anti-aliased edge, no fringe over the
  #0F181C canvas). Seated-excited was edited from seated-neutral, so the pair aligns within
  ~4px (head top/center) — a seamless opacity crossfade. Masters in `assets/character/src/`.
  Next: Commit 4 (size avatar + hero via `sips`) then Commit 5 (size the seated pair).
- 2026-08-02 — Built the **navbar (Commit 7)** ahead of the image-import commits for a visible
  win: `js/nav.js` (brand + links + Hire Me CTA, scroll-elevation, mobile hamburger) + navbar
  CSS, and imported `assets/character/avatar.png` (160px, cropped to the circle) from the
  master. Verified live in headless Chrome (desktop + mobile). Dark-theme fixes from owner
  feedback: drop shadow was invisible → switched to a tonal-lift elevation; focus rings given
  breathing room; primary CTA focus ring anchored to a non-transforming wrapper via
  `:has(:focus-visible)` so the tactile press shows while focused. Still refining how visible
  the press reads under the ring. A TEMP scroll scaffold sits in `index.html` (remove at hero).
- 2026-08-02 (eod) — Deepened the primary CTA press from 2px → **4px full bottom-out** so the
  press reads clearly even inside the focus ring (verified in headless). **Open for tomorrow:**
  owner shared a screenshot of the focused CTA — still wants to tweak how the yellow focus
  ring itself looks (spacing / corner radius / overall feel). Resume there before the hero.
- 2026-08-03 — Rendered 4 focus-ring options for the owner (offset/tightness/pill); he chose
  **C (symmetric, lip-compensated)**. Applied to `.nav-cta-wrap`: `padding-bottom: 4px` reserves
  room for the 4px tactile lip so the ring wraps with even spacing (offset 5px), not top-heavy.
  Verified in-context: ring is evenly spaced and the button stays aligned with the nav links.
  **Navbar polish is done.** Next: the HERO section.
- 2026-08-04 — Built the **initial hero** (commit `88310c3`): split layout, verbatim copy,
  staggered entrance, idle float, waving 👋, streak badge, View Projects + Resume. Owner review:
  the wave (cliché), streak (hollow game gimmick), and mismatched buttons read as AI-generic.
  **Pivoted to a redesign via the brainstorming process.** Agreed north star: clean-professional,
  keep Duolingo DNA (green, rounded tactile shapes, warmth, character) but drop literal game
  mechanics. Chose **Approach B — Framed Character** (character in a deliberate Duolingo-shaped
  frame; matched tactile button pair incl. new `.duo-btn-neutral`; a REAL "open to internships"
  status chip with a pulsing dot replacing the streak; warm "Hi, I'm Aamir Khan"; no emoji).
  Cropped `assets/character/hero-tight.png` for the frame. **One open decision: frame treatment**
  (dark-panel+green-edge vs bright-green vs green-tinted) — captured in
  `docs/superpowers/specs/2026-08-04-hero-redesign-design.md`. Resume there next session.
- 2026-08-05 — **Hero redesign implemented (Approach B).** Owner chose frame option 3
  (green-tinted dark panel + green edge + soft glow). Replaced the initial hero markup/CSS; added
  `.duo-btn-neutral`, the `.hero-frame` (fill `#16241C`, 3px green border, tactile shadow,
  radial glow), and the `.hero-status` chip w/ pulsing dot. Synced docs (CLAUDE.md, content.md,
  build-specs.md). Owner polish: (a) neutral button's tactile shadow was invisible (`--duo-border`
  ~ fill) -> switched to `--duo-canvas` so depth reads; (b) greeting -> first-name "Hi, I'm Aamir!"
  (navbar already shows full name; fixes the orphaned "Khan" wrap); (c) tightened column gap +
  bumped frame to 420px to use the space. Verified desktop+mobile in headless. **Hero done.
  Next: About/Skills section.**
- 2026-08-08 — **Hero layout refined (spacing + alignment).** Owner felt the hero looked off: a
  big void between the left-aligned text and the right-side frame. Rendered several variants
  (centered single-column, tightened split, mirrored split), owner chose the **tightened split**
  and then dialed the gap up until it felt right. Implemented as a **contained, centered** group:
  `.hero-inner` `max-width: 1150px; margin: 0 auto; justify-content: center` with a **responsive
  gap** `clamp(2.5rem, 10vw, 8rem)` (caps at 8rem wide, shrinks on narrower screens so it never
  crowds/overflows), text `flex: 1 1 auto; max-width: 460px`, frame `max-width: 390px` (was 420).
  Verified real page at desktop / ~940px / mobile. Only `css/style.css` changed; docs synced
  (build-specs §2). Next: Laptop scene (Commit 11).
- 2026-08-08 — **About bio readability: two paragraphs + green emphasis.** The bio read as one
  dense block. Split it into two `<p class="about-text">` paragraphs (who + Tatari / from-scratch +
  values) with `.about-text + .about-text { margin-top: 1rem }`, and emphasized one standout phrase
  per paragraph ("diagnosed and fixed a multi-month outage", "built AI systems from scratch") via
  `<strong>`. Weight-only white was too subtle on the already-white body, so after a 4-way render
  (white bold / green bold / muted body+white / muted body+green) Aamir picked **green bold**:
  `.about-text strong { font-weight: 700; color: var(--duo-green) }`. Verified in headless.
- 2026-08-08 — **Added "Production & MLOps" skill category to the About section.** The chips lacked
  any signal that Aamir ships/operates AI in production (his differentiator). Added a 4th
  `.skill-group` "Production & MLOps": MLflow · Databricks · Model serving · Monitoring · CI/CD
  (curated to 5, one even row). Owner chose a new category over folding into "Tools & Frameworks,"
  and the label "Production & MLOps" (initially "Shipping to Production," changed on review). Deeper
  MLOps terms (feature stores, Airflow, champion/challenger, shadow deployment) left out to stay
  curated + application-leaning. GSAP reveal covers the new chips automatically (class selectors).
  Verified in headless. Committed + pushed. Next: Laptop scene (Commit 11).
- 2026-08-08 — **Copy repositioning pass (hero + About).** Ingested Aamir's factual info bank
  (`tasks/aamir-info-bank.md`, committed this session) and rewrote the generic + stale copy (it
  still said "currently at Handshake AI," which ended Jun 2026). New positioning: **AI software
  engineer on the application side, builds + ships AI software to production**, Tatari as proof,
  from-scratch projects as credibility, ML vocabulary kept light. The hero value line was tuned to
  the JD language of Aamir's target company **Decagon** (leads with shipping + reliability,
  foregrounds failure diagnosis, his standout). Decisions: seeking both full-time + internship; OK
  to name Tatari + metrics; drop "end to end" (buzzwordy); stay em-dash free. Shipped as **four
  separate wording commits** at Aamir's request (value line `d7e4555`, credentials `5d51013`,
  status chip `08dd031`, About bio `7e7a058`), each touching `index.html` + `tasks/content.md`;
  verified in headless; then a docs commit (info bank + HANDOFF + todo) and pushed everything.
  New memories saved: [[aamir-background]], [[portfolio-copy-repositioning]], [[no-em-dashes]].
  Next: Laptop scene (Commit 11).
- 2026-08-07 — **About / Skills section built (Commit 10) — REDESIGNED from the XP-bar spec.**
  Brainstormed the direction: the original Section-3 spec (SKILL TREE eyebrow, "XP" labels,
  animated XP bars, emoji icons) conflicts with the clean-professional north star (no game
  mechanics / nothing AI-generic), so owner chose a **fully professional, categorized** approach.
  Probed + curated the real skill set for AI SWE recruiters (owner confirmed RAG / fine-tuning
  LoRA-PEFT / LangChain / vector DBs). Rendered 3 chip treatments (`_chips.html`); owner picked
  **A · solid tactile**. Built `#about`: "About Me" eyebrow + "What I've Learned" + bio (trailing
  internship line trimmed — hero chip already says it) on the left, 3 `.skill-group`s of
  `.skill-chip`s (Languages / AI·ML / Tools & Frameworks) on the right; stacks on mobile.
  `home.js` grew a reduced-motion-guarded GSAP ScrollTrigger reveal (bio + labels + chips
  stagger; no XP fills; safe early-return if GSAP absent). New reusable `.section-eyebrow` /
  `.section-heading`. Removed the TEMP hero spacer (a smaller 40vh spacer remains for the
  not-yet-built laptop scene). Design doc: `docs/superpowers/specs/2026-08-07-about-skills-design.md`
  (committed `3d02dde`). Verified in headless: desktop layout, animated reveal (caught mid-stagger),
  mobile stack. Synced content.md, build-specs.md §3, HANDOFF.md. Next: Laptop scene (Commit 11).
- 2026-08-07 (refinements, pre-commit) — Owner review of the About section produced three changes:
  (1) **Motion timing** set to **"Balanced"** (0.55s fades, 50ms chip stagger, power2.out, ~1.3s
  full reveal), chosen from a live 4-option comparison page grounded in Material / SaaS / Apple /
  showcase practices (the initial ~0.9s felt too snappy). (2) **Tools row trimmed to 5** (dropped
  `NumPy / Pandas`) so it lays out as one even row like Languages instead of orphaning a single
  chip on its own line; verified in the real section. (3) **New rule: no em dashes anywhere in the
  portfolio** (use commas / colons / split sentences) — removed from shipped copy (title, meta/OG,
  bio) + code comments; saved to memory. Internal planning-doc prose still has historical em dashes
  (sweep offered). **About section + these refinements NOT yet committed** (owner reviews first).
- 2026-08-06 — **Hero status chip widened to button-row width.** Owner kept the current chip
  style (dark pill, gray border, white text, pulsing green dot) but wanted it to span the same
  width as the two buttons above and leave room for the pulse ring. Wrapped `.hero-buttons` +
  `.hero-status` in a new `.hero-cta` (`width: fit-content` → collapses to the buttons row, the
  widest child); chip changed from `inline-flex` to `display:flex; width:100%` so it fills that
  width, `padding` 6px 16px → 8px 18px, `gap` 0.5rem → 0.85rem (keeps the `status-pulse` ring off
  the text). Verified desktop + mobile in headless (chip tracks the buttons' width at both).
  Synced index.html, build-specs.md, HANDOFF.md. Committed separately from the button change.
  Next: About/Skills section.
- 2026-08-06 — **Resume button → Duo blue secondary CTA.** The neutral slate button still read
  flat (edge tone too close to the canvas → faint ledge). Rendered a 5-way side-by-side
  (`_btns.html`): current, brighter slate, warm stone, bright Duo blue, deep blue — each as a
  matched pair with the green primary. Owner picked **bright Duo blue**. Rebuilt
  `.duo-btn-neutral` → **`.duo-btn-blue`** (face `--duo-blue` `#1CB0F6`, edge new token
  `--duo-blue-dark` `#1488C4`, white text, no border — mirrors the green recipe). Depth now reads
  as clearly as the green button; green+blue is on-brand Duo. Synced index.html, CLAUDE.md,
  build-specs.md, content.md, HANDOFF.md. `--duo-surface-3` now unused by any button (kept as a
  ramp step). Verified in headless (desktop). Next: `.hero-status` chip refinement.
- 2026-08-05 — Post-review tweaks: (1) **Role retitled** "Aspiring AI Engineer" →
  **"AI Software Engineer"** across index.html (role + meta/title/OG), CLAUDE.md, content.md,
  build-specs.md — owner positions as a SWE building AI systems (app/LLM/agentic layer), not
  low-level ML. (2) **`.duo-btn-neutral` depth/size fix (attempt 2):** the earlier version had a
  2px border (→ 4px bigger than the green btn) and a `--duo-canvas` shadow (= page bg → invisible
  ledge). Rebuilt to mirror the green recipe: new `--duo-surface-3` lighter face, no border (same
  size), `--duo-surface` edge (darker than face, lighter than canvas → visible). Now a proper
  matched tactile pair. Docs synced.
- 2026-08-12 — **Laptop scene built (Commit 11, static 3D) + prereqs.** Long design-iteration
  session on the laptop DEVICE first (owner reviewed rendered options throughout): rejected the
  generic/abstract first passes and the individually-drawn-keycap MacBook, landed on a **CSS-drawn
  silver MacBook** with the ORIGINAL simple grid keyboard, a wide MacBook trackpad, the original
  abstract screen (green badge + title + line placeholders, no text), a clean front lip, and a
  **closed clamshell with an engraved tone-on-tone "AK" mark** (chosen over a green badge / green
  ring / Apple logo). **Green lid dropped** in favor of full silver MacBook realism. Then built the
  scene: sized + imported the seated pair (720x720), composed character-behind-a-flat-desk with the
  laptop in front, and solved the unified hinge — one `.laptop-lid` whose own `rotateX` goes
  **0deg (closed) -> 110deg (open)** inside a deck-tilted pivot (found via an angle sweep). Screen
  is a `rotateX(180)` back face so it reads upright when open (an earlier `rotateY(180)` rendered it
  upside-down). `#laptop-scene` 300vh + sticky (height in CSS), `-webkit-` prefixes, `will-change`
  only on `.laptop-lid` + `.scene-container`, mobile static-open fallback, TEMP spacer removed.
  Owner review: flattened the desk (was domed) + tightened mobile spacing. Verified in headless
  (desktop closed + mobile open). **No GSAP yet — that's Commit 12.** Deviations from the old spec
  (silver not green, +110 not -110, CSS not SVG) noted in CLAUDE.md + build-specs §4. Committed +
  pushed. **Follow-up parked:** overall look-cleanup pass on the scene.
- 2026-08-17 — **Laptop scene tweaks (owner review of the built scene).** Three fixes, all in
  `css/style.css`: (1) the laptop was oversized vs the character — scaled `.laptop-3d-wrapper` to
  `scale(0.62)` (transform-origin bottom center) so it reads natural on the desk; (2) too much
  gap to the character — raised it (`bottom` 150 -> 205) to sit close in front of him; (3) the
  closed lid didn't read as shut. First tried a two-strip front edge with a dark seam groove +
  scoop — that made it look AJAR (worse), so reverted to **one clean flush bright-silver front
  edge** (`.laptop-lip`, single gradient, no groove) with just a faint centered finger recess that
  doesn't break the bottom silhouette; depth comes from the grounding drop-shadow. Verified in
  headless (full scene + zoomed closed edge). Still no GSAP — Commit 12 next.
- 2026-08-17 — **Closed-lid front edge: chased "make it look actually closed" to root cause.**
  Owner rejected several front-edge treatments (plain single edge → "juts out"; two-halves + seam
  groove + scoop → "ajar / too busy"). The real bug: the lid (`.laptop-lid` height 186) was SHORTER
  than the base deck (216), so ~30px of deck poked out in front of the lid edge — that protruding
  strip was the "seam/jutting half." Fix: set lid height = deck height (216) so the closed lid fully
  covers the deck, plus a minimal tone-matched 4px front lip (no seam, no scoop) and squared the
  lid-back bottom corners → one seamless flat wedge, no groove. Side effect: closed top is a touch
  deeper and the open screen slightly squarer (300x216) — accepted. Verified closed (desktop) +
  open (mobile) in headless. Owner: lock + commit.
- 2026-08-18 — **PIVOT: exploring a full theme revamp (Duolingo Night Mode -> retro handheld
  console).** No product code committed today — exploration, decisions, and throwaway mockups
  only. Studied Branon Eusebio's Game Boy Color portfolio (branon.dev) as the north star and
  cloned it for reference (`~/Developer/branon-portfolio-ref`). Backed up the Duolingo build
  four ways before any revamp work (tag `duolingo-night-mode-v1`, branch
  `backup/duolingo-night-mode`, offline copy `~/Developer/my-portfolio-duolingo-backup-2026-08-18`,
  `origin/main`). Locked decisions: adopt his warm-paper GBC palette (site flips dark->light);
  hero = console-boot splash into a content hero; stack moves to **Next.js + React + TypeScript
  + GSAP + MDX**; regenerate the character as a pixel sprite; build the console shell as a
  swappable layer. Built two "inspired-by" hero mockups + a **near pixel-perfect replica of
  Branon's landing** (scratchpad) — **faithful emulation proven possible** (the replica reuses
  his identity/art, so it's a proof, not shippable). **Critical constraint for next session:**
  scope the design specifically to AI software engineering so the console reads as a stylistic
  frame, not a game-dev statement. Full plan + roadmap: `~/.claude/plans/as-i-was-working-deep-crayon.md`.
- 2026-08-18 (later same session) — **DIRECTION PIVOT: game console -> retro terminal / vintage
  computer.** Talked through fit: a *game* console, however beautifully executed, risks reading as a
  game-dev portfolio, which is wrong for an AI SWE (Branon can pull it off because he's a *design*
  engineer — his toy-portfolio IS his skill demo; for Aamir the AI work must be the hero). Also
  reframed "retreat to Duolingo" as a false safety (it's also a gimmick theme that doesn't signal
  AI). Decision: keep the retro-hardware craft + Branon's palette/interactions/originality, but
  pivot the device from a Game Boy to a **retro terminal / vintage computer**, where AI content is
  native and the read is "engineer," not "gamer." Locked AI-SWE scoping this session: classic
  sections (ABOUT/PROJECTS/EXPERIENCE/WRITING/CONTACT), "AI flavor at the seams" (boot = AI system
  init, screen = terminal), no live demo in v1 but architect for one, drop game tropes / keep retro
  hardware, Pixelate + bat-code as natural on-theme synergy. **Next session: mock up the terminal
  direction with real content, compare vs the Game Boy replica and the Duolingo original.** No code
  committed today.
