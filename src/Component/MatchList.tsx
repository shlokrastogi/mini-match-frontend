import {
  Box,
  Text,
  VStack,
  Progress,
  Badge,
  HStack,
  Tag,
} from "@chakra-ui/react";
import type { MatchResult } from "../utils/types";

export default function MatchList({ results }: { results: MatchResult[] }) {
  return (
    <VStack spacing={5} mt={6}>
      {results.map((r) => (
        <Box
          key={r.candidate.id}
          p={6}
          borderRadius="2xl"
          bg="white"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.100"
          transition="0.2s"
          _hover={{
            transform: "translateY(-4px)",
            boxShadow: "xl",
          }}
          w="100%"
        >
          <HStack justify="space-between" mb={2}>
            <Text fontWeight="bold" fontSize="lg">
              {r.candidate.name}
            </Text>

            <Badge colorScheme="teal" px={3} py={1} borderRadius="md">
              Score: {r.totalScore.toFixed(2)}
            </Badge>
          </HStack>

          <HStack spacing={2} flexWrap="wrap" mb={2}>
            {r.candidate.skills?.map((skill, i) => (
              <Tag key={i} colorScheme="blue">
                {skill}
              </Tag>
            ))}
          </HStack>

          <HStack spacing={6} mb={3}>
            <Text fontSize="sm" color="gray.600">
              📈 {r.candidate.yearsExperience} yrs
            </Text>
            <Text fontSize="sm" color="gray.600">
              📍 {r.candidate.location || "N/A"}
            </Text>
          </HStack>

          <Progress
            value={r.totalScore * 100}
            borderRadius="full"
            height="8px"
            colorScheme="teal"
            mb={3}
          />

          <HStack justify="space-between" fontSize="sm" color="gray.600">
            <Text>Skill: {r.breakdown.skill.toFixed(2)}</Text>
            <Text>Exp: {r.breakdown.experience.toFixed(2)}</Text>
            <Text>Loc: {r.breakdown.location.toFixed(2)}</Text>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
}
