import { IconMeals } from "@/components/icons/IconMeals";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { getDailyMeals } from "@/data/meals";
import { formatDate } from "@/lib/utils";
import { AddMealForm } from "./components/AddMealForm";
import { MealItem } from "./components/MealItem";

const Meals = async () => {
  const meals = await getDailyMeals();
  if (meals === null) {
    return <>Unavailable</>;
  }

  return (
    <PageContainer>
      <PageHeader>
        <IconMeals />
        <h1 className="font-bold flex gap-x-2 items-center">
          Meals
          <span className="text-xs font-normal">{formatDate(new Date())}</span>
        </h1>
      </PageHeader>
      <div>
        <ul className="space-y-2">
          {meals.map((meal) => {
            return <MealItem key={meal.id} meal={meal} />;
          })}
          <AddMealForm />
        </ul>
      </div>
    </PageContainer>
  );
};

export default Meals;
