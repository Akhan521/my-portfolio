"use client";

import { Flex } from "@chakra-ui/react";
import { HeroTerminal } from "@/components/hero/HeroTerminal";

// Temporary preview: verifies the HeroTerminal. The SELECT A PROGRAM menu and
// the two-column hero layout come next.
export default function Home() {
  return (
    <Flex minH="100vh" align="center" justify="center" p={10}>
      <HeroTerminal w="full" maxW="520px" />
    </Flex>
  );
}
