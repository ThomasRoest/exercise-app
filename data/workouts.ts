import prisma from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { getCurrentUser } from "./users";
import { z } from "zod";

const yearSchema = z.number().optional();
interface FilterOptions {
  year?: number;
}

export const getUserWorkouts = async (opts: FilterOptions = {}) => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const validated = yearSchema.safeParse(opts.year);
  let where: Prisma.WorkoutWhereInput = { userId: user.id };

  if (opts.year && validated.success) {
    const startOfYear = new Date(opts.year, 0, 1);
    const endOfYear = new Date(opts.year + 1, 0, 1);
    where.createdAt = {
      gte: startOfYear,
      lt: endOfYear,
    };
  }

  return await prisma.workout.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      description: true,
      userId: true,
      createdAt: true,
      note: true,
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
