# Duolingo Illustration Style & Shape Language — Reference

**Read this before any character SVG work** (`icon.svg`, `standing.svg`, `seated.svg`,
`laptop.svg`) — creating or revising. `CLAUDE.md` is the source of truth for the site's
tokens/layout; **this file is the source of truth for how the character art looks.**

Distilled from Duolingo's official design guidelines (quotes are verbatim):
- Shape language: https://design.duolingo.com/illustration/shape-language
- Characters / body types: https://design.duolingo.com/illustration/characters
- Overview blog: https://blog.duolingo.com/shape-language-duolingos-art-style/

> **Important divergence:** Duolingo's guide assumes **white backgrounds**. This portfolio
> is a deliberate **dark "Night Mode" adaptation** (dark canvas). The *character construction*
> rules below apply as-is; only the background/palette context differs. Where the guide says
> "never use gray" and "use light pastels," treat that as a white-bg rule we consciously
> adapt — but do heed the spirit: avoid dead, lifeless gray fills on the character itself.

---

## 1. Shape language — the core rule

> "All of our illustrations are made from **three basic shapes: the rounded rectangle, the
> circle, and the rounded triangle.** You'll probably find yourself using the rounded
> rectangle the most."

> "Just make sure that **every shape has rounded edges. Pointy shapes are off-brand.**"

So: build everything from **rounded rectangles, circles, and rounded triangles**. No sharp
corners anywhere — head, hair, beard, body, limbs. The rounded rectangle is the workhorse.

## 2. Fewest shapes + strong silhouette

> "**Avoid too many shapes. It complicates the overall silhouette.**"

> "Stylistically and practically, **we need to use the fewest shapes possible.**" … "make
> each shape matter in the illustration."

Failure modes the guide names explicitly: **"Not enough shapes, too abstract"** on one end,
and too many shapes (muddy silhouette) on the other. Aim for the fewest shapes that still
read.

## 3. Rhythm — vary shape sizes

> "It's the **rhythm of simple shapes** that makes our illustrations interesting. Imagine
> each illustration is a melody. No one wants to hear the same note played over and over…
> a **variation in shapes gives the eye something exciting to look at.**"

Don't repeat shapes of identical visual weight. Contrast big and small shapes deliberately.

## 4. Character construction & body types

> "Usually, the **head and body are composed of 1–2 basic shapes each.**"

> "All of the pieces — **head width and height, head shape, facial features, and so on — are
> customizable.**" (This *is* the "body types" system: characters are assembled from a small
> kit of simple, swappable shapes rather than drawn as one-off portraits.)

> "One way of keeping a character's shape language cohesive is to use **shape repetition**
> throughout their design. While this isn't always required, it's a good starting point."

Keep pieces simple so the character is easy to re-pose (needed here: same character appears
standing, seated, and as an icon).

## 5. Facial features (verbatim rules)

**Eyes**
> "We use **five main eye styles** in our characters. Different eye styles can be explored,
> but make sure they're **geometric in nature. No ovals!**"
- "**Center pupils vertically within the eye.**"
- "Eyes are an incredible tool for conveying our characters' personalities… enlargen or
  shrink the pupil, suggest tears with a little shiny-eye effect, or lower the eyelids."
- Some eye styles are "Only recommended if a character always appears at a small scale."

