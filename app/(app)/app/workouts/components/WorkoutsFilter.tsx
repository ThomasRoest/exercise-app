"use client";

import { useOptimistic, useTransition } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { workoutTypes } from "@/lib/workout-types";
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
  const [optimisticType, setOptimisticType] = useOptimistic(
    searchParams.get("type")
  );

  const setYear = (value: string) => {
    startTransition(() => {
      setOptimisticYear(value);
      const params = new URLSearchParams(searchParams.toString());
      params.set("year", value);
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const setType = (value: string | null) => {
    startTransition(() => {
      setOptimisticType(value);
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) {
        params.delete("type");
      } else {
        params.set("type", value);
      }
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
      <div className="flex gap-2">
        <Button
          variant={optimisticType === null ? "default" : "outline"}
          size="sm"
          className="rounded-full text-xs"
          onClick={() => setType(null)}
        >
          All
        </Button>
        {workoutTypes.map((workoutType) => {
          const isActive = optimisticType === workoutType.value;
          return (
            <Button
              key={workoutType.value}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs"
              onClick={() => setType(workoutType.value)}
            >
              <span className="flex items-center gap-2">
                {workoutType.icon}
                {workoutType.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
