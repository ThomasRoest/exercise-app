"use server";

import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";

const deleteProgramSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
});

export const deleteProgram = async (
  formData: FormData
): Promise<void> => {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error('unauthorized');
  }

  const validationResult = deleteProgramSchema.safeParse({
    id: formData.get("id"),
    userId: formData.get("userId"),
  });

  if (!validationResult.success) {
    throw new Error('invalid data');
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user || user.id !== validationResult.data.userId) {
    throw new Error("unauthorized")
  }

  try {
    await prisma.program.delete({
      where: {
        id: validationResult.data.id
      },
    });
  } catch (error) {
    throw new Error("something went wrong")
  }
  revalidatePath("/app/notes");
  redirect("/app/notes");
};
