# Portfolio, Session Handoff (as of 2026-08-08)

A single-file orientation for resuming work on Aamir Khan's Duolingo-themed portfolio.
Read this first, then `tasks/todo.md` (the authoritative roadmap + Current Position).

---

## 1. What this project is

Aamir Khan's personal portfolio, a **dark-only "Duolingo Night Mode"** static site.
Vanilla HTML/CSS/JS (no framework, bundler, or npm). GSAP + canvas-confetti via CDN.
Repo: `~/Developer/my-portfolio`, GitHub `Akhan521/my-portfolio` (branch `main`).
Live: `aamir-khans-portfolio.vercel.app`.

**Design north star (important):** clean, professional, **original**. Keep Duolingo's DNA
(Feather green `#58CC02`, rounded tactile shapes, warmth, the character) but **avoid literal
game mechanics** (no XP/streak/badge decoration). Motion and UI must carry real meaning, not
gimmicks. The owner actively rejects anything that "screams AI-generated." Copy should be
competitive and truthful. **Treat the spec docs as guidance to iterate on, not law:** the owner
decides by reacting to rendered options you put in front of him.

## 2. Where to look (the docs that run this project)

| File | Purpose |
|---|---|
| `tasks/todo.md` | **Authoritative roadmap:** commit plan, Current Position, Review Log. Start here after this file. |
| `CLAUDE.md` | Lean project spec: tokens, conventions, critical notes, file structure. |
| `tasks/build-specs.md` | Deep implementation detail: HTML shell, nav/footer, component CSS, per-section specs, animation system. **Read Section 4 before the laptop scene.** |
| `tasks/content.md` | Verbatim copy + data (projects, skills, hero/footer text). |
| `tasks/aamir-info-bank.md` | **Factual source of truth about Aamir** (background, Tatari work, projects, skills). Drove the copy. |
| `tasks/tatari-accomplishments-report.md` | **Sanitized, outward-facing Tatari accomplishments summary** (major workstreams, both prod outages, batch routing client, self-correction record, skills, glossary; no ticket numbers, names, repos, or ledgers). Cleared for public use. |
| `tasks/duolingo-style.md` | Character-art bible: the AI image-generation pipeline + rules. |
| `tasks/lessons.md` | Correction lessons, review at session start. |
| `docs/superpowers/specs/2026-08-04-hero-redesign-design.md` | Hero redesign spec. |
| `docs/superpowers/specs/2026-08-07-about-skills-design.md` | About/Skills (chips) design spec. |

## 3. Current state, what is DONE and live

**Everything below is committed AND pushed to `origin/main`. Working tree clean (as of 2026-08-08).**

- **Navbar** (`js/nav.js` + CSS): brand (avatar + "Aamir Khan"), links, "Hire Me" CTA, dark-theme
  scroll elevation (tonal lift, not an invisible shadow), mobile hamburger, polished focus rings.
- **Hero** (`#hero`): redesigned "Approach B", with the 2026-08-08 copy + layout refinements.
  - Greeting **"Hi, I'm Aamir!"**, role **"AI Software Engineer"** (green).
  - Value line: **"I build AI software and make it reliable in production, and I'm strongest at
    diagnosing why it fails."** Credentials: **"AI/ML Software Engineer Intern @ Tatari · CS
    Master's @ UC Riverside."** Status chip: **"Open to full-time & internship AI roles."**
  - **Framed character** `.hero-frame`: green-tinted dark panel `#16241C`, 3px green border,
    tactile bottom shadow, soft radial green glow; `assets/character/hero-tight.png`, `max-width: 390px`.
  - **Matched tactile buttons**: `.duo-btn` (View Projects) + `.duo-btn-blue` (Resume, blue
    secondary CTA: face `--duo-blue`, edge `--duo-blue-dark` `#1488C4`).
  - **Layout (refined 2026-08-08):** `.hero-inner` is a contained, centered group
    (`max-width: 1150px; margin: 0 auto; justify-content: center`) with a responsive gap
    `clamp(2.5rem, 10vw, 8rem)` (8rem on wide screens, eases down on narrower ones). Text
    `flex: 1 1 auto; max-width: 460px`. Stacks to a single column on mobile < 768px.
  - Staggered CSS entrance, idle float, reduced-motion guard in `js/home.js`.
- **About / Skills** (`#about`): "About Me" eyebrow + "What I've Learned" heading + a **two-paragraph
  bio** (with two phrases in **brand-green bold** via `.about-text strong`) on the left; **four**
  categorized groups of solid-tactile skill chips on the right, **Languages / AI · ML / Tools &
  Frameworks / Production & MLOps** (the last one, MLflow · Databricks · Model serving · Monitoring
  · CI/CD, signals the ship-to-production differentiator). Stacks on mobile. GSAP ScrollTrigger
  reveal, "Balanced" timing (0.55s fades, 50ms stagger), reduced-motion guarded. Design spec:
  `docs/superpowers/specs/2026-08-07-about-skills-design.md`.
