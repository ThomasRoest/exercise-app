"use client";

import { deleteExercise } from "@/actions/exercises/delete";
import { DeleteButtonWithConfirm } from "@/components/DeleteWithConfirm";
import { toastOptions } from "@/lib/utils";
import { useCallback, useTransition } from "react";
import toast from "react-hot-toast";

export const DeleteExercise = ({ exercise }: { exercise: { id: string, userId: string} }) => {
  const [isPending, startTransition] = useTransition();

  const deleteFn = useCallback(async () => {
    startTransition(async () => {
      const result = await deleteExercise(exercise);
      if (result.success) {
        toast.success("Deleted", toastOptions);
      }
    });
  }, [exercise]);

  return (
    <DeleteButtonWithConfirm handleClick={deleteFn} isPending={isPending} />
  );
};
