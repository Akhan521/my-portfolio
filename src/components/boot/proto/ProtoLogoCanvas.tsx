"use client";

import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { Renderer, Program, Mesh, Texture, Geometry, Transform } from "ogl";
import { pixelFont } from "@/app/fonts";

/**
 * THROWAWAY PROTOTYPE. Candidate motions for the landing wordmark, sharing
 * one renderer so they can be compared honestly. The shipped BootLogoCanvas
 * is untouched; whichever motion wins gets folded into it and this directory
 * gets deleted.
 *
 * The renderer is deliberately the same as the shipped one (ogl, a low-res
 * glyph atlas sampled nearest-neighbour). What changes is the choreography.
 *
 * None of these reuses Branon's four signatures (the J-hook flight path, the
 * 8.5x entrance with the late-biased shrink, the per-letter cascade bounce on
 * scale, and the rainbow sweep across the settled word). They do reuse the
 * craft underneath them, which is not his: every letter or plate is its own
 * event with its own timing, arrivals have mass, colour shows up as heat and
 * cools to ink, and no two durations are round numbers or multiples of each
 * other.
 */
export type BootVariant =
  | "plates"
  | "cascade"
  | "press"
  | "hottype"
  | "bloom"
  | "roller"
  | "emboss";

type RGB = [number, number, number];

const VERTEX = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  uniform vec2 uCenter;
  uniform vec2 uHalfSize;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(uCenter + position * (uHalfSize * 2.0), 0.0, 1.0);
  }
`;

const GLYPH_FRAGMENT = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D tMask;
  uniform vec3 uColor;
  uniform float uOpacity;
  void main() {
    float mask = texture2D(tMask, vUv).a;
    if (mask < 0.05) discard;
    gl_FragColor = vec4(uColor, mask * uOpacity);
  }
`;

/**
 * Plate shader: three offset impressions of the same glyph composited the way
 * ink actually behaves, each pass multiplying what is under it, so the core of
 * a misregistered word goes near-black and only the fringes stay coloured.
 * Three separate translucent draws cannot do this (they just stack and go
 * muddy), hence one pass sampling the mask three times.
 *
 * uPaper is the page's paper colour at the word's position; multiplying
 * against a constant is fine because the vignette is nearly flat there.
 */
const PLATE_FRAGMENT = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D tMask;
  uniform vec2 uSpan;   // this glyph's true u range, so a shifted sample
                        // cannot bleed into its neighbour in the atlas
  uniform vec2 uOffA;
  uniform vec2 uOffB;
  uniform vec2 uOffC;
  uniform vec3 uColA;
  uniform vec3 uColB;
  uniform vec3 uColC;
  uniform vec3 uDensity; // per-plate ink density; extras lift off at the end
  uniform vec3 uPaper;
  uniform float uOpacity;
  uniform vec2 uSpread; // dilation radius in uv, for the ink-bloom entrance

  float coverage(vec2 uv) {
    if (uv.x < uSpan.x || uv.x > uSpan.y || uv.y < 0.0 || uv.y > 1.0) return 0.0;
    return texture2D(tMask, uv).a;
  }

  /**
   * Coverage of the glyph fattened by uSpread: the max over a ring of samples,
   * which is a dilation. Out-of-span samples read as empty, so a glyph can
   * bleed outward without ever picking up its neighbour in the atlas.
   */
  float fat(vec2 uv) {
    float m = coverage(uv);
    if (uSpread.x <= 0.0) return m;
    for (int i = 0; i < 8; i++) {
      float a = float(i) * 0.7853981;
      m = max(m, coverage(uv + vec2(cos(a), sin(a)) * uSpread));
      m = max(m, coverage(uv + vec2(cos(a), sin(a)) * uSpread * 0.55));
    }
    return m;
  }

  void main() {
    float a = fat(vUv - uOffA) * step(0.001, uDensity.x);
    float b = fat(vUv - uOffB) * step(0.001, uDensity.y);
    float c = fat(vUv - uOffC) * step(0.001, uDensity.z);
    float any = max(max(a, b), c);
    if (any < 0.05) discard;

    vec3 t = (1.0 - a * uDensity.x * (1.0 - uColA))
           * (1.0 - b * uDensity.y * (1.0 - uColB))
           * (1.0 - c * uDensity.z * (1.0 - uColC));

    gl_FragColor = vec4(uPaper * t, any * uOpacity);
  }
