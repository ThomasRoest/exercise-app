import { IconExercise } from "@/components/icons/IconExercise";
import { IconMeals } from "@/components/icons/IconMeals";
import { IconNotes } from "@/components/icons/IconNotes";
import { IconSets } from "@/components/icons/IconSets";
import { IconWorkout } from "@/components/icons/IconWorkout";
import Link from "next/link";
import { ReactNode, PropsWithChildren } from "react";

const LinkComponent = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="border h-52 flex-1 flex items-center justify-center hover:bg-slate-100 active:bg-slate-200 rounded gap-2 font-bold"
    >
      {children}
    </Link>
  );
};

const Card = (props: PropsWithChildren) => {
  return (
    <div className="bg-white flex-auto basis-1/5 rounded">{props.children}</div>
  );
};

const cards = [
  { href: "/app/workouts", label: "Workouts", icon: <IconWorkout /> },
  { href: "/app/notes", label: "Notes", icon: <IconNotes /> },
  { href: "/app/sets", label: "Sets", icon: <IconSets /> },
  { href: "/app/meals", label: "Meals", icon: <IconMeals /> },
  { href: "/app/exercises", label: "Exercises", icon: <IconExercise /> },
];

const AppPage = async () => {
  return (
    <div className="flex mx-auto flex-col md:flex-row gap-2 flex-wrap max-w-[1000px] ">
      {cards.map((card) => {
        return (
          <Card key={card.href}>
            <LinkComponent href={card.href}>
              {card.icon}
              {card.label}
            </LinkComponent>
          </Card>
        );
      })}
    </div>
  );
};

export default AppPage;
