"use client";

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

  const currentYear = searchParams.get("year");
  const currentType = searchParams.get("type");

  const setParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-2 flex flex-col gap-2">
      <div>
        {years.map((year) => {
          const isActive = currentYear
            ? year.id.toString() === currentYear
            : year.defaultActive;
          const variant: ButtonProps["variant"] = isActive ? "default" : "outline";
          return (
            <Button
              key={year.id}
              variant={variant}
              size="sm"
              className="mr-1"
              onClick={() => setParams("year", year.id.toString())}
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
          variant={currentType === null ? "default" : "outline"}
          size="sm"
          className="rounded-full text-xs"
          onClick={() => setParams("type", null)}
        >
          All
        </Button>
        {workoutTypes.map((workoutType) => {
          const isActive = currentType === workoutType.value
          return (
            <Button
              key={workoutType.value}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs"
              onClick={() =>
                setParams("type", workoutType.value)
              }
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
