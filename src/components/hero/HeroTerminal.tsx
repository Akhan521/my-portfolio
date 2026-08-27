"use client";

import { Box, Text, type BoxProps } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalScreen } from "@/components/terminal/TerminalScreen";

const blink = keyframes`50% { opacity: 0 }`;

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
          ak agent
        </Text>

        <Box h="16px" />

        <Box>
          <Text color="screen.path" mb={3}>
            aamir-agent&gt;
          </Text>
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

        <Text mt="auto" pt="18px" color="screen.ok">
          you&gt; ask me anything
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
