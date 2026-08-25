/**
 * Shared retro-terminal surface constants (ported from Branon's consoleTheme).
 * SCREEN_BG is the dark CRT green; PAPER_BG_SX is the warm-paper page
 * background: a soft radial vignette over a faint grain, so the paper never
 * reads as a flat fill.
 */
export const SCREEN_BG = "#1D2A0C";

const PAPER_NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.07 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;

const PAPER_NOISE_DATA_URI = `data:image/svg+xml,${encodeURIComponent(PAPER_NOISE_SVG)}`;

export const PAPER_BG_SX = {
  backgroundColor: "#EEE6D3",
  backgroundImage: `radial-gradient(ellipse 120% 90% at 50% 28%, rgba(255,251,241,0.95), rgba(233,222,198,0.55) 55%, rgba(196,180,148,0.42) 100%), url("${PAPER_NOISE_DATA_URI}")`,
  backgroundBlendMode: "normal, overlay",
  backgroundSize: "cover, 180px 180px",
} as const;
