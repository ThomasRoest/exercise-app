"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export const DeleteButton = () => {
  const status = useFormStatus();
  if (status.pending) {
    return <Loader2 className="animate-spin h-5 w-5 text-slate-300" />;
  }
  return (
    <button className="text-xs bg-slate-300 text-white h-5 w-5 rounded-md dark:bg-gray-800 dark:hover:bg-gray-600">
      x
    </button>
  );
};
