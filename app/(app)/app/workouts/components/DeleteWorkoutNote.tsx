import { deleteWorkoutNote } from "@/actions/workouts/deleteWorkoutNote";
import { Workout } from "@prisma/client";
import { DeleteButton } from "./DeleteButton";

export const DeleteWorkoutNote = ({ workout }: { workout: Workout }) => {
  const deleteWithId = deleteWorkoutNote.bind(null, workout.id);
  return (
    <form action={deleteWithId}>
      <DeleteButton />
    </form>
  );
};
