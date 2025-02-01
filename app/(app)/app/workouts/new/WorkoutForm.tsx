"use client";
import { createWorkout } from "@/actions/workouts/create";
import { Form } from "@/components/Form";
import { FormHeader } from "@/components/FormHeader";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toastOptions } from "@/lib/utils";
import toast from "react-hot-toast";

export const WorkoutForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  return (
    <Form
      action={async (formData): Promise<void> => {
        const data = {
          description: formData.get("description"),
        };
        const result = await createWorkout(data);
        if (!result.success) {
          toast.error(result.message, toastOptions);
        }
        if (onSuccess) {
          onSuccess();
        }
      }}
    >
      <FormHeader>Add workout</FormHeader>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Add description..."
          defaultValue="Gym"
        />
      </div>
      <SubmitButton>Create</SubmitButton>
    </Form>
  );
};
