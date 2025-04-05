"use client";
import { createNote } from "@/actions/notes/create";
import { Form } from "@/components/Form";
import { FormHeader } from "@/components/FormHeader";
import { InputGroup } from "@/components/InputGroup";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toastOptions } from "@/lib/utils";
import { useRef } from "react";
import toast from "react-hot-toast";

export const NewNoteForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <Form
      formRef={formRef}
      action={async (formData) => {
        const result = await createNote({
          title: formData.get("title"),
          description: formData.get("description"),
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
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Add title..."
          required
          className="dark:bg-gray-700 dark:text-gray-200"
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="description">Description</Label>
        <Textarea
          placeholder="Add description."
          id="description"
          name="description"
          required
          className="dark:bg-gray-700 dark:text-gray-200"
        />
      </InputGroup>
      <SubmitButton>Create</SubmitButton>
    </Form>
  );
};
