"use client";

import { Box, Flex, Text, type BoxProps } from "@chakra-ui/react";

// The five sections, each with its cartridge accent. ABOUT is the default
// highlighted item (the hero's resting selection). Accents are raw hex so we
// can derive the active fill (accent at ~13% alpha).
const ITEMS = [
  { cmd: "ABOUT", blurb: "Who I am", accent: "#f05032", active: true },
  { cmd: "PROJECTS", blurb: "Things I've built", accent: "#61dafb" },
  { cmd: "EXPERIENCE", blurb: "Where I've shipped", accent: "#22c55e" },
  { cmd: "WRITING", blurb: "Notes & write-ups", accent: "#fbbf24" },
  { cmd: "CONTACT", blurb: "Let's talk", accent: "#a78bfa" },
];

/**
 * The SELECT A PROGRAM menu: the hero's section selector (Branon's
 * insert-cartridge UX, terminalized). A paper card with pixel-labeled rows,
 * one highlighted in its section accent, plus a keyboard-hint footer.
 */
export function ProgramMenu(props: BoxProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      bg="brand.surface"
      border="2px solid"
      borderColor="brand.border"
      borderRadius="lg"
      p={5}
      {...props}
    >
      <Text
        fontFamily="heading"
        fontSize="11px"
        letterSpacing="0.18em"
        color="brand.olive"
        mb="14px"
      >
        SELECT A PROGRAM
      </Text>

      <Flex as="ul" direction="column" gap={2} listStyleType="none">
        {ITEMS.map((it) => (
          <Flex
            as="li"
            key={it.cmd}
            align="center"
            gap={3}
            px="15px"
            py={3}
            borderRadius="lg"
            border="2px solid"
            borderColor={it.active ? it.accent : "brand.border"}
            bg={it.active ? `${it.accent}22` : "rgba(255,255,255,0.35)"}
          >
            <Box
              as="span"
              fontSize="10px"
              lineHeight="1"
              color={it.active ? it.accent : "transparent"}
            >
              ▶
            </Box>
            <Box>
              <Text
                fontFamily="heading"
                fontSize="10.5px"
                letterSpacing="0.05em"
                color="brand.ink"
                lineHeight="1.25"
              >
                {it.cmd}
              </Text>
              <Text fontFamily="body" fontSize="12px" color="brand.muted" mt={1}>
                {it.blurb}
              </Text>
            </Box>
          </Flex>
        ))}
      </Flex>

      <Flex mt="auto" pt="16px" align="center" justify="space-between" minH="28px">
        <Text
          fontFamily="heading"
          fontSize="9px"
          letterSpacing="0.06em"
          color="brand.muted"
        >
          ↑↓ SELECT · ENTER TO RUN
        </Text>
        <Flex
          w="28px"
          h="28px"
          align="center"
          justify="center"
          borderRadius="md"
          border="2px solid"
          borderColor="brand.borderStrong"
          bg="rgba(255,255,255,0.5)"
          color="brand.olive"
          fontFamily="mono"
          fontSize="12px"
          fontWeight="500"
          aria-hidden="true"
        >
          &gt;_
        </Flex>
      </Flex>
    </Box>
  );
}
