"use client";

import { createHabitEntry } from "@/actions/habitentries/create";
import { toastOptions } from "@/lib/utils";
import { Habit, HabitEntry } from "@prisma/client";
import toast from "react-hot-toast";
import { Calendar } from "./Calendar";
import { deleteHabitEntry } from "@/actions/habitentries/delete";

export const HabitCalendar = ({
  habit,
  entries,
}: {
  habit: Habit;
  entries: { id: string; completedAt: Date; userId: string }[];
}) => {
  const completeDate = async (date: Date) => {
    const result = await createHabitEntry({ date, habitId: habit.id });
    if (result.success) {
      toast.success("Completed!", toastOptions);
    } else {
      toast.error("something went wrong");
    }
  };

  const removeDate = async (date: Date) => {
    const entry = entries.find((entry) => {
      return entry.completedAt.toDateString() === date.toDateString();
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
    if (result.success) {
      toast.success("Removed", toastOptions);
    } else {
      toast.error("something went wrong");
    }
  };

  const completedDays = entries.map((entry) => {
    return entry.completedAt.toDateString();
  });

  return (
    <>
      <Calendar
        completeDate={completeDate}
        removeDate={removeDate}
        completedDays={completedDays}
      />
    </>
  );
};
