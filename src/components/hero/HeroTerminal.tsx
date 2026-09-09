"use client";

import { Box, Text, type BoxProps } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalScreen } from "@/components/terminal/TerminalScreen";

const blink = keyframes`50% { opacity: 0 }`;

// Boot sequence. Pure CSS so the full text is always in the SSR markup and
// only its *reveal* is animated: no client-only state, so nothing here can
// cause a hydration mismatch, and crawlers/screen readers see finished text.
const type = keyframes`from { width: 0 } to { width: var(--tw) }`;
const appear = keyframes`from { opacity: 0 } to { opacity: 1 }`;

const CHAR = 0.055; // seconds per typed character
const T_CMD = 0.25; // `start-here` starts typing
const T_OUT = T_CMD + "start-here".length * CHAR + 0.25; // identity + `you>` land
const T_ASK = T_OUT + 0.35; // `ask me anything` starts typing

/** Types a string in, character by character, via a steps() width reveal. */
function TypeIn({ text, at }: { text: string; at: number }) {
  return (
    <Box
      as="span"
      display="inline-block"
      overflow="hidden"
      whiteSpace="nowrap"
      verticalAlign="bottom"
      sx={{
        "--tw": `${text.length}ch`,
        width: "var(--tw)",
        animation: `${type} ${(text.length * CHAR).toFixed(2)}s steps(${text.length}) ${at}s both`,
        "@media (prefers-reduced-motion: reduce)": { animation: "none", width: "auto" },
      }}
    >
      {text}
    </Box>
  );
}

/** Fades a block in once the command that produced it has finished typing. */
const appearAt = (at: number) => ({
  animation: `${appear} 0.28s ease ${at}s both`,
  "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 1 },
});

/**
 * The hero terminal: an agent session that resolves to Aamir's identity and
 * ends on `you> ask me anything` (the future live-demo slot). Composed from
 * the TerminalWindow + TerminalScreen shell pair. Content is verbatim from
 * the locked hero mockup.
 */
export function HeroTerminal(props: BoxProps) {
  return (
    <TerminalWindow
      path="aamir@ak-micro: ~"
      status={
        <Box as="span" display="inline-flex" alignItems="center" gap={2}>
          <Box
            w="8px"
            h="8px"
            borderRadius="full"
            bg="cartridge.green"
            boxShadow="0 0 7px rgba(34,197,94,.7)"
          />
          agent online
        </Box>
      }
      {...props}
    >
      <TerminalScreen display="flex" flexDirection="column">
        <Text>
          <Box as="span" color="screen.dim">
            $
          </Box>{" "}
          <TypeIn text="start-here" at={T_CMD} />
        </Text>

        <Box h="16px" />

        <Box sx={appearAt(T_OUT)}>
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

        <Text mt="auto" pt="18px" color="screen.ok" sx={appearAt(T_OUT)}>
          you&gt; <TypeIn text="ask me anything" at={T_ASK} />
          <Box
            as="span"
            display="inline-block"
            w="9px"
            h="16px"
            ml="6px"
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
