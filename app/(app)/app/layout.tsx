import { MainNav } from "@/components/MainNav";
import { MenuBar } from "@/components/MenuBar";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min h-screen flex flex-col">
      <MainNav />
      <div className="flex-1 bg-gray-100 p-2 pb-[70px] dark:bg-gray-900">{children}</div>
      <MenuBar />
      <Toaster />
    </div>
  );
};

export default AppLayout;
