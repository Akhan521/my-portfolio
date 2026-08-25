"use client";

import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

/**
 * Retro-terminal design tokens. Three groups:
 *  - brand.*    warm paper surfaces + ink (the page and its chrome)
 *  - cartridge.* section accent colors (Branon's cartridge palette)
 *  - screen.*   the dark CRT surface + its phosphor text tiers (the terminal)
 * Values are from the validated mockups + the plan's design system.
 */
const colors = {
  brand: {
    bg: "#EEE6D3", // warm paper page background
    surface: "#F7F2E4", // cards / elevated panels
    surfaceHover: "#EFE6D0",
    ink: "#332C1C", // primary text
    olive: "#4B5A2E", // secondary ink / labels
    muted: "#5C6B44", // muted text / meta
    border: "rgba(75, 90, 46, 0.25)",
    borderStrong: "rgba(75, 90, 46, 0.5)",
  },
  cartridge: {
    red: "#f05032",
    yellow: "#fbbf24",
    green: "#22c55e",
    blue: "#61dafb",
    purple: "#a78bfa",
  },
  screen: {
    bg: "#1D2A0C", // dark CRT background
    base: "#c7d59a", // primary phosphor text
    dim: "#7f9a54", // secondary
    cream: "#f1ead4", // bright / headings
    ok: "#9be36b", // green highlight / success
    path: "#7fd7f0", // cyan highlight / links / selection
    faint: "#5f7640", // faintest
  },
};

// Single fixed palette (paper light), no system color-mode switching.
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Rounding matches the validated mockups (rounded terminal window + pills),
// not the earlier DMG-style "hard corners" idea.
const radii = {
  sm: "6px",
  md: "8px",
  lg: "12px",
};

// Self-hosted fonts (see fonts.ts, applied as CSS vars on <html> in
// layout.tsx). Pixel for headings/labels, IBM Plex Mono for body + terminal.
const fonts = {
  heading: "var(--font-pixel)",
  body: "var(--font-mono)",
  mono: "var(--font-mono)",
};

const styles = {
  global: {
    body: {
      bg: "brand.bg",
      color: "brand.ink",
    },
  },
};

export const theme = extendTheme({ colors, config, radii, fonts, styles });
