"use client";
import { createWorkout } from "@/actions/workouts/create";
import { Form } from "@/components/Form";
import { FormHeader } from "@/components/FormHeader";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/lib/useToast";
import { useState } from "react";

const workoutTypes = [
  { label: "Gym", value: "Gym" },
  { label: "Skate", value: "Skate" },
  { label: "Walk", value: "Walk" },
];

export const WorkoutForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [selectedOption, setSelectedOption] = useState<string>("Gym");
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const toast = useToast();
  
  return (
    <Form
      action={async (formData): Promise<void> => {
        const data = {
          description: formData.get("description"),
        };
        const result = await createWorkout(data);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
        if (onSuccess) {
          onSuccess();
        }
      }}
    >
      <FormHeader>Add workout</FormHeader>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description" className="dark:text-gray-300">
          Description
        </Label>
        {!showCustomInput ? (
          <Select
            value={selectedOption}
            onValueChange={(value) => {
              if (value === "custom") {
                setShowCustomInput(true);
              } else {
                setSelectedOption(value);
              }
            }}
          >
            <SelectTrigger
              id="description"
              className="dark:bg-gray-700 dark:text-gray-200"
            >
              <SelectValue placeholder="Select workout type..." />
            </SelectTrigger>
            <SelectContent>
              {workoutTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
              <SelectItem value="custom">Custom...</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <div className="flex gap-2">
            <Input
              autoFocus
              id="description"
              name="description"
              placeholder="Enter custom workout type..."
              className="dark:bg-gray-700 dark:text-gray-200 flex-grow"
            />
            <button
              type="button"
              className="px-3 py-2 bg-slate-200 dark:bg-slate-700 rounded-md text-sm"
              onClick={() => {
                setShowCustomInput(false);
                setSelectedOption("Gym");
              }}
            >
              Cancel
            </button>
          </div>
        )}
        {!showCustomInput && (
          <input type="hidden" name="description" value={selectedOption} />
        )}
      </div>
      <SubmitButton>Create</SubmitButton>
    </Form>
  );
};
