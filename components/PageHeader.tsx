import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const PageHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex py-4 gap-x-2 items-center", className)}>
      {children}
    </div>
  );
};
