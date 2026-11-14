import { cn, formatDate } from "@/lib/utils";
import { Workout } from "@prisma/client";
import { getYear } from "date-fns";
import { MessageSquareText } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";
import { getFeeling } from "./feelings";

export const WorkoutItem = ({
  workout,
}: {
  workout: Workout;
}): ReactElement => {
  const feeling = getFeeling(workout.feeling);

  return (
    <li>
      <Link
        href={`/app/workouts/${workout.id}`}
        className={cn(
          "w-full text-sm p-4 pl-3 border-l-4 rounded shadow-sm active:bg-slate-200 bg-white flex items-center gap-x-2 justify-between dark:bg-gray-800 dark:text-gray-300",
          feeling?.borderClassName ?? "border-l-transparent"
        )}
      >
        <div>
          {formatDate(workout.createdAt)}
          <span className="ml-2 text-slate-500 text-xs">
            {workout.description}
          </span>
          <span className="ml-2 text-xs text-slate-600">
            {getYear(workout.createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-x-2 shrink-0">
          {workout.note && (
            <MessageSquareText className="text-slate-500 w-4 h-4" />
          )}
          {feeling && (
            <feeling.Icon
              aria-label={feeling.label}
              className={cn("w-4 h-4", feeling.iconClassName)}
            />
          )}
        </div>
      </Link>
    </li>
  );
};
