"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { workoutTypes } from "@/lib/workout-types";
import Link from "next/link";

interface Props {
  years: { id: number; defaultActive: boolean; count: number | null }[];
  params: {
    year: string;
  }
}

export const WorkoutsFilter = ({ years, params }: Props) => {
  return (
    <div className="mb-2 flex flex-col gap-2">
      <div>
        {years.map((year) => {
          let variant: ButtonProps["variant"] = "outline";
          if (!params.year) {
            variant = year.defaultActive ? "default" : "outline";
          } else {
            variant = year.id.toString() === params.year ? "default" : "outline";
          }
          return (
            <Button
              key={year.id}
              variant={variant}
              size="sm"
              className="mr-1"
              asChild
            >
              <Link
                href={{
                  pathname: "/app/workouts",
                  query: { year: year.id },
                }}
              >
                {year.id} ({year.count})
              </Link>
            </Button>
          );
        })}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="rounded-full text-xs">All</Button>
        {workoutTypes.map((workoutType) => {
          return (
            <Button
              key={workoutType.value}
              variant="outline"
              size="sm"
              className="rounded-full text-xs"
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
