import prisma from "@/prisma/db";
import { getCurrentUser } from "./users";

export const getUserNotes = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  return await prisma.program.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      description: true,
      title: true,
    },
  });
};

export const getUserNoteById = async (id: string) => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  return await prisma.program.findUnique({
    where: {
      id: id,
      userId: user.id,
    },
  });
};
