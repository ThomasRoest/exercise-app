"use client";

import { deleteHabit } from "@/actions/habits/delete";
import { DeleteButtonWithConfirm } from "@/components/DeleteWithConfirm";
import { toastOptions } from "@/lib/utils";
import { useCallback, useTransition } from "react";
import toast from "react-hot-toast";

export const DeleteHabit = ({
  habit,
}: {
  habit: { id: string; userId: string };
}) => {
  const [isPending, startTransition] = useTransition();

  const deleteFn = useCallback(async () => {
    startTransition(async () => {
      const result = await deleteHabit(habit);
      if (result.success) {
        toast.success("Deleted", toastOptions);
      } else {
        toast.error("Something went wrong", toastOptions);
      }
    });
  }, []);

  return (
    <DeleteButtonWithConfirm handleClick={deleteFn} isPending={isPending} />
  );
};
