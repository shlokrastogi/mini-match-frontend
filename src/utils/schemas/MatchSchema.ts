import { z } from "zod";

export const MatchResultSchema = z.object({
  candidate: z.object({
    id: z.string(),
    name: z.string(),
    skills: z.array(z.string()),
    yearsExperience: z.number(),
    location: z.string().optional(),
  }),
  totalScore: z.number(),
  breakdown: z.object({
    skill: z.number(),
    experience: z.number(),
    location: z.number(),
  }),
});

export const MatchResponseSchema = z.array(MatchResultSchema);