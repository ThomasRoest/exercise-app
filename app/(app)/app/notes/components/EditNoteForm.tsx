"use client";
import { updateNote } from "@/actions/notes/update";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toastOptions } from "@/lib/utils";
import { Program } from "@prisma/client";
import { Loader2, Save, X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

export const EditNoteForm = ({ note }: { note: Program }) => {
  const initial = note;
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState<string | null>(
    note.description
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);

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
      toast.error(result.message, toastOptions);

      setIsPending(false);
      return;
    }
    toast.success(result.message, toastOptions);
    setIsEditing(false);
    setIsPending(false);
  };

  return (
    <form className="flex flex-col gap-y-4 p-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="title" className="font-bold">
          Title
        </Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <Label htmlFor="description" className="font-bold">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          className="min-h-[300px]"
          value={description ?? ""}
          onChange={handleDescriptionChange}
        />
      </div>
      {isEditing && (
        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={handleCancel} type="button">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button>
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
