import { PageContainer } from "@/components/PageContainer";
import { getUserExercises } from "@/data/exercises";
import { WorkoutSetForm } from "../../../components/WorkoutSetForm";

const NewWorkoutEntryPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const exercises = await getUserExercises();
  if (exercises === null) {
    return <>Unavailable</>
  }
  return (
    <PageContainer>
      <WorkoutSetForm workoutId={params.id} exercises={exercises} />
    </PageContainer>
  );
};

export default NewWorkoutEntryPage;
