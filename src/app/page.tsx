"use client";

import { Flex } from "@chakra-ui/react";
import { ProgramMenu } from "@/components/hero/ProgramMenu";

// Temporary preview: verifies the ProgramMenu. The two-column hero layout
// (HeroTerminal + ProgramMenu, height-matched) comes next.
export default function Home() {
  return (
    <Flex minH="100vh" align="center" justify="center" p={10}>
      <ProgramMenu w="352px" />
    </Flex>
  );
}
