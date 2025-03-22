"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ActionResult } from "@/types";
import { getCurrentUser } from "@/data/users";

const schema = z.object({
  id: z.string().min(1),
  habitId: z.string().min(1),
  userId: z.string().min(1),
});

type Data = z.infer<typeof schema>;

export const deleteHabitEntry = async (data: Data): Promise<ActionResult> => {
  const user = await getCurrentUser();
  const validationResult = schema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "invalid",
    };
  }

  if (!user || user.id !== validationResult.data.userId) {
    throw new Error("unauthorized");
  }

  try {
    await prisma.habitEntry.delete({
      where: {
        id: validationResult.data.id,
        habitId: validationResult.data.habitId,
      },
    });
  } catch (error) {
    return {
      success: false,
      message: "Could not delete the entry",
    };
  }

  revalidatePath("/app/habits");

  return {
    success: true,
    message: "deleted",
  };
};
