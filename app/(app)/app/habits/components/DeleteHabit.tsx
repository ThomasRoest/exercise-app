"use client";

import { deleteHabit } from "@/actions/habits/delete";
import { useCallback, useState, useTransition } from "react";
import { ActionMenu } from "./ActionMenu";

export const DeleteHabit = ({
  habit,
}: {
  habit: { id: string; userId: string };
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [_, startTransition] = useTransition();

  const onDelete = useCallback(async () => {
    startTransition(async () => {
      await deleteHabit(habit);
    });
  }, []);

  return (
    <ActionMenu
      onDelete={onDelete}
      showDialog={showDialog}
      setShowDeleteDialog={setShowDialog}
    />
  );
};
