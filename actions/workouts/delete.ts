"use server";

import prisma from "@/prisma/db";
import { getCurrentUser } from "@/data/users";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
});

export const deleteWorkout = async (workout: {
  id: string;
  userId: string;
}) => {
  const user = await getCurrentUser();
  const timestamp = new Date();
  const validatedWorkout = schema.safeParse(workout);

  if (!validatedWorkout.success) {
    return {
      success: false,
      error: "invalid data",
      timestamp,
    };
  }

  if (!user || user.id !== validatedWorkout.data.userId) {
    return {
      success: false,
      error: "unauthorized",
      timestamp,
    };
  }

  try {
    await prisma.workout.delete({
      where: {
        id: validatedWorkout.data.id,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Could not delete the exercise",
    };
  }

  redirect("/app/workouts");
};
