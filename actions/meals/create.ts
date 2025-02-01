"use server";

import { mealSchema } from "@/validation/meal";
import prisma from "@/prisma/db";
import { getCurrentUser } from "@/data/users";
import { ActionState } from "@/types";
import { revalidatePath } from "next/cache";

export const createMeal = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const user = await getCurrentUser();
  const timestamp = new Date();

  if (!user) {
    return {
      success: false,
      error: "unauthorized",
      timestamp,
    };
  }

  const validated = mealSchema.safeParse({
    title: formData.get("title"),
  });

  if (!validated.success) {
    return {
      success: false,
      error: "invalid data",
      timestamp,
    };
  }

  try {
    await prisma.meal.create({
      data: {
        title: validated.data.title,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Could not add meal",
      timestamp,
    };
  }
  revalidatePath("/meals");
  return {
    success: true,
    timestamp,
  };
};
