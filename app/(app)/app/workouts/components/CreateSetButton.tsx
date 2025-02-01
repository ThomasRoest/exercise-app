"use client";

import { Drawer } from "@/components/Drawer";
import { Exercise } from "@prisma/client";
import { useState } from "react";
import { WorkoutSetForm } from "./WorkoutSetForm";
import { Button } from "@/components/ui/button";

export const AddSetButton = ({
  workoutId,
  exercises,
}: {
  workoutId: string;
  exercises: Exercise[];
}) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  return (
    <>
      <div className="fixed bg-slate-200 bottom-20 right-1 text-right p-2 rounded-full">
        <Button
          onClick={() => {
            setDrawerIsOpen(true);
          }}
          className="rounded-full flex gap-2 bg-blue-800 active:bg-blue-900 hover:bg-blue-950"
        >
          Add set
        </Button>
      </div>
      <Drawer
        close={() => setDrawerIsOpen(false)}
        isOpen={drawerIsOpen}
        title="Add set"
        position="bottom"
        header={false}
      >
        <WorkoutSetForm
          workoutId={workoutId}
          exercises={exercises}
          onSuccess={() => setDrawerIsOpen(false)}
        />
      </Drawer>
    </>
  );
};
