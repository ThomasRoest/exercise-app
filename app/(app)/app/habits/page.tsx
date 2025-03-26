import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconHabits } from "@/components/icons/IconHabits";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { getUserHabits } from "@/data/habits";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
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
        <ul className="space-y-2">
          {habits?.map((habit) => {
            return (
              <li key={habit.id}>
                <Link
                  href={`/app/habits/${habit.slug}`}
                  className="block w-full p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 font-medium">{habit.title}</span>
                    <ChevronRight className="text-gray-400" /> 
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <FloatingActionButton>
        <HabitForm />
      </FloatingActionButton>
    </PageContainer>
  );
};

export default HabitsPage;
