"use client";

import { ChartNoAxesColumn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const WrappedLink = () => {
  const pathname = usePathname();

  return (
    <Link
      href={`${pathname}/progress`}
      className="flex items-center text-gray-500 gap-x-1 hover:text-gray-600"
    >
      <ChartNoAxesColumn />
      Progress
    </Link>
  );
};
