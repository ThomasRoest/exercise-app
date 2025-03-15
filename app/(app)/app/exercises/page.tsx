import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconExercise } from "@/components/icons/IconExercise";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { getUserExercises } from "@/data/exercises";
import Link from "next/link";
import { ExerciseForm } from "./new/ExerciseForm";

const Exercises = async () => {
  const exercises = await getUserExercises();
  if (exercises === null) {
    return <>Unavailable</>;
  }

  return (
    <PageContainer>
      <PageHeader>
        <IconExercise />
        <h1 className="font-bold dark:text-gray-200">Exercises</h1>
      </PageHeader>
      <ul className="space-y-2">
        {exercises.length === 0 && (
          <p className="text-sm text-center text-gray-500">No exercises</p>
        )}
        {exercises.map((exercise) => {
          return (
            <li key={exercise.id}>
              <Link
                href={`/app/exercises/${exercise.id}`}
                className="bg-white text-sm inline-block w-full h-full p-4 rounded-md shadow-sm active:bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
              >
                {exercise.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <FloatingActionButton>
        <ExerciseForm />
      </FloatingActionButton>
    </PageContainer>
  );
};

export default Exercises;
