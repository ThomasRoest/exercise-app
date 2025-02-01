"use server";

import prisma from "@/prisma/db";
import { getCurrentUser } from "@/data/users";
import { ActionState } from "@/types";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
});

export const deleteExercise = async (exercise: {
  id: string;
  userId: string;
}): Promise<ActionState> => {
  const user = await getCurrentUser();
  const timestamp = new Date();

  const validated = schema.safeParse(exercise);

  if (!validated.success) {
    return {
      success: false,
      error: "invalid data",
      timestamp,
    };
  }

  if (!user || user.id !== validated.data.userId) {
    return {
      success: false,
      error: "unauthorized",
    };
  }

  try {
    await prisma.exercise.delete({
      where: {
        id: exercise.id,
      },
    });
  } catch (error) {
    return {
      success: false,
      error: "Could not delete the exercise",
    };
  }

  redirect("/app/exercises");
};
