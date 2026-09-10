"use client";

import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { Renderer, Program, Mesh, Texture, Geometry, Transform } from "ogl";
import { pixelFont } from "@/app/fonts";

const VERTEX = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  uniform vec2 uCenter;
  uniform vec2 uHalfSize;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec2 pos = uCenter + position * (uHalfSize * 2.0);
    gl_Position = vec4(pos, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D tMask;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uSweep;
  uniform float uGlobalU0;
  uniform float uGlobalU1;
  uniform vec3 uLetterColor;
  uniform float uColorMix;

  void main() {
    // Nearest-filtered atlas already gives chunky pixel edges; just sample
    // the glyph's alpha mask.
    float mask = texture2D(tMask, vUv).a;
    if (mask < 0.05) discard;

    // One continuous colour band travelling across the WHOLE word: driven by
    // this letter's word-relative position, not its own UV, so the sweep
    // does not restart at every letter.
    float globalU = mix(uGlobalU0, uGlobalU1, vUv.x);
    float diag = globalU + vUv.y * 0.12;
    float bandCenter = mix(-0.5, 1.5, uSweep);
    float band = smoothstep(0.4, 0.0, abs(diag - bandCenter));

    vec3 rainbow = 0.5 + 0.5 * cos(
      6.28318 * (diag * 1.6 + uTime * 0.1) + vec3(0.0, 2.094, 4.188)
    );

    // Resting colour is brand.ink (#332C1C) so the wordmark settles into the
    // same ink the rest of the paper UI uses.
    vec3 ink = vec3(0.2, 0.1725, 0.1098);
    // Each letter flashes its own accent on the way in, settling to ink as
    // it lands; the shared sweep washes over that afterwards.
    vec3 base = mix(ink, uLetterColor, uColorMix);
    vec3 color = mix(base, rainbow, band * 0.92);

    gl_FragColor = vec4(color, mask * uOpacity);
  }
`;

/** Overshoot-then-settle easing for each letter's scale/position bounce. */
function easeOutBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const c = Math.min(Math.max(t, 0), 1);
  return 1 + c3 * Math.pow(c - 1, 3) + c1 * Math.pow(c - 1, 2);
}

// Letters arrive dramatically oversized, flash their accent, then bounce and
// settle. The shrink is biased late so they stay big and overlapping while
// travelling, only resolving to resting size as they slide into place.
const START_SCALE = 8.5;
const END_SCALE = 1.6;
const SCALE_WINDOW_T = 0.8;
const SCALE_BIAS = 1.6;

function scaleProgress(t: number) {
  const windowed = Math.min(Math.max(t / SCALE_WINDOW_T, 0), 1);
  return easeOutBack(Math.pow(windowed, SCALE_BIAS));
}

// Hand-tuned "J-hook" flight path, relative to each letter's resting spot:
// starts right and below, rockets up bulging further right, arcs back down
// past resting height, then slides the last bit leftward into place.
const PATH_START: [number, number] = [0.05, -0.2];
const PATH_PEAK: [number, number] = [0.07, 0.28];
const PATH_DIP: [number, number] = [0.025, 0.02];
const PATH_END: [number, number] = [0, 0];
const PATH_PEAK_T = 0.45;
const PATH_DIP_T = 0.8;

const smoothstep = (t: number) => {
  const c = Math.min(Math.max(t, 0), 1);
  return c * c * (3 - 2 * c);
};
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;

function flightOffset(t: number): [number, number] {
  if (t <= PATH_PEAK_T) {
    const u = smoothstep(t / PATH_PEAK_T);
    return [lerp(PATH_START[0], PATH_PEAK[0], u), lerp(PATH_START[1], PATH_PEAK[1], u)];
  }
  if (t <= PATH_DIP_T) {
    const u = smoothstep((t - PATH_PEAK_T) / (PATH_DIP_T - PATH_PEAK_T));
    return [lerp(PATH_PEAK[0], PATH_DIP[0], u), lerp(PATH_PEAK[1], PATH_DIP[1], u)];
  }
  const u = smoothstep((t - PATH_DIP_T) / (1 - PATH_DIP_T));
  return [lerp(PATH_DIP[0], PATH_END[0], u), lerp(PATH_DIP[1], PATH_END[1], u)];
}

// Each letter bounces in place right after IT lands (not after the whole
// word), so the sequence cascades instead of waiting.
const BOUNCE_REPEATS = 2;
const BOUNCE_CYCLE_MS = 170;
const BOUNCE_AMPLITUDE = 0.16;
const BOUNCE_GAP_MS = 30;

function bounceScale(sinceStart: number) {
  const total = BOUNCE_CYCLE_MS * BOUNCE_REPEATS;
  if (sinceStart <= 0 || sinceStart >= total) return 1;
  const pos = (sinceStart % BOUNCE_CYCLE_MS) / BOUNCE_CYCLE_MS;
  return 1 + BOUNCE_AMPLITUDE * Math.sin(pos * Math.PI);
}

/** #rrggbb -> linear RGB triple for the shader. */
function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

// Our cartridge accents, cycled across the letters, so the entrance flashes
// in the site's own palette rather than a generic rainbow.
const ACCENTS = ["#f05032", "#fbbf24", "#22c55e", "#61dafb", "#a78bfa"];

interface LetterEntry {
  program: Program;
  centerXFrac: number;
  halfWidthFrac: number;
  startDelayMs: number;
}

export interface BootLogoCanvasProps {
  label: string;
  staggerMs: number;
  letterDurationMs: number;
  sweepGapMs: number;
  sweepDurationMs: number;
  /** Fired once the sweep has fully played out (the whole logo is done). */
  onComplete?: () => void;
}

/**
 * WebGL boot wordmark (via `ogl`), ported from Branon Eusebio's boot logo and
 * retuned to our palette: each letter is drawn to a low-res offscreen atlas
 * and sampled nearest-neighbour for chunky pixel edges, then rockets in
 * oversized along a J-hook path while shrinking to resting scale, bounces in
 * place, and finally a colour sweep washes across the settled word.
 */
export function BootLogoCanvas({
  label,
  staggerMs,
  letterDurationMs,
  sweepGapMs,
  sweepDurationMs,
  onComplete,
}: BootLogoCanvasProps) {
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

      // Canvas text does not wait for @font-face the way DOM text does, so
      // force the pixel font to load (capped) before measuring or drawing.
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

      // Extra room between glyphs: END_SCALE renders each letter bigger than
      // its tightly-kerned slot, which would otherwise read as overlapping.
      const LETTER_GAP = atlasFontSize * 0.58;
      const chars = Array.from(upper);
      let cursor = 0;
      const metrics = chars.map((char, i) => {
        const width = char === " " ? atlasFontSize * 0.55 : measure.measureText(char).width;
        const entry = { char, x: cursor, width };
        cursor += width;
        if (i < chars.length - 1) cursor += LETTER_GAP;
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

      const resize = () => {
        renderer.setSize(container.clientWidth || 1, container.clientHeight || 1);
      };
      resize();

      const texture = new Texture(gl, {
        image: atlas,
        generateMipmaps: false,
        minFilter: gl.NEAREST,
        magFilter: gl.NEAREST,
      });

      const root = new Transform();

      // On-screen box the whole word occupies (layout slots only; per-letter
      // render size is applied at draw time via END_SCALE).
      const box = { halfWidth: 0.3, halfHeight: 0.08 };
      const updateBox = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        let widthPx = Math.min(w * 0.82, 1200);
        let heightPx = widthPx * (atlasH / atlasW);
        const maxHeightPx = h * 0.42;
        if (heightPx > maxHeightPx) {
          heightPx = maxHeightPx;
          widthPx = heightPx * (atlasW / atlasH);
        }
        box.halfWidth = widthPx / w / 2;
        box.halfHeight = heightPx / h / 2;
      };
      updateBox();

      const ro = new ResizeObserver(() => {
        resize();
        updateBox();
      });
      ro.observe(container);

      const letters: LetterEntry[] = [];
      let visibleIndex = 0;
      metrics.forEach(({ char, x, width }) => {
        if (char === " ") return;

        const u0 = x / atlasW;
        const u1 = (x + width) / atlasW;
        const centerXFrac = (x + width / 2) / totalWidth;
        const halfWidthFrac = width / totalWidth / 2;
        const color = hexToRgb(ACCENTS[visibleIndex % ACCENTS.length]);

        const geometry = new Geometry(gl, {
          position: {
            size: 2,
            data: new Float32Array([
              -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
            ]),
          },
          uv: {
            size: 2,
            data: new Float32Array([u0, 0, u1, 0, u0, 1, u1, 0, u1, 1, u0, 1]),
          },
        });

        const program = new Program(gl, {
          vertex: VERTEX,
          fragment: FRAGMENT,
          transparent: true,
          depthTest: false,
          uniforms: {
            tMask: { value: texture },
            uTime: { value: 0 },
            uOpacity: { value: 0 },
            uSweep: { value: 0 },
            uGlobalU0: { value: centerXFrac - halfWidthFrac },
            uGlobalU1: { value: centerXFrac + halfWidthFrac },
            uCenter: { value: [0, 0] },
            uHalfSize: { value: [0, 0] },
            uLetterColor: { value: color },
            uColorMix: { value: 0 },
          },
        });

        const mesh = new Mesh(gl, { geometry, program });
        mesh.setParent(root);

        letters.push({
          program,
          centerXFrac,
          halfWidthFrac,
          startDelayMs: visibleIndex * staggerMs,
        });
        visibleIndex += 1;
      });

      const lastDelay = letters.length ? letters[letters.length - 1].startDelayMs : 0;
      const bounceMs = BOUNCE_CYCLE_MS * BOUNCE_REPEATS;
      const sweepStartMs = lastDelay + letterDurationMs + BOUNCE_GAP_MS + bounceMs + sweepGapMs;
      let completeFired = false;

      const start = performance.now();

      const tick = () => {
        if (destroyed) return;
        const elapsed = performance.now() - start;

        letters.forEach(({ program, centerXFrac, halfWidthFrac, startDelayMs }) => {
          const rawT = (elapsed - startDelayMs) / letterDurationMs;
          const t = Math.min(Math.max(rawT, 0), 1);
          const eased = scaleProgress(t);
          const entranceScale = END_SCALE + (START_SCALE - END_SCALE) * (1 - eased);
          const [fx, fy] = flightOffset(t);
          const bounce = t >= 1 ? bounceScale(elapsed - (startDelayMs + letterDurationMs + BOUNCE_GAP_MS)) : 1;
          const scale = entranceScale * bounce;

          program.uniforms.uCenter.value = [
            (centerXFrac - 0.5) * box.halfWidth * 2 + fx,
            fy,
          ];
          program.uniforms.uHalfSize.value = [
            halfWidthFrac * box.halfWidth * 2 * scale,
            box.halfHeight * scale,
          ];
          program.uniforms.uOpacity.value = rawT > 0 ? 1 : 0;
          program.uniforms.uColorMix.value = 1 - eased;
          program.uniforms.uTime.value = elapsed / 1000;
        });

        const sweepT = Math.min(Math.max((elapsed - sweepStartMs) / sweepDurationMs, 0), 1);
        letters.forEach(({ program }) => {
          program.uniforms.uSweep.value = sweepT;
        });

        if (!completeFired && elapsed >= sweepStartMs + sweepDurationMs) {
          completeFired = true;
          onCompleteRef.current?.();
        }

        renderer.render({ scene: root });
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      dispose = () => {
        ro.disconnect();
        if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    };

    setup();

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      dispose?.();
    };
  }, [label, staggerMs, letterDurationMs, sweepGapMs, sweepDurationMs]);

  return <Box ref={containerRef} position="absolute" inset={0} aria-hidden="true" />;
}
