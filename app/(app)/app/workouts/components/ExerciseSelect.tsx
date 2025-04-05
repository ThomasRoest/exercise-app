"use client";

import { Exercise } from "@prisma/client";
import { ChangeEvent } from "react";

interface SelectProps {
  options: Exercise[];
  selectedExercise: Exercise | null;
  setSelectedExercise: (value: Exercise) => void;
}

export const ExerciseSelect = ({
  options,
  selectedExercise,
  setSelectedExercise,
}: SelectProps) => {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = options.find((item) => item.id === e.target.value);
    if (!selected) return;
    sessionStorage.setItem("exercise_id", e.target.value);
    setSelectedExercise(selected);
  };

  return (
    <select
      name="exerciseId"
      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800  dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:bg-gray-700 dark:text-gray-200"
      value={selectedExercise ? selectedExercise.id : ""}
      onChange={onChange}
    >
      {options.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        );
      })}
    </select>
  );
};
