import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconWorkout } from "@/components/icons/IconWorkout";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { getUserWorkouts } from "@/data/workouts";
import { WorkoutItem } from "./components/WorkoutItem";
import { WorkoutForm } from "./new/WorkoutForm";

const Workouts = async () => {
  const workouts = await getUserWorkouts();
  if (!workouts) {
    return <>Unavailable</>;
  }

  return (
    <PageContainer>
      <PageHeader>
        <IconWorkout />
        <h1 className="font-bold dark:text-gray-200">Workouts</h1>
      </PageHeader>
      <ul className="space-y-2">
        {workouts.map((workout) => {
          return <WorkoutItem key={workout.id} workout={workout} />;
        })}
      </ul>
      <FloatingActionButton>
        <WorkoutForm />
      </FloatingActionButton>
    </PageContainer>
  );
};

export default Workouts;
