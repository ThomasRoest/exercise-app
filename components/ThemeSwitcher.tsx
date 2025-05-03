"use client";

import { useThemeStore } from "@/lib/useThemeStore";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useThemeStore();

  return (
    <div>
      <h3 className="mb-2">Theme</h3>
      <div className="flex gap-x-4">
        <Button
          size="icon"
          variant={theme === "light" ? "default" : "secondary"}
          onClick={() => setTheme("light")}
          className={cn(
            theme === "light" && "ring-2 ring-primary ring-offset-2 ring-offset-background"
          )}
          aria-pressed={theme === "light"}
        >
          <SunIcon />
        </Button>
        <Button
          size="icon"
          variant={theme === "dark" ? "default" : "secondary"}
          onClick={() => setTheme("dark")}
          className={cn(
            theme === "dark" && "ring-2 ring-primary ring-offset-2 ring-offset-background"
          )}
          aria-pressed={theme === "dark"}
        >
          <MoonIcon />
        </Button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
