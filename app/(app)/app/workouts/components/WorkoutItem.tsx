import { formatDate } from "@/lib/utils";
import { Workout } from "@prisma/client";
import { MessageSquareText } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

export const WorkoutItem = ({
  workout,
}: {
  workout: Workout;
}): ReactElement<any> => {
  return (
    <li>
      <Link
        href={`/app/workouts/${workout.id}`}
        className="w-full text-sm p-4 rounded shadow-sm active:bg-slate-200 bg-white flex items-center gap-x-2 justify-between dark:bg-gray-800 dark:text-gray-300"
      >
        <div>
        {formatDate(workout.createdAt)}
        <span className="ml-2 text-slate-500 text-xs">{workout.description}</span>
        </div>
        {workout.note && (
          <MessageSquareText className="text-slate-500 w-4 h-4" />
        )}
      </Link>
    </li>
  );
};
