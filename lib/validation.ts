import * as z from "zod";
export const signInSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const onboardingSchema = z.object({
  currentKnowledge: z.string().min(1),
  codingAmbitions: z.array(z.string()).min(1),
  preferredSkills: z.array(z.string().max(17)).min(1),
});
