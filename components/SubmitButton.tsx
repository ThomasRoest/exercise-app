"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({ children }: { children: ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <Button size="sm" type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? (
        <>
          {children}
          <Loader2 className="animate-spin ml-2" />
        </>
      ) : (
        children
      )}
    </Button>
  );
};
