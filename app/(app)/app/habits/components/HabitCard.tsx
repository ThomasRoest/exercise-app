"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "./Calendar";

export const HabitCard = () => {
  return (
    <Card className="bg-white shadow rounded-lg max-w-[500px]">
      <CardHeader className="rounded-t-lg border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Walk</CardTitle>
          <div className="text-sm font-semibold text-gray-500">4/31</div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <Calendar />
      </CardContent>
    </Card>
  );
};
