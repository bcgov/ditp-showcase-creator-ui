import { z } from "zod";

export const characterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Role is required"),
  description: z.string().min(1, "Description is required"),
});

