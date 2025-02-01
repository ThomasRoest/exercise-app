import { X } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";

export const Modal = ({
  children,
  isVisible,
  close,
}: {
  children: ReactNode;
  isVisible: boolean;
  close: () => void;
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-xl mx-4 md:mx-0">
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={close}>
            <X size={20} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};
