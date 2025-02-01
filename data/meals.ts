import prisma from "@/prisma/db";
import { getCurrentUser } from "./users";

export const getDailyMeals = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return await prisma.meal.findMany({
    where: {
      userId: user.id,
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      description: true,
      title: true,
      createdAt: true,
      userId: true,
    },
  });
};
