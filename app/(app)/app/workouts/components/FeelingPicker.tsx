"use client";

import { updateWorkout } from "@/actions/workouts/update";
import { cn } from "@/lib/utils";
import { useToast } from "@/lib/useToast";
import { Feeling } from "@prisma/client";
import { useOptimistic, useTransition } from "react";
import { feelings } from "./feelings";

export const FeelingPicker = ({
  workoutId,
  feeling,
}: {
  workoutId: string;
  feeling: Feeling | null;
}) => {
  const toast = useToast();
  const [, startTransition] = useTransition();
  const [optimisticFeeling, setOptimisticFeeling] = useOptimistic(feeling);

  const select = (value: Feeling) => {
    const next = value === optimisticFeeling ? null : value;
    startTransition(async () => {
      setOptimisticFeeling(next);
      try {
        const result = await updateWorkout({ workoutId, feeling: next });
        if (!result.success) {
          toast.error(result.message);
        }
      } catch {
        toast.error("Couldn't save, check your connection");
      }
    });
  };

  return (
    <div className="mb-4">
      <div className="grid grid-cols-3 gap-2">
        {feelings.map(({ value, label, Icon, iconClassName, selectedClassName }) => {
          const isSelected = optimisticFeeling === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => select(value)}
              aria-pressed={isSelected}
              className={cn(
                "flex flex-col items-center gap-1 py-2 rounded-lg border-2 text-xs transition-colors",
                isSelected
                  ? cn("font-semibold text-slate-900 dark:text-gray-200", selectedClassName)
                  : "border-slate-200 bg-white text-slate-500 active:bg-slate-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  isSelected ? iconClassName : "text-slate-400 dark:text-gray-500"
                )}
              />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
