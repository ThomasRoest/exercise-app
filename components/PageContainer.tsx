import { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const PageContainer = ({ children }: Props): ReactElement => {
  return <div className="max-w-4xl mx-auto">{children}</div>;
};
