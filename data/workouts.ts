import prisma from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { getCurrentUser } from "./users";
import { z } from "zod";

const getStartOfYear = (year: number) => {
  return new Date(year, 0, 1);
}

const getEndOfYear = (year: number) => {
  return new Date(year + 1, 0, 1);
}

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
    where.createdAt = {
      gte: getStartOfYear(opts.year),
      lt: getEndOfYear(opts.year),
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

export const getWorkoutCount = async (opts: FilterOptions = {}) => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const validated = yearSchema.safeParse(opts.year);
  let where: Prisma.WorkoutWhereInput = { userId: user.id };

  if (opts.year && validated.success) {
    where.createdAt = {
      gte: getStartOfYear(opts.year),
      lt: getEndOfYear(opts.year),
    };
  }

  return await prisma.workout.count({
    where,
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
