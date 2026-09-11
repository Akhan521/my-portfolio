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
narrow. WRITING was deliberately dropped (no body of writing). Since then it has had a polish pass:
real menu interaction states, a hero typing sequence, an interactive PROJECTS list, and (2026-09-05) a
**WebGL boot wordmark** on the landing page. Remaining work is polish plus one known bug, not new
sections. Full detail in the dated sections below and "What's next".

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
- **Character: DROPPED (2026-09-05).** The plan was to regenerate Aamir as a pixel sprite; he does
  not want one. No character art on the site.

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
  their section routes. `CLAUDE.md` has the stack.
  **NOTE (2026-09-05): the rest of this bullet is historical.** All four sections are now fully built,
  WRITING was dropped, `/projects` no longer has filter pills or a `BUILDING` badge, and `SectionStub`
  is unused (safe to delete). The landing page also opens with the WebGL boot wordmark
  (`src/components/boot/`). See "What's next" and the dated sections below for the current state.
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

- **DROPPED for good 2026-09-05: the agentic tool-call trace** (`● call` / `⎿ result` above the
  identity block). It was pulled on 2026-08-18 for reading too generic, then prototyped properly on
  2026-09-05 so Aamir could judge something real: three variants (A the Tatari outage told as tool
  calls, B the machine loading his data, C a single restrained call) rendered beside the live hero at
  a throwaway `/proto/trace` route, since deleted. **His call after seeing it: drop the idea
  altogether, it does not suit the hero and does not look good.** Do not re-propose it.
  For the record, the problems the prototype exposed: **A** is the most compelling content but the
  tool-call format implies an *agent* did work that Aamir did, which undercuts the very claim the
  site makes about him; **B** is honest but drifts back toward the fake-BIOS idea already rejected
  (nothing is actually loading); and every variant pushes his name further down the screen, adding a
  third thing between a recruiter and "AAMIR KHAN" on top of the boot wordmark and the typing.
- Terminal has some empty mid-screen space where the trace used to sit. **That space is now its own
  open question** (the trace is no longer the answer to it): either design something else for it, or
  tighten the terminal's height so the gap closes.
- A peeking "program disk" is still undesigned.
- **DONE 2026-09-05:** the title-bar status chips are stripped from **every** page (`d677212`:
  hero "agent online", `/about` "resolved", `/experience` "3 roles", `/contact` "open to work";
  `/projects` was already done in `8be9d39`). Title bars are now just traffic lights + path.
  `TerminalWindow` still accepts a `status` prop that nothing passes; left in place as an optional
  slot, safe to delete if it stays unused. Also done: menu hover/active states (`9a7d089`); "boot lines typing in", which became
  the hero typing sequence (`f9a61f8`, `6940379`, `e8a0c02`) rather than the fake-BIOS reading the
  original note implied; and the **landing boot wordmark** (`794e790`, see the Branon research
  section for the decision and the two gotchas). A BIOS/POST sequence was explicitly rejected: it is the most imitated
  retro-terminal trope, it gates the hero behind fiction, and nothing is actually booting.
- **DROPPED 2026-09-05: the pixel sprite of Aamir.** He does not want one. Remove it from any
  remaining plan docs rather than re-proposing it.

## Branon's boot/loading animation, how it actually works (researched 2026-09-05)

Aamir liked the custom animation on branon.dev's landing page and asked what it is. Findings from the
read-only clone at `~/Developer/branon-portfolio-ref`. **Decision made and built on 2026-09-05, see
"ANSWERED + BUILT" at the end of this section.**

**It is not a loading animation.** Nothing is loaded or awaited. It is an interactive **power-on
ritual gated behind a real user gesture**, so it never makes anyone wait. `src/app/page.tsx` is just
`return <BootIntro />`: the landing page *is* the boot experience. Two phases, `"select" | "booting"`
(`BootIntro.tsx:67`). ~2,400 lines across 8 files in `src/components/boot-intro/`.

