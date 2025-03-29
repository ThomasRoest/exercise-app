import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { Pagination } from "@/components/Pagination";
import { getExerciseById } from "@/data/exercises";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { z } from "zod";
import { DeleteExercise } from "../components/DeleteExercise";
import { WrappedLink } from "./progress/WrappedLink";

const PAGE_SIZE = 10;

const paramsSchema = z.object({
  id: z.string().optional(),
});

const searchParamsSchema = z.object({
  page: z.coerce.number().gte(0).optional(),
});

const Page = async (props: {
  params: Promise<unknown>;
  searchParams: Promise<unknown>;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const validatedParams = paramsSchema.safeParse(params);
  const validatedSearchParams = searchParamsSchema.safeParse(searchParams);

  const currentPage = validatedSearchParams.data?.page || 1;

  if (!validatedParams.data?.id) {
    return notFound();
  }

  const exercise = await getExerciseById(validatedParams.data.id, currentPage);

  if (!exercise) {
    return notFound();
  }

  const totalPages = Math.ceil(exercise._count.sets / PAGE_SIZE);

  return (
    <PageContainer>
      <PageHeader className="justify-between gap-1">
        <WrappedLink />
        <h1 className="font-bold tracking-wider text-blue-800">
          {exercise.title} ({exercise._count.sets})
        </h1>
        <DeleteExercise exercise={exercise} />
      </PageHeader>
      <ul className="flex flex-col gap-2">
        {exercise.sets.length > 0 ? (
          exercise.sets.map((set) => {
            return (
              <li
                key={set.id}
                className="bg-white p-4 rounded-md shadow-sm flex justify-between dark:bg-gray-800 dark:text-gray-300"
              >
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  {formatDate(set.createdAt)} - {set.exerciseTitle}
                </span>
                <span className="text-sm">
                  {set.reps} x {set.weight}
                </span>
              </li>
            );
          })
        ) : (
          <p className="mt-10 text-gray-500 text-sm text-center">
            No {exercise.title.toLocaleLowerCase()} sets
          </p>
        )}
      </ul>
      <Pagination totalPages={totalPages} />
    </PageContainer>
  );
};

export default Page;
