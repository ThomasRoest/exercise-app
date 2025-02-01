"use client";
import { createMeal } from "@/actions/meals/create";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { toastOptions } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { useEffect, useRef, useActionState } from "react";
import toast from "react-hot-toast";

export const AddMealForm = () => {
  const ref = useRef<HTMLFormElement | null>(null);
  const [state, createAction] = useActionState(createMeal, {
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      toast.success("Added", toastOptions);
      if (ref.current) {
        ref.current.reset();
      }
    }
    if (state.error) {
      toast.error(state.error, toastOptions);
    }
  }, [state, state.error, state.success, state.timestamp]);

  return (
    <form action={createAction} ref={ref}>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Add new item"
          aria-label="New item name"
        />
        <SubmitButton>
          <PlusCircle className="h-4 w-4 mr-2" />
          add
        </SubmitButton>
      </div>
    </form>
  );
};
