import toast, { ToastOptions } from "react-hot-toast";
import { useThemeStore } from "./useThemeStore";

export const useToast = () => {
  const [theme] = useThemeStore();
  const options: ToastOptions = {
    duration: 3000,
    position: "top-center",
    style: {
      backgroundColor: theme === "dark" ? "#374151" : "#f3f4f6",
      color: theme === "dark" ? "#f3f4f6" : "#1f2937",
    },
  };

  return {
    success: (message: string) => toast.success(message, options),
    error: (message: string) => toast.error(message, options),
  };
};