"use client"

import { deleteSet } from "@/actions/sets/delete";
import { DeleteButton } from "@/components/DeleteButton";
import { toastOptions } from "@/lib/utils";
import { Set } from "@prisma/client";
import { useCallback, useTransition } from "react";
import toast from "react-hot-toast";

export const DeleteSet = ({ set }: { set: Set }) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = useCallback(async () => {
    startTransition(async () => {
      const result = await deleteSet(set);
      if (result.success) {
        toast.success("Deleted", toastOptions);
      }
    });
  }, [set]);

  return <DeleteButton onClick={handleClick} isPending={isPending} />;
};
