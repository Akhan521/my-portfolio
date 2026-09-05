"use client";

import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalScreen } from "@/components/terminal/TerminalScreen";

const blink = keyframes`50% { opacity: 0 }`;

// Project disks. Descriptions from tasks/content.md (reworded to avoid the
// "end to end" phrasing the owner dislikes). Repo URLs verified live
// 2026-09-04 (note: the slug is Text2SQL-LLaMA-Analyst, not Text2SQL-LLaMA).
const PROJECTS = [
  {
    name: "gpt-from-scratch",
    desc: "Multi-head self-attention, transformer blocks, and autoregressive decoding, by hand in PyTorch.",
    category: "deep-learning",
    href: "https://github.com/Akhan521/GPT-From-Scratch",
  },
  {
    name: "text2sql-llama",
    desc: "Fine-tuned LLaMA-2-7B to translate natural language into SQL with LoRA + 4-bit quantization.",
    category: "llm-fine-tuning",
    href: "https://github.com/Akhan521/Text2SQL-LLaMA-Analyst",
  },
  {
    name: "snaption",
    desc: "Image captioning that combines computer vision and NLP, trained on Flickr8k in PyTorch.",
    category: "vision + nlp",
    href: "https://github.com/Akhan521/Snaption",
  },
  {
    name: "bat-code",
    desc: "A Batman-themed AI coding TUI powered by agentic AI (deepagents). In active development.",
    category: "agentic-ai",
    href: "https://github.com/Akhan521/bat-code",
    building: true,
  },
  {
    name: "pixelate",
    desc: "Colorblind-friendly pixel-art editor with an AI assistant and real-time accessibility filters.",
    category: "accessibility + ai",
    href: "https://github.com/Akhan521/Pixelate",
  },
];

// Derived from the data so a pill can never drift from a project's category.
const FILTERS = ["all", ...PROJECTS.map((p) => p.category)];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(0);

  const shown = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  // Changing the filter re-seeds the selection at the top of the new list.
  const pick = useCallback((f: string) => {
    setFilter(f);
    setSelected(0);
  }, []);

  // ↑↓ moves the selected row, ↵ opens it. Matches the footer's hint.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => {
          const next = e.key === "ArrowDown" ? s + 1 : s - 1;
          return (next + shown.length) % shown.length;
        });
      } else if (e.key === "Enter") {
        const target = shown[selected];
        if (target) window.open(target.href, "_blank", "noopener,noreferrer");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shown, selected]);

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
            {PROJECTS.length} programs
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
            {FILTERS.map((f) => {
              const on = f === filter;
              return (
                <Box
                  as="button"
                  type="button"
                  key={f}
                  onClick={() => pick(f)}
                  aria-pressed={on}
                  fontSize="11.5px"
                  letterSpacing="0.02em"
                  px="11px"
                  py="5px"
                  borderRadius="md"
                  whiteSpace="nowrap"
                  cursor="pointer"
                  border="2px solid"
                  borderColor={on ? "screen.path" : "rgba(155,190,110,.28)"}
                  color={on ? "screen.cream" : "screen.dim"}
                  bg={on ? "rgba(127,215,240,.12)" : "rgba(0,0,0,.12)"}
                  transition="0.14s ease all"
                  _hover={
                    on
                      ? undefined
                      : { borderColor: "rgba(155,190,110,.5)", color: "screen.base", bg: "rgba(0,0,0,.22)" }
                  }
                >
                  {f}
                </Box>
              );
            })}
          </Flex>

          {/* Project list. minH holds the full-list height (5 rows) so filtering
              down to one row doesn't collapse the window; mobile rows are taller
              and variable, so it flows freely there. */}
          <Box mt="4px" minH={{ base: 0, md: "360px" }}>
            {shown.map((p, i) => {
              const sel = i === selected;
              const prevSel = i > 0 && i - 1 === selected;
              const showDivider = i > 0 && !sel && !prevSel;
              return (
                <Flex
                  key={p.name}
                  as={Link}
                  href={p.href}
                  isExternal
                  role="group"
                  onMouseEnter={() => setSelected(i)}
                  position="relative"
                  gap="14px"
                  px="12px"
                  py="12px"
                  borderRadius="9px"
                  border="2px solid"
                  borderColor={sel ? "rgba(127,215,240,.45)" : "transparent"}
                  bg={sel ? "rgba(127,215,240,.10)" : "transparent"}
                  transform={sel ? "translateX(4px)" : undefined}
                  transition="0.14s ease all"
                  _hover={{ textDecoration: "none" }}
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
                  {/* Arrow + text stay one non-wrapping pair, so the marker can
                      never orphan onto its own line when the row wraps. */}
                  <Flex flex="1 1 auto" minW={0} gap="14px" flexWrap="nowrap">
                    <Box
                      as="span"
                      flex="0 0 auto"
                      w="10px"
                      textAlign="center"
                      fontSize="12px"
                      lineHeight="1.6"
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
                  </Flex>
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
              open repo
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
              showing {shown.length} of {PROJECTS.length}
            </Text>
          </Flex>
        </TerminalScreen>
      </TerminalWindow>
    </Flex>
  );
}
