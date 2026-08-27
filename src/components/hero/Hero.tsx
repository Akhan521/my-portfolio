"use client";

import { Flex } from "@chakra-ui/react";
import { HeroTerminal } from "./HeroTerminal";
import { ProgramMenu } from "./ProgramMenu";

/**
 * The hero: the terminal window beside the SELECT A PROGRAM menu. On desktop
 * the two sit in a height-matched row (align stretch, so the terminal fills
 * to the menu's height and the `you>` prompt settles at the bottom); on
 * narrow screens they stack.
 */
export function Hero() {
  return (
    <Flex
      as="section"
      minH="100vh"
      align="center"
      justify="center"
      px={{ base: 5, md: 8 }}
      py={16}
    >
      <Flex
        w="full"
        maxW="960px"
        gap={{ base: 8, lg: "44px" }}
        direction={{ base: "column", lg: "row" }}
        align={{ base: "center", lg: "stretch" }}
        justify="center"
      >
        <HeroTerminal
          w="full"
          maxW="520px"
          flex={{ lg: "0 1 520px" }}
        />
        <ProgramMenu
          w="full"
          maxW={{ base: "520px", lg: "352px" }}
          flex={{ lg: "0 0 352px" }}
        />
      </Flex>
    </Flex>
  );
}
