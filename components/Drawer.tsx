"use client";

import { useClickOutside } from "@/lib/useClickOutside";
import { cn } from "@/lib/utils";
import { SidebarClose, X } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";

export const DrawerBackground = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-black transition-opacity duration-300 ease-in-out opacity-0 pointer-events-none z-10",
        {
          "opacity-50": isOpen,
        }
      )}
    />
  );
};

export const Drawer = ({
  close,
  isOpen,
  children,
  position = "left",
  title = "Fit app",
  header = true,
}: {
  close: () => void;
  isOpen: boolean;
  children: ReactNode;
  position?: "left" | "bottom";
  title?: string;
  header?: boolean;
}) => {
  const ref = useClickOutside<HTMLDivElement>(close);

  return (
    <>
      <div
        ref={ref}
        className={cn("fixed bg-white shadow-lg z-20 transition dark:bg-gray-900 dark:text-gray-300", {
          "top-0 left-0 bottom-0 w-[300px]": position === "left",
          "bottom-0 left-0 right-0": position === "bottom",
          "translate-x-[-300px] transition": !isOpen && position === "left",
          "translate-y-[600px] transition": !isOpen && position === "bottom",
        })}
      >
        {header && (
          <div className="flex items-center justify-between p-2 border-b">
            <span className="font-bold">{title}</span>
            <Button variant="outline" size="icon" onClick={close}>
              {position === "left" && <SidebarClose className="h-4 w-4" />}
              {position === "bottom" && <X className="h-4 w-4" />}
            </Button>
          </div>
        )}
        {children}
      </div>
      <DrawerBackground isOpen={isOpen} />
    </>
  );
};
