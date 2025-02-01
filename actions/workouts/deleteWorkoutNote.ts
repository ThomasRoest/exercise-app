"use server";
import { getCurrentUser } from "@/data/users";
import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.string().min(1);

export const deleteWorkoutNote = async (id: string, formData: FormData) => {
  const validatedId = schema.safeParse(id);
  const user = await getCurrentUser();
  await new Promise((res) => setTimeout(res, 2000))
  if (!user) {
    throw new Error("unauthorized");
  }
  try {
    await prisma.workout.update({
      where: {
        id: validatedId.data,
        userId: user.id,
      },
      data: {
        note: null,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("something went wrong");
    }
  }
  revalidatePath(`app/workouts/${validatedId.data}`);
};
