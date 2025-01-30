import { z } from "zod";

export const onboardingStepFormSchema = z.object({
  type: z.enum(['basic', 'issue']),
  title: z.string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  text: z.string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  image: z.string().optional(),
  credentials: z.array(z.string()).optional(),
});

export type OnboardingStepFormData = z.infer<typeof onboardingStepFormSchema>;

export const stepTypeSchema = z.object({
  type: z.enum(['basic', 'issue']),
});

export type StepTypeData = z.infer<typeof stepTypeSchema>;

export const issueStepSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  text: z.string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  image: z.string().optional(),
  credentials: z.array(z.string()).min(1, "At least one credential is required"),
});

export type IssueStepFormData = z.infer<typeof issueStepSchema>;

export const basicStepSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  text: z.string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  image: z.string().optional(),
});

export type BasicStepFormData = z.infer<typeof basicStepSchema>;
