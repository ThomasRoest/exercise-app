import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconWorkout } from "@/components/icons/IconWorkout";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import { WorkoutForm } from "./new/WorkoutForm";
import { WorkoutsList } from "./components/WorkoutsList";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
        fallback={
          <div className="space-x-4 bg-white p-4 rounded-md">
            <div className="space-y-2">
              <Skeleton className="h-10 w-[100%]" />
              <Skeleton className="h-10 w-[100%]" />
              <Skeleton className="h-10 w-[100%]" />
              <Skeleton className="h-10 w-[100%]" />
              <Skeleton className="h-10 w-[100%]" />
              <Skeleton className="h-10 w-[100%]" />
              <Skeleton className="h-10 w-[100%]" />
            </div>
          </div>
        }
      >
        <WorkoutsList searchParams={searchParams} />
      </Suspense>
      <FloatingActionButton>
        <WorkoutForm />
      </FloatingActionButton>
    </PageContainer>
  );
};

export default Workouts;
