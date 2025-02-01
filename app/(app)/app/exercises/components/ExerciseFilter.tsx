"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { ToggleOption } from "../../sets/components/ToggleFilter";

const options: ToggleOption<"date" | "weight">[] = [
  {
    label: "Date",
    value: "date",
  },
  {
    label: "Weight",
    value: "weight",
  },
];

export const ExerciseFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticOrderBy, setOptimisticOrderBy] = useOptimistic(
    searchParams.get("sort_by")
  );

  const inactiveClass = "bg-white";
  const activeClass = "bg-gray-500 text-white";

  const handleToggle = (value: "date" | "weight") => {
    const params = new URLSearchParams(searchParams);
    params.delete("sort_by");
    params.append("sort_by", value);
    startTransition(() => {
      setOptimisticOrderBy(value);
      router.push(`?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  return (
    <div className="flex gap-2 mb-2 flex-wrap items-center">
      <p className="text-sm font-bold">Sort by</p>
      {options.map((option) => {
        const isActive = option.value === optimisticOrderBy;
        return (
          <Link
            href={`?sort_by=${isActive ? "" : option.value}`}
            key={option.value}
            className={cn(
              isActive ? activeClass : inactiveClass,
              "w-fit rounded border border-primary px-2 py-1 text-sm"
            )}
            onClick={(e) => {
              e.preventDefault();
              handleToggle(option.value);
            }}
          >
            {option.label}
          </Link>
        );
      })}
      {isPending && <Loader2 className="animate-spin" />}
    </div>
  );
};
