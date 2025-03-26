"use server";

import { getCurrentUser } from "@/data/users";
import prisma from "@/prisma/db";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
});

export const deleteHabit = async (habit: {
  id: string;
  userId: string;
}): Promise<ActionResult> => {
  const user = await getCurrentUser();

  const validated = schema.safeParse(habit);

  if (!validated.success) {
    return {
      success: false,
      message: "invalid data",
    };
  }

  if (!user || user.id !== validated.data.userId) {
    return {
      success: false,
      message: "unauthorized",
    };
  }

  try {
    await prisma.habit.delete({
      where: {
        id: habit.id,
      },
    });
  } catch (error) {
    return {
      success: false,
      message: "Could not delete the habit",
    };
  }

  redirect('/app/habits')
};
