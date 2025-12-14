import { IconWeight } from "@/components/icons/IconWeight";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { AddWeightEntryForm } from "./components/AddWeightEntryForm";
import { DeleteWeightEntry } from "./components/DeleteWeightEntry";
import { getUserWeightEntries } from "@/data/weightentries";
import { dateFormatter } from "@/lib/utils";

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
        <div className="mb-4">
        <AddWeightEntryForm />
        </div>
        <ul className="space-y-2">
          {weightEntries.map((weightEntry) => {
            return (
              <li key={weightEntry.id} className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className=" text-gray-800 dark:text-gray-200">
                      {String(weightEntry.weight)} {weightEntry.unit}
                    </span>
                    {weightEntry.note && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {weightEntry.note}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 dark:text-gray-500">
                      {dateFormatter.format(weightEntry.createdAt)}
                    </span>
                    <DeleteWeightEntry weightEntry={{ id: weightEntry.id, userId: weightEntry.userId }} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </PageContainer>
  );
};

export default Page;
