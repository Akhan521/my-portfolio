"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalScreen } from "@/components/terminal/TerminalScreen";

const blink = keyframes`50% { opacity: 0 }`;

// A metric inside a bullet, tinted bright so it reads as a data readout.
function Num({ children }: { children: React.ReactNode }) {
  return (
    <Box as="span" color="screen.cream" fontWeight="500">
      {children}
    </Box>
  );
}

// Career log, most recent first. Copy composed from tasks/aamir-info-bank.md,
// application-side framing, Tatari metrics cleared for public use.
const ROLES: {
  title: string;
  meta: string;
  bullets: React.ReactNode[];
}[] = [
  {
    title: "AI/ML Software Engineer Intern",
    meta: "Tatari · Jun 2026 → Sep 2026",
    bullets: [
      <>
        Root-caused and fixed a multi-month serving outage that was silently failing{" "}
        <Num>~3.9M</Num> feature lookups a day, tracing it to a publish-vs-serve key-order
        mismatch and sealing it with a permanent regression test.
      </>,
      <>
        Built and shipped the champion/challenger batch routing client (registry-driven fan-out
        with its own OAuth2 auth), verified in production at <Num>3.4M+</Num> rows, then optimized
        the scoring to run about <Num>45% faster</Num>.
      </>,
      <>
        Caught a security bug in my own code before it shipped (a registry URL that could redirect a
        live credential) and prevented two production incidents, including a prune that would have
        dropped <Num>3.44M</Num> predictions a day.
      </>,
    ],
  },
  {
    title: "AI Trainer, ML Specialist",
    meta: "Handshake · Oct 2025 → Jun 2026",
    bullets: [
      <>
        Designed and adversarially tested domain-specific prompt suites for image-editing models,
        surfacing systematic failure modes to improve training-data quality.
      </>,
      <>
        Gave structured feedback on instruction adherence and visual-text alignment to guide
        dataset refinement for multi-modal models.
      </>,
    ],
  },
  {
    title: "AI Education Product Tester",
    meta: "DeepLearning.AI · Aug 2025 → now",
    bullets: [
      <>
        Tested AI-agent and AI/ML course tools, giving structured feedback that shaped features and
        contributed to launching <Num>3 new courses</Num>.
      </>,
      <>
        Documented usability findings whose recommendations helped drive <Num>10,000+</Num> new
        learners.
      </>,
    ],
  },
];

export default function ExperiencePage() {
  return (
    <Flex minH="100vh" align="center" justify="center" px={{ base: 3, md: 8 }} py="80px">
      <TerminalWindow
        w="full"
        maxW="940px"
        path={
          <>
            aamir@ak-micro:{" "}
            <Box as="span" color="#2f83a6" fontWeight="500">
              ~/experience
            </Box>
          </>
        }
        status={
          <Box as="span" display="inline-flex" alignItems="center" gap={2}>
            <Box w="8px" h="8px" borderRadius="full" bg="cartridge.green" boxShadow="0 0 7px rgba(34,197,94,.7)" />
            3 roles
          </Box>
        }
      >
        <TerminalScreen>
          <Text>
            <Box as="span" color="screen.dim">
              $
            </Box>{" "}
            experience <Box as="span" color="screen.path">--log</Box>
          </Text>

          {/* pixel heading */}
          <Text
            fontFamily="heading"
            fontSize="17px"
            letterSpacing="0.02em"
            color="screen.cream"
            mt="18px"
            mb="4px"
            sx={{ textShadow: "0 0 10px rgba(155,227,107,.35)" }}
          >
            EXPERIENCE
          </Text>

          {/* career log, git-log --graph style: each role gets its OWN rail
              segment, from its commit node down to its last bullet, so the line
              marks exactly where an experience begins and ends. The gap between
              roles is an outer margin, outside the measured line. */}
          <Box mt="22px">
            {ROLES.map((r) => (
              <Box key={r.title} mb="26px" _last={{ mb: 0 }}>
                <Flex gap="16px">
                  {/* graph rail: a commit node + a line spanning this role */}
                  <Flex direction="column" align="center" flexShrink={0} w="12px">
                    <Text color="screen.ok" fontSize="14px" lineHeight="1.15" mt="-1px">
                      *
                    </Text>
                    <Box flex="1" w="1px" mt="4px" bg="rgba(120,150,80,.35)" />
                  </Flex>

                  {/* entry */}
                  <Box flex="1 1 auto" minW={0}>
                    <Flex
                      gap="6px 14px"
                      align="baseline"
                      justify="space-between"
                      direction={{ base: "column", md: "row" }}
                    >
                      <Text fontSize="14px" color="screen.cream" letterSpacing="0.01em">
                        {r.title}
                      </Text>
                      <Text fontSize="12px" color="screen.dim" whiteSpace="nowrap" flexShrink={0}>
                        {r.meta}
                      </Text>
                    </Flex>

                    <Box mt="10px">
                      {r.bullets.map((b, j) => (
                        <Flex key={j} gap="9px" mt={j === 0 ? 0 : "7px"} align="baseline">
                          <Box as="span" color="screen.faint" flexShrink={0}>
                            -
                          </Box>
                          <Text fontSize="12.5px" lineHeight="1.6" color="screen.base">
                            {b}
                          </Text>
                        </Flex>
                      ))}
                    </Box>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Box>

          {/* trailing cursor, apart from the rail (marks the end of the log) */}
          <Text mt="20px" color="screen.ok">
            <Box as="span" color="screen.dim">
              $
            </Box>{" "}
            <Box
              as="span"
              display="inline-block"
              w="9px"
              h="16px"
              verticalAlign="-2px"
              bg="screen.cream"
              boxShadow="0 0 7px rgba(155,227,107,.75)"
              sx={{
                animation: `${blink} 1.05s steps(1) infinite`,
                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
              }}
            />
          </Text>
        </TerminalScreen>
      </TerminalWindow>
    </Flex>
  );
}