**Phase 1, dormant console** (`PowerOnScene.tsx`): the shell sits in CSS 3D with a deliberately small
resting tilt (`rotateX 3`, `rotateY -4`) plus mouse parallax; his comment notes bigger values shear a
flat illustration into a parallelogram. The shell is a **pre-made SVG** (`public/boot-intro/console-shell.svg`),
not modeled in code, after hand-tuned WebGL/SVG geometry fell short of photo fidelity.

**Phase 2, power on:** selecting a cartridge is the gesture (and is what **unlocks Web Audio**). The
shell eases flat and **zooms into the screen** over 580ms with `transform-origin: 50% 28%`, measured
from where the screen actually sits in the SVG (x 7.5-92.8%, y 4.5-52%) rather than the geometric
center, then hands off on a background color **sampled from the SVG** so there is no cut to black.

**The logo animation is WebGL** (`BootLogoCanvas.tsx`), using **`ogl`** with custom vertex + fragment
shaders; letters are pixel-font alpha masks, nearest-filtered for chunky pixels. Per letter:
- rockets in at **8.5x** scale, settles to 1.6x, `easeOutBack` overshoot
- hand-tuned **"J-hook" flight path**: starts right+below, rockets up bulging further right, arcs
  back down past resting height, then slides left into place (3 keyframes, smoothstep)
- the shrink is **biased late** (`SCALE_BIAS = 1.6`) so letters stay oversized and overlapping as long
  as possible. This is where the drama comes from.
- each letter **flashes its own color**, settling to ink
- on landing, **2 in-place bounces** (170ms cycle, 0.16 amplitude), deliberately NOT synchronized, so
  the word cascades
- then a **rainbow sweep** across the finished word, computed from each letter's *word-relative*
  horizontal position, not its own UV, so the band travels continuously instead of resetting per letter
- timings: `STAGGER_MS 55`, `LETTER_DURATION_MS 480`, `SWEEP_GAP_MS 120`, `SWEEP_DURATION_MS 650`

**Chime is synthesized, not a file** (`useBootChime.ts`): oscillators + gain + delay/feedback filter.
Mute is one shared preference across every sound on the site (module store + `localStorage`).

**It does not replay:** a `sessionStorage` flag (`REVERSE_BOOT_STORAGE_KEY`), set by the ESC/"power
off" handler, makes a return to `/` play the zoom **backwards** instead of replaying the intro.
`prefers-reduced-motion` skips it entirely.

**Assessment (mine, 2026-09-05).** The scale is appropriate for Branon because he is a *design
engineer*: the toy IS his portfolio piece. For an AI SWE it argues less directly, and a heavy WebGL
boot ritual sits adjacent to the fake-BIOS idea already rejected. Three parts are cheap to borrow and
worth more than the whole:
1. **Gate it behind a gesture** so it never forces a wait (also sidesteps the empty-screen cost of our
   existing hero typing sequence).
2. **The J-hook path + late-biased scale**, which is the actual craft and is pure math, no WebGL
   needed; it would work on our pixel wordmark in CSS or GSAP.
3. **The sessionStorage replay suppression**, the difference between "delightful once" and "annoying
   on the fourth visit."

**ANSWERED + BUILT 2026-09-05 (`794e790`).** Aamir chose: a wordmark animation **before** the
terminal, playing **automatically** (not gesture-gated), as a **full WebGL port** rather than the
cheap CSS borrowings, explicitly "to start here and iterate". He was shown the cost (~3s before his
name is readable) in the option preview and chose it anyway. What shipped:
- `src/components/boot/BootLogoCanvas.tsx`: the ported animation via **`ogl`** (new dependency),
  faithful to his J-hook path, late-biased scale, per-letter cascade bounce and word-relative sweep.
  **Retuned to us:** letters flash our `cartridge.*` accents rather than a generic rainbow, and settle
  to `brand.ink` (which is byte-identical to the ink his shader already used).
- `src/components/boot/BootOverlay.tsx`: plays **once per session** (sessionStorage), skipped under
  `prefers-reduced-motion`, and falls through to the hero if WebGL is unavailable or the canvas never
  reports completion (6s bail), so nobody is stranded on a blank screen.

