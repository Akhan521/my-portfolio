"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalScreen } from "@/components/terminal/TerminalScreen";

const blink = keyframes`50% { opacity: 0 }`;

// A proof phrase inside the bio, tinted the phosphor "success" green (the
// terminal analog of the brand-green bolds from the earlier build).
function Win({ children }: { children: React.ReactNode }) {
  return (
    <Box as="span" color="screen.ok" fontWeight="500">
      {children}
    </Box>
  );
}

// The skill-chip grid was deliberately removed 2026-09-14: a self-declared
// skill list carries no evidence, and the /experience bullets already
// demonstrate the same stack in use. The page is intentionally short; layout
// for the resulting space is still an open design question.
export default function AboutPage() {
  return (
    <Flex minH="100vh" align="center" justify="center" px={{ base: 3, md: 8 }} py="80px">
      <TerminalWindow
        w="full"
        maxW="900px"
        path={
          <>
            aamir@ak-micro:{" "}
            <Box as="span" color="#2f83a6" fontWeight="500">
              ~/about
            </Box>
          </>
        }
      >
        <TerminalScreen>
          <Text>
            <Box as="span" color="screen.dim">
              $
            </Box>{" "}
            whoami
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
              ABOUT
            </Text>
            <Text fontSize="12.5px" color="screen.dim">
              Who I am, and what I ship.
            </Text>
          </Flex>

          {/* bio, verbatim from tasks/content.md */}
          <Box mt="18px" maxW="68ch">
            <Text color="screen.base">
              {"I'm Aamir, an AI software engineer focused on building AI systems and getting them into production. At Tatari, I work on a production ML platform serving millions of predictions a day. I "}
              <Win>found a four-month-old bug</Win>
              {" that had been quietly returning nothing for ~3.9M data lookups a day, and I "}
              <Win>built the champion/challenger routing system</Win>
              {" that scores 3.4M+ rows nightly, then cut that run from 145 minutes to 80."}
            </Text>
            <Text color="screen.base" mt="14px">
              {"I've also "}
              <Win>built AI systems from scratch</Win>
              {", from an image-captioning library to a hand-written GPT and a fine-tuned text-to-SQL model, so I understand what's happening under the hood. I care about shipping AI software that holds up in production, not just in a demo."}
            </Text>
          </Box>

          {/* trailing cursor */}
          <Text mt="26px" color="screen.ok">
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
