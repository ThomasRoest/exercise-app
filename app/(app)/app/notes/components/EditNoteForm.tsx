"use client";
import { updateNote } from "@/actions/notes/update";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/useToast";
import { Program } from "@prisma/client";
import { Loader2, Save, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

export const EditNoteForm = ({ note }: { note: Program }) => {
  const initial = note;
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState<string | null>(
    note.description
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const toast = useToast();
  
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditing(true);
    setDescription(event.target.value);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDescription(initial.description);
    setTitle(initial.title);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsPending(true);
    const result = await updateNote({
      id: note.id,
      title,
      description,
      userId: note.userId,
    });
    if (!result.success) {
      toast.error(result.message);

      setIsPending(false);
      return;
    }
    toast.success(result.message);
    setIsEditing(false);
    setIsPending(false);
  };

  useEffect(() => {
    if (!textAreaRef.current) {
      return;
    }
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  return (
    <form
      className="flex flex-col gap-y-4 pt-8 pl-4 pr-4 pb-10 dark:bg-gray-800 rounded"
      onSubmit={handleSubmit}
    >
      <div>
        <Label htmlFor="title" className=" dark:text-gray-300 mb-1">
          Title
        </Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          className="dark:bg-gray-700 dark:text-gray-200"
        />
      </div>
      <div>
        <Label htmlFor="description" className=" dark:text-gray-300">
          Description
        </Label>
        <Textarea
          ref={textAreaRef}
          id="description"
          name="description"
          value={description ?? ""}
          onChange={handleDescriptionChange}
          className="dark:bg-gray-700 dark:text-gray-200"
        />
      </div>
      {isEditing && (
        <div className="flex gap-4 justify-end">
          <Button
            className="dark:bg-gray-700 dark:text-gray-300"
            variant="outline"
            onClick={handleCancel}
            type="button"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button className="dark:bg-indigo-600 dark:hover:bg-indigo-700">
            <Save className="w-4 h-4 mr-2" />
            {isPending ? (
              <Loader2 className="animate-spin ml-2 w-4 h-4" />
            ) : (
              <>Save</>
            )}
          </Button>
        </div>
      )}
    </form>
  );
};