`;

/**
 * Roller shader: the word is already on the paper as a dry ghost, and one
 * band of wet ink travels across it. Driven by each fragment's position in
 * the WHOLE word (uWordU), not its own glyph, so the roller crosses the
 * wordmark continuously instead of restarting at every letter.
 */
const ROLLER_FRAGMENT = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D tMask;
  uniform float uWordU0;
  uniform float uWordU1;
  uniform float uBand;
  uniform vec3 uPaper;
  uniform vec3 uInk;
  uniform vec3 uEdgeA;
  uniform vec3 uEdgeB;
  uniform vec3 uEdgeC;
  uniform float uOpacity;

  void main() {
    float mask = texture2D(tMask, vUv).a;
    if (mask < 0.05) discard;

    float wordU = mix(uWordU0, uWordU1, vUv.x);
    float d = wordU - uBand;
    float laid = smoothstep(0.05, -0.012, d); // 1 behind the roller, 0 ahead

    // Three inks on one roller, stacked across the glyph's height, so the
    // leading edge carries the same palette the plates do.
    vec3 edge = uEdgeA;
    if (vUv.y > 0.42) edge = uEdgeB;
    if (vUv.y > 0.58) edge = uEdgeC;
    float hot = smoothstep(0.07, 0.0, abs(d));

    vec3 dry = mix(uPaper, uInk, 0.16);
    vec3 col = mix(dry, uInk, laid);
    // Ink sits heavy right behind the roller and evens out as it dries.
    float wet = smoothstep(-0.2, -0.015, d) * step(d, 0.0);
    col = mix(col, uInk * 0.62, wet * 0.45);
    col = mix(col, edge, hot * 0.85);

    gl_FragColor = vec4(col, mask * uOpacity);
  }
`;

/**
 * Emboss shader: a blind impression struck into the paper (no ink at all,
 * just a shadowed rim inside the glyph and a lit rim outside it), which then
 * floods with ink. The rims are offset by whole atlas units so they read as a
 * chunky pixel bevel rather than a soft drop shadow.
 *
 * The glyph interior stays transparent while the impression is blind, so the
 * real paper and its vignette show through instead of a flat approximation.
 */
const EMBOSS_FRAGMENT = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D tMask;
  uniform vec2 uSpan;
  uniform vec2 uBevel;
  uniform vec3 uPaper;
  uniform float uRim;   // strength of the blind impression
  uniform float uFlood; // how much ink has arrived
  uniform vec2 uOffA;
  uniform vec2 uOffB;
  uniform vec2 uOffC;
  uniform vec3 uColA;
  uniform vec3 uColB;
  uniform vec3 uColC;
  uniform vec3 uDensity;
  uniform float uOpacity;

  float coverage(vec2 uv) {
    if (uv.x < uSpan.x || uv.x > uSpan.y || uv.y < 0.0 || uv.y > 1.0) return 0.0;
    return texture2D(tMask, uv).a;
  }

  void main() {
    float m = coverage(vUv);
    float shade = m * (1.0 - coverage(vUv + uBevel)) * uRim;
    float lit = coverage(vUv - uBevel) * (1.0 - m) * uRim;

    // The ink does not arrive flat: it arrives as three plates still finding
    // register, and multiplies together the way the press variants do.
    float a = coverage(vUv - uOffA) * step(0.001, uDensity.x);
    float b = coverage(vUv - uOffB) * step(0.001, uDensity.y);
    float c = coverage(vUv - uOffC) * step(0.001, uDensity.z);
    float inkCov = max(max(a, b), c) * uFlood;
    vec3 t = (1.0 - a * uDensity.x * (1.0 - uColA))
           * (1.0 - b * uDensity.y * (1.0 - uColB))
           * (1.0 - c * uDensity.z * (1.0 - uColC));

    float alpha = max(max(shade, lit), inkCov);
    if (alpha < 0.04) discard;

    vec3 col = uPaper;
    col = mix(col, uPaper * 0.74, shade);
    col = mix(col, min(uPaper * 1.09, vec3(1.0)), lit);
    col = mix(col, uPaper * t, inkCov);

    gl_FragColor = vec4(col, alpha * uOpacity);
  }
