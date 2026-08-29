"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalScreen } from "@/components/terminal/TerminalScreen";

// Stub for the PROJECTS section route, here to verify the inner-page chrome
// in context. The real filter-pill index replaces this next.
export default function ProjectsPage() {
  return (
    <Flex minH="100vh" align="center" justify="center" px={{ base: 4, md: 8 }} py="80px">
      <TerminalWindow
        w="full"
        maxW="940px"
        path="aamir@ak-micro: ~/projects"
        status={
          <Box as="span" display="inline-flex" alignItems="center" gap={2}>
            <Box w="8px" h="8px" borderRadius="full" bg="cartridge.green" boxShadow="0 0 7px rgba(34,197,94,.7)" />
            5 programs
          </Box>
        }
      >
        <TerminalScreen>
          <Text>
            <Box as="span" color="screen.dim">
              $
            </Box>{" "}
            ak projects --list
          </Text>
          <Text mt={4} color="screen.dim">
            coming soon: the filter-pill index.
          </Text>
        </TerminalScreen>
      </TerminalWindow>
    </Flex>
  );
}
