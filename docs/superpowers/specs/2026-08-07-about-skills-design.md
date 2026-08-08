# About / Skills Section — Design (2026-08-07)

Finalized design for **Commit 10** (About / Skills, `#about`). Supersedes the original
`tasks/build-specs.md` Section 3 spec where they conflict (see "Divergence" below).

## North star

Clean, professional, recruiter-scannable. Keep Duolingo DNA (green, rounded tactile shapes,
warmth) but **no literal game mechanics** — this section drops the spec's XP bars, "XP" labels,
"SKILL TREE" eyebrow, and emoji, all of which read as the game-y/AI-generic decoration the owner
has been retiring (cf. the hero streak-badge + emoji removal).

## Divergence from `build-specs.md` Section 3

| Original spec | This design | Why |
|---|---|---|
| Eyebrow "SKILL TREE" | Eyebrow **"ABOUT ME"** | Drop game framing |
| Skill cards with animated **XP bars** + "[level] XP" | **Tactile skill chips**, grouped by category, no bars/%, no XP | Arbitrary % reads as AI-generic filler; not truthful signal |
| Emoji icons (🐍🔥…) | No icons | Emoji retired site-wide as AI-generic |
| 2-col `.skill-card` grid | Chips in flex-wrap groups | Fits categorized, non-numeric approach |

Heading **"What I've Learned"** is kept — a warm nod to the *learning* idea, not a game mechanic.

## Content (curated — "not overloaded", owner-confirmed)

- **Eyebrow:** `ABOUT ME`
- **Heading:** `What I've Learned`
- **Bio** (from `tasks/content.md`, trailing "Open to SWE and AI/ML internships" line trimmed —
  the hero status chip already states availability):
  > I'm Aamir — a CS Master's student at UC Riverside with a focus on applied AI and agentic
  > systems. I've built transformers from scratch, fine-tuned LLMs, and shipped AI-powered tools.
  > Currently training AI models at Handshake AI and testing AI products at DeepLearning.AI.
- **Skills** (3 categories; all owner-confirmed as real, incl. the RAG / fine-tuning / LangChain /
  vector-DB probe):
  - **Languages:** Python · SQL · JavaScript · C++
  - **AI / ML:** PyTorch · LLMs & NLP · Agentic AI · RAG · Fine-tuning (LoRA/PEFT) · Transformers
  - **Tools & Frameworks:** Hugging Face · LangChain · FastAPI · Docker · Git · NumPy / Pandas
  - *Deliberately set aside (not overload):* generic "Machine Learning", standalone Vector
    DBs/embeddings (implied by RAG), React / Node (web-leaning). Trivial to add back later.

## Layout

- Section `#about`, `background: var(--duo-canvas)`, `padding: 5rem 0`, inside `.container`.
- Two columns: **bio ~45% left**, **skills ~55% right**; single column stacked on mobile
  (<768px), bio first.
- Eyebrow + heading sit above/with the bio column.

## Chip visual (chosen: **A · Solid tactile**)

- `.skill-chip`: `background: var(--duo-surface-2)`, `color: var(--duo-text)`,
  `box-shadow: 0 2px 0 var(--duo-surface)` (subtle tactile ledge), `border-radius: var(--radius-pill)`,
  `padding: 8px 15px`, `font-weight: 700`, `font-size: 0.9rem`, `white-space: nowrap`.
- Non-interactive (labels, not buttons) — no hover/press states.
- Category label `.skill-cat-label`: `var(--duo-green)`, uppercase, `~0.72rem`, weight 800,
  `letter-spacing: 0.12em`.
- Groups: `display: flex; flex-wrap: wrap; gap: 10px`; category blocks stacked with vertical gap.

## Motion (GSAP, real not gimmick)

- Gentle scroll-in stagger for the chips (and/or category groups) via ScrollTrigger
  (`start: 'top 75%'`, `y: 16→0`, `opacity: 0→1`, small `stagger`, `ease: 'power2.out'`).
- **No XP-fill animation.** Reduced-motion: snap all to final state (per site convention).

## Files touched

- `index.html` — `#about` section markup (replaces the TEMP `<div style="height:45vh">` spacer).
- `css/style.css` — `#about` layout + `.skill-chip` / `.skill-cat-label` + reduced-motion.
- `js/home.js` — the chip scroll-stagger slice.
- Sync: `tasks/build-specs.md` Section 3, `tasks/content.md` (curated skills + trimmed bio),
  `tasks/todo.md` (Commit 10), `docs/HANDOFF.md`.

## Acceptance

- Section renders below the hero (no leftover spacer), bio left / skills right on desktop,
  stacked on mobile.
- Chips are the solid-tactile style, grouped under green category labels, no bars/%/emoji.
- Chips stagger in on scroll; reduced motion snaps them to final. No console errors.
