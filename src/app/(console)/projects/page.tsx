"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalScreen } from "@/components/terminal/TerminalScreen";

// Category filters (static for now; wiring the filtering + row interaction
// comes with the single-project detail work).
const FILTERS = [
  "all",
  "deep-learning",
  "llm-fine-tuning",
  "vision + nlp",
  "agentic-ai",
  "accessibility",
];

export default function ProjectsPage() {
  return (
    <Flex minH="100vh" align="center" justify="center" px={{ base: 3, md: 8 }} py="80px">
      <TerminalWindow
        w="full"
        maxW="940px"
        path={
          <>
            aamir@ak-micro:{" "}
            <Box as="span" color="#2f83a6" fontWeight="500">
              ~/projects
            </Box>
          </>
        }
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
            ak projects <Box as="span" color="screen.path">--list</Box>
          </Text>

          {/* pixel heading + subtitle */}
          <Flex align="baseline" gap="14px" flexWrap="wrap" mt="18px" mb="4px">
            <Text
              fontFamily="heading"
              fontSize="17px"
              letterSpacing="0.02em"
              color="screen.cream"
              sx={{ textShadow: "0 0 10px rgba(155,227,107,.35)" }}
            >
              PROJECTS
            </Text>
            <Text fontSize="12.5px" color="screen.dim">
              Things I&apos;ve built, by hand and in production.
            </Text>
          </Flex>

          {/* filter pills */}
          <Flex flexWrap="wrap" gap={2} mt="16px" mb="6px">
            {FILTERS.map((f, i) => {
              const on = i === 0;
              return (
                <Box
                  key={f}
                  fontSize="11.5px"
                  letterSpacing="0.02em"
                  px="11px"
                  py="5px"
                  borderRadius="md"
                  whiteSpace="nowrap"
                  border="2px solid"
                  borderColor={on ? "screen.path" : "rgba(155,190,110,.28)"}
                  color={on ? "screen.cream" : "screen.dim"}
                  bg={on ? "rgba(127,215,240,.12)" : "rgba(0,0,0,.12)"}
                >
                  {f}
                </Box>
              );
            })}
          </Flex>
        </TerminalScreen>
      </TerminalWindow>
    </Flex>
  );
}
