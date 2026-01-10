"use client";

import { createHabitEntry } from "@/actions/habitentries/create";
import { deleteHabitEntry } from "@/actions/habitentries/delete";
import { cn } from "@/lib/utils";
import { useToast } from "@/lib/useToast";
import { format, subDays } from "date-fns";
import { Check } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";

interface HabitEntry {
  id: string;
  completedAt: string;
  userId: string;
}

interface HabitListItemProps {
  habit: {
    id: string;
    title: string;
    slug: string;
    habitEntries: HabitEntry[];
  };
}

export const HabitListItem = ({ habit }: HabitListItemProps) => {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  
  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const days = [
    { date: format(subDays(today, 3), "yyyy-MM-dd"), label: "3d", isToday: false },
    { date: format(subDays(today, 2), "yyyy-MM-dd"), label: "2d", isToday: false },
    { date: format(subDays(today, 1), "yyyy-MM-dd"), label: "1d", isToday: false },
    { date: todayStr, label: "T", isToday: true },
  ];

  const completedDates = habit.habitEntries.map((entry) => entry.completedAt);

  const toggleDay = (date: string) => {
    const entry = habit.habitEntries.find((e) => e.completedAt === date);
    
    startTransition(async () => {
      if (entry) {
        const result = await deleteHabitEntry({
          id: entry.id,
          habitId: habit.id,
          userId: entry.userId,
        });
        if (!result.success) {
          toast.error("Failed to remove entry");
        }
      } else {
        const result = await createHabitEntry({
          date,
          habitId: habit.id,
        });
        if (!result.success) {
          toast.error("Failed to complete habit");
        }
      }
    });
  };

  return (
    <li className="flex items-center gap-3 p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <Link
        href={`/app/habits/${habit.slug}`}
        className="flex-1 min-w-0 text-gray-800 font-medium dark:text-gray-200 truncate hover:underline"
      >
        {habit.title}
      </Link>
      <div className={cn("flex items-center gap-2.5", isPending && "opacity-50 pointer-events-none")}>
        {days.map((day) => {
          const isCompleted = completedDates.includes(day.date);
          return (
            <button
              key={day.date}
              onClick={() => toggleDay(day.date)}
              disabled={isPending}
              className={cn(
                "flex flex-col items-center justify-center w-9 h-9 rounded-full border-2 transition-colors",
                isCompleted && day.isToday && "bg-green-500 border-green-500 text-white",
                isCompleted && !day.isToday && "bg-green-600/70 border-green-600/70 text-white",
                !isCompleted && "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500",
                day.isToday && "ring-2 ring-blue-400 ring-offset-1 dark:ring-offset-gray-800"
              )}
              title={day.date}
            >
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                  {day.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </li>
  );
};
