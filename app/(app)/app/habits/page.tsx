import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconHabits } from "@/components/icons/IconHabits";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { getUserHabits } from "@/data/habits";
import { DeleteHabit } from "./components/DeleteHabit";
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
      <HabitCard />
      {habits?.map((habit) => {
        return (
          <div key={habit.id} className="flex items-center">
            {habit.title}
            <DeleteHabit habit={habit} />
          </div>
        );
      })}
      <FloatingActionButton>
        <HabitForm />
      </FloatingActionButton>
    </PageContainer>
  );
};

export default HabitsPage;
