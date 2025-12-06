"use client";

import { deleteWorkout } from "@/actions/workouts/delete";
import { DeleteButtonWithConfirm } from "@/components/DeleteWithConfirm";
import { useToast } from "@/lib/useToast";
import { Workout } from "@prisma/client";
import { useCallback, useTransition } from "react";

export const DeleteWorkout = ({ workout }: { workout: Workout }) => {
  const [isPending, startTransition] = useTransition();
  const toast = useToast();
  
  const deleteFn = useCallback(async () => {
    startTransition(async () => {
      const result = await deleteWorkout(workout);
      if (result.success) {
        toast.success("Deleted");
      }
    });
  }, [toast, workout]);

  return (
    <DeleteButtonWithConfirm handleClick={deleteFn} isPending={isPending} />
  );
};
