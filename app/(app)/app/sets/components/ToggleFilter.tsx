"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export interface ToggleOption<T extends string = string> {
  label: string;
  value: T;
}
interface Props {
  options: ToggleOption[];
  selectedValues: string[];
  toggleKey: string;
  onToggle: (options: string[]) => void;
}

export const ToggleFilter = ({
  options,
  selectedValues,
  toggleKey,
  onToggle,
}: Props) => {
  const inactiveClass = "bg-white"
  const activeClass = "bg-gray-500 text-white"

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = selectedValues.includes(option.value.toString());
        return (
          <Link
            href={`?${toggleKey}=${isActive ? "" : option.value}`}
            key={option.value}
            className={cn(
              isActive ? activeClass : inactiveClass,
              "w-fit rounded border border-primary px-2 py-1 text-sm"
            )}
            onClick={(e) => {
              e.preventDefault();
              if (isActive) {
                onToggle(
                  selectedValues.filter((selectedValue) => {
                    return selectedValue !== option.value;
                  })
                );
              } else {
                onToggle([...selectedValues, option.value]);
              }
            }}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
};
