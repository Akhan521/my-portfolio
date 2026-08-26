"use client";

import { Box, type BoxProps } from "@chakra-ui/react";

/**
 * The phosphor CRT surface: a dark-green radial glow with an inset shadow,
 * a soft scanline + sheen overlay, and mono phosphor text. Sits inset inside
 * a TerminalWindow (its own margin leaves the paper frame showing). Content
 * is lifted above the overlay via the `& > *` z-index rule.
 */
export function TerminalScreen({ children, sx, ...rest }: BoxProps) {
  return (
    <Box
      position="relative"
      m="14px"
      borderRadius="md"
      px={{ base: 5, md: 7 }}
      py={6}
      color="screen.base"
      fontFamily="mono"
      fontSize="13px"
      lineHeight="1.7"
      sx={{
        background:
          "radial-gradient(130% 120% at 50% 20%, #24350f, #1D2A0C 72%, #141d09 100%)",
        boxShadow:
          "inset 0 0 26px 6px rgba(0,0,0,.5), inset 0 0 0 2px rgba(0,0,0,.35)",
        textShadow: "0 0 5px rgba(120,190,70,.28)",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 5,
          background:
            "linear-gradient(115deg, rgba(255,255,255,.05), rgba(255,255,255,0) 34%), repeating-linear-gradient(rgba(0,0,0,.16) 0 1px, rgba(0,0,0,0) 1px 3px)",
          mixBlendMode: "soft-light",
        },
        "& > *": { position: "relative", zIndex: 1 },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
