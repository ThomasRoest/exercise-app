"use server";

import prisma from "@/prisma/db";
import { getCurrentUser } from "@/data/users";
import { ActionState } from "@/types";
import { Meal } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  userId: z.string().min(1),
});

export const deleteMeal = async (meal: Meal): Promise<ActionState> => {
  const user = await getCurrentUser();
  const timestamp = new Date();

  const validated = schema.safeParse(meal);

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
      timestamp,
    };
  }

  try {
    await prisma.meal.delete({
      where: {
        id: meal.id,
      },
    });
    revalidatePath("/meals");
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Could not delete meal",
      timestamp,
    };
  }
  return { success: true, timestamp };
};
