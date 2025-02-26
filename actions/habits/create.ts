"use server";

import { getCurrentUser } from "@/data/users";
import prisma from "@/prisma/db";
import { ActionResult } from "@/types";
import { habitSchema } from "@/validation/habit";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export const createHabit = async (data: unknown): Promise<ActionResult> => {
  const validationResult = habitSchema.safeParse(data);
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

  const { title } = validationResult.data;

  const slug = slugify(title, {
    lower: true,
  });

  try {
    await prisma.habit.create({
      data: {
        title: title,
        slug,
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
      message: "could not create habit",
    };
  }
  revalidatePath("/habits");
  return {
    success: true,
    message: "habit added",
  };
};
