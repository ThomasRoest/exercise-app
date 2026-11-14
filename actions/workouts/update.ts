"use server";

import { getCurrentUser } from "@/data/users";
import prisma from "@/prisma/db";
import { Feeling } from "@prisma/client";
import { ActionResult } from "@/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateWorkoutSchema = z.object({
  workoutId: z.string().min(1),
  description: z.string().optional(),
  note: z.string().optional(),
  feeling: z.nativeEnum(Feeling).nullable().optional(),
});

export const updateWorkout = async (data: unknown): Promise<ActionResult> => {
  const validationResult = updateWorkoutSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "invalid data",
    };
  }

  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      message: "unuathorized",
    };
  }

  const { workoutId, note, feeling } = validationResult.data;

  try {
    await prisma.workout.updateMany({
      where: {
        id: workoutId,
        userId: user.id,
      },
      data: {
        note,
        feeling,
      },
    });
  } catch {
    return {
      success: false,
      message: "something went wrong",
    };
  }

  revalidatePath("/app/workouts", "layout");

  return {
    success: true,
    message: "saved",
  };
};
