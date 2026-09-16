"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalScreen } from "@/components/terminal/TerminalScreen";

// A proof phrase inside the bio, tinted the phosphor "success" green (the
// terminal analog of the brand-green bolds from the earlier build).
function Win({ children }: { children: React.ReactNode }) {
  return (
    <Box as="span" color="screen.ok" fontWeight="500">
      {children}
    </Box>
  );
}

// The skill-chip grid was removed 2026-09-14: a self-declared skill list
// carries no evidence, and the /experience bullets already demonstrate the
// same stack in use.
//
// This block replaces it (2026-09-15). Not padding: these are facts the site
// stated nowhere else (degree, graduation, location), and they are what a
// recruiter scans for. It reuses the /contact row vocabulary (arrow + dim
// label + value) so /about stops being the only page with no aligned
// structure. `role` was dropped as redundant with `now`; availability
// deliberately lives on /contact, not here.
const FACTS: { label: string; value: string }[] = [
  { label: "now", value: "AI/ML Software Engineer Intern @ Tatari" },
  { label: "school", value: "MS in Computer Science, UC Riverside (Dec 2026)" },
  { label: "based", value: "Riverside, CA" },
];

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

          {/* identity facts, aligned like the /contact channel rows */}
          <Box mt="28px">
            {FACTS.map((f) => (
              <Flex key={f.label} align="baseline" gap={{ base: "10px", md: "16px" }} py="5px">
                <Box as="span" flexShrink={0} fontSize="12px" color="screen.faint">
                  &rarr;
                </Box>
                <Text
                  flexShrink={0}
                  w={{ base: "76px", md: "96px" }}
                  fontSize="12.5px"
                  color="screen.dim"
                >
                  {f.label}
                </Text>
                <Text fontSize="12.5px" color="screen.base">
                  {f.value}
                </Text>
              </Flex>
            ))}
          </Box>

        </TerminalScreen>
      </TerminalWindow>
    </Flex>
  );
}
