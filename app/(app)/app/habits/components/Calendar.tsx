"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  startOfToday,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  add,
  getDay,
  isToday,
  isSameMonth,
  parse,
  format,
} from "date-fns";
import { Calendar1, ChevronLeft, ChevronRight } from "lucide-react";
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

export const Calendar = () => {
  const [completedDays, setCompletedDays] = useState<string[]>([]);
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

  const toggleCompleted = (day: Date) => {
    const dateString = day.toDateString();

    if (completedDays.includes(dateString)) {
      setCompletedDays((state) => {
        return state.filter((day) => day !== dateString);
      });
    } else {
      setCompletedDays((state) => {
        return [...state, day.toDateString()];
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center justify-center gap-x-2">
          <Button size="icon" variant="secondary" onClick={reset}>
            <Calendar1 />
          </Button>
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </div>
        <div className="flex gap-2">
          <Button size="icon" onClick={previousMonth} variant="secondary">
            <ChevronLeft />
          </Button>
          <Button size="icon" onClick={nextMonth} variant="secondary">
            <ChevronRight />
          </Button>
        </div>
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
          return (
            <button
              key={day.toString()}
              onClick={() => toggleCompleted(day)}
              className={cn(
                ` h-10 flex items-center justify-center border text-xs rounded-lg ${
                  colStartClasses[getDay(day)]
                }`,
                {
                  "border-2 border-blue-600": isToday(day),
                  "bg-gray-200 font-bold": isSameMonth(
                    day,
                    firstDayCurrentMonth
                  ),
                  "bg-green-500 text-white": completedDays.includes(
                    day.toDateString()
                  ),
                }
              )}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
                {/* {format(day, "EEEE, MMMM do, yyyy")} */}
              </time>
            </button>
          );
        })}
      </div>
    </div>
  );
};
