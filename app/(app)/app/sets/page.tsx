import { IconSets } from "@/components/icons/IconSets";
import { ListItem } from "@/components/ListItem";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { Pagination } from "@/components/Pagination";
import { getUserExercises } from "@/data/exercises";
import { getTotalSetsCount, getUserSets } from "@/data/sets";
import { Set } from "@prisma/client";
import { z } from "zod";
import { ExerciseItem } from "./components/ExerciseItem";
import { SetFilters } from "./components/SetFilters";

const PAGE_SIZE = 10;

const exerciseSchema = z.union([z.string(), z.array(z.string())]).optional();

const setsParamsSchema = z.object({
  exercise: exerciseSchema,
  page: z.coerce.number().gte(0).optional(),
});

export type SetsParams = z.infer<typeof setsParamsSchema>;

const SetsPage = async (props: { searchParams: Promise<unknown> }) => {
  const searchParams = await props.searchParams;
  const validatedParams = setsParamsSchema.safeParse(searchParams);
  const currentPage = validatedParams.data?.page || 1;

  let exercisesFilter = null;
  const exerciseData = validatedParams.data?.exercise;
  if (exerciseData) {
    if (typeof exerciseData === "string") {
      exercisesFilter = [exerciseData];
    } else {
      exercisesFilter = exerciseData;
    }
  }

  const [exercises, sets, totalCount] = await Promise.all([
    getUserExercises(),
    getUserSets(currentPage, { exercises: exercisesFilter }),
    getTotalSetsCount({ exercises: exercisesFilter }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  if (exercises === null || sets === null) {
    return <>Unavailable</>;
  }

  return (
    <PageContainer>
      <PageHeader>
        <IconSets />
        <h1 className="font-bold">{`All sets (${totalCount})`}</h1>
      </PageHeader>
      <SetFilters exercises={exercises} />
      <ul className="space-y-2">
        {sets.map((set: Set) => {
          return (
            <ListItem key={set.id}>
              <ExerciseItem
                name={set.exerciseTitle}
                weight={set.weight}
                reps={set.reps}
                createdAt={set.createdAt}
              />
            </ListItem>
          );
        })}
      </ul>
      <Pagination totalPages={totalPages} />
    </PageContainer>
  );
};
export default SetsPage;
