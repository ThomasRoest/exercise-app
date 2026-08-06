"use client";

import { useOptimistic, useTransition } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Props {
  years: { id: number; defaultActive: boolean; count: number | null }[];
}

export const WorkoutsFilter = ({ years }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [, startTransition] = useTransition();

  const [optimisticYear, setOptimisticYear] = useOptimistic(
    searchParams.get("year")
  );

  const setYear = (value: string) => {
    startTransition(() => {
      setOptimisticYear(value);
      const params = new URLSearchParams(searchParams.toString());
      params.set("year", value);
      replace(`${pathname}?${params.toString()}`);
    });
  };


  return (
    <div className="mb-2 flex flex-col gap-2">
      <div>
        {years.map((year) => {
          const isActive = optimisticYear
            ? year.id.toString() === optimisticYear
            : year.defaultActive;
          const variant: ButtonProps["variant"] = isActive ? "default" : "outline";
          return (
            <Button
              key={year.id}
              variant={variant}
              size="sm"
              className="mr-1"
              onClick={() => setYear(year.id.toString())}
            >
              <div>
                {year.id} ({year.count})
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
