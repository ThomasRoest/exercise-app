"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";

export const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticFilter, setOptimisticFilter] = useOptimistic(
    searchParams.get("filter")
  );

  const select = (year: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("filter", year);

    startTransition(() => {
      setOptimisticFilter(year);
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="flex gap-x-1 mb-2">
      <Button
        variant={optimisticFilter === "2024" ? "default" : "outline"}
        size="sm"
        onClick={() => select("2024")}
      >
        2024
      </Button>
      <Button
        variant={optimisticFilter === "2025" ? "default" : "outline"}
        size="sm"
        onClick={() => select("2025")}
      >
        2025
      </Button>
      {isPending && <Loader2 className="animate-spin" />}
    </div>
  );
};
