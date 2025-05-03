import { PageContainer } from "@/components/PageContainer";
import { getSets } from "@/data/sets";
import { Filters } from "./filters";
import { z } from "zod";
import { Prisma } from "@prisma/client";

interface SetListItemProps {
  exerciseTitle: string | null;
  reps: number | null;
  weight: number | null;
  createdAt: Date;
}

const SetListItem = ({
  exerciseTitle,
  reps,
  weight,
  createdAt,
}: SetListItemProps) => {
  return (
    <li
      className="bg-white p-3 rounded-md border border-gray-50 flex justify-between items-center hover:bg-gray-50 transition-all duration-200 dark:bg-gray-800/90 dark:text-gray-200 dark:border-gray-800 dark:hover:bg-gray-800"
    >
      <div className="flex items-center gap-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md">
          <span className="font-medium text-blue-600 dark:text-blue-400">
            {exerciseTitle}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-500 dark:text-gray-400">{reps ?? 0}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">reps</span>
          <span className="text-gray-500 dark:text-gray-400 mx-0.5">×</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{weight ?? 0}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">kg</span>
        </div>
      </div>
      <div className="text-sm text-gray-400 dark:text-gray-500 bg-gray-50/70 dark:bg-gray-700/30 py-1 px-2 rounded">
        {createdAt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
      </div>
    </li>
  );
};

const filterSchema = z.object({
  filter: z
    .string()
    .regex(/^\d{4}$/, "Must be a 4-digit year")
    .optional(),
});

const ProgressPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ filter: string }>;
}) => {
  const { id } = await params;
  const sParams = await searchParams;

  const validated = filterSchema.safeParse(sParams);
  if (!validated.success) {
    throw new Error("invalid filter");
  }

  let whereFilter: Prisma.SetWhereInput = {
    AND: { exerciseId: id },
  };

  if (validated.data.filter) {
    const year = Number(validated.data.filter);
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);

    whereFilter = {
      AND: { exerciseId: id },
      createdAt: {
        gte: start,
        lte: end,
      },
    };
  }

  const sets = await getSets(whereFilter);

  return (
    <PageContainer>
      <Filters />
      <ul className="flex flex-col gap-2">
        {sets?.map((set) => (
          <SetListItem
            key={set.id}
            exerciseTitle={set.exerciseTitle}
            reps={set.reps}
            weight={set.weight}
            createdAt={set.createdAt}
          />
        ))}
      </ul>
    </PageContainer>
  );
};

export default ProgressPage;
