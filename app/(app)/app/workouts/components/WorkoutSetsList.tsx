import { ListItem } from "@/components/ListItem";
import { SetActions } from "./SetActions";
import { capitalize } from "@/lib/utils";
import { Set } from "@prisma/client";
import Link from "next/link";

export const WorkoutSetsList = ({ entries }: { entries: Set[] }) => {
  const groups: { id: string; exerciseId: string | null; entries: Set[] }[] = [];
  for (const item of entries) {
    const group = groups.find((group) => group.id === item.exerciseTitle);
    if (group) {
      group.entries.push(item);
    } else {
      if (item.exerciseTitle) {
        groups.push({ id: item.exerciseTitle, exerciseId: item.exerciseId, entries: [item] });
      }
    }
  }

  if (groups.length === 0) {
    return <p className="text-sm text-slate-500 text-center">no sets</p>;
  }

  return groups.map((group) => {
    return (
      <div key={group.id} className="">
        <h3 className="mb-2 font-semibold dark:text-gray-200">
          <Link href={`/app/exercises/${group.exerciseId}`} className="active:text-blue-600">{capitalize(group.id)} </Link>
          <span className="text-sm text-slate-500 tracking-widest font-normal">
            ({group.entries.length})
          </span>
        </h3>
        <ul className="space-y-1">
          {group.entries.map((entry) => {
            return (
              <ListItem key={entry.id}>
                <span className="text-sm">{`${entry.reps} x ${entry.weight} kg`}</span>
                <SetActions set={entry} />
              </ListItem>
            );
          })}
        </ul>
      </div>
    );
  });
};
