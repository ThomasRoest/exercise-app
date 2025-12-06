"use client";

import { deleteExercise } from "@/actions/exercises/delete";
import { DeleteButtonWithConfirm } from "@/components/DeleteWithConfirm";
import { useToast } from "@/lib/useToast";
import { useCallback, useTransition } from "react";

export const DeleteExercise = ({ exercise }: { exercise: { id: string, userId: string} }) => {
  const [isPending, startTransition] = useTransition();
  const toast = useToast();
  
  const deleteFn = useCallback(async () => {
    startTransition(async () => {
      const result = await deleteExercise(exercise);
      if (result.success) {
        toast.success("Deleted");
      }
    });
  }, [exercise, toast]);

  return (
    <DeleteButtonWithConfirm handleClick={deleteFn} isPending={isPending} />
  );
};
