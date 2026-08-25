"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

/**
 * App-wide client providers. CacheProvider wires Emotion's cache for the
 * Next App Router (correct SSR/streaming of Chakra styles); ChakraProvider
 * supplies the theme + context. A custom theme (design tokens) and the
 * self-hosted fonts get wired in the next commits.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
}
