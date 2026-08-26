"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";

// Temporary preview: verifies the TerminalWindow frame (title bar + dots +
// path + status). The phosphor screen and hero content come next.
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
        <Box p={6} fontFamily="mono" fontSize="13px" color="brand.ink">
          <Text>TerminalWindow frame check.</Text>
          <Text color="brand.muted">The phosphor screen goes here next.</Text>
        </Box>
      </TerminalWindow>
    </Flex>
  );
}
