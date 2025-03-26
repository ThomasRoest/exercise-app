"use server";

import { getCurrentUser } from "@/data/users";
import prisma from "@/prisma/db";
import { ActionResult } from "@/types";
import { habitEntrySchema } from "@/validation/habit";
import { revalidatePath } from "next/cache";

export const createHabitEntry = async (
  data: {
    date: string;
    habitId: string;
  }
): Promise<ActionResult> => {
  const validationResult = habitEntrySchema.safeParse(data);
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
  try {
    await prisma.habitEntry.create({
      data: {
        completedAt: validationResult.data.date,
        habit: {
          connect: {
            id: validationResult.data.habitId,
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
    return {
      success: false,
      message: "could not create habit entry",
    };
  }
  revalidatePath("/habits");
  return {
    success: true,
    message: "entry added",
  };
};
