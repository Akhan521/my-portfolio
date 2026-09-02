"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalScreen } from "@/components/terminal/TerminalScreen";

interface SectionStubProps {
  title: string; // pixel heading, e.g. "ABOUT"
  path: string; // window path tail, e.g. "~/about"
  command: string; // e.g. "about"
  blurb: string; // subtitle, e.g. "Who I am"
}

/**
 * Placeholder for a section route that is not built yet. Renders the terminal
 * shell with the section's command + heading + blurb + a "coming soon" line,
 * so every menu link resolves (with the ESC/wordmark chrome from the console
 * layout) until the real section replaces it.
 */
export function SectionStub({ title, path, command, blurb }: SectionStubProps) {
  return (
    <Flex minH="100vh" align="center" justify="center" px={{ base: 3, md: 8 }} py="80px">
      <TerminalWindow
        w="full"
        maxW="820px"
        path={
          <>
            aamir@ak-micro:{" "}
            <Box as="span" color="#2f83a6" fontWeight="500">
              {path}
            </Box>
          </>
        }
      >
        <TerminalScreen>
          <Text>
            <Box as="span" color="screen.dim">
              $
            </Box>{" "}
            {command}
          </Text>
          <Flex align="baseline" gap="14px" flexWrap="wrap" mt="18px" mb="4px">
            <Text
              fontFamily="heading"
              fontSize="17px"
              letterSpacing="0.02em"
              color="screen.cream"
              sx={{ textShadow: "0 0 10px rgba(155,227,107,.35)" }}
            >
              {title}
            </Text>
            <Text fontSize="12.5px" color="screen.dim">
              {blurb}
            </Text>
          </Flex>
          <Text mt="22px" color="screen.faint">
            coming soon.
          </Text>
        </TerminalScreen>
      </TerminalWindow>
    </Flex>
  );
}
