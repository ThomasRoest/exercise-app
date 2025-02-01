import { ReactNode } from "react";

export const InputGroup = ({ children }: { children: ReactNode }) => {
    return <div className="flex flex-col gap-2">{children}</div>;
};
