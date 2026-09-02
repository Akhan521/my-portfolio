"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalScreen } from "@/components/terminal/TerminalScreen";

const blink = keyframes`50% { opacity: 0 }`;

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

// Project disks. Descriptions from tasks/content.md (reworded to avoid the
// "end to end" phrasing the owner dislikes).
const PROJECTS = [
  {
    name: "gpt-from-scratch",
    desc: "Multi-head self-attention, transformer blocks, and autoregressive decoding, by hand in PyTorch.",
    category: "deep-learning",
  },
  {
    name: "text2sql-llama",
    desc: "Fine-tuned LLaMA-2-7B to translate natural language into SQL with LoRA + 4-bit quantization.",
    category: "llm-fine-tuning",
    selected: true,
  },
  {
    name: "snaption",
    desc: "Image captioning that combines computer vision and NLP, trained on Flickr8k in PyTorch.",
    category: "vision + nlp",
  },
  {
    name: "bat-code",
    desc: "A Batman-themed AI coding TUI powered by agentic AI (deepagents). In active development.",
    category: "agentic-ai",
    building: true,
  },
  {
    name: "pixelate",
    desc: "Colorblind-friendly pixel-art editor with an AI assistant and real-time accessibility filters.",
    category: "accessibility + ai",
  },
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
            projects <Box as="span" color="screen.path">--list</Box>
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

          {/* project list */}
          <Box mt="4px">
            {PROJECTS.map((p, i) => {
              const sel = !!p.selected;
              const prevSel = i > 0 && !!PROJECTS[i - 1].selected;
              const showDivider = i > 0 && !sel && !prevSel;
              return (
                <Flex
                  key={p.name}
                  position="relative"
                  gap="14px"
                  px="12px"
                  py="12px"
                  borderRadius="9px"
                  border="2px solid"
                  borderColor={sel ? "rgba(127,215,240,.45)" : "transparent"}
                  bg={sel ? "rgba(127,215,240,.10)" : "transparent"}
                  transform={sel ? "translateX(4px)" : undefined}
                  align={{ base: "flex-start", md: "center" }}
                  flexWrap={{ base: "wrap", md: "nowrap" }}
                  sx={
                    showDivider
                      ? {
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: "-1px",
                            left: "8px",
                            right: "8px",
                            height: "2px",
                            background: "rgba(120,150,80,.22)",
                          },
                        }
                      : undefined
                  }
                >
                  <Box
                    as="span"
                    flex="0 0 auto"
                    w="10px"
                    textAlign="center"
                    fontSize="12px"
                    color={sel ? "screen.path" : "transparent"}
                  >
                    ▸
                  </Box>
                  <Box flex="1 1 auto" minW={0}>
                    <Text fontSize="14px" letterSpacing="0.01em" color={sel ? "screen.cream" : "screen.base"}>
                      {p.name}
                    </Text>
                    <Text
                      fontSize="11.5px"
                      lineHeight="1.5"
                      mt="3px"
                      color={sel ? "screen.dim" : "screen.faint"}
                      whiteSpace={{ base: "normal", md: "nowrap" }}
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {p.desc}
                    </Text>
                  </Box>
                  <Flex
                    align="center"
                    gap="12px"
                    flex="0 0 auto"
                    flexBasis={{ base: "100%", md: "auto" }}
                    pl={{ base: "24px", md: 0 }}
                    mt={{ base: "8px", md: 0 }}
                  >
                    {p.building && (
                      <Box
                        as="span"
                        fontSize="9.5px"
                        fontWeight="500"
                        letterSpacing="0.08em"
                        color="cartridge.yellow"
                        border="1px solid"
                        borderColor="rgba(251,191,36,.5)"
                        borderRadius="4px"
                        px="6px"
                        py="2px"
                        pt="3px"
                        bg="rgba(251,191,36,.08)"
                      >
                        BUILDING
                      </Box>
                    )}
                    <Text fontSize="12px" color="screen.dim" whiteSpace="nowrap">
                      {p.category}
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
          </Box>

          {/* footer */}
          <Flex
            mt="16px"
            gap="12px"
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            direction={{ base: "column", md: "row" }}
          >
            <Text fontSize="11px" letterSpacing="0.02em" color="screen.faint">
              <Box as="span" color="screen.path">
                ↑↓
              </Box>{" "}
              select &middot;{" "}
              <Box as="span" color="screen.path">
                ↵
              </Box>{" "}
              open disk
              <Box
                as="span"
                display="inline-block"
                w="8px"
                h="15px"
                ml="6px"
                verticalAlign="-2px"
                bg="screen.cream"
                boxShadow="0 0 7px rgba(155,227,107,.75)"
                sx={{
                  animation: `${blink} 1.05s steps(1) infinite`,
                  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                }}
              />
            </Text>
            <Text fontSize="11px" color="screen.dim" whiteSpace="nowrap">
              showing 5 of 5
            </Text>
          </Flex>
        </TerminalScreen>
      </TerminalWindow>
    </Flex>
  );
}
