"use client";

import { deleteWorkout } from "@/actions/workouts/delete";
import { DeleteButtonWithConfirm } from "@/components/DeleteWithConfirm";
import { toastOptions } from "@/lib/utils";
import { Workout } from "@prisma/client";
import { useCallback, useTransition } from "react";
import toast from "react-hot-toast";

export const DeleteWorkout = ({ workout }: { workout: Workout }) => {
  const [isPending, startTransition] = useTransition();

  const deleteFn = useCallback(async () => {
    startTransition(async () => {
      const result = await deleteWorkout(workout);
      if (result.success) {
        toast.success("Deleted", toastOptions);
      }
    });
  }, [workout]);

  return (
    <DeleteButtonWithConfirm handleClick={deleteFn} isPending={isPending} />
  );
};
