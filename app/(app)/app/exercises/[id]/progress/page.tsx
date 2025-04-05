import { PageContainer } from "@/components/PageContainer";
import { getSets } from "@/data/sets";
import { Filters } from "./filters";
import { z } from "zod";
import { Prisma } from "@prisma/client";

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
        {sets?.map((set) => {
          return (
            <li
              key={set.id}
              className=" bg-white p-3 rounded flex items-center gap-x-4 dark:bg-gray-800 dark:text-gray-300"
            >
              <div>
                {set.exerciseTitle} {set.reps} x
                <span className="font-bold ml-1">{set.weight}</span>
              </div>
              {set.createdAt.getFullYear()}
            </li>
          );
        })}
      </ul>
    </PageContainer>
  );
};

export default ProgressPage;
