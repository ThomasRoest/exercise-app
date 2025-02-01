"use server";

import { exerciseSchema } from "@/validation/exercise";
import prisma from "@/prisma/db";
import { getCurrentUser } from "@/data/users";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { ActionResult } from "@/types";

export const createExercise = async (data: unknown): Promise<ActionResult> => {
  const validationResult = exerciseSchema.safeParse(data);
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

  const { title } = validationResult.data;

  const slug = slugify(title, {
    lower: true,
  });

  try {
    await prisma.exercise.create({
      data: {
        title: title,
        slug,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      success: false,
      message: "could not create exercise",
    };
  }
  revalidatePath("/exercises");
  return {
    success: true,
    message: "exercise added",
  };
};
