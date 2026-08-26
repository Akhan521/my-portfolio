"use client";

import { Box, Flex, Text, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface TerminalWindowProps extends BoxProps {
  /** Left side of the title bar, e.g. `aamir@ak-micro: ~`. ReactNode so a
   *  portion (the path tail) can be tinted by the caller. */
  path?: ReactNode;
  /** Right side of the title bar, e.g. a live-status chip. */
  status?: ReactNode;
}

// Traffic-light dots, using the cartridge accents.
const DOTS = ["cartridge.red", "cartridge.yellow", "cartridge.green"];

/**
 * The paper terminal window: a tactile card with a title bar (traffic-light
 * dots + path + optional status) over a body. Put a TerminalScreen (or any
 * content) as the child; the screen sits inset so the paper frame shows.
 */
export function TerminalWindow({ path, status, children, ...rest }: TerminalWindowProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      bg="brand.surface"
      border="2px solid"
      borderColor="brand.border"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="0 14px 0 rgba(75,90,46,0.06), 0 20px 40px -18px rgba(51,44,28,.4)"
      {...rest}
    >
      <Flex
        align="center"
        gap={3}
        px={4}
        py={3}
        borderBottom="2px solid"
        borderColor="brand.border"
      >
        <Flex gap="7px" flexShrink={0}>
          {DOTS.map((c) => (
            <Box key={c} w="11px" h="11px" borderRadius="full" bg={c} />
          ))}
        </Flex>
        {path && (
          <Text
            fontFamily="mono"
            fontSize="11px"
            color="brand.olive"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            minW={0}
          >
            {path}
          </Text>
        )}
        {status && (
          <Box
            ml="auto"
            flexShrink={0}
            fontFamily="mono"
            fontSize="10px"
            color="brand.muted"
          >
            {status}
          </Box>
        )}
      </Flex>
      {children}
    </Box>
  );
}
