"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, ReactNode } from "react";

export const MenuBarLink = ({
  href,
  children,
  icon,
}: {
  href: string;
  children: ReactNode;
  icon: ReactElement<any>;
}) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col flex-1 items-center justify-center transition pt-3 pb-2",
        {
          "border-b-4 border-blue-600 transition-colors duration-500":
            href === path,
          "border-b-4 border-transparent": href !== path,
        }
      )}
    >
      {icon}
      {children}
    </Link>
  );
};
