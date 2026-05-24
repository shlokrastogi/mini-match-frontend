import { JobsResponseSchema } from "../utils/schemas/JobSchema.ts";
import { MatchResponseSchema } from "../utils/schemas/MatchSchema.ts";
import { useEffect, useState } from "react";
import {
  Container,
  Spinner,
  Text,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";

import Navbar from "../Component/Navbar";
import { apiFetch } from "../api/client";
import { useDebounce } from "../Hooks/debounce";

import JobList from "../Component/JobList";
import MatchList from "../Component/MatchList";
import ScoreSlider from "../Component/ScoreSlider";
import type { Job, MatchResult } from "../utils/types";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [minScore, setMinScore] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const debouncedScore = useDebounce(minScore, 400);

  useEffect(() => {
    apiFetch("/jobs")
      .then((data) => {
        const parsed = JobsResponseSchema.parse(data);
        setJobs(parsed);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else if (typeof err === "object" && err !== null) {
          setError(JSON.stringify(err));
        } else {
          setError("Something went wrong");
        }
      });
  }, []);

  useEffect(() => {
    if (!selectedJob) return;

    const controller = new AbortController();
    setLoading(true);

    apiFetch("/match", {
      method: "POST",
      body: JSON.stringify({
        jobId: selectedJob,
        minScore: debouncedScore,
      }),
      signal: controller.signal,
    })
      .then((data) => {
        const parsed = MatchResponseSchema.parse(data);
        setResults(parsed);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else if (typeof err === "object" && err !== null) {
          setError(JSON.stringify(err));
        } else {
          setError("Something went wrong");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [selectedJob, debouncedScore]);

  return (
    <>
      <Navbar />

      <Container maxW="container.xl" p={0} height="100vh" overflow="hidden">
        {error && (
          <Text fontSize="sm" color="red.500">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </Text>
        )}
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 2fr" }}
          height="calc(100vh - 72px)"
        >
          <GridItem borderRightWidth="1px" overflowY="auto">
            <Box p={4}>
              <Text fontWeight="bold" fontSize="lg" mb={3}>
                Jobs Loaded: {jobs.length}
              </Text>

              <JobList
                jobs={jobs}
                selectedJob={selectedJob}
                onSelect={setSelectedJob}
              />
            </Box>
          </GridItem>

          <GridItem overflow="hidden">
            <Box display="flex" flexDirection="column" height="100%">
              <Box
                p={6}
                borderBottomWidth="1px"
                bg="white"
                position="sticky"
                top={0}
                zIndex={10}
              >
                {!selectedJob ? (
                  <Text align="center" fontSize="lg">
                    Select a job to see matches
                  </Text>
                ) : (
                  <ScoreSlider value={minScore} onChange={setMinScore} />
                )}
              </Box>

              <Box flex="1" overflowY="auto" p={6}>
                {!selectedJob ? null : loading ? (
                  <Spinner mt={4} />
                ) : results.length === 0 ? (
                  <Text mt={4}>No candidates found</Text>
                ) : (
                  <MatchList results={results} />
                )}
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}
