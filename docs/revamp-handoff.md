# Revamp Handoff — start here for a fresh session

Single orientation doc for the **portfolio revamp**. For the parked Duolingo build, see
`tasks/todo.md` (roadmap below the Current Position block) — it is fully backed up and untouched.

---

## The one-paragraph state

Aamir's portfolio is being revamped from "Duolingo Night Mode" into a **retro terminal /
vintage-computer** theme, built in **Branon Eusebio's design language** (branon.dev), and
scoped so it reads unmistakably as an **AI software engineer's** portfolio (the retro shell is
a frame; the AI work is the hero). We proved we can faithfully emulate Branon, then pivoted the
device from a Game Boy console to a terminal so it never reads as game-dev. The **hero is
designed and validated** (see the mockup). Next up: prove the concept holds beyond the hero by
designing one "program" (section) screen.

## Decisions locked

- **Look:** Branon's warm paper palette (`bg #EEE6D3`, surface `#F7F2E4`, ink `#332C1C`,
  screen `#1D2A0C`, accents red `#f05032` / yellow `#fbbf24` / green `#22c55e` / blue `#61dafb`
  / purple `#a78bfa`). Fonts: Press Start 2P (pixel labels) + IBM Plex Mono (body/terminal),
  both OFL, self-hostable. Site flips dark → light.
- **Hero composition:** mirrors Branon's landing (device left, menu right), swapping the Game
  Boy for a **terminal window**; his "INSERT CARTRIDGE" menu reframed as `SELECT A PROGRAM`.
- **Sections:** ABOUT · PROJECTS · EXPERIENCE · WRITING · CONTACT (classic labels; AI signal
  in the content).
- **Terminal content:** an "agent session" that resolves to Aamir's identity, ending on
  `you> ask me anything` (the swappable surface where a real live agent demo lands later — no
  live demo in v1, but architect for it). Builder + debugger both foregrounded.
- **Stack (for the real build):** Next.js + React + TypeScript + GSAP + MDX. New app; this repo's
  `main` stays the vanilla Duolingo build until cutover.
- **Character:** regenerate Aamir as a pixel sprite (not yet started).

## What exists right now

- **Hero mockup (validated):** `docs/design-explorations/terminal-hero/` — see its README to
  view (`python3 -m http.server 8096`). `preview.png` is a static capture.
- **Reference clone of Branon's repo:** `~/Developer/branon-portfolio-ref` (read-only). His
  tokens: `src/app/theme.ts`; menu UX: `src/components/boot-intro/BootIntro.tsx`; screen/paper
  formulas: `src/lib/consoleTheme.ts`.
- **Full plan (outside repo):** `~/.claude/plans/as-i-was-working-deep-crayon.md`.
- **Real content to build with:** `tasks/content.md` (projects: GPT-From-Scratch, Text2SQL
  LLaMA, Snaption, bat-code, Pixelate; Tatari production-ML proof; skills; copy).

## Open design-iteration items (parked)

- The terminal's agentic tool-call trace (`● Search/Task` + `⎿` results) was removed on
  2026-08-18 pending iteration — decide how/whether it returns above the intro.
- Terminal has some empty mid-screen space now the trace is gone.
- Not yet designed: menu hover/active states, a peeking "program disk," boot lines typing in.

## NEXT TASK (do this first next session)

**Design one "program" screen** — what a section looks like when you "run" it from the menu
(recommend starting with **PROJECTS** or **ABOUT**), in the same Branon terminal language. Goal:
de-risk the whole build by proving the metaphor sustains for real content, not just the landing.
Then decide: keep iterating mockups, or scaffold the Next.js app.

## Paste-prompt for the fresh session

> Continue the portfolio revamp. Read `docs/revamp-handoff.md`, the Current Position block in
> `tasks/todo.md`, and your memory on the retro-terminal revamp. We've locked the retro-terminal
> hero (Branon's design language, AI-agent-forward, mockup in
> `docs/design-explorations/terminal-hero/`). Today's task: design one "program"/section screen
> (start with PROJECTS or ABOUT) in the same terminal language, using my real content in
> `tasks/content.md`, to prove the concept holds beyond the hero. Build it as a throwaway HTML
> mockup and render it with headless Chrome for me to react to (extension isn't connected). Keep
> originality the top priority — no generic/AI-generic looks. No em dashes.
