"use client"
import { deleteProgram } from "@/actions/notes/delete";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Program } from "@prisma/client";
import { Loader2, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button variant="destructive" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Deleting
        </>
      ) : (
        "Delete"
      )}
    </Button>
  );
};

const DeleteButtonForm = ({ note }: { note: Program }) => {
  return (
    <form action={deleteProgram}>
      <input type="hidden" name="id" defaultValue={note.id} />
      <input type="hidden" name="userId" defaultValue={note.userId} />
      <DeleteButton />
    </form>
  );
};

export const DeleteNote = ({ note }: { note: Program }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this note
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <DeleteButtonForm note={note} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
