"use client";
import { createWeightEntry } from "@/actions/weightentries/create";
import { Form } from "@/components/Form";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { useToast } from "@/lib/useToast";
import { PlusCircle } from "lucide-react";
import { useRef } from "react";

export const AddWeightEntryForm = () => {
  const ref = useRef<HTMLFormElement | null>(null);
  const toast = useToast();

  return (
    <div className="shadow-md rounded-lg p-1 bg-white">
      <Form
        formRef={ref}
        action={async (formData): Promise<void> => {
          const data = {
            weight: parseFloat(formData.get("weight") as string),
          };
          const result = await createWeightEntry(data);
          if (result.success) {
            toast.success(result.message);
          } else {
            toast.error(result.message);
          }
        }}
      >
        <div className="flex items-center gap-2">
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
          <SubmitButton>
            <PlusCircle className="h-4 w-4 mr-2" />
            add
          </SubmitButton>
        </div>
      </Form>
    </div>
  );
};