**Two gotchas worth keeping:**
1. **The hero's typing had to be gated.** Its CSS animations start on page load, so they ran to
   completion *underneath* the overlay and the terminal was already finished when it lifted. They are
   now `animation-play-state: paused` until `html[data-booted="1"]` is set.
2. **React strips unknown attributes off `<html>` during hydration.** The pre-paint inline script sets
   `data-booted`, and hydration silently removed it, so repeat visits still played the boot. The
   decision is therefore also stashed on `window.__akSkipBoot`, which hydration cannot touch; the
   attribute only needs to survive the single pre-paint frame it prevents a flash in.

**>> OPEN: REFINE THE WORDMARK SO IT IS OURS (Aamir, 2026-09-05).** He looked at the shipped version
and said it "looks far too similar to and almost exactly like Branon's portfolio design for the
wordmark lettering". He parked it deliberately to strip the status chips first, and wants to come back
to it. **This is the next design task after the tool-call trace prototype, or sooner if he asks.**

The important framing, so this is not mistaken for a colour problem: **recolouring will not fix it.**
We already swapped his rainbow for our `cartridge.*` accents and it still reads as his. What we
actually inherited is his *letter choreography*, and that is the signature:
- the J-hook flight path (right+below -> up bulging right -> arc down -> slide left)
- the 8.5x oversized entrance with the late-biased shrink
- the per-letter cascade bounce on landing
- the colour sweep across the settled word

Making it ours means **changing how the letters move**, not what shade they are. Directions worth
exploring (none chosen yet, render options and let him react, per his usual workflow):
- **Terminal-native motion instead of a console-native one.** Our device is a terminal, not a Game
  Boy. Letters could land like *typed characters* (left to right, on the uneven keystroke cadence we
  already built in `HeroTerminal.tsx` `gaps()`), with the block cursor sweeping them into place.
- **A CRT power-on** rather than a letter drop: a scanline collapse/expand, a phosphor bloom, the
  screen warming up into the wordmark.
- **Print/plotter feel:** characters struck onto paper, matching the warm-paper half of the palette.
- Keep the WebGL pipeline (`ogl`, the atlas, nearest-neighbour sampling) either way; it is the
  *animation curve* that needs replacing, not the renderer. Timings live in `BootOverlay.tsx`, motion
  in `BootLogoCanvas.tsx` (`flightOffset`, `scaleProgress`, `bounceScale`, and the sweep uniforms).

**Iteration knobs (smaller tweaks, if he only wants a trim rather than a rethink):** total duration
(~2.4s before handoff, from the four constants in `BootOverlay.tsx`), whether the sweep stays at all,
and the accent order in `ACCENTS` in `BootLogoCanvas.tsx`.

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
- **`/projects`** (reworked 2026-09-04, see "PROJECTS reworked" below): a plain interactive listing.
  **The filter pills were deliberately REMOVED** (do not re-add them without asking).
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

## PROJECTS reworked (2026-09-04, pushed)

Made the index interactive, then stripped it back on Aamir's feedback. Where it landed:
- **Interactive** (`2e631ba`): `↑↓` moves the selection (wrapping), `↵` opens the selected repo,
  hover selects, and rows are real external links to their GitHub repos.
- **Filter pills REMOVED** (`1c88be9`): with only five projects, filtering was more chrome than help.
  This also removed the `showing N of 5` count (nothing filters it now). **Do not re-add without
  asking**; this was a deliberate reversal, not an oversight.
- **Blinking cursor row REMOVED** (`8743cf7`): it sat beside the `↵ open repo` hint and read as an
  artifact rather than a prompt. **PROJECTS is now the only section that does not end in `$ █`**, on
  purpose: the other three are terminal *sessions*, this one is a *listing*.
- **Subtitle** (`5b352b6`): now `What I've been building.` The old `Things I've built, by hand and in
  production.` overclaimed (production is the Tatari work in EXPERIENCE) and `by hand` misleads since
  AI tooling helped build several. Keep future wording general; Aamir wants it open to any project type.
