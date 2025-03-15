"use client";

import { useThemeStore } from "@/lib/useThemeStore";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";

const ThemeSwitcher = () => {
  const [_, setTheme] = useThemeStore();

  return (
    <div>
      <h3 className="mb-2">Theme</h3>
      <div className="flex gap-x-4">
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setTheme("light")}
        >
          <SunIcon />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon />
        </Button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
