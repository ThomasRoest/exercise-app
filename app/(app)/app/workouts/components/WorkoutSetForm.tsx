"use client";
import { createSet } from "@/actions/sets/create";
import { Form } from "@/components/Form";
import { InputGroup } from "@/components/InputGroup";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toastOptions } from "@/lib/utils";
import { Exercise } from "@prisma/client";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { ExerciseSelect } from "./ExerciseSelect";
import { FormHeader } from "@/components/FormHeader";

const getInitialState = (exercises: Exercise[]): Exercise | null => {
  try {
    const storedId = sessionStorage.getItem("exercise_id");
    if (storedId) {
      const exercise = exercises.find((exercise) => exercise.id === storedId);
      if (exercise) {
        return exercise;
      }
    }
  } catch (error) {
    return null;
  }
  if (exercises.length > 0) {
    return exercises[0];
  }
  return null;
};
interface Props {
  workoutId: string;
  exercises: Exercise[];
  onSuccess?: () => void;
}

export const WorkoutSetForm = ({ workoutId, exercises, onSuccess }: Props) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    () => {
      return getInitialState(exercises);
    }
  );

  return (
    <Form
      formRef={formRef}
      className="pb-14 gap-5"
      action={async (formData) => {
        const data = {
          exerciseTitle: formData.get("exerciseTitle"),
          exerciseId: formData.get("exerciseId"),
          reps: formData.get("reps"),
          weight: formData.get("weight"),
          workoutId: formData.get("workoutId"),
        };
        const result = await createSet(data);
        if (!result.success) {
          toast.error(result.message, toastOptions);
          return;
        }
        toast.success(result.message, toastOptions);
        formRef.current?.reset()
        if (onSuccess) {
          onSuccess();
        }
      }}
    >
      <FormHeader>Add set</FormHeader>
      <InputGroup>
        <Label htmlFor="exercise">Exercise</Label>
        <ExerciseSelect
          options={exercises}
          selectedExercise={selectedExercise}
          setSelectedExercise={setSelectedExercise}
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="reps">Reps</Label>
        <Input
          id="reps"
          name="reps"
          placeholder="Add reps..."
          type="number"
          defaultValue={5}
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="weight">Weight</Label>
        <Input
          id="weight"
          name="weight"
          placeholder="Add weight..."
          type="number"
        />
      </InputGroup>
      <Input
        type="hidden"
        id="workoutId"
        name="workoutId"
        defaultValue={workoutId}
      />
      <Input
        type="hidden"
        id="exerciseTitle"
        name="exerciseTitle"
        defaultValue={selectedExercise?.title}
      />
      <SubmitButton>Create</SubmitButton>
    </Form>
  );
};
