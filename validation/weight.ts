import { z } from "zod";

export const weightEntrySchema = z.object({
  weight: z.coerce.number().positive({
    message: "Weight must be a positive number",
  }),
  unit: z.string().optional().default("kg"),
  note: z.string().optional(),
});
