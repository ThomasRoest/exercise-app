"use client";
import { updateWorkout } from "@/actions/workouts/update";
import { Form } from "@/components/Form";
import { FormHeader } from "@/components/FormHeader";
import { InputGroup } from "@/components/InputGroup";
import { SubmitButton } from "@/components/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/useToast";
import { useRef } from "react";

export const WorkoutNoteForm = ({
  onSuccess,
  workoutId,
  note,
}: {
  onSuccess?: () => void;
  workoutId: string;
  note: string | null;
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const toast = useToast();
  return (
    <Form
      formRef={formRef}
      action={async (formData) => {
        const result = await updateWorkout({
          workoutId: workoutId,
          note: formData.get("note"),
        });
        if (!result.success) {
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        formRef.current?.reset();
        if (onSuccess) {
          onSuccess();
        }
      }}
    >
      <FormHeader>Workout Note</FormHeader>
      <InputGroup>
        <Textarea
          placeholder="Add note."
          id="note"
          name="note"
          defaultValue={note ?? void 0}
          required
        />
      </InputGroup>
      <SubmitButton>Submit</SubmitButton>
    </Form>
  );
};
