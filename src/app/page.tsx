"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { TerminalScreen } from "@/components/terminal/TerminalScreen";

// Temporary preview: verifies the TerminalWindow frame + the TerminalScreen
// phosphor surface. Real hero content comes next.
export default function Home() {
  return (
    <Flex minH="100vh" align="center" justify="center" p={10}>
      <TerminalWindow
        w="full"
        maxW="560px"
        path={
          <>
            aamir@ak-micro:{" "}
            <Box as="span" color="#2f83a6" fontWeight="500">
              ~
            </Box>
          </>
        }
        status={
          <Flex align="center" gap={2}>
            <Box
              w="8px"
              h="8px"
              borderRadius="full"
              bg="cartridge.green"
              boxShadow="0 0 7px rgba(34,197,94,.7)"
            />
            agent online
          </Flex>
        }
      >
        <TerminalScreen>
          <Text>
            <Box as="span" color="screen.dim">
              $
            </Box>{" "}
            ak whoami
          </Text>
          <Text mt={2}>
            <Box as="span" color="screen.dim">
              identity:
            </Box>{" "}
            <Box as="span" color="screen.cream">
              Aamir Khan
            </Box>
          </Text>
          <Text>
            <Box as="span" color="screen.dim">
              role:
            </Box>{" "}
            AI software engineer
          </Text>
          <Text mt={2} color="screen.ok">
            ● online
          </Text>
          <Text mt={2}>
            <Box as="span" color="screen.path">
              you&gt;
            </Box>{" "}
            ask me anything
          </Text>
        </TerminalScreen>
      </TerminalWindow>
    </Flex>
  );
}
