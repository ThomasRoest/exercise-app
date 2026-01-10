import prisma from "@/prisma/db";
import { getCurrentUser } from "./users";
import { format, subDays } from "date-fns";

export const getUserHabits = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  // Get the last 4 days (today + 3 previous)
  const today = new Date();
  const recentDates = [
    format(subDays(today, 3), "yyyy-MM-dd"),
    format(subDays(today, 2), "yyyy-MM-dd"),
    format(subDays(today, 1), "yyyy-MM-dd"),
    format(today, "yyyy-MM-dd"),
  ];

  return await prisma.habit.findMany({
    where: { userId: user.id },
    orderBy: { title: "asc" },
    select: {
      id: true,
      title: true,
      slug: true,
      createdAt: true,
      userId: true,
      habitEntries: {
        where: {
          completedAt: { in: recentDates },
        },
        select: {
          id: true,
          completedAt: true,
          userId: true,
        },
      },
    },
  });
};

export const getUserHabitEntries = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return []
  }

  return await prisma.habitEntry.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      completedAt: true,
      userId: true,
    },
  });
};


export const getUserHabit = async ({ slug }: { slug: string }) => {
  const user = await getCurrentUser();
  if (!user) {
    return null
  }

  return await prisma.habit.findFirst({
    where: { 
      userId: user.id,
      slug,
    },
    select: {
      id: true,
      title: true,
      userId: true,
      habitEntries: {
        select: {
          id: true,
          completedAt: true,
          userId: true
        },
      },
    },
  });
};
