"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";

// Temporary token-preview page: confirms the theme (paper surfaces,
// cartridge accents, CRT phosphor tiers) resolves. Replaced when the
// terminal shell + hero are built.
export default function Home() {
  const accents = ["red", "yellow", "green", "blue", "purple"] as const;
  const phosphor = ["base", "dim", "cream", "ok", "path", "faint"] as const;

  return (
    <Box p={10}>
      <Heading size="lg" color="brand.ink">
        Aamir Khan
      </Heading>
      <Text mt={1} color="brand.muted">
        Theme check: warm paper, cartridge accents, CRT phosphor.
      </Text>

      <Box mt={8} p={5} bg="brand.surface" border="2px solid" borderColor="brand.border" borderRadius="lg">
        <Text color="brand.olive" fontSize="sm">
          brand.surface card on brand.bg, brand.border, radius lg
        </Text>
      </Box>

      <Flex mt={6} gap={3}>
        {accents.map((a) => (
          <Box key={a} w="56px" h="56px" borderRadius="md" bg={`cartridge.${a}`} title={a} />
        ))}
      </Flex>

      <Box mt={8} p={5} bg="screen.bg" borderRadius="lg" fontFamily="mono">
        {phosphor.map((p) => (
          <Text key={p} color={`screen.${p}`} fontSize="sm">
            screen.{p} — the quick brown fox
          </Text>
        ))}
      </Box>
    </Box>
  );
}
