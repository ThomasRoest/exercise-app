import { CircleDot, Dumbbell, Footprints } from "lucide-react";

export const workoutTypes = [
  {
    label: "Gym",
    value: "Gym",
    icon: <Dumbbell className="w-5 h-5" />,
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
    hover: "hover:bg-blue-100",
  },
  {
    label: "Skate",
    value: "Skate",
    icon: <CircleDot className="w-5 h-5" />,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
    hover: "hover:bg-emerald-100",
  },
  {
    label: "Walk",
    value: "Walk",
    icon: <Footprints className="w-5 h-5" />,
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-200",
    hover: "hover:bg-orange-100",
  },
] as const;