- **Character art** (locked, in `assets/character/`): `avatar.png` (navbar), `hero.png` +
  `hero-tight.png` (hero), `src/` masters, `reference/style-north-star.png`. The seated pair is
  now sized + imported: `seated-neutral.png` / `seated-excited.png` (both 720x720, stacked for the crossfade).
- **Laptop scene** (`#laptop-scene`, static 3D): built (Commit 11) — see §5. The TEMP spacer is gone.

**NOT built yet:** the footer (`js/footer.js` is an empty stub, `#footer-root` renders nothing),
the laptop GSAP open/zoom (Commit 12), the project carousel (13), mood reactions (14), and confetti (15).

## 4. Who Aamir is (locked positioning, read before any copy/content work)

Full detail in `tasks/aamir-info-bank.md` (+ memory). The essentials:
- Targets **AI software engineer / AI engineer roles, application side** (builds + ships AI
  software to production). **NOT ML engineer**, keep ML/MLOps vocabulary light in headline copy.
- Current role: **AI/ML Software Engineer Intern @ Tatari** (production ML platform), through Sep 2026.
  His strongest evidence (e.g. diagnosing a multi-month outage that silently failed ~3.9M daily
  predictions). OK to name Tatari + cite metrics publicly.
- **MS CS @ UC Riverside (4.0)**, grad Dec 2026; BS CS 3.98 Summa Cum Laude. Also AI Trainer @
  Handshake AI (ended Jun 2026), AI Product Tester @ DeepLearning.AI (ongoing), Anthropic x CodePath.
- Seeking **both full-time and internship** roles. Target dream company: **Decagon** (conversational-AI agents).
- **Tatari metrics are fully cleared:** Aamir has explicitly said to use ALL of it, including every
  specific number, freely in public copy. The internal "metric-clearance caveat" inside
  `tasks/tatari-accomplishments-report.md` is retained for context only; **ignore it** (per Aamir, 2026-08-14).
- Differentiator: builds AI/ML from scratch (custom transformers, from-scratch GPT, LoRA fine-tunes)
  AND ships/operates it in production, and debugs hard production failures to root cause.
- **All copy stays em-dash free** (use commas / colons / split sentences). Also avoid "end to end"
  (owner finds it buzzwordy).

## 5. The Laptop scene (Commit 11, BUILT) + what Commit 12 needs

**Status: the static 3D scene is built and pushed.** Desktop shows a closed silver MacBook on a
desk with Aamir seated behind it; mobile (<768px) shows a static OPEN fallback. **Next is Commit 12:
the GSAP scroll timeline that opens the lid + zooms.** The structure below is what you animate.

**Design decisions locked this session (do not re-litigate; they came from many rendered options):**
- The device is a **CSS-drawn silver MacBook**, NOT the old spec's green-lid `laptop.svg`. There is
  **no `laptop.svg`** — it's all CSS in `css/style.css`. Green lid was dropped for full MacBook realism.
- Keyboard is the **original simple grid** (a `repeating-linear-gradient`, no individually drawn
  keycaps — the owner rejected the detailed-keycap version), plus a **wide MacBook trackpad**.
- Screen is the **original abstract placeholder** (green badge + title + line blocks, NO real text).
- Closed lid shows an **engraved tone-on-tone "AK" mark** (`.laptop-mark`), chosen over green-badge /
  green-ring / Apple-logo options.

**Structure + the hinge convention Commit 12 must use:**
- `#projects` is a separate invisible anchor (nav "Projects" + hero "View Projects" target it);
  `#laptop-scene` is the GSAP trigger. Two elements, two ids.
- `#laptop-scene { height: 300vh }` lives **in `css/style.css`, not inline**; `.laptop-sticky` is the
  `position: sticky` inner. At 100vh ScrollTrigger has no scrub room.
- The laptop is one object: a static tilted `.laptop-base` (keyboard) + a `.laptop-lip` (front
  thickness) + a `.laptop-lid-pivot` holding the `.laptop-lid`. The lid has two faces:
  `.laptop-lid-back` (silver + AK, seen closed) and `.laptop-screen-face` (dark bezel + `.laptop-screen`
  > `.laptop-screen-content`, seen open). The screen-face is a **`rotateX(180)` back face** so content
  reads upright when open (a `rotateY(180)` would render it upside-down — already fixed).
- **Animate `.laptop-lid`'s own `rotateX`: `0deg` (closed) -> `110deg` (open).** Keep the
  `translateX(-50%)` in its transform (`translateX(-50%) rotateX(<n>deg)`). The **+110** sign differs
  from the old spec's -110 because the lid sits in a pre-tilted (rotateX 62) pivot. Perspective/3D
  already have `-webkit-` prefixes; `will-change` is only on `.laptop-lid` + `.scene-container`.
- Also fade `.laptop-screen-content` in and zoom `.scene-container` (spec §4 timeline), and toggle the
  seated character mood: `.character-seated.excited` past ~55% (`updateCharacterMood`, spec §6).
- **Reduced motion:** snap the lid to `rotateX(110)` + screen visible immediately (no scrub).
- Mobile fallback (already in CSS) sets the lid open + statics the sticky below 768px.

