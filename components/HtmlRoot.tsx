"use client";

import { useThemeStore } from "@/lib/useThemeStore";
import { PropsWithChildren } from "react";

export const HtmlRoot = (props: PropsWithChildren) => {
  const [theme] = useThemeStore();

  return (
    <html lang="en" className={theme === "light" ? "light" : "dark"}>
      {props.children}
    </html>
  );
};
