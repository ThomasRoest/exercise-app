import prisma from "@/prisma/db";
import "server-only";
import { getCurrentUser } from "./users";

const PAGE_SIZE = 10;

export const getUserExercises = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  return await prisma.exercise.findMany({
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

export const getExerciseById = async (id: string, currentPage: number) => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  const offset = (currentPage - 1) * PAGE_SIZE;

  return await prisma.exercise.findUnique({
    where: {
      id,
      userId: user.id,
    },
    include: {
      _count: true,
      sets: {
        take: PAGE_SIZE,
        skip: offset,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          reps: true,
          weight: true,
          exerciseTitle: true,
          createdAt: true,
        },
      },
    },
  });
};
