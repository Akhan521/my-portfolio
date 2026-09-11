"use client";

import { Box, Text, type BoxProps } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalScreen } from "@/components/terminal/TerminalScreen";

const blink = keyframes`50% { opacity: 0 }`;

// Boot sequence. Pure CSS so the full text is always in the SSR markup and
// only its *reveal* is animated: no client-only state, so nothing here can
// cause a hydration mismatch, and crawlers/screen readers see finished text.
// All timings are deterministic (no Math.random) for the same reason.
const blinkCursor = keyframes`50% { opacity: 0 }`;

// --- rhythm -----------------------------------------------------------------
const T_WAIT = 0.25; // cursor sits before the first keystroke
const T_READ = 0.35; // after typing: reading it back, then pressing Enter
const T_EXEC = 0.12; // machine beat between Enter and output

/**
 * Per-character keystroke gaps, in seconds. Deterministic pseudo-jitter so
 * the rhythm is uneven like real typing but identical on server and client.
 * Punctuation gets a longer reach; a repeated letter gets a shorter one.
 */
function gaps(text: string): number[] {
  let seed = 7;
  return text.split("").map((ch, i) => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    const jitter = 0.045 + (seed / 2147483648) * 0.055; // 45-100ms
    if (/[^a-z0-9]/i.test(ch)) return jitter + 0.075; // reaching for - or space
    if (i > 0 && text[i - 1] === ch) return jitter * 0.6; // double letter, quicker
    return jitter;
  });
}

/** Total time to type a string, so the next beat can be scheduled after it. */
const typeDur = (text: string) => gaps(text).reduce((a, b) => a + b, 0);

/**
 * Builds a keyframe track that widens the clip one character at a time on an
 * uneven cadence. Each stop pins its own timing function to steps(1), so the
 * width holds and then jumps, rather than sliding between characters.
 */
function typeTrack(text: string) {
  const g = gaps(text);
  const total = g.reduce((a, b) => a + b, 0);
  let at = 0;
  const stops = g.map((gap, i) => {
    const pct = ((at / total) * 100).toFixed(3);
    at += gap;
    return `${pct}% { width: ${i}ch; animation-timing-function: steps(1, end); }`;
  });
  return keyframes`${stops.join("\n")}\n100% { width: ${text.length}ch; }`;
}

/** Types a string in on an uneven, human cadence. */
function TypeIn({ text, at }: { text: string; at: number }) {
  return (
    <Box
      as="span"
      display="inline-block"
      overflow="hidden"
      whiteSpace="pre"
      verticalAlign="bottom"
      sx={{
        width: `${text.length}ch`,
        animation: `${typeTrack(text)} ${typeDur(text).toFixed(3)}s linear ${at}s both`,
        // Held until the boot overlay lifts, otherwise the session would run
        // to completion underneath it (see BootOverlay).
        animationPlayState: "paused",
        'html[data-booted="1"] &': { animationPlayState: "running" },
        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
      }}
    >
      {text}
    </Box>
  );
}

/**
 * The block cursor on the command line: blinks while waiting and while the
 * command is being typed, then vanishes the moment Enter is pressed.
 */
function CommandCursor({ until }: { until: number }) {
  return (
    <Box
      as="span"
      display="inline-block"
      w="9px"
      h="16px"
      verticalAlign="-2px"
      bg="screen.cream"
      boxShadow="0 0 7px rgba(155,227,107,.75)"
      sx={{
        animation: `${blinkCursor} 1.05s steps(1) infinite, ${keyframes`to { opacity: 0; visibility: hidden }`} 0.01s linear ${until}s forwards`,
        animationPlayState: "paused",
        'html[data-booted="1"] &': { animationPlayState: "running" },
        "@media (prefers-reduced-motion: reduce)": { display: "none" },
      }}
    />
  );
}

/**
 * Terminal output does not fade in, it snaps. This holds a block invisible
 * until its moment, then shows it in one frame.
 */
const snapAt = (at: number) => ({
  animation: `${keyframes`from { opacity: 0 } to { opacity: 1 }`} 0.01s linear ${at}s both`,
  animationPlayState: "paused",
  'html[data-booted="1"] &': { animationPlayState: "running" },
  "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 1 },
});

// --- the schedule -----------------------------------------------------------
const CMD = "start-here";
const ASK = "ask me anything";
const T_TYPED = T_WAIT + typeDur(CMD); // command finished typing
const T_ENTER = T_TYPED + T_READ; // Enter pressed
const T_OUT = T_ENTER + T_EXEC; // output lands
const T_ASK = T_OUT + 0.33; // the prompt starts typing

/**
 * The hero terminal: an agent session that resolves to Aamir's identity and
 * ends on `you> ask me anything` (the future live-demo slot). Composed from
 * the TerminalWindow + TerminalScreen shell pair. Content is verbatim from
 * the locked hero mockup.
 */
export function HeroTerminal(props: BoxProps) {
  return (
    <TerminalWindow path="aamir@ak-micro: ~" {...props}>
      <TerminalScreen display="flex" flexDirection="column">
        <Text>
          <Box as="span" color="screen.dim">
            $
          </Box>{" "}
          <TypeIn text={CMD} at={T_WAIT} />
          <CommandCursor until={T_ENTER} />
        </Text>

        <Box h="16px" />

        <Box sx={snapAt(T_OUT)}>
          <Text
            fontFamily="heading"
            fontSize="19px"
            lineHeight="1.4"
            color="screen.cream"
            mb={3}
            sx={{ textShadow: "0 0 10px rgba(155,227,107,.4)" }}
          >
            AAMIR KHAN
          </Text>
          <Text fontSize="11px" letterSpacing="0.26em" color="screen.ok" mb="10px">
            AI SOFTWARE ENGINEER
          </Text>
          <Text color="screen.base" maxW="42ch">
            I build AI agents &amp; LLM systems, and I&apos;m usually the one who figures out
            why they break in production.
          </Text>
          <Text color="screen.dim" mt="9px">
            &rsaquo; now: AI/ML SWE @ Tatari
          </Text>
        </Box>

        <Text mt="auto" pt="18px" color="screen.ok" sx={snapAt(T_OUT)}>
          you&gt; <TypeIn text={ASK} at={T_ASK} />
          <Box
            as="span"
            display="inline-block"
            w="9px"
            h="16px"
            verticalAlign="-2px"
            bg="screen.cream"
            boxShadow="0 0 7px rgba(155,227,107,.75)"
            sx={{
              animation: `${blink} 1.05s steps(1) infinite`,
              "@media (prefers-reduced-motion: reduce)": { animation: "none" },
            }}
          />
        </Text>
      </TerminalScreen>
    </TerminalWindow>
  );
}
