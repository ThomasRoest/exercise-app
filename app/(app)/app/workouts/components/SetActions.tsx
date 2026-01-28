"use client";

import { copySet } from "@/actions/sets/copy";
import { deleteSet } from "@/actions/sets/delete";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/lib/useToast";
import { Set } from "@prisma/client";
import { Copy, Loader2, MoreHorizontal, Trash } from "lucide-react";
import { useCallback, useState, useTransition } from "react";

const DeleteItem = ({
  set,
  setIsOpen,
}: {
  set: Set;
  setIsOpen: (open: boolean) => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const toast = useToast();
  const onDelete = useCallback(() => {
    startTransition(async () => {
      const result = await deleteSet(set);
      if (result.success) {
        toast.success("Deleted");
        setIsOpen(false);
      }
    });
  }, [set, setIsOpen, toast]);

  return (
    <DropdownMenuItem onClick={onDelete}>
      <Trash className="mr-2 h-4 w-4" />
      Delete
      {isPending && <Loader2 className="animate-spin" />}
    </DropdownMenuItem>
  );
};

const CopyItem = ({
  set,
  setIsOpen,
}: {
  set: Set;
  setIsOpen: (open: boolean) => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const toast = useToast();
  const copy = useCallback(() => {
    startTransition(async () => {
      const result = await copySet({...set});
      if (result?.success) {
        toast.success("Copied");
        setIsOpen(false);
      } else {
        toast.error("Could not copy set");
      }
    });
  }, [set, setIsOpen, toast]);

  return (
    <DropdownMenuItem onClick={copy}>
      <Copy className="mr-2 h-4 w-4" />
      Copy
      {isPending && <Loader2 className="animate-spin" />}
    </DropdownMenuItem>
  );
};

export const SetActions = ({ set }: { set: Set }) => {
  const [open, setIsOpen] = useState(false);

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
        <DeleteItem set={set} setIsOpen={setIsOpen} />
        <DropdownMenuSeparator />
        <CopyItem set={set} setIsOpen={setIsOpen} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
