"use server";

import prisma from "@/prisma/db";
import { getCurrentUser } from "@/data/users";
import { Set } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const schema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
});

export const deleteSet = async (set: Set) => {
  const user = await getCurrentUser();
  const timestamp = new Date();
  const { success, data } = schema.safeParse(set);

  if (!success) {
    return {
      success: false,
      error: "invalid data",
      timestamp,
    };
  }

  if (!user || user.id !== data.userId) {
    return {
      success: false,
      error: "unauthorized",
      timestamp,
    };
  }

  try {
    await prisma.set.delete({
      where: {
        id: data.id,
      },
    });
    revalidateTag("set");
    return {
      success: true,
      timestamp,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Could not delete the set",
      timestamp,
    };
  }
};
