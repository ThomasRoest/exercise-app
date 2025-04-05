import { FloatingActionButton } from "@/components/FloatingActionButton";
import { PageContainer } from "@/components/PageContainer";
import { PageHeader } from "@/components/PageHeader";
import { getUserExercises } from "@/data/exercises";
import { getUserWorkoutById } from "@/data/workouts";
import { formatDate } from "@/lib/utils";
import { CreateNoteButton } from "../components/CreateNoteButton";
import { DeleteWorkout } from "../components/DeleteWorkout";
import { WorkoutSetForm } from "../components/WorkoutSetForm";
import { WorkoutSetsList } from "../components/WorkoutSetsList";
import { MessageSquareText } from "lucide-react";
import { DeleteWorkoutNote } from "../components/DeleteWorkoutNote";

const WorkoutPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  const [workout, exercises] = await Promise.all([
    getUserWorkoutById(params.id),
    getUserExercises(),
  ]);

  if (workout === null || exercises === null) {
    return <>unavailable</>;
  }

  return (
    <PageContainer>
      <PageHeader className="justify-between gap-1">
        <div className="basis-[40px]" />
        <div className="text-center flex items-center gap-x-1">
          <h1 className="font-bold tracking-wider text-blue-800 dark:text-gray-400">
            {formatDate(workout.createdAt)}
          </h1>
          <CreateNoteButton workoutId={workout.id} note={workout.note} />
        </div>
        <div className="text-right basis-[40px]">
          <DeleteWorkout workout={workout} />
        </div>
      </PageHeader>
      {workout.note && (
        <>
          <div className="p-3 mb-4 rounded-lg bg-gray-50 flex  items-center justify-between">
            <div className="flex items-center gap-x-3">
              <MessageSquareText className="text-slate-500 w-5 h-5" />
              <p className="text-sm text-gray-700">{workout.note}</p>
            </div>
            <DeleteWorkoutNote workout={workout} />
          </div>
        </>
      )}
      <div className="flex flex-col gap-5">
        <WorkoutSetsList entries={workout.sets} />
      </div>
      <FloatingActionButton>
        <WorkoutSetForm workoutId={workout.id} exercises={exercises} />
      </FloatingActionButton>
    </PageContainer>
  );
};

export default WorkoutPage;