**Eyebrows** — Duolingo treats brows as a top emotion tool; Duo's "expressive eyebrows" are
iconic (their logotype's "g" flick even mirrors them). Make brows bold and expressive.

**Noses**
> "Noses are made up of **1–2 rounded rectangles.** The size of the nose is up to you…
> When coloring the nose, make sure it's **as saturated as it is dark.** When in profile,
> the nose should take on the color of the base skin tone."

**Mouths**
> "Mouths are expressive and the **least geometric shape** in our style. **Most mouths favor
> one side. This asymmetry is more lifelike** and brings more emotion to the face."
> "The mouth can break out of the frame of the face to convey more extreme emotions."

**Hair**
> "Hair should be **simple but interesting.** Too many irregular shapes will make the hair
> unnecessarily complex… If possible, **compose hair with just one or two large shapes.**"

**Hands** (relevant to the standing wave)
> "Try to keep hands as abstract as you can by **keeping them as circles** in most places.
> If you need to show fingers, display the bare minimum needed for the pose."

## 6. Perspective, shadows, poses

- **Flat perspective:** "Duolingo characters and icons are designed on a **flat perspective.**
  Depth can still be conveyed as long as it's on the same line of sight." → flat fills, no
  gradients, no realistic shading.
- **Shadows:** "Shadows always appear below characters and objects as a **pill shape — never
  an oval, because ovals imply perspective.**" Shadow must be darker than the base it sits on.
- **Poses/expression:** "try not to use characters in a **static, expressionless state**,
  which could make them feel lifeless." Give every pose personality.

## 7. Icon-specific

Duolingo's own icon "can be safely used at a wide variety of sizes, **as small as 16px**."
Our `icon.svg` ships at 40px, so QA at that size: bold shapes must survive the shrink.

---

## 8. Applying all of this to Aamir's character

Build him from the kit, not as a portrait. Each feature = 1–2 rounded shapes:
- **Head:** one rounded shape (rounded rectangle or circle), big and caricatured.
- **Hair:** one or two large rounded shapes — short cap silhouette.
- **Beard (the hero feature):** one or two large rounded shapes, bold, neat, **rounded chin
  — never pointy.** It is the strongest identity cue; make it clearly beard-shaped.
- **Eyes:** geometric, **no ovals**; pick a consistent style across all SVGs; pupils
  centered vertically; big and friendly.
- **Eyebrows:** bold and expressive.
- **Nose:** 1–2 rounded rectangles, saturated-and-dark, or skin-tone if kept minimal.
- **Mouth:** expressive, **slightly asymmetric (favor one side)** — not a perfectly
  symmetric arc — for a lifelike warm smile.
- Use **shape repetition** (echo the roundedness of head in beard, eyes, shoulders) and
  **rhythm** (vary big vs. small shapes). Use the **fewest shapes** that still read.

**Palette (flat fills, outlines `#1A1A1A`, `stroke-linejoin="round"`):** skin `#C68642` /
shadow `#A0652A`, hair + beard `#1C1008`, jacket `#2D5FA6`, white shirt, charcoal tie
`#2C3440`, eye iris `#3D2000`.

## 9. Resemblance rule (owner feedback — non-negotiable)

The character is **not a generic avatar.** It must **clearly resemble Aamir** in
`assets/reference/owner-photo.jpg` — aim for a strong likeness expressed *through* the
Duolingo shape kit. Capture his signature features as bold simplified shapes: **full rounded
beard + moustache, warm brown skin, short dark hair, full rounded face, thick dark brows,
navy suit / white shirt / dark tie, warm friendly smile.** Likeness comes from getting these
signature shapes and their arrangement right — not from adding realistic detail.

## 10. Workflow: always render and eyeball before calling it done

```bash
qlmanage -t -s 512 <file>.svg -o <outdir>     # rasterize with macOS QuickLook
sips -z 40 40 <out>.png --out <small>.png      # shrink-test at ship size
```
Coordinates that look plausible in source can still render broken. View the PNG at full size
(likeness) AND at 40px (silhouette) every pass.

## 11. Rejected attempts (don't repeat)

- **Realistic-portrait approach** (many small features, small head, muddy dark hair/beard
  mass): off-brand. Duolingo = few bold rounded shapes, big caricatured head.
- **Hair + beard meeting at the eyes** → reads as a hood/mask. Keep a face visible.
- **Importing generic shape theory** ("circle = friendly, triangle = danger"): the official
  guide does NOT teach that. Its shape language is: three rounded shapes, no pointy edges,
  rhythm, fewest shapes. Follow the real rules above.
- A flat **gray backdrop** was tried and disliked; also arguably off-brand ("never use gray").
  Prefer a brand color or light pastel for any background field.
