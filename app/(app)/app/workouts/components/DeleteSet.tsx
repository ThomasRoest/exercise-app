"use client";

import { deleteSet } from "@/actions/sets/delete";
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
import { Set } from "@prisma/client";
import { Loader2, MoreHorizontal, Trash } from "lucide-react";
import { useCallback, useState, useTransition } from "react";
import toast from "react-hot-toast";

export const DeleteSet = ({ set }: { set: Set }) => {
  const [open, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onDelete = useCallback(() => {
    startTransition(async () => {
      const result = await deleteSet(set);
      if (result.success) {
        toast.success("Deleted", toastOptions);
        setIsOpen(false);
      }
    });
  }, [set]);

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
