import { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

import { createCandidate } from "../api/client";
import { validateCandidate } from "../utils/CandidateFormValidation";

export default function CandidateForm({ onCreate }: any) {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [location, setLocation] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setSuccessMsg(null);
    setSubmitError(null);

    const payload = {
      name,
      skills: skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      yearsExperience: yearsExperience === "" ? NaN : Number(yearsExperience),
      location: location?.trim() || undefined,
    };

    const result = validateCandidate(payload);

    if (!result.valid) {
      setErrors(result.errors as Record<string, string>);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      if (onCreate) {
        await onCreate(payload);
      } else {
        await createCandidate(payload);
      }

      setSuccessMsg("Candidate created successfully!");
      setSubmitError(null);

      setName("");
      setSkills("");
      setYearsExperience("");
      setLocation("");
    } catch (err: any) {
      setSubmitError(err?.error?.[0]?.message || "Error creating candidate");
      setSuccessMsg(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mt={6}>
      <VStack spacing={3}>
        {/* SUCCESS MESSAGE */}
        {successMsg && (
          <Box
            w="100%"
            p={3}
            bg="green.100"
            color="green.800"
            borderRadius="md"
            fontSize="sm"
          >
            {successMsg}
          </Box>
        )}

        {/* ERROR MESSAGE */}
        {submitError && (
          <Box
            w="100%"
            p={3}
            bg="red.100"
            color="red.800"
            borderRadius="md"
            fontSize="sm"
          >
            {submitError}
          </Box>
        )}

        {/* NAME */}
        <FormControl isInvalid={!!errors.name}>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        {/* SKILLS */}
        <FormControl isInvalid={!!errors.skills}>
          <Input
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <FormErrorMessage>{errors.skills}</FormErrorMessage>
        </FormControl>

        {/* EXPERIENCE */}
        <FormControl isInvalid={!!errors.yearsExperience}>
          <Input
            placeholder="Years of Experience"
            value={yearsExperience}
            onChange={(e) => setYearsExperience(e.target.value)}
          />
          <FormErrorMessage>{errors.yearsExperience}</FormErrorMessage>
        </FormControl>

        {/* LOCATION */}
        <FormControl isInvalid={!!errors.location}>
          <Input
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <FormErrorMessage>{errors.location}</FormErrorMessage>
        </FormControl>

        {/* BUTTON */}
        <Button
          colorScheme="teal"
          onClick={handleSubmit}
          w="full"
          isLoading={loading}
        >
          Add Candidate
        </Button>
      </VStack>
    </Box>
  );
}
