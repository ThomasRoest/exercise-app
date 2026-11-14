import { Feeling } from "@prisma/client";
import { Frown, LucideIcon, Meh, Smile } from "lucide-react";

interface FeelingOption {
  value: Feeling;
  label: string;
  Icon: LucideIcon;
  borderClassName: string;
  iconClassName: string;
  selectedClassName: string;
}

export const feelings: FeelingOption[] = [
  {
    value: Feeling.GOOD,
    label: "Good",
    Icon: Smile,
    borderClassName: "border-l-emerald-500",
    iconClassName: "text-emerald-600 dark:text-emerald-400",
    selectedClassName: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950",
  },
  {
    value: Feeling.OKAY,
    label: "Okay",
    Icon: Meh,
    borderClassName: "border-l-amber-500",
    iconClassName: "text-amber-600 dark:text-amber-400",
    selectedClassName: "border-amber-500 bg-amber-50 dark:bg-amber-950",
  },
  {
    value: Feeling.BAD,
    label: "Bad",
    Icon: Frown,
    borderClassName: "border-l-rose-500",
    iconClassName: "text-rose-600 dark:text-rose-400",
    selectedClassName: "border-rose-500 bg-rose-50 dark:bg-rose-950",
  },
];

export const getFeeling = (value: Feeling | null) => {
  return feelings.find((feeling) => feeling.value === value);
};
