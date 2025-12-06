import { getUserWorkouts } from "@/data/workouts";
import { WorkoutItem } from "./WorkoutItem";
import { useToast } from "@/lib/useToast";

export const WorkoutsList = async ({ year }: { year: string }) => {
  const workouts = await getUserWorkouts({ year: parseInt(year) });

  if (!workouts) {
    return <>Unavailable</>;
  }

  return (
    <ul className="space-y-2">
      <button>click</button>
      {workouts.map((workout) => {
        return <WorkoutItem key={workout.id} workout={workout} />;
      })}
    </ul>
  );
};
