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
          let variant: ButtonProps["variant"] = "outline";
          // if (!params.year) {
          //   variant = year.defaultActive ? "default" : "outline";
          // } else {
          //   variant = year.id.toString() === params.year ? "default" : "outline";
          // }
          return (
            <Button
              key={year.id}
              variant={variant}
              size="sm"
              className="mr-1"
              asChild
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
          variant="outline"
          size="sm"
          className="rounded-full text-xs"
          onClick={() => setParams("type", null)}
        >
          All
        </Button>
        {workoutTypes.map((workoutType) => {
          return (
            <Button
              key={workoutType.value}
              variant="outline"
              size="sm"
              className="rounded-full text-xs"
              onClick={() =>
                setParams("type", workoutType.value.toLocaleLowerCase())
              }
              // className={cn(
              //   workoutType.bg,
              //   workoutType.text,
              //   workoutType.border,
              //   "rounded-full"
              // )}
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
