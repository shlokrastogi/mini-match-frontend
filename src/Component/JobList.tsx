import { VStack, Button, Box, Text } from "@chakra-ui/react";
import type { Job } from "../utils/types";

type Props = {
  jobs: Job[];
  selectedJob: string | null;
  onSelect: (id: string) => void;
};

export default function JobList({ jobs, selectedJob, onSelect }: Props) {
  return (
    <VStack align="stretch" spacing={3}>
      {jobs.map((job) => {
        const isSelected = selectedJob === job.id;

        return (
          <Button
            key={job.id}
            onClick={() => onSelect(job.id)}
            variant={isSelected ? "solid" : "outline"}
            colorScheme={isSelected ? "teal" : "gray"}
            justifyContent="flex-start"
            height="auto"
            py={3}
            px={4}
            whiteSpace="normal"
            textAlign="left"
            borderRadius="md"
          >
            <Box w="100%">
              <Text fontWeight="bold" fontSize="md">
                {job.title}
              </Text>

              <Text fontSize="sm" color="gray.600">
                Skills: {job.requiredSkills?.join(", ") || "N/A"}
              </Text>

              <Text fontSize="sm" color="gray.600">
                Experience: {job.minExperience || "N/A"} yrs
              </Text>

              <Text fontSize="sm" color="gray.600">
                Location: {job.location || "N/A"}
              </Text>
            </Box>
          </Button>
        );
      })}
    </VStack>
  );
}
