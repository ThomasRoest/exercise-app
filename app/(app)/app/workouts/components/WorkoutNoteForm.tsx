"use client";
import { updateWorkout } from "@/actions/workouts/update";
import { Form } from "@/components/Form";
import { FormHeader } from "@/components/FormHeader";
import { InputGroup } from "@/components/InputGroup";
import { SubmitButton } from "@/components/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { toastOptions } from "@/lib/utils";
import { useRef } from "react";
import toast from "react-hot-toast";

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
  return (
    <Form
      formRef={formRef}
      action={async (formData) => {
        const result = await updateWorkout({
          workoutId: workoutId,
          note: formData.get("note"),
        });
        if (!result.success) {
          toast.error(result.message, toastOptions);
          return;
        }
        toast.success(result.message, toastOptions);
        formRef.current?.reset();
        if (onSuccess) {
          onSuccess();
        }
      }}
    >
      <FormHeader>Add note</FormHeader>
      <InputGroup>
        <Textarea
          placeholder="Add note."
          id="note"
          name="note"
          defaultValue={note ?? void 0}
          required
        />
      </InputGroup>
      <SubmitButton>Create</SubmitButton>
    </Form>
  );
};
