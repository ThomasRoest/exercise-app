"use client";

import { Loader2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export const DeleteButton = ({
  onClick,
  isPending,
}: {
  onClick: () => void;
  isPending: boolean;
}) => {
  return (
    <Button
      size="icon"
      onClick={onClick}
      variant="ghost"
      className="text-slate-400 hover:text-slate-700 dark:text-gray-500 dark:hover:text-gray-200"
      aria-label="Delete"
    >
      {isPending ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
};
