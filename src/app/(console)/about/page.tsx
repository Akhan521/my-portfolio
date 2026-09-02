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

// Curated, categorized skills (verbatim from tasks/content.md). Category
// labels are lowercased to read as terminal `#` comments.
const SKILLS: { group: string; items: string[] }[] = [
  { group: "languages", items: ["Python", "SQL", "JavaScript", "C++"] },
  {
    group: "ai / ml",
    items: ["PyTorch", "LLMs & NLP", "Agentic AI", "RAG", "Fine-tuning (LoRA/PEFT)", "Transformers"],
  },
  {
    group: "tools & frameworks",
    items: ["Hugging Face", "LangChain", "FastAPI", "Docker", "Git"],
  },
  {
    group: "production & mlops",
    items: [
      "MLflow",
      "Databricks",
      "Airflow",
      "Model serving",
      "Feature stores",
      "Shadow deployment",
      "Monitoring",
      "CI/CD",
    ],
  },
];

// A non-interactive skill chip, reusing the filter-pill vocabulary from /projects.
function Chip({ label }: { label: string }) {
  return (
    <Box
      fontSize="11.5px"
      letterSpacing="0.02em"
      px="11px"
      py="5px"
      borderRadius="md"
      whiteSpace="nowrap"
      border="2px solid"
      borderColor="rgba(155,190,110,.28)"
      color="screen.base"
      bg="rgba(0,0,0,.12)"
    >
      {label}
    </Box>
  );
}

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
        status={
          <Box as="span" display="inline-flex" alignItems="center" gap={2}>
            <Box w="8px" h="8px" borderRadius="full" bg="cartridge.green" boxShadow="0 0 7px rgba(34,197,94,.7)" />
            resolved
          </Box>
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
              <Win>root-caused and fixed a multi-month outage</Win>
              {" that had been silently failing ~3.9M predictions daily, and I "}
              <Win>built the champion/challenger routing system</Win>
              {" that scores 3.4M+ rows nightly, which I then optimized to run about 45% faster."}
            </Text>
            <Text color="screen.base" mt="14px">
              {"I've also "}
              <Win>built AI systems from scratch</Win>
              {", from an image-captioning library to a hand-written GPT and a fine-tuned text-to-SQL model, so I understand what's happening under the hood. I care about shipping AI software that holds up in production, not just in a demo."}
            </Text>
          </Box>

          {/* skills */}
          <Text mt="26px">
            <Box as="span" color="screen.dim">
              $
            </Box>{" "}
            skills <Box as="span" color="screen.path">--grouped</Box>
          </Text>

          <Box mt="16px">
            {SKILLS.map((s) => (
              <Box key={s.group} mt="14px" _first={{ mt: 0 }}>
                <Text fontSize="12px" letterSpacing="0.02em" mb="9px">
                  <Box as="span" color="screen.faint">
                    #
                  </Box>{" "}
                  <Box as="span" color="screen.ok">
                    {s.group}
                  </Box>
                </Text>
                <Flex flexWrap="wrap" gap={2}>
                  {s.items.map((item) => (
                    <Chip key={item} label={item} />
                  ))}
                </Flex>
              </Box>
            ))}
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
