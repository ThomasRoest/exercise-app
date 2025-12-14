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
      variant="outline"
    >
      {isPending ? <Loader2 className="animate-spin" /> : <Trash2 />}
    </Button>
  );
};
