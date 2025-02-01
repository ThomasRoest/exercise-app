"use server";

import { getCurrentUser } from "@/data/users";
import prisma from "@/prisma/db";
import { ActionResult } from "@/types";
import { noteSchema } from "@/validation/program";
import { revalidatePath } from "next/cache";

export const updateNote = async (data: unknown): Promise<ActionResult> => {
  const validationResult = noteSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "invalid data"
    }
  }

  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      message: "unuathorized"
    }
  }

  const { id, description, title, userId: authorId } = validationResult.data;

  if (user.id !== authorId) {
    return {
      success: false,
      message: "unuathorized"
    }
  }

  try {
    await prisma.program.update({
      where: {
        id,
      },
      data: {
        description,
        title,
      },
    });
  } catch (error) {
    return {
      success: false,
      message: "something went wrong"
    }
  }

  revalidatePath("/app/notes")

  return {
    success: true,
    message: "saved"
  }
};
