import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconWorkout } from "@/components/icons/IconWorkout";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import { WorkoutForm } from "./new/WorkoutForm";
import { WorkoutsList } from "./components/WorkoutsList";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const currentYear = new Date().getFullYear();

const Workouts = async ({
  searchParams,
}: {
  searchParams: Promise<{ year: string }>;
}) => {
  const params = await searchParams;

  const years = [
    { id: currentYear, defaultActive: true },
    { id: currentYear - 1, defaultActive: false },
    { id: currentYear - 2, defaultActive: false },
  ];

  return (
    <PageContainer>
      <PageHeader>
        <IconWorkout />
        <h1 className="font-bold dark:text-gray-200">Workouts</h1>
      </PageHeader>
      <div className="mb-2">
        {years.map((year) => {
          let variant: ButtonProps["variant"] = "outline";
          if (!params.year) {
            variant = year.defaultActive ? "default" : "outline";
          } else {
            variant =
              year.id.toString() === params.year ? "default" : "outline";
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
                {year.id}
              </Link>
            </Button>
          );
        })}
      </div>
      <Suspense
        fallback={<LoadingSpinner />}>
        <WorkoutsList year={params.year ?? currentYear} />
      </Suspense>
      <FloatingActionButton>
        <WorkoutForm />
      </FloatingActionButton>
    </PageContainer>
  );
};

export default Workouts;