- **`BUILDING` badge → amber status dot** (`9a18ea7`): the badge was the only boxed element on screen.
  The dot reuses the title-bar status-dot vocabulary. Carries `title`/`aria-label`, but note it is
  **color-only meaning for sighted users** (open item, see below).
- **Status chip REMOVED** (`8be9d39`): `● 5 programs` restated the list and implied a live status.
  The other three sections keep theirs (`resolved`, `3 roles`, `open to work`), left alone for now.
- **Ghost-arrow bug fixed** (`38fe4f0`): the selection arrow was hidden with `color: transparent`, but
  `TerminalScreen` applies a global `text-shadow` that a transparent glyph **still casts**, leaving a
  faint blur beside every unselected row. Hidden with `opacity` instead. **Watch for this pattern
  anywhere on the phosphor screen.** (`ProgramMenu` also uses `color: transparent`, but it sits on
  paper with no text-shadow, so it is fine.)
- **Broken URL caught** (`dd5016b`): `Text2SQL-LLaMA` 404s; the real slug is `Text2SQL-LLaMA-Analyst`.
  All five repo URLs verified live (200) and `tasks/content.md` corrected.

Interactions were verified by driving real clicks/keypresses through Chrome's DevTools Protocol from a
scratchpad script (no test deps added to the project); static screenshots can't prove interactivity.

## PRE-CUTOVER BUG: hydration mismatch on `/` (open, 2026-09-05)

**The landing page fails hydration**, so React discards the server-rendered HTML and re-renders the
whole tree client-side. The page still *looks* right and the error overlay is dev-only, but in
production this silently costs the SSR benefit on the one page a recruiter hits first. **Fix before
the Vercel cutover.**

- **Scope:** only `/`. Verified in a *fresh browser per route*: `/about`, `/projects`, `/experience`,
  `/contact` are all clean; `/` reproduced 2/2. (Testing routes sequentially in one browser gives
  false positives, it wrongly flagged `/about`; always use a fresh profile per route.)
- **Not content-caused:** reproduced with the hero edits stashed, so it predates them.
- **Cause:** Chakra/Emotion, not our markup. React's diff shows the server emitting
  `<style data-emotion="css-global ...">` where the client expects the hero's `<section>`, i.e. the
  theme's global `body` styles (`PAPER_BG_SX`, `src/app/theme.ts` -> `src/lib/consoleTheme.ts`) are
  flushed into the SSR stream at a position the client does not reproduce.
- **Likely fix:** replace `CacheProvider` from `@chakra-ui/next-js` in `src/app/providers.tsx` with a
  proper Emotion cache registry using Next's `useServerInsertedHTML` (the documented App Router
  pattern). Contained change, but it touches every page's styling path, so re-verify all five routes
  (fresh browser each) *and* check for a flash of unstyled content.
- **How to detect:** watch for the Next dev overlay's "N Issues" badge, or drive Chrome DevTools
  Protocol and listen for `Runtime.exceptionThrown` matching /Hydration failed/ (scratchpad script
  pattern used on 2026-09-05).

## What's next (in this order)

1. **Refine the boot wordmark so it stops reading as Branon's** (see the OPEN block in the Branon
   section for why this is a motion problem, not a colour one).
2. Decide what, if anything, fills the terminal's empty mid-screen space now that the tool-call trace
   is dropped (see parked items), or close the gap instead.
3. **Fix the hydration mismatch on `/`** (see the pre-cutover bug section) before deploying.
4. Pre-cutover: **all external URLs are verified** (resume replaced 2026-09-05 after the old Drive
   link 404'd for anonymous visitors; email/GitHub/LinkedIn/5 repos all good). Remaining: plan the
   Vercel deploy (auto-deploy is paused). Also worth a look before shipping: the boot animation adds
   **`ogl` (~1MB) and a WebGL path on the landing page's critical path**, the first non-CSS
   dependency in the visual layer.
**No action, recorded so it is not re-litigated:** `gpt-from-scratch`'s description still says "by
hand in PyTorch"; Aamir dislikes the phrase generally but decided to keep it there (2026-09-05) since
it is literally true for that project.

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
