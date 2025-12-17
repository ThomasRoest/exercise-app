import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconWorkout } from "@/components/icons/IconWorkout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { getWorkoutCount } from "@/data/workouts";
import { Suspense } from "react";
import { WorkoutsFilter } from "./components/WorkoutsFilter";
import { WorkoutsList } from "./components/WorkoutsList";
import { WorkoutForm } from "./new/WorkoutForm";

const currentYear = new Date().getFullYear();

const Workouts = async ({
  searchParams,
}: {
  searchParams: Promise<{ year: string }>;
}) => {
  const params = await searchParams;

  const years = await Promise.all([
    getWorkoutCount({ year: currentYear }).then((count) => {
      return {
        id: currentYear,
        defaultActive: true,
        count: count,
      };
    }),
    getWorkoutCount({ year: currentYear - 1 }).then((count) => {
      return {
        id: currentYear - 1,
        defaultActive: false,
        count: count,
      };
    }),
    getWorkoutCount({ year: currentYear - 2 }).then((count) => {
      return {
        id: currentYear - 2,
        defaultActive: false,
        count: count,
      };
    }),
  ]);

  return (
    <PageContainer>
      <PageHeader>
        <IconWorkout />
        <h1 className="font-bold dark:text-gray-200">Workouts</h1>
      </PageHeader>
      <WorkoutsFilter years={years} params={params} />
      <Suspense fallback={<LoadingSpinner />}>
        <WorkoutsList year={params.year ?? currentYear} />
      </Suspense>
      <FloatingActionButton>
        <WorkoutForm />
      </FloatingActionButton>
    </PageContainer>
  );
};

export default Workouts;
