"use server";

import prisma from "@/prisma/db";
import { getCurrentUser } from "@/data/users";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ActionResult } from "@/types";

/** 
 * @deprecated
 */
export type ActionResponse =
  | { status: "default" }
  | { status: "success" }
  | { status: "error"; message: string };

const noteSchema = z.object({
  title: z.string().min(1, {
    message: "Content must be at least 1 characters long",
  }),
  description: z
    .string()
    .min(1, { message: "Content must be at least 1 characters long" }),
});

export const createNote = async (data: unknown): Promise<ActionResult> => {
  const validationResult = noteSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      success: false,
      message: "Invalid data",
    };
  }

  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      message: "unauthorized",
    };
  }

  const { title, description } = validationResult.data;

  try {
    await prisma.program.create({
      data: {
        title: title,
        description: description,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return { success: false, message: "could not create note" };
  }
  revalidatePath(`/notes`);
  return {
    success: true,
    message: "Note added",
  };
};
