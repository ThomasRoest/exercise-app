"use client";
import { Exercise } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { ToggleFilter } from "./ToggleFilter";

export const SetFilters = ({ exercises }: { exercises: Exercise[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticExercises, setOptimisticExercises] = useOptimistic(
    searchParams.getAll("exercise")
  );

  return (
    <div className="flex gap-2 mb-2 flex-wrap">
      <ToggleFilter
        toggleKey="exercise"
        options={exercises.map((exercise) => {
          return {
            label: exercise.title,
            value: exercise.slug,
          };
        })}
        selectedValues={optimisticExercises}
        onToggle={(exercises) => {
          const params = new URLSearchParams(searchParams);
          params.delete("exercise");
          exercises.forEach((exercise) => {
            return params.append("exercise", exercise);
          });
          startTransition(() => {
            setOptimisticExercises(exercises);
            router.push(`?${params.toString()}`, {
              scroll: false,
            });
          });
        }}
      />
      {isPending && <Loader2 className="animate-spin" />}
    </div>
  );
};
