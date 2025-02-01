"use server";

import { setSchema } from "@/validation/set";
import prisma from "@/prisma/db";
import { getCurrentUser } from "@/data/users";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/types";

export const createSet = async (data: unknown): Promise<ActionResult> => {
  const validationResult = setSchema.safeParse(data);
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

  const { exerciseId, exerciseTitle, reps, weight, workoutId } =
    validationResult.data;

  try {
    await prisma.set.create({
      data: {
        exerciseTitle: exerciseTitle,
        reps: parseInt(reps),
        weight: parseInt(weight),
        exercise: {
          connect: {
            id: exerciseId
          }
        },
        workout: {
          connect: {
            id: workoutId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return { success: false, message: "could not create set" };
  }
  revalidatePath(`/workouts/${workoutId}`);
  return {
    success: true,
    message: "Set added",
  };
};
