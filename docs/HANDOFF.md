# Portfolio — Session Handoff (as of 2026-08-05)

A single-file orientation for resuming work on Aamir Khan's Duolingo-themed portfolio.
Read this first, then `tasks/todo.md` (the authoritative roadmap + Current Position).

---

## 1. What this project is

Aamir Khan's personal portfolio — a **dark-only "Duolingo Night Mode"** static site.
Vanilla HTML/CSS/JS (no framework, bundler, or npm). GSAP + canvas-confetti via CDN.
Repo: `~/Developer/my-portfolio` → GitHub `Akhan521/my-portfolio` (branch `main`).

**Design north star (important):** clean, professional, **original** — keeps Duolingo's DNA
(Feather green `#58CC02`, rounded tactile shapes, warmth, the character) but **avoids literal
game mechanics** (no XP/streak/badge decoration). Motion and UI must carry real meaning, not
gimmicks. The owner actively rejects anything that "screams AI-generated." Titles/copy should
be competitive and truthful. **Treat the spec docs as guidance to iterate on, not law** — the
owner decides by reacting to what he sees.

## 2. Where to look (the docs that run this project)

| File | Purpose |
|---|---|
| `tasks/todo.md` | **Authoritative roadmap** — commit plan, Current Position, Review Log. Start here. |
| `CLAUDE.md` | Lean project spec: tokens, conventions, critical notes, file structure. |
| `tasks/build-specs.md` | Deep implementation detail: HTML shell, nav/footer, component CSS, per-section specs, animation system. |
| `tasks/content.md` | Verbatim copy + data (projects, skills, hero/footer text). |
| `tasks/duolingo-style.md` | Character-art bible — the AI image-generation pipeline + rules. |
| `tasks/lessons.md` | Correction lessons — review at session start. |
| `docs/superpowers/specs/2026-08-04-hero-redesign-design.md` | The finalized hero redesign spec. |

## 3. Current state — what's DONE and live

- **Navbar** (`js/nav.js` + CSS): brand (avatar + "Aamir Khan"), links, "Hire Me" CTA, dark-
  theme scroll elevation (tonal lift, not an invisible shadow), mobile hamburger, polished
  focus rings (CTA ring anchored to a wrapper so the tactile press shows).
- **Hero** (`#hero` in `index.html` + CSS): the redesigned "Approach B" —
  - Warm greeting **"Hi, I'm Aamir!"** (first name; navbar already shows the full name).
  - Role: **"AI Software Engineer"** (green). Value line + muted credentials line.
  - **Framed character**: `.hero-frame` — green-tinted dark panel (`#16241C`), 3px green
    border, tactile bottom shadow, soft radial green glow behind the head; character fills it
    via `assets/character/hero-tight.png` + `object-fit: cover`.
  - **Matched tactile buttons**: `.duo-btn` (View Projects → `#projects`) + `.duo-btn-neutral`
    (Resume → Drive link). Neutral face `--duo-surface-3`, edge `--duo-surface`, no border.
  - **Status chip** `.hero-status`: "Open to SWE & AI/ML internships" + pulsing green dot.
  - Staggered CSS entrance, idle float, reduced-motion guard in `js/home.js`.
- **Character art** (all locked, in `assets/character/`): `avatar.png` (navbar), `hero.png` +
  `hero-tight.png` (hero), `src/` masters, `reference/style-north-star.png`. Also
  `seated-neutral`/`seated-excited` masters exist in `src/` for the future laptop scene.

**Everything above is committed and pushed.** Working tree is clean.

## 4. OPEN — pick up here next session (owner-flagged, do BEFORE the About section)

1. **Refine the `.hero-status` chip** ("Open to SWE & AI/ML internships", sits below the two
   buttons). Owner wants to revisit its look — treatment TBD (size, style, emphasis, maybe an
   icon). Currently: pill on `--duo-surface` / `--duo-border`, weight 700, pulsing green dot.
2. **Improve the Resume button color/contrast.** Even after the fix (face `--duo-surface-3`
   `#3E4E58`, edge `--duo-surface` `#1B262C`), the face↔edge contrast is still a bit hard to
   read on the dark canvas. Explore: a lighter/warmer face, a darker or tinted edge, or a
   subtle accent color (e.g. `--duo-blue`) — but keep it a **matched tactile pair** with the
   green View Projects button (same size, same 4px press, equally clear depth). Render
   candidates side-by-side for the owner to choose (see workflow below).

## 5. Then continue the roadmap

Next planned section is **About / Skills** (Section 3 in `tasks/build-specs.md`): SKILL TREE
eyebrow, "What I've Learned" heading, bio, and a 2-column `.skill-card` grid with GSAP-animated
XP bars. After that: laptop scene (Section 4, uses the seated character masters + a CSS/SVG
laptop), project carousel, footer + confetti, then the polish passes. Full sequence in `todo.md`.

## 6. How we work (essential process context)

- **The local preview + screenshot loop** is how we verify everything (the browser extension
  isn't connected, so we drive Chrome headless):
  ```bash
  cd ~/Developer/my-portfolio && python3 -m http.server 8137      # serve
  # screenshot (desktop):
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
    --hide-scrollbars --force-device-scale-factor=2 --virtual-time-budget=3500 \
    --window-size=1280,860 --screenshot=out.png "http://localhost:8137/"
  ```
  - **Headless gotcha 1:** staggered CSS entrance animations often get caught mid-fade in a
    screenshot. To capture the settled state, inject a small override that snaps
    `animation:none;opacity:1;transform:none` on the animated elements (we write a temp
    `_herosnap.html` for this), or emulate reduced motion.
  - **Headless gotcha 2:** headless Chrome clamps the viewport to ~500px min width — to shoot
    the mobile breakpoint (<768px) use a width like 560px, not 375px.
- **Design decisions:** when a look is subjective, render 2–4 options side-by-side as a throwaway
  `_*.html` page and let the owner pick (we did this for the focus ring and the frame). **Delete
  temp `_*.html` files before committing** — one (`_frames.html`) slipped into a commit and had
  to be removed; double-check `git status` before `git add -A`.
- **Character art** is AI-generated (ChatGPT) by the owner, then background-removed via macOS
  subject lift; Claude sizes/wires it. See `tasks/duolingo-style.md`.
- **Commits:** small, focused, honest messages; end with the `Co-Authored-By: Claude Fable 5`
  trailer. Push when the owner asks. The owner reviews screenshots and drives the direction.

## 7. Key tokens / facts to have on hand

- Palette lives ONLY in `:root` in `css/style.css`. Canvas `#0F181C`, surfaces `#1B262C` /
  `#32414A` / `#3E4E58`, border `#37464F`, text `#FFFFFF` / muted `#AFAFAF`, green `#58CC02`
  (dark `#58A700`), yellow `#FFD900`, blue `#1CB0F6`, orange `#FF9600`.
- Owner: Aamir Khan · AI Software Engineer · CS Master's @ UC Riverside · AI Trainer @ Handshake
  AI · AI Product Tester @ DeepLearning.AI. GitHub `Akhan521`,
  LinkedIn `in/aamir-khan-aak521`, email `aamirksfg@gmail.com`, resume = Google Drive link
  (in the hero Resume button + will be in the footer).
- `index.html` still has a TEMP spacer div (`<div style="height: 45vh;">`) after the hero for
  scroll room — remove it when the About/Laptop sections land.
- git needed the Xcode license accepted once (`sudo xcodebuild -license`) on this machine.
