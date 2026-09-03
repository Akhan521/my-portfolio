"use client";

import { Box, Flex, Text, type BoxProps } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

// The four sections, each with its cartridge accent + route. ABOUT is the
// default highlighted item (the hero's resting selection). Accents are raw
// hex so we can derive the active/hover fill (accent at ~12-13% alpha).
const ITEMS = [
  { cmd: "ABOUT", blurb: "Who I am", accent: "#f05032", href: "/about", active: true },
  { cmd: "PROJECTS", blurb: "Things I've built", accent: "#61dafb", href: "/projects" },
  { cmd: "EXPERIENCE", blurb: "Where I've shipped", accent: "#22c55e", href: "/experience" },
  { cmd: "CONTACT", blurb: "Let's talk", accent: "#a78bfa", href: "/contact" },
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

      <Box as="ul" display="flex" flexDirection="column" gap={2} listStyleType="none">
        {ITEMS.map((it) => (
          <Box as="li" key={it.cmd}>
            <Flex
              as={Link}
              href={it.href}
              role="group"
              align="center"
              gap={3}
              px="15px"
              py={3}
              borderRadius="lg"
              border="2px solid"
              borderColor={it.active ? it.accent : "brand.border"}
              bg={it.active ? `${it.accent}22` : "rgba(255,255,255,0.35)"}
              transition="0.14s ease all"
              _hover={{
                borderColor: it.accent,
                bg: `${it.accent}1f`,
                transform: "translateX(2px)",
                textDecoration: "none",
              }}
            >
              <Box
                as="span"
                fontSize="10px"
                lineHeight="1"
                color={it.active ? it.accent : "transparent"}
                _groupHover={{ color: it.accent }}
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
          </Box>
        ))}
      </Box>

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
