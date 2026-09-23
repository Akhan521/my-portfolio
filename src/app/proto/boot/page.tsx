"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import {
  ProtoLogoCanvas,
  type BootVariant,
} from "@/components/boot/proto/ProtoLogoCanvas";
import { PAPER_BG_SX } from "@/lib/consoleTheme";

// THROWAWAY: a bench for judging the three candidate wordmark motions.
// Delete this route (and src/components/boot/proto) once one is chosen.

const VARIANTS: { id: BootVariant; name: string; blurb: string }[] = [
  {
    id: "press",
    name: "E · PRESS",
    blurb:
      "Reference. Three passes on a hand press, each plate slammed down whole, a final press into register.",
  },
  {
    id: "bloom",
    name: "G · BLOOM",
    blurb:
      "His oversized entrance, done in ink instead of in geometry. The name arrives as a heavy over-inked mass and the ink contracts into crisp type, holding the drama late then resolving fast.",
  },
  {
    id: "roller",
    name: "H · ROLLER",
    blurb:
      "His sweep promoted from decoration to the entrance itself. The word sits on the paper as a dry ghost and one band of wet ink crosses it, hot at the leading edge. One continuous movement, no per-letter events.",
  },
  {
    id: "emboss",
    name: "J · EMBOSS",
    blurb:
      "A blind impression first, ink second. The press strikes with no ink on the plate, leaving a bevelled pixel rim, then the ink floods in and the rim fades. Two movements out of one press.",
  },
];

function Bench() {
  const params = useSearchParams();
  const frozen = params.get("t");
  const only = params.get("v") as BootVariant | null;
  const [run, setRun] = useState(0);

  // Filmstrip mode: one screenshot shows the whole run as frozen frames.
  const strip = params.get("strip");
  if (only && strip) {
    const times = strip.split(",").map(Number);
    return (
      <Box minH="100vh" sx={PAPER_BG_SX} p="10px">
        <Flex wrap="wrap" gap="8px">
          {times.map((t) => (
            <Box key={t} w="calc(33.333% - 6px)">
              <Text fontSize="10px" color="brand.muted" mb="2px">
                {t}ms
              </Text>
              <Box
                position="relative"
                h="130px"
                border="1px solid"
                borderColor="brand.border"
                overflow="hidden"
              >
                <ProtoLogoCanvas label="AAMIR KHAN" variant={only} freezeMs={t} />
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    );
  }

  // Single-variant mode is a bare full-viewport stage, so a frozen frame sits
  // exactly where it would on the real landing page.
  if (only) {
    return (
      <Box position="fixed" inset={0} sx={PAPER_BG_SX}>
        {VARIANTS.filter((v) => v.id === only).map((v) => (
          <ProtoLogoCanvas
            key={v.id}
            label="AAMIR KHAN"
            variant={v.id}
            runKey={run}
            freezeMs={frozen == null ? null : Number(frozen)}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box minH="100vh" sx={PAPER_BG_SX} px={{ base: 3, md: 8 }} py="32px">
      <Flex
        align="center"
        justify="space-between"
        gap="16px"
        mb="24px"
        flexWrap="wrap"
      >
        <Text fontFamily="heading" fontSize="13px" color="brand.ink">
          WORDMARK MOTION
        </Text>
        <Button
          onClick={() => setRun((r) => r + 1)}
          size="sm"
          fontFamily="body"
          fontSize="12px"
          bg="brand.surface"
          color="brand.ink"
          border="2px solid"
          borderColor="brand.borderStrong"
          borderRadius="8px"
          _hover={{ bg: "brand.surfaceHover" }}
        >
          replay all
        </Button>
      </Flex>

      <Flex direction="column" gap="28px">
        {VARIANTS.map((v) => (
          <Box key={v.id}>
            <Flex align="baseline" gap="12px" mb="8px" flexWrap="wrap">
              <Text fontFamily="heading" fontSize="10px" color="brand.ink">
                {v.name}
              </Text>
              <Text fontSize="12px" color="brand.muted" maxW="62ch">
                {v.blurb}
              </Text>
            </Flex>
            <Box
              position="relative"
              h={{ base: "170px", md: "200px" }}
              border="2px solid"
              borderColor="brand.border"
              borderRadius="12px"
              overflow="hidden"
            >
              <ProtoLogoCanvas
                label="AAMIR KHAN"
                variant={v.id}
                runKey={run}
                freezeMs={null}
              />
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default function ProtoBootPage() {
  return (
    <Suspense fallback={null}>
      <Bench />
    </Suspense>
  );
}
