import { z } from "zod";

const attributeSchema = z.object({
  name: z.string().min(1, "Attribute name is required"),
  value: z.string().min(1, "Attribute value is required"),
  type: z.enum(["string", "int", "float", "bool", "date"]).default("string"),
});

export const credentialSchema = z.object({
  name: z.string().min(1, "Credential name is required"),
  issuer_name: z.string().min(1, "Issuer name is required"),
  version: z.string().optional(),
  icon: z.string().optional(),
  attributes: z.array(attributeSchema),
});

export type CredentialFormData = z.infer<typeof credentialSchema>;
  