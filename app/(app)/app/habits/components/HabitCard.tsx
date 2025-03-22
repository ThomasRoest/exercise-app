import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Habit } from "@prisma/client";
import { DeleteHabit } from "./DeleteHabit";
import { HabitCalendar } from "./HabitCalendar";
import { getUserHabitEntries } from "@/data/habits";

export const HabitCard = async ({ habit }: { habit: Habit }) => {
  const entries = await getUserHabitEntries();
  return (
    <Card className="bg-white shadow rounded-lg max-w-[500px] dark:bg-gray-800">
      <CardHeader className="rounded-t-lg border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <CardTitle className="text-lg font-bold">{habit.title}</CardTitle>
            <div className="text-sm font-semibold text-gray-500">4/31</div>
          </div>
          <DeleteHabit habit={habit} />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <HabitCalendar habit={habit} entries={entries} />
      </CardContent>
    </Card>
  );
};
