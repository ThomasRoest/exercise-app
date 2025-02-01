"use client";

import { deleteMeal } from "@/actions/meals/delete";
import { DeleteButton } from "@/components/DeleteButton";
import { toastOptions } from "@/lib/utils";
import { Meal } from "@prisma/client";
import { useCallback, useTransition } from "react";
import toast from "react-hot-toast";

export const DeleteMeal = ({ meal }: { meal: Meal }) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = useCallback(async () => {
    startTransition(async () => {
      const result = await deleteMeal(meal);
      if (result.success) {
        toast.success("Deleted", toastOptions);
      }
    });
  }, [meal]);

  return <DeleteButton onClick={handleClick} isPending={isPending} />;
};
