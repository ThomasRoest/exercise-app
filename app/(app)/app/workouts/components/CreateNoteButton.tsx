"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer, DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { WorkoutNoteForm } from "./WorkoutNoteForm";

export const CreateNoteButton = ({
  workoutId,
  note,
}: {
  workoutId: string;
  note: string | null;
}) => {
  const [open, setOpen] = useState(false);

  const onSuccess = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="active:bg-slate-300 text-gray-700"
        >
          <PencilIcon className="w-4 h-4 mr-2 text-gray-700" />
          {note ? "Edit" : "Note"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerDescription></DrawerDescription>
        <DrawerTitle></DrawerTitle>
        <WorkoutNoteForm
          onSuccess={onSuccess}
          workoutId={workoutId}
          note={note}
        />
      </DrawerContent>
    </Drawer>
  );
};
