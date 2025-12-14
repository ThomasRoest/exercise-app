import { IconExercise } from "@/components/icons/IconExercise";
import { IconHabits } from "@/components/icons/IconHabits";
import { IconHome } from "@/components/icons/IconHome";
import { IconMeals } from "@/components/icons/IconMeals";
import { IconNotes } from "@/components/icons/IconNotes";
import { IconSets } from "@/components/icons/IconSets";
import { IconWeight } from "@/components/icons/IconWeight";
import { IconWorkout } from "@/components/icons/IconWorkout";

export const navLinks = [
  { href: "/", label: "Home", icon: <IconHome /> },
  { href: "/app/workouts", label: "Workouts", icon: <IconWorkout /> },
  { href: "/app/weight", label: "Weight", icon: <IconWeight /> },
  { href: "/app/notes", label: "Notes", icon: <IconNotes /> },
  { href: "/app/sets", label: "All sets", icon: <IconSets /> },
  { href: "/app/exercises", label: "Exercises", icon: <IconExercise /> },
  { href: "/app/meals", label: "Meals", icon: <IconMeals /> },
  { href: "/app/habits", label: "Habits", icon: <IconHabits /> },
];