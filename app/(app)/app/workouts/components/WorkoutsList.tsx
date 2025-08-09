import { getUserWorkouts } from "@/data/workouts";
import { WorkoutItem } from "./WorkoutItem";

export const WorkoutsList = async ({
  searchParams,
}: {
  searchParams: Promise<{ year: string }>;
}) => {
  const params = await searchParams;
  const workouts = await getUserWorkouts({ year: parseInt(params.year) });

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
