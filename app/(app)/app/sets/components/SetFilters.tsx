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
      {/* <button
        className={cn(
          "text-sm h-8 border rounded-lg px-2 py-1 active:bg-gray-500 active:text-white flex items-center gap-1"
        )}
        onClick={() => {
          setSortOrder();
        }}
      >
        Sort
        {sortOrder === "desc" ? (
          <ArrowDown className="h-4 w-4 text-gray-500" />
        ) : (
          <ArrowUp className="h-4 w-4 text-gray-500" />
        )}
      </button> */}
      {/* <button
        className={cn(
          "text-sm border h-8 rounded-lg px-2 py-1 active:bg-gray-500 active:text-white flex items-center gap-1"
        )}
        onClick={() => {
          const newUrl = new URL(window.location.href);
          newUrl.search = "";
          router.push(newUrl.toString());
        }}
      >
        Clear all
        <X className="h-4 w-4 text-gray-500" />
      </button> */}
    </div>
  );
};
