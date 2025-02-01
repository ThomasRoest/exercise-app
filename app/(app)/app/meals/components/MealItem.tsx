import { ListItem } from "@/components/ListItem";
import { Meal } from "@prisma/client";
import { ReactElement } from "react";
import { DeleteMeal } from "./DeleteMeal";

export const MealItem = ({ meal }: { meal: Meal }): ReactElement<any> => {
  return (
    <ListItem>
      <div className="flex-1">
        <h3 className="text-sm">{meal.title}</h3>
        <span className="text-xs text-slate-400 ">{meal.description}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs">
          {meal.createdAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <DeleteMeal meal={meal} />
      </div>
    </ListItem>
  );
};
