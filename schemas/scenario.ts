import { z } from "zod";

const scenarioOverviewSchema = z.object({
  title: z.string().min(1, "Title is required"),
  text: z.string().min(1, "Description is required"),
  image: z.string().optional(),
});

const requestOptionsSchema = z.object({
  type: z.string(),
  title: z.string(),
  text: z.string(),
  proofRequest: z.object({
    attributes: z.record(z.any()),
    predicates: z.record(z.any()).optional(),
  }),
});

const scenarioStepSchema = z.object({
  screenId: z.string(),
  type: z.string(),
  title: z.string().min(1, "Title is required"),
  text: z.string().min(1, "Description is required"),
  requestOptions: requestOptionsSchema.optional(),
});

export const scenarioSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  overview: scenarioOverviewSchema,
  summary: scenarioOverviewSchema,
  steps: z.array(scenarioStepSchema),
});

export type ScenarioFormData = z.infer<typeof scenarioSchema>;
export type ScenarioStepFormData = z.infer<typeof scenarioStepSchema>;

export const proofStepSchema = z.object({
  screenId: z.string(),
  type: z.string(),
  title: z.string().min(1, "Title is required"),
  text: z.string().min(1, "Description is required"),
  requestOptions: z.object({
    type: z.string(),
    title: z.string().min(1, "Title is required"),
    text: z.string().min(1, "Description is required"),
    proofRequest: z.object({
      attributes: z.record(z.object({
        attributes: z.array(z.string()).min(1, "At least one attribute is required"),
        restrictions: z.array(z.string()).optional(),
      })),
      predicates: z.record(z.object({
        name: z.string(),
        type: z.string(),
        value: z.number(),
        restrictions: z.array(z.string()),
      })).optional(),
    }),
  }),
});

export type ProofStepFormData = z.infer<typeof proofStepSchema>;

const attributeSchema = z.object({
  attributes: z.array(z.string()),
  restrictions: z.array(z.string()).optional(),
});

const predicateSchema = z.object({
  name: z.string(),
  type: z.enum([">=", "<=", "=", "none"]),
  value: z.number(),
  restrictions: z.array(z.string()),
});

export const proofRequestSchema = z.object({
  attributes: z.record(attributeSchema),
  predicates: z.record(predicateSchema),
});

export type ProofRequestFormData = z.infer<typeof proofRequestSchema>;

export const PREDICATE_OPTIONS = [
  { value: "none", label: "None" },
  { value: ">=", label: ">=" },
  { value: "<=", label: "<=" },
  { value: "=", label: "=" },
] as const;


export const basicStepSchema = z.object({
  screenId: z.string(),
  type: z.literal("BASIC"),
  title: z.string().min(1, "Title is required"),
  text: z.string().min(1, "Description is required"),
  requestOptions: z.object({
    type: z.literal("BASIC"),
    title: z.string(),
    text: z.string(),
    proofRequest: z.object({
      attributes: z.record(z.any()),
      predicates: z.record(z.any()),
    }),
  }),
});

export type BasicStepFormData = z.infer<typeof basicStepSchema>;