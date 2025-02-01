import { cn } from "@/lib/utils";
import { MutableRefObject, ReactNode } from "react";
interface FormProps {
  action?: (payload: FormData) => void;
  children: ReactNode;
  formRef?: MutableRefObject<HTMLFormElement | null>;
  className?: string;
}

export const Form = ({ action, children, formRef, className }: FormProps) => {
  return (
    <form
      ref={formRef}
      action={action}
      className={cn("w-full flex flex-col gap-4 bg-white p-4", className)}
    >
      {children}
    </form>
  );
};
