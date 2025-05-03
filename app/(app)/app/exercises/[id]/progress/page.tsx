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
      className="bg-white p-3 rounded flex items-center gap-x-4 dark:bg-gray-800 dark:text-gray-300"
    >
      <div>
        {exerciseTitle} {reps ?? 0} x
        <span className="font-bold ml-1">{weight ?? 0}</span>
      </div>
      {createdAt.getFullYear()}
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
