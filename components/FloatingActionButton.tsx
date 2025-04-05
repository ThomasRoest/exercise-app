"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Plus } from "lucide-react";
import {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  useState,
} from "react";

export const FloatingActionButton = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const onSuccess = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="fixed bottom-20 right-4 rounded-full dark:bg-indigo-600 dark:hover:bg-indigo-700">
          Add new <Plus className="ml-2 h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerDescription></DrawerDescription>
        <DrawerTitle />
        {Children.map(children, (child) => {
          return cloneElement(child as ReactElement<any>, {
            onSuccess,
          });
        })}
      </DrawerContent>
    </Drawer>
  );
};
