import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconHabits } from "@/components/icons/IconHabits";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { getUserHabits } from "@/data/habits";
import { HabitCard } from "./components/HabitCard";
import { HabitForm } from "./components/HabitForm";

const HabitsPage = async () => {
  const habits = await getUserHabits();
  return (
    <PageContainer>
      <PageHeader className="flex justify-between items-center">
        <div className="flex gap-x-2">
          <IconHabits />
          <h1 className="font-bold">Habits</h1>
        </div>
      </PageHeader>
      <div className="flex flex-col gap-y-2">
        {habits?.map((habit) => {
          return <HabitCard key={habit.id} habit={habit} />;
        })}
      </div>
      <FloatingActionButton>
        <HabitForm />
      </FloatingActionButton>
    </PageContainer>
  );
};

export default HabitsPage;
