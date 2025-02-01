import { formatDate } from "@/lib/utils";
import { Calendar, Repeat, Weight } from "lucide-react";
interface ExerciseItemProps {
  name: string | null;
  weight: number | null;
  reps: number | null;
  createdAt: Date;
}

export const ExerciseItem = ({
  name,
  weight,
  reps,
  createdAt,
}: ExerciseItemProps) => {

  return (
    <div>
      <div className="mb-2">
        <h3>{name}</h3>
      </div>
      <div className="flex items-center text-sm gap-2">
        <div className="flex items-center bg-slate-300 text-slate-600 bg-opacity-30 rounded px-2 py-1">
          <Weight className="mr-1 h-4 w-4" />
          <span className="ml-1">{weight} kg</span>
        </div>
        <div className="flex items-center bg-slate-300 text-slate-600 bg-opacity-30 rounded px-2 py-1">
          <Repeat className="mr-1 h-4 w-4" />
          <span className="ml-1">{reps}</span>
        </div>
        <div className="flex items-center bg-slate-300 text-slate-600 bg-opacity-30 rounded px-2 py-1">
          <Calendar className="mr-1 h-4 w-4" />
          <span className="ml-1">{formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
