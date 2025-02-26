import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconHabits } from "@/components/icons/IconHabits";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { capitalize } from "@/lib/utils";
import { HabitForm } from "./components/HabitForm";
import { getUserHabits } from "@/data/habits";
import { DeleteHabit } from "./components/DeleteHabit";

const getMonthLabel = () => {
  const formatter = new Intl.DateTimeFormat("nl", {
    year: "numeric",
    month: "long",
  });
  const date = new Date();
  return formatter.format(date);
};

const HabitsPage = async () => {
  const habits = await getUserHabits();
  return (
    <PageContainer>
      <PageHeader className="flex justify-between items-center">
        <div className="flex gap-x-2">
          <IconHabits />
          <h1 className="font-bold">Habits</h1>
        </div>
        <h2 className="font-bold text-gray-500">
          {capitalize(getMonthLabel())}
        </h2>
      </PageHeader>
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
