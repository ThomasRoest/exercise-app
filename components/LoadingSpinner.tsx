import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <Loader2 className="h-10 w-10 animate-spin text-blue-700" />
    </div>
  );
};
