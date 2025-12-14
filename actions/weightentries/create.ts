"use server";

import { getCurrentUser } from "@/data/users";
import prisma from "@/prisma/db";
import { ActionResult } from "@/types";
import { weightEntrySchema } from "@/validation/weight";
import { revalidatePath } from "next/cache";

export const createWeightEntry = async (
  data: {
    weight: number;
    unit?: string;
    note?: string;
  }
): Promise<ActionResult> => {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      message: "unauthorized",
    };
  }

  const validationResult = weightEntrySchema.safeParse(data);
  if (!validationResult.success) {
    return {
      success: false,
      message: "Invalid data",
    };
  }

  try {
    await prisma.weightEntry.create({
      data: {
        weight: validationResult.data.weight,
        unit: validationResult.data.unit,
        note: validationResult.data.note,
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
      message: "could not create habit entry",
    };
  }
  revalidatePath("/weight");
  return {
    success: true,
    message: "entry added",
  };
};
