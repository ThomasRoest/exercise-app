"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export const DeleteButton = () => {
  const status = useFormStatus();
  if (status.pending) {
    return (
      <Loader2 className="animate-spin h-5 w-5 text-slate-400 dark:text-gray-500" />
    );
  }
  return (
    <Button
      type="submit"
      size="icon"
      variant="ghost"
      className="h-6 w-6 text-slate-400 hover:text-slate-700 dark:text-gray-500 dark:hover:text-gray-200"
      aria-label="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};
