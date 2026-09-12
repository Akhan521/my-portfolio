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

// Career log, most recent first. Tatari bullets are the four headline
// workstreams from tasks/tatari-accomplishments-report.md, in the report's
// order. Application-side framing; all figures cleared for public use.
// NOTE: the four-month defect affected feature LOOKUPS, not customer-facing
// predictions. Do not reword it as failing predictions.
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
        Rewired the nightly job so every prediction runs through the live model and gets logged,
        which surfaced a four-month-old bug that had been quietly returning nothing for{" "}
        <Num>~3.9M</Num> data lookups a day. Found it by comparing how the data was being saved
        against how it was being read, and fixed it before the new path carried real traffic.
      </>,
      <>
        Brought back a dead LLM service that flags TV ads breaking network rules before a network
        rejects them, which saves days of back-and-forth on every rejection. Got it running, tuned
        its checks against <Num>84 real ads</Num> until it caught violations reliably, and shipped
        it.
      </>,
      <>
        Ported the model onto the team&rsquo;s standardized MLOps framework, cutting training from{" "}
        <Num>109 minutes to 15</Num> by training one model a night instead of two to serve one.
      </>,
      <>
        Built the system that tests new models against full production traffic without any of it
        reaching a customer, verified at <Num>3.4M+</Num> rows, then cut the nightly run from{" "}
        <Num>145 minutes to 80</Num> by scoring the models at the same time instead of one after
        another.
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
