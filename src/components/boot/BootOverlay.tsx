"use client";

import { useCallback, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { BootLogoCanvas } from "./BootLogoCanvas";
import { PAPER_BG_SX } from "@/lib/consoleTheme";

// Matches his cadence: letters stagger 55ms apart, each takes 480ms to fly
// in, then the sweep follows after a short gap.
const STAGGER_MS = 55;
const LETTER_DURATION_MS = 480;
const SWEEP_GAP_MS = 120;
const SWEEP_DURATION_MS = 650;
const FADE_MS = 420;

export const BOOTED_ATTR = "data-booted";
export const BOOT_STORAGE_KEY = "ak-booted";

/**
 * The landing boot sequence: a full-bleed paper screen that plays the pixel
 * wordmark once, then lifts to reveal the hero.
 *
 * Coordination note: the hero's typing animations are paused until
 * <html data-booted="1"> is set, otherwise they would run to completion
 * underneath this overlay and the terminal would already be finished by the
 * time it lifts. That attribute is set either by the inline script in
 * layout.tsx (repeat visit, or reduced motion) or here when the logo lands.
 *
 * Replay suppression: sessionStorage means this plays once per session, not
 * on every navigation back to `/`. Delightful once, tiresome by the fourth
 * time.
 */
export function BootOverlay() {
  const [playing, setPlaying] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  const finish = useCallback(() => {
    document.documentElement.setAttribute(BOOTED_ATTR, "1");
    try {
      window.sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
    } catch {
      // private mode: just don't remember it
    }
    setLeaving(true);
    window.setTimeout(() => setGone(true), FADE_MS);
  }, []);

  useEffect(() => {
    // Read the decision from the global, not the attribute: React strips
    // unknown attributes off <html> while hydrating, so the attribute is gone
    // by now even when the inline script set it.
    const skip = (window as unknown as { __akSkipBoot?: boolean }).__akSkipBoot === true;
    if (skip) {
      // Re-assert it post-hydration so the hero's paused animations resume.
      document.documentElement.setAttribute(BOOTED_ATTR, "1");
      setGone(true);
      return;
    }
    // No WebGL (or it is blocked): don't strand the visitor on a blank
    // screen, just reveal the hero.
    const canWebGL = (() => {
      try {
        return !!document.createElement("canvas").getContext("webgl");
      } catch {
        return false;
      }
    })();
    if (!canWebGL) {
      finish();
      return;
    }
    setPlaying(true);
    // Safety net: if the canvas never reports completion (context lost, tab
    // backgrounded mid-run), lift anyway rather than blocking the site.
    const bail = window.setTimeout(finish, 6000);
    return () => window.clearTimeout(bail);
  }, [finish]);

  if (gone) return null;

  return (
    <Box
      className="boot-overlay"
      position="fixed"
      inset={0}
      zIndex={50}
      sx={{
        ...PAPER_BG_SX,
        opacity: leaving ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: leaving ? "none" : "auto",
        // Hidden before paint for repeat visits / reduced motion, so nothing
        // flashes while React works out that it should be skipped.
        [`html[${BOOTED_ATTR}="1"] &`]: { display: "none" },
      }}
    >
      {playing && (
        <BootLogoCanvas
          label="AAMIR KHAN"
          staggerMs={STAGGER_MS}
          letterDurationMs={LETTER_DURATION_MS}
          sweepGapMs={SWEEP_GAP_MS}
          sweepDurationMs={SWEEP_DURATION_MS}
          onComplete={finish}
        />
      )}
    </Box>
  );
}