`;

const INK: RGB = [0.2, 0.1725, 0.1098]; // brand.ink #332C1C
const PAPER: RGB = [0.945, 0.91, 0.839]; // paper under the word, for the multiply

function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);
const mixRgb = (a: RGB, b: RGB, u: number): RGB => [
  a[0] + (b[0] - a[0]) * u,
  a[1] + (b[1] - a[1]) * u,
  a[2] + (b[2] - a[2]) * u,
];
/** 0 -> 1 -> 0 parabola, for a knock that recovers. */
const pulse = (u: number) => 4 * u * (1 - u);

const PLATE_COLORS: RGB[] = [
  hexToRgb("#f05032"),
  hexToRgb("#61dafb"),
  hexToRgb("#22c55e"),
];
/** Plate offsets in atlas units, so misregistration scales with the wordmark. */
const PLATE_FROM: [number, number][] = [
  [-5.4, 2.8],
  [4.4, -3.2],
  [1.8, 4.6],
];
const PLATE_MARGIN = 21; // atlas units of slack around each quad: the largest
                         // plate offset plus the bloom's dilation radius

// ---------------------------------------------------------------------------
// B. PLATES. One sheet, misregistered, pulled into register: two shared
// nudges get it close, then each plate slams home on its own beat.
// ---------------------------------------------------------------------------

const PLATE_LOCKS = [640, 790, 950];
const PLATE_TAPS: { at: number; remaining: number }[] = [
  { at: 0, remaining: 1 },
  { at: 240, remaining: 0.72 },
  { at: 430, remaining: 0.55 },
];
const PLATE_SETTLE_MS = 240; // after a plate locks: colour to ink, extras lift

// ---------------------------------------------------------------------------
// D. CASCADE. The plates, letter by letter. The whole name is on the paper
// from frame one, every letter still out of register, and then each letter
// pulls itself into focus on its own beat, left to right. Branon's structure
// (every letter its own event, arriving in sequence) carrying our look.
// ---------------------------------------------------------------------------

/** Irregular per-letter gaps. Even spacing is the thing that reads as generated. */
const CASCADE_GAPS = [74, 61, 83, 57, 79, 66, 88, 60, 72, 68];
const CASCADE_LETTER_MS = 300; // one letter's pull into register
const CASCADE_TAPS = [1, 0.62, 0.28]; // where it sits after each of its taps
const CASCADE_TAP_AT = [0, 0.34, 0.63]; // and when, as a fraction of its run
const CASCADE_TAIL_MS = 260; // colour draining to ink after the last letter

// ---------------------------------------------------------------------------
// E. PRESS. Three passes on a hand press. Each plate is slammed down whole,
// one at a time, and the paper takes the hit; a final press shoves all three
// into register. Every arrival has mass, which is the part of his animation
// that actually sells it.
// ---------------------------------------------------------------------------

const PRESS_STAMPS = [140, 380, 610];
const PRESS_AT = 900; // the final press, into register
const PRESS_RESOLVE_MS = 220;
const PRESS_KNOCK_PX = 6;
const PRESS_KNOCK_MS = 120;
const PRESS_FINAL_KNOCK_PX = 11;
const PRESS_FINAL_KNOCK_MS = 165;

// ---------------------------------------------------------------------------
// F. HOT TYPE. Letters as physical sorts dropped into a composing stick: a
// straight fall under gravity, two decaying bounces, hot on impact and
// cooling to ink. Neighbours flinch when one lands beside them, which is the
// detail that makes the row read as objects rather than as keyframes.
// ---------------------------------------------------------------------------

const HOT_GAPS = [62, 54, 71, 49, 66, 58, 75, 52, 63, 57];
const HOT_DROP_UNITS = 26; // atlas units above resting
const HOT_FALL_MS = 250;
const HOT_BOUNCE1 = { h: 0.19, ms: 118 };
const HOT_BOUNCE2 = { h: 0.05, ms: 64 };
const HOT_COOL_MS = 320;
const HOT_NUDGE_PX = 2.5;
const HOT_NUDGE_MS = 115;
const HOT_ACCENTS: RGB[] = [
  hexToRgb("#f05032"),
  hexToRgb("#fbbf24"),
  hexToRgb("#22c55e"),
  hexToRgb("#61dafb"),
  hexToRgb("#a78bfa"),
];

/** Height above rest for a dropped sort, in fractions of the drop distance. */
function fallHeight(t: number): number {
  if (t <= 0) return 1;
  if (t < HOT_FALL_MS) {
    const u = t / HOT_FALL_MS;
    return 1 - u * u; // accelerating fall
  }
  const afterFall = t - HOT_FALL_MS;
  if (afterFall < HOT_BOUNCE1.ms) {
    return HOT_BOUNCE1.h * pulse(afterFall / HOT_BOUNCE1.ms);
  }
  const afterB1 = afterFall - HOT_BOUNCE1.ms;
  if (afterB1 < HOT_BOUNCE2.ms) {
    return HOT_BOUNCE2.h * pulse(afterB1 / HOT_BOUNCE2.ms);
  }
  return 0;
}
const HOT_LETTER_MS = HOT_FALL_MS + HOT_BOUNCE1.ms + HOT_BOUNCE2.ms;

// ---------------------------------------------------------------------------
// G. BLOOM. His 8.5x entrance, done in ink instead of in geometry. The name
// arrives as a heavy over-inked mass, the plates already close to register,
// and the ink CONTRACTS into crisp type. His late bias is the good idea here:
// hold the drama, then resolve it fast.
// ---------------------------------------------------------------------------

const BLOOM_MS = 900;
const BLOOM_SPREAD = 7.4; // atlas units of dilation at the start
const BLOOM_BIAS = 2.2; // >1 keeps the ink spread for longer, then snaps in
const BLOOM_FROM = 1.9; // plates start this multiple out of register, so the
                        // colour survives being this fat
const BLOOM_INK_AT = 0.56; // when colour starts draining to ink
const BLOOM_HOLD_MS = 170;

// ---------------------------------------------------------------------------
// H. ROLLER. His sweep, promoted from decoration to the entrance itself. The
// word is on the paper from frame one as a dry ghost and one band of wet ink
// crosses it, hot at the leading edge. One continuous movement, no per-letter
// events at all, computed in word space so it never restarts at a letter.
// ---------------------------------------------------------------------------

const ROLLER_START_MS = 130;
const ROLLER_MS = 860;
const ROLLER_HOLD_MS = 170;

// ---------------------------------------------------------------------------
// J. EMBOSS. A blind impression first, ink second. The press strikes the
// paper with no ink on the plate, leaving a bevelled pixel rim, and then the
// ink floods in and the rim fades. Two movements out of one press.
// ---------------------------------------------------------------------------

const EMBOSS_AT = 150;
const EMBOSS_KNOCK_PX = 9;
const EMBOSS_KNOCK_MS = 175;
const EMBOSS_BEVEL = 2; // atlas units, so the rim lands on the pixel grid
const EMBOSS_FLOOD_AT = 470;
const EMBOSS_FLOOD_MS = 470;
const EMBOSS_RIM_OUT_AT = 650;
const EMBOSS_RIM_OUT_MS = 330;
const EMBOSS_PLATE_FROM = 1.55; // how far out of register the ink arrives
const EMBOSS_INK_AT = 0.62; // fraction of the flood before colour drains to ink

/** Smooth deceleration, for the movements that should feel poured not stepped. */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);
const smoothstep01 = (t: number) => {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
};

export interface ProtoLogoCanvasProps {
  label: string;
  variant: BootVariant;
  /** Render a single frozen frame at this elapsed time (for filmstrips). */
  freezeMs?: number | null;
  /** Bumping this restarts the run. */
  runKey?: number;
  onComplete?: () => void;
}

interface LetterSlot {
  program: Program;
  /** Centre of this glyph in atlas units, measured from the word's left edge. */
  centerX: number;
  width: number;
  /** Index among the drawn glyphs (spaces excluded), for per-letter timing. */
  order: number;
}

export function ProtoLogoCanvas({
  label,
  variant,
  freezeMs = null,
  runKey = 0,
  onComplete,
}: ProtoLogoCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let destroyed = false;
    let rafId = 0;
    let dispose: (() => void) | null = null;

    const setup = async () => {
      const upper = label.toUpperCase();
      const fontFamily = `${pixelFont.style.fontFamily}, monospace`;
      const atlasFontSize = 32;

      if (typeof document !== "undefined" && "fonts" in document) {
        await Promise.race([
          document.fonts.load(`${atlasFontSize}px ${fontFamily}`),
          new Promise((r) => setTimeout(r, 400)),
        ]).catch(() => {});
      }
      if (destroyed || !container) return;

      const measure = document.createElement("canvas").getContext("2d");
      if (!measure) return;
      measure.font = `${atlasFontSize}px ${fontFamily}`;

      // Letters sit at their natural advance widths here. The shipped version
      // needs a huge gap only because it renders every glyph 1.6x oversized.
      const TRACKING = atlasFontSize * 0.1;
      const chars = Array.from(upper);
      let cursor = 0;
      const metrics = chars.map((char, i) => {
        const width = char === " " ? atlasFontSize * 0.6 : measure.measureText(char).width;
        const entry = { char, x: cursor, width };
        cursor += width;
        if (i < chars.length - 1) cursor += TRACKING;
        return entry;
      });
      const totalWidth = cursor;
      const atlasW = Math.ceil(totalWidth) + 8;
      const atlasH = Math.ceil(atlasFontSize * 1.5);

      const atlas = document.createElement("canvas");
      atlas.width = atlasW;
      atlas.height = atlasH;
      const actx = atlas.getContext("2d");
      if (!actx) return;
      actx.fillStyle = "#ffffff";
      actx.textAlign = "left";
      actx.textBaseline = "middle";
      actx.font = `${atlasFontSize}px ${fontFamily}`;
      metrics.forEach(({ char, x }) => {
        if (char !== " ") actx.fillText(char, x + 4, atlasH / 2 + 2);
      });

      const renderer = new Renderer({
        alpha: true,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });
      const gl = renderer.gl;
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      gl.canvas.style.display = "block";
      container.appendChild(gl.canvas);

      const texture = new Texture(gl, {
        image: atlas,
        generateMipmaps: false,
        minFilter: gl.NEAREST,
        magFilter: gl.NEAREST,
      });

      const root = new Transform();
      // Which shader this variant needs, and how much slack its quads want.
      const family: "plate" | "roller" | "emboss" | "glyph" =
        variant === "hottype"
          ? "glyph"
          : variant === "roller"
            ? "roller"
            : variant === "emboss"
              ? "emboss"
              : "plate";
      const margin =
        family === "plate" ? PLATE_MARGIN : family === "emboss" ? EMBOSS_BEVEL + 7 : 0;

      const slots: LetterSlot[] = [];
      let order = 0;
      metrics.forEach(({ char, x, width }) => {
        if (char === " ") return;
        const u0 = x / atlasW;
        const u1 = (x + width) / atlasW;
        const mu = margin / atlasW;
        const mv = margin / atlasH;

        const geometry = new Geometry(gl, {
          position: {
            size: 2,
            data: new Float32Array([
              -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
            ]),
          },
          uv: {
            size: 2,
            data: new Float32Array([
              u0 - mu, -mv, u1 + mu, -mv, u0 - mu, 1 + mv,
              u1 + mu, -mv, u1 + mu, 1 + mv, u0 - mu, 1 + mv,
            ]),
          },
        });

        const wordU0 = x / totalWidth;
        const wordU1 = (x + width) / totalWidth;
        const mkPlate = () =>
          new Program(gl, {
              vertex: VERTEX,
              fragment: PLATE_FRAGMENT,
              transparent: true,
              depthTest: false,
              uniforms: {
                tMask: { value: texture },
                uSpan: { value: [u0, u1] },
                uOffA: { value: [0, 0] },
                uOffB: { value: [0, 0] },
                uOffC: { value: [0, 0] },
                uColA: { value: PLATE_COLORS[0].slice() },
                uColB: { value: PLATE_COLORS[1].slice() },
                uColC: { value: PLATE_COLORS[2].slice() },
                uDensity: { value: [1, 1, 1] },
                uPaper: { value: PAPER.slice() },
                uOpacity: { value: 1 },
                uSpread: { value: [0, 0] },
                uCenter: { value: [0, 0] },
                uHalfSize: { value: [0, 0] },
              },
            });
        const mkRoller = () =>
          new Program(gl, {
            vertex: VERTEX,
            fragment: ROLLER_FRAGMENT,
            transparent: true,
            depthTest: false,
            uniforms: {
              tMask: { value: texture },
              uWordU0: { value: wordU0 },
              uWordU1: { value: wordU1 },
              uBand: { value: -1 },
              uPaper: { value: PAPER.slice() },
              uInk: { value: INK.slice() },
              uEdgeA: { value: PLATE_COLORS[0].slice() },
              uEdgeB: { value: PLATE_COLORS[2].slice() },
              uEdgeC: { value: PLATE_COLORS[1].slice() },
              uOpacity: { value: 1 },
              uCenter: { value: [0, 0] },
              uHalfSize: { value: [0, 0] },
            },
          });
        const mkEmboss = () =>
          new Program(gl, {
            vertex: VERTEX,
            fragment: EMBOSS_FRAGMENT,
            transparent: true,
            depthTest: false,
            uniforms: {
              tMask: { value: texture },
              uSpan: { value: [u0, u1] },
              uBevel: { value: [EMBOSS_BEVEL / atlasW, -EMBOSS_BEVEL / atlasH] },
              uPaper: { value: PAPER.slice() },
              uRim: { value: 0 },
              uFlood: { value: 0 },
              uOffA: { value: [0, 0] },
              uOffB: { value: [0, 0] },
              uOffC: { value: [0, 0] },
              uColA: { value: PLATE_COLORS[0].slice() },
              uColB: { value: PLATE_COLORS[1].slice() },
              uColC: { value: PLATE_COLORS[2].slice() },
              uDensity: { value: [1, 1, 1] },
              uOpacity: { value: 1 },
              uCenter: { value: [0, 0] },
              uHalfSize: { value: [0, 0] },
            },
          });
        const mkGlyph = () =>
          new Program(gl, {
            vertex: VERTEX,
            fragment: GLYPH_FRAGMENT,
            transparent: true,
            depthTest: false,
            uniforms: {
              tMask: { value: texture },
              uColor: { value: INK.slice() },
              uOpacity: { value: 0 },
              uCenter: { value: [0, 0] },
              uHalfSize: { value: [0, 0] },
            },
          });
        const program =
          family === "plate"
            ? mkPlate()
            : family === "roller"
              ? mkRoller()
              : family === "emboss"
                ? mkEmboss()
                : mkGlyph();
        new Mesh(gl, { geometry, program }).setParent(root);
        slots.push({ program, centerX: x + width / 2, width, order });
        order += 1;
      });

      // Per-letter start times, on deliberately uneven gaps.
      const startOf = (gaps: number[]) => {
        const out: number[] = [];
        let at = 0;
        slots.forEach((_, i) => {
          out.push(at);
          at += gaps[i % gaps.length];
        });
        return out;
      };
      const cascadeStart = startOf(CASCADE_GAPS);
      const hotStart = startOf(HOT_GAPS);

      let viewW = 1;
      let viewH = 1;
      let wordW = 1;
      let unit = 1; // atlas units -> screen px
      const layout = () => {
        viewW = container.clientWidth || 1;
        viewH = container.clientHeight || 1;
        renderer.setSize(viewW, viewH);
        wordW = Math.min(viewW * 0.78, 880);
        let wordH = wordW * (atlasH / atlasW);
        const maxH = viewH * 0.36;
        if (wordH > maxH) {
          wordH = maxH;
          wordW = wordH * (atlasW / atlasH);
        }
        unit = wordW / totalWidth;
      };
      layout();
      const ro = new ResizeObserver(layout);
      ro.observe(container);

      /** Place a quad by pixel centre + pixel size, origin at canvas centre, +y up. */
      const place = (program: Program, cx: number, cy: number, pw: number, ph: number) => {
        program.uniforms.uCenter.value = [cx / (viewW / 2), cy / (viewH / 2)];
        program.uniforms.uHalfSize.value = [pw / viewW, ph / viewH];
      };
      /** Atlas-unit plate offset -> uv offset for the plate shader. */
      const toUv = (dx: number, dy: number): [number, number] => [dx / atlasW, -dy / atlasH];

      const totalMs =
        variant === "plates"
          ? PLATE_LOCKS[2] + PLATE_SETTLE_MS
          : variant === "cascade"
            ? cascadeStart[cascadeStart.length - 1] + CASCADE_LETTER_MS + CASCADE_TAIL_MS
            : variant === "press"
              ? PRESS_AT + PRESS_RESOLVE_MS + PRESS_FINAL_KNOCK_MS
              : variant === "hottype"
                ? hotStart[hotStart.length - 1] + HOT_LETTER_MS + HOT_COOL_MS
                : variant === "bloom"
                  ? BLOOM_MS + BLOOM_HOLD_MS
                  : variant === "roller"
                    ? ROLLER_START_MS + ROLLER_MS + ROLLER_HOLD_MS
                    : EMBOSS_FLOOD_AT + EMBOSS_FLOOD_MS + 160;

      const draw = (elapsed: number) => {
        const glyphH = atlasH * unit;
        const quadW = (w: number) => (w + 2 * margin) * unit;
        const quadH = (atlasH + 2 * margin) * unit;
        const halfWord = wordW / 2;
        const px = (u: number) => u * unit - halfWord; // atlas x -> screen x

        if (variant === "plates") {
          const tap = PLATE_TAPS.reduce((best, t) => (elapsed >= t.at ? t : best), PLATE_TAPS[0]);
          const offs: [number, number][] = [];
          const cols: RGB[] = [];
          const dens: number[] = [];
          PLATE_COLORS.forEach((color, i) => {
            const locked = elapsed >= PLATE_LOCKS[i];
            const remaining = locked ? 0 : tap.remaining;
            offs.push(toUv(PLATE_FROM[i][0] * remaining, PLATE_FROM[i][1] * remaining));
            const settled = locked ? clamp01((elapsed - PLATE_LOCKS[i]) / PLATE_SETTLE_MS) : 0;
            cols.push(mixRgb(color, INK, settled));
            // The first plate is the one that stays; the other two lift off as
            // they settle, so the finished word is exactly one pass of ink.
            dens.push(i === 0 ? 1 : 1 - settled);
          });
          slots.forEach(({ program, centerX, width }) => {
            program.uniforms.uOffA.value = offs[0];
            program.uniforms.uOffB.value = offs[1];
            program.uniforms.uOffC.value = offs[2];
            program.uniforms.uColA.value = cols[0];
            program.uniforms.uColB.value = cols[1];
            program.uniforms.uColC.value = cols[2];
            program.uniforms.uDensity.value = dens;
            program.uniforms.uOpacity.value = 1;
            place(program, px(centerX), 0, quadW(width), quadH);
          });
          renderer.render({ scene: root, clear: true });
          return;
        }

        if (variant === "cascade") {
          slots.forEach(({ program, centerX, width, order: i }) => {
            const t = clamp01((elapsed - cascadeStart[i]) / CASCADE_LETTER_MS);
            // This letter's own taps: hard steps, same as the single-sheet
            // version, just compressed into one letter's beat.
            let remaining = 0;
            for (let k = CASCADE_TAP_AT.length - 1; k >= 0; k -= 1) {
              if (t >= CASCADE_TAP_AT[k]) {
                remaining = t >= 1 ? 0 : CASCADE_TAPS[k];
                break;
              }
            }
            const settled = t >= 1 ? clamp01((elapsed - cascadeStart[i] - CASCADE_LETTER_MS) / CASCADE_TAIL_MS) : 0;
            const offs = PLATE_FROM.map(([dx, dy]) => toUv(dx * remaining, dy * remaining));
            program.uniforms.uOffA.value = offs[0];
            program.uniforms.uOffB.value = offs[1];
            program.uniforms.uOffC.value = offs[2];
            program.uniforms.uColA.value = mixRgb(PLATE_COLORS[0], INK, settled);
            program.uniforms.uColB.value = mixRgb(PLATE_COLORS[1], INK, settled);
            program.uniforms.uColC.value = mixRgb(PLATE_COLORS[2], INK, settled);
            program.uniforms.uDensity.value = [1, 1 - settled, 1 - settled];
            program.uniforms.uOpacity.value = 1;
            place(program, px(centerX), 0, quadW(width), quadH);
          });
          renderer.render({ scene: root, clear: true });
          return;
        }

        if (variant === "press") {
          const pressed = elapsed >= PRESS_AT;
          const resolve = pressed ? clamp01((elapsed - PRESS_AT) / PRESS_RESOLVE_MS) : 0;

          // The paper takes each hit: a knock that recovers, bigger for the
          // final press.
          let knock = 0;
          PRESS_STAMPS.forEach((at) => {
            if (elapsed >= at && elapsed < at + PRESS_KNOCK_MS) {
              knock -= PRESS_KNOCK_PX * pulse((elapsed - at) / PRESS_KNOCK_MS);
            }
          });
          if (elapsed >= PRESS_AT && elapsed < PRESS_AT + PRESS_FINAL_KNOCK_MS) {
            knock -= PRESS_FINAL_KNOCK_PX * pulse((elapsed - PRESS_AT) / PRESS_FINAL_KNOCK_MS);
          }

          const offs: [number, number][] = [];
          const cols: RGB[] = [];
          const dens: number[] = [];
          PLATE_COLORS.forEach((color, i) => {
            const down = elapsed >= PRESS_STAMPS[i];
            const remaining = pressed ? 1 - resolve : 1;
            offs.push(toUv(PLATE_FROM[i][0] * remaining, PLATE_FROM[i][1] * remaining));
            cols.push(mixRgb(color, INK, resolve));
            dens.push(down ? (i === 0 ? 1 : 1 - resolve) : 0);
          });
          slots.forEach(({ program, centerX, width }) => {
            program.uniforms.uOffA.value = offs[0];
            program.uniforms.uOffB.value = offs[1];
            program.uniforms.uOffC.value = offs[2];
            program.uniforms.uColA.value = cols[0];
            program.uniforms.uColB.value = cols[1];
            program.uniforms.uColC.value = cols[2];
            program.uniforms.uDensity.value = dens;
            program.uniforms.uOpacity.value = 1;
            place(program, px(centerX), knock, quadW(width), quadH);
          });
          renderer.render({ scene: root, clear: true });
          return;
        }

        if (variant === "bloom") {
          const t = clamp01(elapsed / BLOOM_MS);
          // Late-biased contraction: the ink stays spread, then resolves fast.
          const held = 1 - Math.pow(t, BLOOM_BIAS);
          const spread = BLOOM_SPREAD * held;
          const close = easeOutCubic(t);
          const remaining = BLOOM_FROM * (1 - close);
          const settled = clamp01((t - BLOOM_INK_AT) / (1 - BLOOM_INK_AT));
          const offs = PLATE_FROM.map(([dx, dy]) => toUv(dx * remaining, dy * remaining));
          slots.forEach(({ program, centerX, width }) => {
            program.uniforms.uOffA.value = offs[0];
            program.uniforms.uOffB.value = offs[1];
            program.uniforms.uOffC.value = offs[2];
            program.uniforms.uColA.value = mixRgb(PLATE_COLORS[0], INK, settled);
            program.uniforms.uColB.value = mixRgb(PLATE_COLORS[1], INK, settled);
            program.uniforms.uColC.value = mixRgb(PLATE_COLORS[2], INK, settled);
            program.uniforms.uDensity.value = [1, 1 - settled, 1 - settled];
            program.uniforms.uSpread.value = [spread / atlasW, spread / atlasH];
            program.uniforms.uOpacity.value = 1;
            place(program, px(centerX), 0, quadW(width), quadH);
          });
          renderer.render({ scene: root, clear: true });
          return;
        }

        if (variant === "roller") {
          const t = clamp01((elapsed - ROLLER_START_MS) / ROLLER_MS);
          // Hand-pushed, so it eases in and out rather than running at a
          // constant machine speed.
          const band = -0.14 + smoothstep01(t) * 1.28;
          slots.forEach(({ program, centerX, width }) => {
            program.uniforms.uBand.value = band;
            program.uniforms.uOpacity.value = 1;
            place(program, px(centerX), 0, quadW(width), quadH);
          });
          renderer.render({ scene: root, clear: true });
          return;
        }

        if (variant === "emboss") {
          const struck = elapsed >= EMBOSS_AT;
          const knock =
            struck && elapsed < EMBOSS_AT + EMBOSS_KNOCK_MS
              ? -EMBOSS_KNOCK_PX * pulse((elapsed - EMBOSS_AT) / EMBOSS_KNOCK_MS)
              : 0;
          const floodT = clamp01((elapsed - EMBOSS_FLOOD_AT) / EMBOSS_FLOOD_MS);
          const flood = easeOutCubic(floodT);
          const rimOut = clamp01((elapsed - EMBOSS_RIM_OUT_AT) / EMBOSS_RIM_OUT_MS);
          const rim = struck ? 1 - rimOut : 0;
          // The ink comes in out of register and finds it as it soaks in.
          const remaining = EMBOSS_PLATE_FROM * (1 - easeOutCubic(floodT));
          const settled = clamp01((floodT - EMBOSS_INK_AT) / (1 - EMBOSS_INK_AT));
          const offs = PLATE_FROM.map(([dx, dy]) => toUv(dx * remaining, dy * remaining));
          slots.forEach(({ program, centerX, width }) => {
            program.uniforms.uRim.value = rim;
            program.uniforms.uFlood.value = struck ? flood : 0;
            program.uniforms.uOffA.value = offs[0];
            program.uniforms.uOffB.value = offs[1];
            program.uniforms.uOffC.value = offs[2];
            program.uniforms.uColA.value = mixRgb(PLATE_COLORS[0], INK, settled);
            program.uniforms.uColB.value = mixRgb(PLATE_COLORS[1], INK, settled);
            program.uniforms.uColC.value = mixRgb(PLATE_COLORS[2], INK, settled);
            program.uniforms.uDensity.value = [1, 1 - settled, 1 - settled];
            program.uniforms.uOpacity.value = 1;
            place(program, px(centerX), knock, quadW(width), quadH);
          });
          renderer.render({ scene: root, clear: true });
          return;
        }

        // hottype
        const drop = HOT_DROP_UNITS * unit;
        const contactOf = (i: number) => hotStart[i] + HOT_FALL_MS;
        slots.forEach(({ program, centerX, width, order: i }) => {
          const since = elapsed - hotStart[i];
          const on = since >= 0;
          let y = fallHeight(since) * drop;

          // A sort landing shakes the ones already standing next to it.
          [i - 1, i + 1].forEach((n) => {
            if (n < 0 || n >= slots.length) return;
            const c = contactOf(n);
            if (elapsed >= c && elapsed < c + HOT_NUDGE_MS && elapsed >= contactOf(i)) {
              y -= HOT_NUDGE_PX * pulse((elapsed - c) / HOT_NUDGE_MS);
            }
          });

          const cool = on ? clamp01((since - HOT_FALL_MS) / HOT_COOL_MS) : 0;
          const accent = HOT_ACCENTS[i % HOT_ACCENTS.length];
          program.uniforms.uColor.value = mixRgb(accent, INK, cool);
          program.uniforms.uOpacity.value = on ? 1 : 0;
          place(program, px(centerX), y, width * unit, glyphH);
        });
        renderer.render({ scene: root, clear: true });
      };

      const cleanup = () => {
        ro.disconnect();
        if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };

      if (freezeMs != null) {
        // Redraw the same instant every frame: the drawing buffer is cleared
        // after each composite, so one draw would vanish before capture.
        const hold = () => {
          if (destroyed) return;
          draw(freezeMs);
          rafId = requestAnimationFrame(hold);
        };
        rafId = requestAnimationFrame(hold);
        dispose = cleanup;
        return;
      }

      const start = performance.now();
      let fired = false;
      const tick = () => {
        if (destroyed) return;
        const elapsed = performance.now() - start;
        draw(elapsed);
        if (!fired && elapsed >= totalMs) {
          fired = true;
          onCompleteRef.current?.();
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
      dispose = cleanup;
    };

    setup();

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      dispose?.();
    };
  }, [label, variant, freezeMs, runKey]);

  return <Box ref={containerRef} position="absolute" inset={0} aria-hidden="true" />;
}
