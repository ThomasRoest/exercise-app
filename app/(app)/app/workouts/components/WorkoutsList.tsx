import { getUserWorkouts } from "@/data/workouts";
import { WorkoutItem } from "./WorkoutItem";

interface ListProps {
  year: string;
  type: string;
}

export const WorkoutsList = async ({ year, type }: ListProps) => {
  const workouts = await getUserWorkouts({ year: parseInt(year), type });

  if (!workouts) {
    return <>Unavailable</>;
  }

  return (
    <ul className="space-y-2">
      {workouts.map((workout) => {
        return <WorkoutItem key={workout.id} workout={workout} />;
      })}
    </ul>
  );
};
