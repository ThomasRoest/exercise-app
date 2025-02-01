import { z } from "zod";

export const exerciseSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
});

export const exerciseFilterSchema = z.object({
  sort_by: z.enum(["date", "weight"]).optional(),
});

export type ExerciseFilter = z.infer<typeof exerciseFilterSchema>;
