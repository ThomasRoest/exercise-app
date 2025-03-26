"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

interface CalendarProps {
  completeDate: (date: string) => void;
  completedDays: string[];
  removeDate: (date: string) => void;
}

export const Calendar = ({ completeDate, completedDays, removeDate }: CalendarProps) => {
  const today = startOfToday();
  // should be moved to url state?
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  const week = ["S", "M", "T", "W", "T", "F", "S"];

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const previousMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const reset = () => {
    setCurrentMonth(format(today, "MMM-yyyy"));
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <Button variant="outline" size="icon" onClick={previousMonth}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <div className="font-bold flex items-center gap-x-2">
          <Button variant="ghost" onClick={reset} className="font-bold">
            {format(firstDayCurrentMonth, "MMMM yyyy")}
          </Button>
        </div>
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 grid-rows-4 gap-4">
        {week.map((day, index) => {
          return (
            <div key={index} className="flex items-center justify-center">
              {day}
            </div>
          );
        })}
        {days.map((day) => {
          const formattedDate = format(day, 'yyyy-MM-dd');
          const isCompleted = completedDays.includes(formattedDate);
          return (
            <button
              key={day.toString()}
              onClick={() => {
                if (isCompleted) {
                  removeDate(formattedDate)
                } else {
                  completeDate(formattedDate);
                }
              }}
              className={cn(
                ` w-8 h-8 rounded-full text-sm ${colStartClasses[getDay(day)]}`,
                {
                  "border-2 border-blue-600": isToday(day),
                  "bg-gray-200 dark:bg-gray-700": isSameMonth(day, firstDayCurrentMonth),
                  "bg-green-500 text-white dark:bg-green-500": isCompleted,
                }
              )}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </button>
          );
        })}
      </div>
    </div>
  );
};
