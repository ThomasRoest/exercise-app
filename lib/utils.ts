import { type ClassValue, clsx } from "clsx";
import { ToastOptions } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formatDate = (date: Date) => {
  const formatted = date.toLocaleDateString("nl-NL", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return capitalize(formatted);
};

export const getYear = (date: Date) => {
  return date.getFullYear();
};

export const sleep = (time = 1000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export const toastOptions: ToastOptions = {
  duration: 3000,
  position: "top-center",
  style: {
    backgroundColor: "gray",
    color: "white",
  },
};

export const dateFormatter = new Intl.DateTimeFormat("nl-NL", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
