"use client";
import { createWeightEntry } from "@/actions/weightentries/create";
import { Form } from "@/components/Form";
import { FormHeader } from "@/components/FormHeader";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { useToast } from "@/lib/useToast";
import { useRef } from "react";

export const AddWeightEntryForm = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const ref = useRef<HTMLFormElement | null>(null);
  const toast = useToast();

  return (
    <Form
      formRef={ref}
      action={async (formData): Promise<void> => {
        const data = {
          weight: parseFloat(formData.get("weight") as string),
        };
        const result = await createWeightEntry(data);
        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success(result.message);
        if (onSuccess) {
          onSuccess();
        }
      }}
    >
      <FormHeader>Add weight</FormHeader>
      <Input
        type="number"
        step="0.01"
        min="0"
        id="weight"
        name="weight"
        placeholder="Add weight"
        aria-label="Weight"
        className="dark:bg-gray-700 dark:text-gray-200"
      />
      <SubmitButton>Add</SubmitButton>
    </Form>
  );
};
