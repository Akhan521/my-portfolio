import localFont from "next/font/local";

/**
 * Self-hosted OFL fonts, exposed as CSS variables (applied on <html> in
 * layout.tsx, referenced by the Chakra theme in theme.ts).
 *
 *  - pixelFont (Press Start 2P): SHORT labels / name / eyebrows only, never
 *    long text.
 *  - monoFont (IBM Plex Mono): all body copy + the terminal surface.
 */
export const pixelFont = localFont({
  src: "../../public/fonts/press-start-2p.ttf",
  weight: "400",
  display: "swap",
  variable: "--font-pixel",
});

export const monoFont = localFont({
  src: [
    { path: "../../public/fonts/ibm-plex-mono-400.ttf", weight: "400" },
    { path: "../../public/fonts/ibm-plex-mono-500.ttf", weight: "500" },
  ],
  display: "swap",
  variable: "--font-mono",
});
