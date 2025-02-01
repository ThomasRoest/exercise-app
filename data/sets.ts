import prisma from "@/prisma/db";
import { getCurrentUser } from "./users";

const PAGE_SIZE = 10;
interface SetsFilter {
  exercises: string[] | null;
}

export const getUserSets = async (currentPage: number, filter: SetsFilter) => {
  const offset = (currentPage - 1) * PAGE_SIZE;

  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  return await prisma.set.findMany({
    take: PAGE_SIZE,
    skip: offset,
    where: {
      userId: user.id,
      AND: [
        {
          exercise: {
            slug: {
              in: filter.exercises ?? undefined,
            },
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      exerciseTitle: true,
      reps: true,
      weight: true,
      createdAt: true,
      workoutId: true,
      userId: true,
      exerciseId: true,
    },
  });
};

export const getTotalSetsCount = async (filter: SetsFilter) => {
  const user = await getCurrentUser();
  if (!user) {
    return 0;
  }
  return await prisma.set.count({
    where: {
      userId: user.id,
      AND: [
        {
          exercise: {
            slug: {
              in: filter.exercises ?? undefined,
            },
          },
        },
      ],
    },
  });
};
