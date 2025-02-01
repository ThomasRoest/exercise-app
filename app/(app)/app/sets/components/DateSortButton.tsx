"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const DateSortButton = () => {
  const router = useRouter();
  const params = useSearchParams();
  const dateSort = params.get("date");

  const handleClick = () => {
    if (!dateSort || dateSort === "desc") {
      router.push(`/exercises?date=asc`);
    } else {
      router.push(`/exercises?date=desc`);
    }
  };

  return (
    <Button variant="ghost" onClick={handleClick} className="flex items-center">
      Date
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};
