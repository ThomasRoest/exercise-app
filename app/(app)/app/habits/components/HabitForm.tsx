"use client";
import { createHabit } from "@/actions/habits/create";
import { Form } from "@/components/Form";
import { FormHeader } from "@/components/FormHeader";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toastOptions } from "@/lib/utils";
import toast from "react-hot-toast";

export const HabitForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  return (
    <>
      <Form
        action={async (formData) => {
          const result = await createHabit({ title: formData.get("title") });
          if (!result.success) {
            toast.error(result.message, toastOptions);
            return;
          }
          toast.success(result.message, toastOptions);
          if (onSuccess) {
            onSuccess();
          }
        }}
      >
        <FormHeader>Add habit</FormHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="Add title..." />
        </div>
        <SubmitButton>Create</SubmitButton>
      </Form>
    </>
  );
};
