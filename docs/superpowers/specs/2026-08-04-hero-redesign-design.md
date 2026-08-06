# Hero Section Redesign — Design (FINAL)

**Status:** Final — all decisions locked (frame treatment chosen 2026-08-05). Ready to implement.

## Why

The initial hero (commit `88310c3`) read as generic / AI-generated. Root causes the owner
flagged: a **waving 👋 emoji** (cliché), a **fake "🔥 Streak: 365 days" badge** (hollow
game-mechanic decoration), and a **mismatched button pair** (filled primary vs thin outline).
The "bare portrait floating on the right" is also the default auto-generated hero layout.

## North star (agreed)

Clean, professional, confident, **original** — keeps Duolingo's DNA (Feather green, rounded
tactile shapes, warmth, the character) but **drops literal game mechanics** (no XP/streak/badges).

## Chosen approach: B — Framed Character

Feature the character prominently, but inside a **deliberate Duolingo-shaped frame** so it reads
as an intentional design element (a "profile card"), not a stock floating cutout.

## Decisions locked

- **Remove** the waving emoji and the streak badge entirely.
- **Greeting:** warm **"Hi, I'm Aamir!"** (first name only — the navbar already shows the full
  "Aamir Khan", and first-name fits on one line with no orphaned word; no emoji), large/bold
  (Nunito 900).
- **Role:** "Aspiring AI Engineer" — Feather green, weight 800.
- **Value line:** "CS Master's student at UC Riverside, building applied AI and agentic systems."
- **Credentials line:** "AI Trainer @ Handshake AI · AI Product Tester @ DeepLearning.AI" (muted).
- **Matched button pair** (fixes the mismatch): both tactile Duolingo buttons —
  - Primary: `.duo-btn` green (**View Projects** → `#projects`).
  - Secondary: **new `.duo-btn-neutral`** (surface-2 bg, `--duo-border` border, tactile bottom
    shadow in **`--duo-canvas`** — darker than the fill so the depth reads; `--duo-border` was
    too close to the fill to show — 4px press) — **Resume** (Drive link, new tab). Same weight
    as the primary.
- **Real status chip** (replaces the streak): pill with a **pulsing green "available" dot** +
  "Open to SWE & AI/ML internships". Meaningful info; the pulse is the *purposeful* motion that
  replaces the decorative wave.
- **Character frame:** a rounded Duolingo-shaped panel with the tactile bottom shadow; the
  character fills it via `object-fit: cover` using a **tight-cropped** image
  (`assets/character/hero-tight.png`, 637×826 — crop of `hero.png` removing its ~18% transparent
  top/bottom margins so it fills the frame with no empty space).
- **Frame treatment (CHOSEN — option 3, "green-tinted / middle ground"):** a dark green-tinted
  panel fill (`#16241C`), a **3px `--duo-green` border**, the green tactile bottom shadow
  (`0 10px 0 var(--duo-green-dark)`), **plus a soft radial green glow behind the character's head**
  (`radial-gradient(circle, rgba(88,204,2,0.55) 0%, rgba(88,204,2,0) 68%)`, sized ~78%×70%,
  centered ~44% from the top, z-index BELOW the character image). Keeps the classy dark frame
  while the glow lifts the character off the background so he still pops. `border-radius: 34px`,
  `overflow: hidden`. (Rejected: option 1 dark-panel-only — character popped too little; option 2
  bright-green — too much green.)
- **Layout:** text-left (~55%) / framed character right (~45%); stacks on mobile (< 768px).
- **Motion:** gentle idle float on the framed portrait + the pulsing availability dot. Respect
  `prefers-reduced-motion` (snap to final state).

## Follow-on doc updates (when implementing)

- `CLAUDE.md` summary still says "XP/streak gamification framing" — update to reflect the
  clean-professional direction (drop literal game mechanics).
- `tasks/content.md` — remove the streak-badge copy; record the status-chip copy + the new
  greeting/value/credentials split.
- `tasks/build-specs.md` — replace the Section 2 (Hero) spec with this redesign; add
  `.duo-btn-neutral` to the button components.

## Implementation note

This replaces the initial hero from commit `88310c3` (index.html hero markup + hero CSS in
`css/style.css`). Reuse the existing tokens, `.container`, and entrance/reduced-motion patterns.
