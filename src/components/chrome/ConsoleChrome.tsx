"use client";

import { Box } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

/**
 * Persistent chrome for inner "console" routes (Branon's pattern: no navbar
 * inside the console). A fixed ESC · MENU chip top-left (back to the hero +
 * its SELECT A PROGRAM menu) and the wordmark top-right (also home). Both
 * route to `/`.
 */
export function ConsoleChrome() {
  return (
    <>
      <Box
        as={Link}
        href="/"
        position="fixed"
        top={{ base: "14px", md: "26px" }}
        left={{ base: "14px", md: "30px" }}
        zIndex={20}
        display="inline-flex"
        alignItems="center"
        gap="7px"
        fontFamily="heading"
        fontSize="8px"
        letterSpacing="0.04em"
        lineHeight="1"
        color="brand.ink"
        bg="rgba(97,208,246,.12)"
        border="2px solid"
        borderColor="rgba(60,140,170,.45)"
        borderRadius="9px"
        px="10px"
        py="8px"
        transition="0.15s ease all"
        _hover={{ borderColor: "rgba(60,140,170,.85)", bg: "rgba(97,208,246,.2)", textDecoration: "none" }}
        aria-label="Back to the menu"
      >
        <Box as="span" aria-hidden="true" fontFamily="body" fontSize="11px" lineHeight="1">
          &#9099;
        </Box>
        ESC &middot; MENU
      </Box>

      <Box
        as={Link}
        href="/"
        position="fixed"
        top={{ base: "16px", md: "28px" }}
        right={{ base: "14px", md: "30px" }}
        zIndex={20}
        fontFamily="heading"
        fontSize="9px"
        letterSpacing="0.06em"
        color="brand.olive"
        opacity={0.9}
        transition="0.15s ease"
        _hover={{ opacity: 1, textDecoration: "none" }}
        aria-label="Aamir Khan, home"
      >
        AAMIR KHAN
      </Box>
    </>
  );
}
