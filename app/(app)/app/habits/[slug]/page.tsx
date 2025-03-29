import { IconHabits } from "@/components/icons/IconHabits";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserHabit } from "@/data/habits";
import { notFound } from "next/navigation";
import { DeleteHabit } from "../components/DeleteHabit";
import { HabitCalendar } from "../components/HabitCalendar";

const MyHabitPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const habit = await getUserHabit({ slug: slug });

  if (!habit) {
    return notFound();
  }

  return (
    <PageContainer>
      <PageHeader className="flex justify-between items-center">
        <div className="flex gap-x-2">
          <IconHabits />
          <h1 className="font-bold dark:text-gray-200">Habits</h1>
        </div>
      </PageHeader>
      <Card className="bg-white shadow rounded-lg dark:bg-gray-800">
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
          <HabitCalendar habit={habit} />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default MyHabitPage;
