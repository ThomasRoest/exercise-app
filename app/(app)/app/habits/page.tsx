import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconHabits } from "@/components/icons/IconHabits";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { getUserHabits } from "@/data/habits";
import { HabitForm } from "./components/HabitForm";
import { HabitListItem } from "./components/HabitListItem";

const HabitsPage = async () => {
  const habits = await getUserHabits();
  return (
    <PageContainer>
      <PageHeader className="flex justify-between items-center">
        <div className="flex gap-x-2">
          <IconHabits />
          <h1 className="font-bold dark:text-gray-200">Habits</h1>
        </div>
      </PageHeader>
      <div className="flex flex-col gap-y-2">
        <ul className="space-y-2">
          {habits?.map((habit) => (
            <HabitListItem key={habit.id} habit={habit} />
          ))}
        </ul>
      </div>
      <FloatingActionButton>
        <HabitForm />
      </FloatingActionButton>
    </PageContainer>
  );
};

export default HabitsPage;
