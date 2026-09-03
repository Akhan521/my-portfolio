"use client";

import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalScreen } from "@/components/terminal/TerminalScreen";

const blink = keyframes`50% { opacity: 0 }`;
const pulse = keyframes`
  0%, 100% { opacity: 1; box-shadow: 0 0 7px rgba(34,197,94,.7) }
  50% { opacity: .45; box-shadow: 0 0 3px rgba(34,197,94,.4) }
`;

// Reach-me channels. Values render as phosphor-cyan links; external ones open
// in a new tab, email is a mailto. Links are canonical (see CLAUDE.md).
const CHANNELS: { label: string; value: string; href: string; external?: boolean }[] = [
  { label: "email", value: "aamirksfg@gmail.com", href: "mailto:aamirksfg@gmail.com" },
  { label: "github", value: "github.com/Akhan521", href: "https://github.com/Akhan521", external: true },
  {
    label: "linkedin",
    value: "linkedin.com/in/aamir-khan-aak521",
    href: "https://www.linkedin.com/in/aamir-khan-aak521/",
    external: true,
  },
  {
    label: "resume",
    value: "view on Google Drive",
    href: "https://drive.google.com/file/d/1XmkXP_88RvogZ676RelvgUsJtfBq8vhm/view?usp=sharing",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <Flex minH="100vh" align="center" justify="center" px={{ base: 3, md: 8 }} py="80px">
      <TerminalWindow
        w="full"
        maxW="820px"
        path={
          <>
            aamir@ak-micro:{" "}
            <Box as="span" color="#2f83a6" fontWeight="500">
              ~/contact
            </Box>
          </>
        }
        status={
          <Box as="span" display="inline-flex" alignItems="center" gap={2}>
            <Box
              w="8px"
              h="8px"
              borderRadius="full"
              bg="cartridge.green"
              sx={{
                animation: `${pulse} 2s ease-in-out infinite`,
                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
              }}
            />
            open to work
          </Box>
        }
      >
        <TerminalScreen>
          <Text>
            <Box as="span" color="screen.dim">
              $
            </Box>{" "}
            contact
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
            CONTACT
          </Text>

          {/* invitation */}
          <Text color="screen.base" mt="14px">
            Let&apos;s build something. Here&apos;s where to find me:
          </Text>

          {/* channels manifest */}
          <Box mt="18px">
            {CHANNELS.map((c) => (
              <Flex
                key={c.label}
                as={Link}
                href={c.href}
                {...(c.external ? { isExternal: true } : {})}
                role="group"
                align="baseline"
                gap={{ base: "10px", md: "16px" }}
                px="10px"
                py="9px"
                mx="-10px"
                borderRadius="8px"
                transition="0.14s ease all"
                _hover={{
                  bg: "rgba(127,215,240,.10)",
                  transform: "translateX(4px)",
                  textDecoration: "none",
                }}
              >
                <Box
                  as="span"
                  flexShrink={0}
                  fontSize="12px"
                  color="screen.faint"
                  _groupHover={{ color: "screen.path" }}
                >
                  →
                </Box>
                <Text
                  flexShrink={0}
                  w={{ base: "76px", md: "96px" }}
                  fontSize="12.5px"
                  color="screen.dim"
                >
                  {c.label}
                </Text>
                <Text
                  fontSize="12.5px"
                  color="screen.path"
                  minW={0}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  _groupHover={{ color: "screen.cream" }}
                >
                  {c.value}
                </Text>
              </Flex>
            ))}
          </Box>

          {/* availability + closing cursor */}
          <Flex align="center" gap="9px" mt="22px">
            <Box
              w="8px"
              h="8px"
              borderRadius="full"
              bg="cartridge.green"
              flexShrink={0}
              sx={{
                animation: `${pulse} 2s ease-in-out infinite`,
                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
              }}
            />
            <Text fontSize="12.5px" color="screen.ok">
              Open to full-time and internship AI roles.
            </Text>
          </Flex>

          <Text mt="18px" color="screen.ok">
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
