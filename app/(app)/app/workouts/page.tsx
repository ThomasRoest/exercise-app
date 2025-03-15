import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconWorkout } from "@/components/icons/IconWorkout";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { getUserWorkouts } from "@/data/workouts";
import { capitalize } from "@/lib/utils";
import { Workout } from "@prisma/client";
import { WorkoutItem } from "./components/WorkoutItem";
import { WorkoutForm } from "./new/WorkoutForm";
interface Group {
  id: string;
  month: string;
  fullDate: Date;
  workouts: Workout[];
}

const groupBy = (workouts?: Workout[]) => {
  if (!workouts) return [];
  let result: Group[] = [];
  for (const workout of workouts) {
    const date = new Date(workout.createdAt);
    const month = date.toLocaleString("nl-NL", { month: "long" });
    const existing = result.find((group) => group.month === month);
    if (existing) {
      existing.workouts.push(workout);
    } else {
      result.push({ id: month, month, workouts: [workout], fullDate: date });
    }
  }
  return result;
};

const formatGroupLabel = (group: Group) => {
  const formattedDate = group.fullDate.toLocaleDateString("nl-NL", {
    month: "long",
    year: "numeric",
  });
  return `${capitalize(formattedDate)} (${group.workouts.length})`;
};

const Workouts = async () => {
  const workouts = await getUserWorkouts();

  if (!workouts) {
    return <>Unavailable</>
  }

  const grouped = groupBy(workouts);

  return (
    <PageContainer>
      <PageHeader>
        <IconWorkout />
        <h1 className="font-bold dark:text-gray-200">Workouts</h1>
      </PageHeader>
      <ul>
        {grouped.length === 0 ? (
          <p className="text-center text-sm text-gray-600">No workouts yet</p>
        ) : null}
        {grouped.map((group) => {
          return (
            <li key={group.id} className="mb-4">
              <h3 className="text-sm text-gray-300 mb-2 tracking-wider">
                {formatGroupLabel(group)}
              </h3>
              <ul className="space-y-2">
                {group.workouts.map((workout) => {
                  return <WorkoutItem key={workout.id} workout={workout} />;
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <FloatingActionButton>
        <WorkoutForm />
      </FloatingActionButton>
    </PageContainer>
  );
};

export default Workouts;
