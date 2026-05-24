import { z } from "zod";

export const JobSchema = z.object({
  id: z.string(),
  title: z.string(),
  requiredSkills: z.array(z.string()),
  minYearsExperience: z.number(),
  location: z.string().optional(),
});

export const JobsResponseSchema = z.array(JobSchema);