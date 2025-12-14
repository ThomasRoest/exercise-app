"use client";

import { deleteWeightEntry } from "@/actions/weightentries/delete";
import { DeleteButton } from "@/components/DeleteButton";
import { useToast } from "@/lib/useToast";
import { useCallback, useTransition } from "react";

type WeightEntryData = {
  id: string;
  userId: string;
};

export const DeleteWeightEntry = ({ weightEntry }: { weightEntry: WeightEntryData }) => {
  const [isPending, startTransition] = useTransition();
  const toast = useToast();
  
  const handleClick = useCallback(async () => {
    startTransition(async () => {
      const result = await deleteWeightEntry(weightEntry);
      if (result.success) {
        toast.success("Deleted");
      } else {
        toast.error("Failed to delete");
      }
    });
  }, [weightEntry, toast]);

  return <DeleteButton onClick={handleClick} isPending={isPending} />;
};

