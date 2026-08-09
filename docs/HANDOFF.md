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
  - **Matched tactile buttons**: `.duo-btn` (View Projects → `#projects`) + `.duo-btn-blue`
    (Resume → Drive link). Blue secondary CTA: face `--duo-blue` `#1CB0F6`, edge `--duo-blue-dark`
    `#1488C4`, no border — mirrors the green recipe so the tactile depth reads on the dark canvas.
  - **Status chip** `.hero-status`: "Open to SWE & AI/ML internships" + pulsing green dot; sits in
    `.hero-cta` and spans the full width of the two buttons above (`width:100%` inside a
    `fit-content` wrapper), with extra gap so the pulse ring stays clear of the text.
  - Staggered CSS entrance, idle float, reduced-motion guard in `js/home.js`.
- **About / Skills** (`#about`): "About Me" eyebrow + "What I've Learned" heading + bio on the
  left, three categorized groups of **solid-tactile skill chips** (Languages / AI·ML / Tools &
  Frameworks) on the right; stacks on mobile. **Redesigned away from the XP-bar spec** (no
  bars/%/emoji) per the north star — design doc `docs/superpowers/specs/2026-08-07-about-skills-design.md`.
  Reusable `.section-eyebrow` / `.section-heading`; GSAP ScrollTrigger reveal in `js/home.js`
  (reduced-motion guarded, "Balanced" timing: 0.55s fades, 50ms stagger). *(Built + committed +
  pushed 2026-08-07, commit `6900b59`.)*
- **Character art** (all locked, in `assets/character/`): `avatar.png` (navbar), `hero.png` +
  `hero-tight.png` (hero), `src/` masters, `reference/style-north-star.png`. Also
  `seated-neutral`/`seated-excited` masters exist in `src/` for the future laptop scene.

**Everything through the 2026-08-08 copy repositioning is committed AND pushed** to `origin/main`.
Working tree clean.

## 4. Recently done: copy repositioning (2026-08-08)

The hero + About copy was generic and factually stale (still said "currently at Handshake AI,"
which ended Jun 2026). Using Aamir's factual **information bank** (`tasks/aamir-info-bank.md`, read
it first), the copy was repositioned to: **AI software engineer on the APPLICATION side who builds
AI-powered software and ships it to production**, with Tatari as proof and the from-scratch projects
as "understands the internals" credibility, ML vocabulary kept light. Shipped as four separate
wording commits (`d7e4555`, `5d51013`, `08dd031`, `7e7a058`):

- **Hero value line:** "I build AI software and make it reliable in production, and I'm strongest at
  diagnosing why it fails." Tuned to the JD language of Aamir's target company (Decagon): leads with
  shipping + reliability and foregrounds failure diagnosis, his standout skill.
- **Hero credentials line:** "AI/ML Software Engineer Intern @ Tatari · CS Master's @ UC Riverside"
  (current role + school; kept lean, no GPA/honors).
- **Status chip:** "Open to full-time & internship AI roles" (Aamir is seeking both).
- **About bio (Bio A):** repositioned around shipping AI to production + the Tatari outage fix
  (~3.9M daily predictions) + the from-scratch projects. "end to end" dropped per Aamir (buzzwordy).

**Locked facts about Aamir (also in `tasks/aamir-info-bank.md` + memory):** targets AI software
engineering / AI engineering, **application side, NOT ML engineering**. Current: AI/ML SWE Intern @
Tatari (through Sep 2026). MS CS @ UCR (4.0), grad Dec 2026. Seeking both full-time + internship. OK
to name Tatari + cite metrics. Target company = Decagon (conversational-AI agents). All copy stays
**em-dash free** (avoid "end to end" too).

**Still open (worth raising):** the skill chips could gain a small "production ML systems" signal
(his real differentiator: MLflow / Databricks serving / FastAPI / feature stores), curated and
application-leaning, not overloaded. Not done yet.

## 5. Then continue the roadmap

After the copy pass, the next build is the **Laptop scene** (Section 4 in `tasks/build-specs.md`):
`#projects` anchor + a 300vh `#laptop-scene` sticky structure, the seated character masters + a
CSS/SVG laptop, static 3D first (GSAP scrub in the following commit). **Read every line of
Section 4 first** (Safari `preserve-3d` differences, and the sticky height must live in CSS).
After that: project carousel, character mood reactions, footer + confetti, then the polish
passes. Full sequence in `todo.md`.

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
