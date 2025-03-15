import { ReactNode } from "react";

export const ListItem = ({ children }: { children: ReactNode }) => {
  return (
    <li
      className={
        "flex p-2 justify-between items-center rounded-md bg-white shadow-sm dark:bg-gray-800 dark:text-gray-300"
      }
    >
      {children}
    </li>
  );
};
