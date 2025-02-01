import { ReactNode } from "react";

export const FormHeader = ({ children }: { children: ReactNode }) => {
  return <div className="font-bold text-center">{children}</div>;
};
