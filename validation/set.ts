import { z } from "zod";

export const setSchema = z.object({
  exerciseTitle: z.string().min(1, "Exercise title cannot be empty"),
  exerciseId: z.string().min(1, "Missing exerciseId"),
  reps: z.string().min(1, "Reps cannot be empty"),
  weight: z.string().min(1, "Weight cannot be empty"),
  workoutId: z.string().min(1, "Missing workoutId"),
});
