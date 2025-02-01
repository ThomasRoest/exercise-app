"use client";

import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { NewNoteForm } from "../new/NoteForm";

export const ModalTest = () => {
  const [isVisible, setIsVisible] = useState(false);

  const close = useCallback(() => {
    setIsVisible(false);
  }, []);

  const open = useCallback(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Button size="sm" onClick={open}>
        add
      </Button>
      <Modal isVisible={isVisible} close={close}>
        <NewNoteForm onSuccess={close} />
      </Modal>
    </>
  );
};