**Owner follow-up parked:** an overall look-cleanup pass on the scene (spacing/polish) — do alongside
or after Commit 12. Then GSAP timeline details are in §6 + build-specs §4.

## 6. Remaining roadmap after the laptop scene (the moving parts)

Full per-commit detail + acceptance checks are in `tasks/todo.md`. Sequence:

1. **Commit 12, Laptop GSAP timeline:** scrub the lid open (`rotateX 0 -> -110deg`), fade the
   screen in, zoom the scene; green-glow toggle at 30-70% open; reduced-motion branch snaps to the
   final open state. `gsap.registerPlugin(ScrollTrigger)`; all init inside `DOMContentLoaded`;
   `ScrollTrigger.refresh()` after the carousel first renders.
2. **Commit 13, Project carousel:** pre-render all 5 project cards (light-island theme, `--island-*`
   dark-text tokens) inside the laptop screen; `goTo()` state machine, dots, arrows, keyboard, touch
   swipe. Project data + copy in `tasks/content.md`. In-progress card hides its Demo button.
3. **Commit 14, Character mood reactions:** `#character-face[data-mood]` drives the seated
   neutral<->excited crossfade; wire to the carousel `goTo()` and the laptop scroll zoom threshold.
4. **Commit 8 + 15, Footer + confetti (still unbuilt):** build `js/footer.js` (green CTA band,
   heading/subheading, 2x2 button grid with Resume/LinkedIn/GitHub/Email, dynamic `getFullYear()`
   copyright) injected into `#footer-root`; then a one-time `canvas-confetti` burst when `#contact`
   first enters view (skip under reduced motion). Footer copy is in `tasks/content.md`.
5. **Polish passes (Commits 16-20):** responsive (375/768/1024/1440), accessibility (focus, ARIA,
   keyboard, contrast), reduced-motion (verify every CSS + JS end-state path), SEO/OG image
   (`assets/og-image.png` 1200x630), performance (`will-change` only on `.laptop-lid` +
   `.scene-container`, no layout shift) + Vercel deploy config.

Nav + footer HTML are **injected at runtime** (`nav.js` -> `#nav-root`, `footer.js` -> `#footer-root`);
never write nav/footer HTML directly into a `.html` file.

## 7. How we work (essential process context)

- **The local preview + screenshot loop** is how we verify everything (the browser extension is not
  connected, so we drive Chrome headless):
  ```bash
  cd ~/Developer/my-portfolio && python3 -m http.server 8137      # serve
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
    --hide-scrollbars --force-device-scale-factor=2 --virtual-time-budget=2500 \
    --window-size=1280,860 --screenshot=out.png "http://localhost:8137/"
  ```
  - **Headless gotcha 1:** staggered/scroll animations get caught mid-fade. To capture the settled
    state, generate a temp page that injects `*{animation:none!important;opacity:1!important;
    transform:none!important}` and screenshot that. To see a below-the-fold section (About, laptop),
    also inject `#hero{display:none}` or `min-height:...` so it sits near the top.
  - **Headless gotcha 2:** headless Chrome clamps the viewport to ~500px min width. For the mobile
    breakpoint (<768px) use a width like 560px, not 375px. (The forced-open mobile nav dropdown in
    those snaps is a snap artifact, it is closed on the real page.)
- **Design decisions:** when a look is subjective, render 2 to 4 options side-by-side as throwaway
  `_*.html` pages and let the owner pick (done for the buttons, status chip, skill chips, bio
  emphasis, hero layout). **Delete every temp `_*.html` before committing** and double-check
  `git status`, one slipped into a commit once and had to be removed.
- **Commits:** small, focused, honest messages. **Commit AND push only when the owner asks.** End
  messages with the `Co-Authored-By` trailer for the model doing the work (recent commits use
  `Claude Opus 4.8 <noreply@anthropic.com>`; older history used `Claude Fable 5`, the owner has not
  asked to unify them). The owner reviews screenshots and drives direction.
- After each commit, update `tasks/todo.md` (Current Position + a Review Log line) and this handoff.

## 8. Key tokens / facts to have on hand

- Palette lives ONLY in `:root` in `css/style.css`. Canvas `#0F181C`, surfaces `#1B262C` /
  `#32414A` / `#3E4E58`, border `#37464F`, text `#FFFFFF` / muted `#AFAFAF`, green `#58CC02`
  (dark `#58A700`), yellow `#FFD900`, blue `#1CB0F6` (dark `#1488C4`), orange `#FF9600`.
- Resume = Google Drive link (in the hero Resume button; will also go in the footer). GitHub
  `Akhan521`, LinkedIn `in/aamir-khan-aak521`, email `aamirksfg@gmail.com`.
- **Open cleanup offer (owner has not taken it yet):** sweep the remaining em dashes out of the
  internal planning docs (`todo.md`, `build-specs.md`, older `content.md`/spec prose). Shipped copy
  + code comments are already clean.
- git needed the Xcode license accepted once (`sudo xcodebuild -license`) on this machine.
