import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconWeight } from "@/components/icons/IconWeight";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { getUserWeightEntries } from "@/data/weightentries";
import { dateFormatter } from "@/lib/utils";
import { AddWeightEntryForm } from "./components/AddWeightEntryForm";
import { DeleteWeightEntry } from "./components/DeleteWeightEntry";

const Page = async () => {
  const weightEntries = await getUserWeightEntries();
  if (weightEntries === null) {
    return <>Unavailable</>;
  }
  return (
    <PageContainer>
      <PageHeader>
        <IconWeight />
        <h1 className="font-bold flex gap-x-2 items-center dark:text-gray-200">
          Weight
        </h1>
      </PageHeader>
      <div>
        <ul className="space-y-2">
          {weightEntries.map((weightEntry) => {
            return (
              <li
                key={weightEntry.id}
                className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex text-sm gap-x-1">
                    <span>{String(weightEntry.weight)} </span>
                    <span className="text-gray-400">{weightEntry.unit}</span>
                    {weightEntry.note && (
                      <span className="text-gray-500 dark:text-gray-400 mt-1">
                        {weightEntry.note}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 dark:text-gray-500">
                      {dateFormatter.format(weightEntry.createdAt)}
                    </span>
                    <DeleteWeightEntry
                      weightEntry={{
                        id: weightEntry.id,
                        userId: weightEntry.userId,
                      }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <FloatingActionButton>
        <AddWeightEntryForm />
      </FloatingActionButton>
    </PageContainer>
  );
};

export default Page;
