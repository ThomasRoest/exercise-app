import { z } from "zod";

export const habitSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
});

export const habitEntrySchema = z.object({
  date: z.string(),
  habitId: z.string(),
});
