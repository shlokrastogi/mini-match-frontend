import { Box, Text, VStack, Progress, Badge } from "@chakra-ui/react";
import type { MatchResult } from "../utils/types";

export default function MatchList({ results }: { results: MatchResult[] }) {
  return (
    <VStack spacing={4} mt={6}>
      {results.map((r) => (
        <Box
          key={r.candidate.id}
          p={5}
          borderWidth="1px"
          borderRadius="xl"
          w="100%"
          boxShadow="md"
        >
          <Text fontWeight="bold" fontSize="lg">
            {r.candidate.name}
          </Text>

          <Badge colorScheme="teal" mb={2}>
            Score: {r.totalScore.toFixed(2)}
          </Badge>

          <Progress value={r.totalScore * 100} mb={3} />

          <Text fontSize="sm">Skill: {r.breakdown.skill.toFixed(2)}</Text>
          <Text fontSize="sm">
            Experience: {r.breakdown.experience.toFixed(2)}
          </Text>
          <Text fontSize="sm">Location: {r.breakdown.location.toFixed(2)}</Text>
        </Box>
      ))}
    </VStack>
  );
}
