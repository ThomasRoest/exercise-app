"use client";

import { createHabitEntry } from "@/actions/habitentries/create";
import { Calendar } from "./Calendar";
import { deleteHabitEntry } from "@/actions/habitentries/delete";
import { useToast } from "@/lib/useToast";

interface HabitCalendarProps {
  habit: {
    id: string;
    title: string;
    habitEntries: { id: string; completedAt: string; userId: string }[];
  };
}

export const HabitCalendar = ({ habit }: HabitCalendarProps) => {
  const toast = useToast();
  const completeDate = async (date: string) => {
    const result = await createHabitEntry({
      date,
      habitId: habit.id,
    });
    if (!result.success) {
      toast.error(`something went wrong ${result.message}`);
    }
  };

  const removeDate = async (date: string) => {
    const entry = habit.habitEntries.find((entry) => {
      return entry.completedAt === date;
    });
    if (!entry) {
      toast.error("something went wrong");
      return;
    }
    const result = await deleteHabitEntry({
      id: entry.id,
      habitId: habit.id,
      userId: entry.userId,
    });
    if (!result.success) {
      toast.error("something went wrong");
    }
  };

  const completedDays = habit.habitEntries.map((entry) => {
    return entry.completedAt;
  });

  return (
    <Calendar
      completeDate={completeDate}
      removeDate={removeDate}
      completedDays={completedDays}
    />
  );
};
