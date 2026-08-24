# CLAUDE.md, Aamir Khan's Portfolio (retro-terminal revamp)

Personal portfolio for **Aamir Khan**, an **AI software engineer** (application side: builds AI
systems and ships them to production) and CS Master's student at UC Riverside. The site is being
rebuilt as a **retro terminal / vintage-computer** experience in **Branon Eusebio's design
language** (branon.dev), scoped so it reads unmistakably as an AI software engineer's portfolio:
the retro shell is the frame, the AI work is the hero.

> **Status: early build.** The Next.js app is scaffolded and stripped to a bare home route on
> `main`. Chakra UI, design tokens, fonts, the terminal shell, and all sections are not built yet.
> This file describes the current stack + locked direction; deep design detail lives in the
> reference docs below. When something here and a reference doc disagree, the reference doc wins
> for its area.

**History:** this repo previously held a "Duolingo Night Mode" vanilla HTML/CSS/JS site. That build
is **parked** (fully backed up: git tag `duolingo-night-mode-v1`, branch `backup/duolingo-night-mode`,
offline copy `~/Developer/my-portfolio-duolingo-backup-2026-08-18`, and `my-portfolio-backup`). Its
pre-pivot handoff is archived at `docs/HANDOFF.md`.

---

## Reference files, where the detail lives

**Start here to resume:** `docs/revamp-handoff.md` (the live orientation doc).

| File | Contains |
|---|---|
| `docs/revamp-handoff.md` | **Live orientation.** Current state, next task, Branon inner-page patterns. Read first. |
| `~/.claude/plans/as-i-was-working-deep-crayon.md` | The full revamp plan (phases 0-6, design system, positioning constraint). |
| `tasks/content.md` | **Verbatim content**: projects, skills, and all section copy. Use these values exactly. |
| `tasks/todo.md` | Current Position + Review Log (also still holds the parked Duolingo commit plan). |
| `tasks/aamir-info-bank.md` | Factual source of truth about Aamir (background, Tatari work, projects). |
| `tasks/tatari-accomplishments-report.md` | Sanitized, cleared-for-public Tatari accomplishments. |
| `docs/HANDOFF.md` | **Archived** pre-pivot Duolingo handoff (parked build only). |
| `~/Developer/branon-portfolio-ref` | Read-only clone of Branon's repo (design-language reference). |

---

## Owner Information

| Field | Value |
|---|---|
| Name | Aamir Khan |
| Role | AI Software Engineer (application side; not ML engineer) |
| Positioning | Builds AI systems and gets them into production; strongest at diagnosing why they fail. |
| Current | AI/ML Software Engineer Intern @ Tatari (production ML platform), through Sep 2026 |
| Education | MS CS @ UC Riverside (grad Dec 2026); BS CS, Summa Cum Laude |
| GitHub | https://github.com/Akhan521 |
| LinkedIn | https://www.linkedin.com/in/aamir-khan-aak521/ |
| Email | aamirksfg@gmail.com |
| Resume | https://drive.google.com/file/d/1XmkXP_88RvogZ676RelvgUsJtfBq8vhm/view?usp=sharing (Drive viewer, not a direct PDF) |

**Positioning rules (read before any copy/content work):** target **AI software engineer /
application side** (agents, LLMs, RAG, pipelines, evals, latency), keep heavy ML/MLOps vocabulary
light in headline copy. Tatari metrics are **fully cleared for public use** (per Aamir). Avoid the
phrase "end to end" (he finds it buzzwordy). **No em dashes anywhere** (use commas, colons, or split
sentences), in copy and in these docs.

---

## Tech Stack

Building on **`main`** (the vanilla Duolingo build is parked/backed up; `my-portfolio-backup` is the
working safety net). New commits go straight to `main`.

- **Next.js 15.5 + React 19 + TypeScript**, App Router, `src/` dir, ESLint, Turbopack, `@/*` alias.
- **Chakra UI v2 + Emotion** for styling (Branon's exact stack, so his `theme.ts`, `RetroCard`,
  filter pills, and `PAPER_BG_SX` port nearly 1:1). v2 deliberately (matches Branon); v3 is a future
  migration. *Not installed yet, this is the next step.*
