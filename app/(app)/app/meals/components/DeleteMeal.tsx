"use client";

import { deleteMeal } from "@/actions/meals/delete";
import { DeleteButton } from "@/components/DeleteButton";
import { useToast } from "@/lib/useToast";
import { Meal } from "@prisma/client";
import { useCallback, useTransition } from "react";

export const DeleteMeal = ({ meal }: { meal: Meal }) => {
  const [isPending, startTransition] = useTransition();
  const toast = useToast();
  
  const handleClick = useCallback(async () => {
    startTransition(async () => {
      const result = await deleteMeal(meal);
      if (result.success) {
        toast.success("Deleted");
      }
    });
  }, [meal, toast]);

  return <DeleteButton onClick={handleClick} isPending={isPending} />;
};
