"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "./Calendar";

export const HabitCard = () => {
  return (
    <Card className="bg-white shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          {/* <CardTitle className="text-xl font-bold">Walk</CardTitle> */}
          {/* <div className="text-xl font-semibold">2025</div> */}
        </div>
        {/* <div className="mt-2 text-sm text-gray-600">Current Streak: 1 days</div> */}
      </CardHeader>
      <CardContent>
        <Calendar />
      </CardContent>
    </Card>
  );
};

