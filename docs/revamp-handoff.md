# Revamp Handoff — start here for a fresh session

Single orientation doc for the **portfolio revamp** (this is the live handoff, start here). For the
parked Duolingo build, see `tasks/todo.md` (roadmap below the Current Position block) and the archived
`docs/HANDOFF.md` (its pre-pivot orientation) — that build is fully backed up and untouched.

---

## The one-paragraph state

Aamir's portfolio is being revamped from "Duolingo Night Mode" into a **retro terminal /
vintage-computer** theme, built in **Branon Eusebio's design language** (branon.dev), and
scoped so it reads unmistakably as an **AI software engineer's** portfolio (the retro shell is
a frame; the AI work is the hero). We proved we can faithfully emulate Branon, then pivoted the
device from a Game Boy console to a terminal so it never reads as game-dev. As of **2026-09-01 the
site is built end to end on `main`**: the Next.js app (Chakra UI v2 + Emotion, design tokens,
self-hosted fonts, paper background), the terminal shell pair, the hero + `SELECT A PROGRAM` menu,
and **all four real section screens** (ABOUT, PROJECTS, EXPERIENCE, CONTACT), each verified desktop +
narrow. WRITING was deliberately dropped (no body of writing). Remaining work is polish and
interactivity, not new sections. Full detail in "What exists right now" and NEXT TASK.

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
- **Stack (for the real build):** Next.js + React + TypeScript + GSAP + MDX, with **Chakra UI v2 +
  Emotion** for styling (Branon's stack, chosen 2026-08-23 so his components/tokens port nearly 1:1).
- **Where it's built (changed 2026-08-23):** directly on this repo's **`main`** (Aamir's call; the
  vanilla build is backed up via `my-portfolio-backup` + git tags/branches). Vercel **auto-deploy is
  paused** during the rebuild so the live URL is not replaced mid-build.
- **Character:** regenerate Aamir as a pixel sprite (not yet started).

## What exists right now

- **Next.js Phase 0 foundation, built + pushed on `main` (2026-08-24):** Next 15.5 + React 19 + TS
  (App Router, `src/`, Turbopack, `@/*`); vanilla Duolingo site removed (recoverable in git +
  `my-portfolio-backup`). **Chakra UI v2 + Emotion** wired via `src/app/providers.tsx`. Design tokens
  in `src/app/theme.ts` (`brand.*` paper, `cartridge.*` accents, `screen.*` phosphor tiers; radii;
  light color mode). Self-hosted fonts in `src/app/fonts.ts` (Press Start 2P + IBM Plex Mono, as CSS
  vars). Paper background (`PAPER_BG_SX` grain + vignette) in `src/lib/consoleTheme.ts`, applied
  globally. The **terminal shell pair is built** (`src/components/terminal/TerminalWindow.tsx` +
  `TerminalScreen.tsx`): the paper window frame (title bar, traffic-light dots, path, status slot) and
  the phosphor CRT surface (radial glow, inset shadow, scanline overlay, phosphor text tiers). The
  **hero is built** (`src/components/hero/`): `HeroTerminal` (the `ak agent` identity session ending on
  `you> ask me anything`, blinking cursor), `ProgramMenu` (the SELECT A PROGRAM section selector), and
  `Hero` (the height-matched two-column layout, stacks on mobile), rendered at `src/app/page.tsx`. All
  ported verbatim from the locked hero mockup. **Inner-page chrome is built**
  (`src/components/chrome/ConsoleChrome.tsx` = fixed `ESC · MENU` chip + wordmark, both link home),
  applied via the `src/app/(console)/` route-group `layout.tsx`; the hero's `ProgramMenu` items link to
  their section routes. **`/projects` is fully built** (`src/app/(console)/projects/page.tsx`): the
  locked filter-pill index (pixel heading, category filter pills, five project rows with descriptions +
  category meta + `BUILDING` badge + a keyboard-selected row, footer, mobile reflow; content from
  `tasks/content.md`). The other four sections (`/about`, `/experience`, `/writing`, `/contact`) are
  **on-theme stubs** via a shared `src/components/section/SectionStub.tsx` (so every menu link resolves).
  `CLAUDE.md` has the stack.
- **Design mockups (removed from repo):** the throwaway HTML mockups (hero + the four PROJECTS
  variations) were deleted once their decisions were captured here and in memory — they were only
  mockups, not final designs. Still recoverable from git history if ever needed: hero `a880e68`,
  PROJECTS variations `f7beb76`, locked PROJECTS index `1d8bfaf`.
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

## Section-screen findings (2026-08-21)

Explored the PROJECTS section screen. Owner leans toward a **package-manager / catalog** feel
(a filterable list of all projects) over a one-at-a-time view. Owner dislikes the cramped inline
"loaded project" detail; that loaded/detail view needs its own treatment (revisit when we build
this section for real). Four mockups were tested then removed from the repo (recoverable in git,
`f7beb76` + `1d8bfaf`): **A** catalog list + inline detail, **B** focused single-disk viewer with a
hand-drawn pixel floppy, **C** two-pane TUI browser (list + full detail), **D** the filter-pill
index list. Owner chose **D**, polished with real per-project descriptions, a keyboard-selected
row state, ESC/wordmark corner chrome (no inner-page navbar), and a verified mobile reflow.

**Branon's real inner-page patterns (draw from these, tweak per section when we build each):**
- His Projects page IS a package-manager list: `RetroCard` > `PageHeading` (pixel title +
  muted subtitle) > **filter pills** by category (`RetroFilterPill`: mono 12px, chunky 2px
  border, active = `{color}18` bg / `{color}55` border) > a vertical **list of rows**
  (`TopLevelListItem`: hover-arrow, title, `category · date` meta right-aligned, `IN PROG`
  badge, a 2px top divider that collapses on hover, row hover = `{accent}14` bg + translateX).
  Selecting a project navigates to a **separate detail/post page** — detail is never an inline
  panel. Source: `src/app/(product)/projects/{page.tsx,consts.ts}`, `TopLevelListItem.tsx`,
  `PageHeading.tsx`, `RetroFilterPill.tsx`.
- **No navbar on inner routes.** Persistent chrome lives in `src/app/(product)/layout.tsx`: a
  fixed **ESC / power button** top-left (returns to the console home, themed to the section's
  accent) + a sound-toggle, and the **wordmark logo** top-right (also powers off). In-console
  navigation is the persistent `CartridgeNav` row, not a top nav bar. Our terminal equivalent:
  the `SELECT A PROGRAM` menu is only the home/hero selector; inner section screens should drop
  it and use a slim ESC-to-menu affordance + section switcher instead. Design each section's
  chrome one at a time, borrowing from Branon and tweaking.

## NEXT TASK (do this first next session)

**ALL SECTIONS ARE NOW BUILT (2026-09-01, all pushed).** The site is complete end to end: hero →
`SELECT A PROGRAM` menu → four real section screens → `ESC · MENU` back. No stubs remain (the
`SectionStub` component is now unused; safe to delete when convenient). Site-wide, command prompts
dropped the `ak` prefix (bare `$ whoami`, `$ projects --list`, `$ agent`, etc., commit `281703a`).
- **`/projects`:** the locked filter-pill index (pixel heading, category pills, five rows with a
  keyboard-selected state). Filtering + row-open are still static (see "next").
- **`/about`** (`d882dfe`): `whoami` prints the two verbatim bio paragraphs (Tatari proof phrases
  tinted phosphor green `screen.ok`); `skills --grouped` prints four categorized chip groups under `#`
  comment headers, reusing the `/projects` filter-pill chip vocabulary.
- **`/experience`** (`3d9f551`): `experience --log` renders the three roles as a **git-log --graph**,
  each a `*` commit node with its **own rail segment** (node → its last bullet, bracketing where each
  role begins/ends), title + `company · dates` meta (`→` for ranges), metrics tinted bright. Copy
  composed from `tasks/aamir-info-bank.md`.
- **`/contact`** (`e540478`): the site's close (resolves the hero's `you> ask me anything`). `contact`
  prints the CTA line + a **channels manifest** of four hoverable link rows (email/github/linkedin/
  resume, cyan values, translateX on hover), a pulsing-green availability line, and the blink cursor.
  Title-bar chip reads `open to work`. Links canonical per `CLAUDE.md`.
