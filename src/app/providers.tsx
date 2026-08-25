"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";

/**
 * App-wide client providers. CacheProvider wires Emotion's cache for the
 * Next App Router (correct SSR/streaming of Chakra styles); ChakraProvider
 * supplies our retro-terminal theme (see theme.ts). Self-hosted fonts get
 * wired into the theme in the next commit.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
