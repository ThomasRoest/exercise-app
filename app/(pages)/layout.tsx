import { Activity } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const PagesLayout = async ({ children }: { children: ReactNode }) => {
  const date = new Date();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-5 bg-gray-100 flex items-center justify-between">
        <Link href="/">
          <Activity className="text-blue-600" />
        </Link>
        <Link href="/about" className="hover:text-blue-600">
          About
        </Link>
      </header>
      <div className="flex-1 p-5">{children}</div>
      <footer className="bg-gray-200 p-5">{date.getFullYear()}</footer>
    </div>
  );
};

export default PagesLayout;
