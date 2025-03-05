"use client";

import { deleteHabit } from "@/actions/habits/delete";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toastOptions } from "@/lib/utils";
import { MoreHorizontal, Trash, Loader2 } from "lucide-react";
import { useCallback, useState, useTransition } from "react";
import toast from "react-hot-toast";

export const DeleteHabit = ({
  habit,
}: {
  habit: { id: string; userId: string };
}) => {
  const [open, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onDelete = useCallback(async () => {
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
    <DropdownMenu onOpenChange={setIsOpen} open={open}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete}>
          <Trash className="mr-2 h-4 w-4" />
          Delete
          {isPending && <Loader2 className="animate-spin" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
