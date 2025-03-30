import { formatDate } from "@/lib/utils";
import { Calendar, Repeat, Weight } from "lucide-react";

interface ExerciseItemProps {
  name: string | null;
  weight: number | null;
  reps: number | null;
  createdAt: Date;
}

const StatBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center bg-slate-300 text-slate-600 bg-opacity-30 rounded px-2 py-1 dark:text-gray-200">
      {children}
    </div>
  );
};

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
        <StatBadge>
          <Weight className="mr-1 h-4 w-4" />
          <span className="ml-1">{weight} kg</span>
        </StatBadge>
        <StatBadge>
          <Repeat className="mr-1 h-4 w-4" />
          <span className="ml-1">{reps}</span>
        </StatBadge>
        <StatBadge>
          <Calendar className="mr-1 h-4 w-4" />
          <span className="ml-1">{formatDate(createdAt)}</span>
        </StatBadge>
      </div>
    </div>
  );
};