- **WRITING was dropped** (`6214e15`): Aamir has no body of writing, and an empty writing tab reads as
  unfinished on a hiring portfolio. Four honest sections instead of five. Easy to re-add (one menu
  line + one route) if he ever writes a technical piece (e.g. the Tatari outage postmortem).

All verified desktop + narrow; `tsc` + lint clean. With every section real, remaining work is polish
and interactivity, in small commits:
1. Make PROJECTS **interactive** (real filter-pill clicks + row hover/open), which ties into the
   deferred single-project detail screen.
2. Open design-iteration items still parked (see below): hero tool-call trace, menu hover/active
   states, boot lines typing in, a pixel sprite of Aamir.
3. Pre-cutover: verify every project/resume URL, then plan the Vercel deploy (auto-deploy is paused).
**Deferred:** the single-project detail screen from the PROJECTS index (Branon opens a separate page;
ours should too).

**Live deploy:** Vercel auto-deploy is paused during the rebuild; deploy intentionally at cutover.

## Paste-prompt for the fresh session

> Continue the portfolio revamp. Read `docs/revamp-handoff.md` (NEXT TASK), the Current Position
> block in `tasks/todo.md`, and your memory on the retro-terminal revamp. The Next.js app is live on
> `main` (Chakra + tokens + fonts + paper bg; the terminal shell pair; the hero; inner-page chrome
> with the menu wired to section routes). Today: build the real **PROJECTS** section into
> `src/app/(console)/projects/page.tsx` (replace the stub) as the locked filter-pill index, using my
> real content in `tasks/content.md` and the shell components. Work in very small, single-focus
> commits and verify each with headless Chrome (extension isn't connected). Keep originality the top
> priority, no generic/AI-generic looks. No em dashes.
