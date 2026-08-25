"use client";

import { Box, Flex, Text } from "@chakra-ui/react";

// Temporary token + font preview: confirms the theme (paper surfaces,
// cartridge accents, CRT phosphor) and the self-hosted fonts (Press Start 2P
// pixel + IBM Plex Mono) resolve. Replaced when the terminal shell + hero
// are built.
export default function Home() {
  const accents = ["red", "yellow", "green", "blue", "purple"] as const;
  const phosphor = ["base", "dim", "cream", "ok", "path", "faint"] as const;

  return (
    <Box p={10}>
      {/* pixel font: short label only */}
      <Text fontFamily="heading" fontSize="14px" color="brand.olive" letterSpacing="0.06em">
        SELECT A PROGRAM
      </Text>
      {/* mono font: body */}
      <Text mt={4} fontFamily="body" fontSize="lg" color="brand.ink">
        Aamir Khan, IBM Plex Mono body.
      </Text>
      <Text mt={1} fontFamily="body" color="brand.muted">
        Theme + font check: warm paper, cartridge accents, CRT phosphor.
      </Text>

      <Flex mt={6} gap={3}>
        {accents.map((a) => (
          <Box key={a} w="56px" h="56px" borderRadius="md" bg={`cartridge.${a}`} title={a} />
        ))}
      </Flex>

      <Box mt={8} p={5} bg="screen.bg" borderRadius="lg">
        {phosphor.map((p) => (
          <Text key={p} fontFamily="mono" color={`screen.${p}`} fontSize="sm">
            screen.{p} :: the quick brown fox
          </Text>
        ))}
      </Box>
    </Box>
  );
}