- **GSAP** for animation (deliberately not Framer Motion, despite Branon using Framer). Use
  `@gsap/react` `useGSAP`.
- **MDX** for writing/projects long-form (planned).
- **Fonts (self-hosted OFL):** Press Start 2P (pixel, SHORT labels/name/eyebrows only, never long
  text) + IBM Plex Mono (all body). Via `next/font/local` (planned).
- **Deploy:** Vercel. **Auto-deploy is PAUSED during the rebuild** so the live URL is not replaced
  mid-build; deploy intentionally at cutover.

---

## Current File Structure

```
my-portfolio/
├── CLAUDE.md               ← this file
├── README.md
├── next.config.ts, tsconfig.json, eslint.config.mjs, package.json
├── src/app/                ← App Router
│   ├── layout.tsx          ← root layout (Chakra provider goes here next)
│   ├── page.tsx            ← bare home placeholder
│   └── globals.css         ← minimal reset (Chakra provides the full one)
├── public/                 ← (empty; starter SVGs removed)
├── docs/                   ← revamp-handoff.md (live), HANDOFF.md (archived), superpowers/specs/
└── tasks/                  ← content.md, todo.md, and the other reference docs
```

Components, theme, fonts, and routes are added as we build. Follow Branon's structure where it
helps (`src/components/`, `src/lib/`, a `theme.ts`), reinterpreted for the terminal device.

---

## Design language (validated in mockups; will live in the Chakra theme)

Warm paper surfaces with a dark phosphor "screen." Hard corners (radii near 0); tactile press is a
`translateY` on `:active`, not a rounded ledge. Press Start 2P for short labels only; IBM Plex Mono
for body. LCD scanline overlay + paper grain/vignette (`PAPER_BG_SX`), all reduced-motion aware.

```
paper #EEE6D3   surface #F7F2E4   surface-2 #EFE6D0
ink #332C1C     olive #4B5A2E     muted #5C6B44     border rgba(75,90,46,.25)
screen #1D2A0C  (dark CRT)
cartridge accents:  red #f05032   yellow #fbbf24   green #22c55e   blue #61dafb   purple #a78bfa
phosphor tiers (screen text):  base #c7d59a  dim #7f9a54  cream #f1ead4  ok #9be36b  path #7fd7f0  faint #5f7640
```

**Sections:** ABOUT · PROJECTS · EXPERIENCE · WRITING · CONTACT (classic + recruiter-legible; the AI
signal lives in the content, not game tropes). Design decisions so far:
- **Hero:** a terminal window (an agent session resolving to Aamir's identity, ending on
  `you> ask me anything`, the future live-demo slot) beside a `SELECT A PROGRAM` menu.
- **PROJECTS (locked):** a package-manager-style **filter-pill index list** (pixel heading, category
  filter pills, list rows with descriptions + a keyboard-selected state). The single-project detail
  screen is deferred to when we build that section.
- **Inner pages have no navbar** (like Branon): a fixed `ESC / MENU` chip + wordmark corner chrome;
  the `SELECT A PROGRAM` menu is hero-only.

Full design system + positioning constraint: the plan doc. Branon patterns to draw from:
`docs/revamp-handoff.md`.

---

## Commands & workflow

```bash
npm run dev      # local dev server (Turbopack)
npm run build    # production build + type-check (use to verify)
npm run lint
```

**Verify visually with headless Chrome** (the browser extension is not connected):
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --hide-scrollbars --force-device-scale-factor=2 --window-size=1440,900 \
  --screenshot=out.png "http://localhost:3000/"
```
- **Gotcha:** headless Chrome clamps the window to ~500px minimum width. For a mobile capture use a
  width of 500+, not 375, or the screenshot just crops (it is not real overflow).

---

## Working conventions

- Small, focused, honest commits; end messages with the `Co-Authored-By` trailer for the model doing
  the work. **Commit and push only when Aamir asks.**
- Design decisions are made by rendering options and letting Aamir react (his workflow across the
  whole revamp). Treat the plan + specs as guidance to iterate on, not law.
- After meaningful changes, update `docs/revamp-handoff.md` (state/next task) and `tasks/todo.md`
  (Current Position). Avoid adding new standalone docs (Aamir dislikes doc sprawl).
