# Lessons

Patterns learned from corrections during this build. Review at session start.
Add a new entry whenever the user corrects an approach — write the rule that prevents
repeating the mistake.

- **Always render an SVG to PNG and look at it before calling it done.** Use
  `qlmanage -t -s 400 <file>.svg -o <outdir>` (macOS QuickLook) to rasterize, then view.
  Coordinates that look plausible in the source can still produce a broken face.
- **Character face proportions:** keep the hairline high enough to expose a forehead and
  the beard's top edge low enough to expose cheeks + nose + a visible mouth. If hair and
  beard meet near the eyes, the face reads as a hood/mask, not a face. Leave a clear skin
  gap for the mouth between the moustache and the beard's top edge.
- **Follow the Duolingo shape language — see `tasks/duolingo-style.md` (now built from
  Duolingo's OFFICIAL guidelines).** Two icon attempts were scratched for not matching the
  Duolingo aesthetic and not resembling the owner. Core rules: build from three ROUNDED
  shapes (rounded rectangle / circle / rounded triangle), no pointy edges, fewest shapes,
  rhythm (vary shape sizes), 1–2 shapes per feature, geometric eyes (no ovals) with pupils
  centered vertically, expressive asymmetric mouth, hair/beard as 1–2 large shapes, flat
  fills, big caricatured head. Likeness to `owner-photo.jpg` must come through those
  simplified shapes, not realistic detail. **Always read `tasks/duolingo-style.md` before
  any character SVG work**, and render → eyeball the PNG at full size and at 40px.
