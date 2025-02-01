import { z } from "zod";

export const noteSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  title: z.string().min(1, {
    message: "Title must be at least 1 character long",
  }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 character long" }),
});