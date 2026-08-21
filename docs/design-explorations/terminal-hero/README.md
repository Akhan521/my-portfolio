# Terminal hero — design exploration

A **throwaway mockup** of the retro-terminal hero direction for the portfolio revamp, built
in Branon Eusebio's design language (warm paper palette, RetroCard panels, Press Start 2P +
IBM Plex Mono, his accent set, his "INSERT CARTRIDGE" menu UX reframed as `SELECT A PROGRAM`).
Not production code — a look/feel reference for the eventual Next.js build.

**View it:**
```
cd docs/design-explorations/terminal-hero
python3 -m http.server 8096   # then open http://localhost:8096
```
`preview.png` is a static capture.

**Composition:** left = a terminal window (dark-green screen, `#1D2A0C`) showing an agent
session that resolves to Aamir's identity and a `you> ask me anything` prompt (the future
live-demo slot); right = the section menu. Terminal and menu are height-matched.

**Parked state (2026-08-18):** the agentic tool-call trace (`● Search(...)`, `● Task(...)`
with `⎿` results) was removed pending design iteration — see the comment in `index.html` and
the git history for the prior version. Next: design a "program" screen (what a section looks
like when run). See `docs/revamp-handoff.md`.
