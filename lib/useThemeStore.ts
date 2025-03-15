import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "fit-app-theme";

const getThemeFromLocalStorage = (): Theme => {
  return (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || "light";
};

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
};

type ThemeStoreResult = [Theme, (newTheme: Theme) => void];

export const useThemeStore = (): ThemeStoreResult => {
  const theme = useSyncExternalStore<Theme>(
    subscribe,
    getThemeFromLocalStorage,
    () => "light"
  );

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    window.dispatchEvent(new Event("storage"));
};

  return [theme, setTheme];
};
