# Character Art & Image-Generation Guide

**Read before producing or wiring any character art.** `CLAUDE.md` is the source of truth
for site tokens/layout; `tasks/build-specs.md` covers how art is placed/animated in the page;
**this file governs how the character art looks and how we generate it.**

> **Pipeline change (2026-07-27):** We are NO LONGER hand-drawing SVG characters. Multiple
> hand-coded SVG attempts were scrapped — the style wasn't achievable that way. We now
> **generate the character art as raster images with ChatGPT's image model**, using the
> owner's approved reference as the north star, and wire the resulting PNGs into the site.
> The Duolingo shape-language research below is retained because it informs the *prompts*.

---

## 1. North star (the look we're matching)

Reference: `/Users/aamirkhan/Downloads/aamir-prof-duo-style.png` (owner-made, loved).
Copy it into the repo as `assets/character/reference/style-north-star.png` and treat it as
the fixed style + character target for every generation.

What defines that image (match it every time):
- **Soft-shaded vector cartoon / modern mascot illustration** — clean rounded forms with
  subtle cel-shading and gentle gradients (NOT flat-only, NOT photoreal, NOT 3D render).
- Friendly, approachable, Duolingo-adjacent warmth.
- **Big expressive dark eyes** with small white highlights; **thick, rounded eyebrows**.
- **Warm medium-brown skin** with soft shading/blush.
- **Short curly/wavy dark brown-black hair** with a few lighter highlight strokes.
- **Full, neatly trimmed beard + moustache** (warm reddish-brown tones in the shading),
  lips clear, **warm closed-mouth smile**, slight 3/4 head turn.
- **Navy-blue suit jacket, white shirt, dark charcoal tie.**
- Bold clean edges; smooth anti-aliasing; no text, no watermark, no border.

## 2. Visual profile (describe him consistently in prompts)

| Feature | Value |
|---|---|
| Skin | warm medium-brown, soft shading |
| Hair | short, curly/wavy, dark brown-black, subtle highlights |
| Beard | full, neatly trimmed, dark with warm reddish-brown tones; moustache; lips clear |
| Face | full and rounded, friendly |
| Eyes | large, dark brown, expressive, white highlight dots |
| Eyebrows | thick, rounded, expressive |
| Expression | warm, confident, closed-mouth smile |
| Jacket | navy-blue suit with lapels |
| Shirt / Tie | white shirt; narrow dark charcoal tie |
| Brand green | Feather Green `#58CC02` (circular background field for the avatar) |

## 3. Base style prompt (reusable — keep locked)

Use this as the stem of every generation; append the per-asset block from §4. Attach the
north-star image as a style/character reference each time.

```
A friendly, high-quality soft-shaded vector cartoon portrait illustration of a young man,
in a warm Duolingo-adjacent mascot style: clean rounded shapes with subtle cel-shading and
gentle gradients (not flat, not photorealistic, not 3D). He has warm medium-brown skin,
short curly dark brown-black hair with soft highlights, a full neatly trimmed dark beard and
moustache with warm reddish-brown tones (lips visible), thick rounded eyebrows, and large
expressive dark-brown eyes with small white highlights. Warm, confident, closed-mouth smile.
He wears a navy-blue suit jacket, white shirt, and a narrow dark charcoal tie. Bold clean
edges, smooth shading, no text, no watermark, no border. Match the character likeness and
art style of the attached reference image exactly.
```

## 4. Per-asset prompts (append to the base prompt)

Generate ALL of these in ONE session, each with the north-star image attached, so the
character stays consistent.

- **avatar** (navbar, ships ~40px) — reuse the north-star as-is if possible; else:
  > Head-and-shoulders, slight 3/4 turn, centered, on a solid Feather Green (#58CC02)
  > circular background. Square canvas.

- **hero** (hero section, composited over the dark page) —
  > Head-and-shoulders to upper-chest, facing forward with a slight turn, friendly.
  > **Transparent background (PNG with alpha), no circle, no scene.** Square canvas.

- **seated-neutral** (laptop scene, before it opens) —
  > Waist-up, seated at a desk, hands resting near/on the desk edge, calm neutral-friendly
  > expression, looking slightly down toward a laptop (do NOT draw the laptop).
  > **Transparent background.** Square canvas.

- **seated-excited** (laptop scene, after it opens/zooms) —
  > Same character, same pose/framing/lighting as seated-neutral, but an **excited, delighted
  > expression** (raised brows, bigger smile). **Transparent background.** Square canvas.
  > It must line up with seated-neutral so they can crossfade in place.

## 5. Consistency strategy (the hard part)

- Attach the **north-star image** as reference on every generation.
- Keep the **base prompt identical**; change only the per-asset block.
- Generate the whole set in **one session/thread** so the model holds the character.
- For `seated-excited`, generate it as an **edit/variation of seated-neutral** (same pose,
  only the expression changes) so the two align for crossfading.
- Expect iteration. If a slot drifts off-character, regenerate rather than accept — likeness
  to the owner is non-negotiable.

## 6. Transparent backgrounds

The avatar keeps its green circle (that's the design). **hero** and **seated-*** must be
**transparent-background PNGs** so we can composite them over the dark canvas and the desk
scene. Request transparency at generation time — we have no reliable local background-removal
tool, and chroma-keying soft-shaded edges looks bad.

## 7. Output specs

- Deliver PNGs at **high resolution** (~1024px+ square; the north-star is 1254px — good).
- Save generation masters in `assets/character/src/`; the wired-in, resized copies live in
  `assets/character/`. I resize/export display sizes (@1x/@2x) locally with `sips`.
- Keep it simple and light: only the sizes the page actually uses.

## 8. Animation reality for raster art

Images can't be animated part-by-part (no CSS blink/wave/breathe, no in-file face swaps).
What we DO:
- **Whole-image motion only:** gentle float/bob and entrance slide+fade (CSS); scroll-driven
  position/scale/opacity (GSAP) — all of which move the whole PNG.
- **One mood beat:** stack `seated-neutral` + `seated-excited` and **crossfade opacity** at
  the laptop-open/zoom threshold (~55% scroll). This is the only mood change; per-project
  mood swaps are dropped. Fallback: a single static seated image if 2 consistent gens are hard.

## 9. Duolingo shape-language spirit (still informs prompts)

From Duolingo's official guidelines — use these as *descriptive cues* in prompts, not as SVG
construction rules:
- Built from **rounded shapes; pointy edges are off-brand** → keep everything soft/rounded.
- **Fewest shapes, strong silhouette, good rhythm** (vary big/small) → clean, uncluttered.
- **Geometric, expressive eyes; bold brows; asymmetric, expressive mouth** → lively face.
- Flat/soft perspective, warm flat-ish color with light shading.
Sources: design.duolingo.com/illustration/shape-language and /characters.

## 10. Rejected approaches (don't repeat)

- **Hand-drawing character SVGs** (flat vector paths): scrapped after multiple attempts —
  couldn't hit the soft-shaded quality the owner wants. Generate raster images instead.
- Off-character or generic results: regenerate; the owner likeness must be clearly him.
