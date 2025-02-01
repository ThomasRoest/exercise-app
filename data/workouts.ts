import prisma from "@/prisma/db";
import { getCurrentUser } from "./users";

export const getUserWorkouts = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return await prisma.workout.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      description: true,
      userId: true,
      createdAt: true,
      note: true
    },
  });
};

export const getUserWorkoutById = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return await prisma.workout.findUnique({
    where: {
      id: id,
      userId: user.id,
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
      sets: {
        select: {
          id: true,
          exerciseTitle: true,
          reps: true,
          weight: true,
          userId: true,
          createdAt: true,
          workoutId: true,
          exerciseId: true,
        },
      },
    },
  });
};
