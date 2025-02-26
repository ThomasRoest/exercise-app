import prisma from "@/prisma/db";
import { getCurrentUser } from "./users";

export const getUserHabits = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  return await prisma.habit.findMany({
    where: { userId: user.id },
    orderBy: { title: "asc" },
    select: {
      id: true,
      title: true,
      slug: true,
      createdAt: true,
      userId: true,
    },
  });
};
