import type { Candidate } from "../types";

type CandidateInput = Omit<Candidate, "id">;

type ValidationResult = {
  valid: boolean;
  errors: Partial<Record<keyof CandidateInput, string>>;
};

export function validateCandidate(data: CandidateInput): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  // NAME
  if (!data.name?.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  // SKILLS
  if (!Array.isArray(data.skills) || data.skills.length === 0) {
    errors.skills = "At least one skill is required";
  } else if (data.skills.some((s) => !s.trim())) {
    errors.skills = "Skills cannot contain empty values";
  }

  // EXPERIENCE
  if (data.yearsExperience === undefined || data.yearsExperience === null) {
    errors.yearsExperience = "Experience is required";
  } else if (Number.isNaN(data.yearsExperience)) {
    errors.yearsExperience = "Experience must be a valid number";
  } else if (data.yearsExperience < 0) {
    errors.yearsExperience = "Experience cannot be negative";
  } else if (data.yearsExperience > 60) {
    errors.yearsExperience = "Experience looks unrealistic";
  }

  // LOCATION (OPTIONAL — matches backend scoring logic)
  if (data.location?.trim() === "") {
    errors.location = "Location cannot be empty if provided";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
