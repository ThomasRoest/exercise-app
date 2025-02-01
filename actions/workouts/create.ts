"use server";

import prisma from "@/prisma/db";
import { getCurrentUser } from "@/data/users";
import { redirect } from "next/navigation";
import { z } from "zod";

const workoutSchema = z.object({
  description: z.string(),
});

interface ActionResult {
  success: boolean;
  message: string;
}

export const createWorkout = async (data: unknown): Promise<ActionResult> => {
  const validated = workoutSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: "invalid data",
    };
  }

  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      message: "unauthorized",
    };
  }

  let id = null;

  try {
    const workout = await prisma.workout.create({
      data: {
        description: validated.data.description,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    id = workout.id;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Could not create workout",
    };
  }
  redirect(`/app/workouts/${id}`);
};
