import { IconExercise } from "./icons/IconExercise";
import { IconHabits } from "./icons/IconHabits";
import { IconHome } from "./icons/IconHome";
import { IconWorkout } from "./icons/IconWorkout";
import { MenuBarLink } from "./MenuBarLink";

const Label = ({ text }: { text: string }) => {
  return <span className="text-xs mt-1 text-gray-600 dark:text-gray-500">{text}</span>;
};

const links = [
  {
    path: "/app",
    label: "Home",
    icon: <IconHome />,
  },
  { path: "/app/habits", label: "Habits", icon: <IconHabits /> },
  {
    path: "/app/exercises",
    label: "Exercises",
    icon: <IconExercise />,
  },
  { path: "/app/workouts", label: "Workouts", icon: <IconWorkout /> },
];

export const MenuBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex justify-between">
        {links.map((link) => {
          return (
            <MenuBarLink key={link.path} href={link.path} icon={link.icon}>
              <Label text={link.label} />
            </MenuBarLink>
          );
        })}
      </div>
    </nav>
  );
};
