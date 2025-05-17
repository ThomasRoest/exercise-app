import { Activity } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const PagesLayout = async ({ children }: { children: ReactNode }) => {
  const date = new Date();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <header className="p-5 bg-gray-100 dark:bg-gray-900 flex items-center justify-between">
        <Link href="/">
          <Activity className="text-blue-600 dark:text-blue-400" />
        </Link>
        <Link
          href="/about"
          className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
        >
          About
        </Link>
      </header>
      <div className="flex-1 p-5">{children}</div>
      <footer className="bg-gray-200 dark:bg-gray-800 p-5 text-gray-700 dark:text-gray-300">
        {date.getFullYear()}
      </footer>
    </div>
  );
};

export default PagesLayout;
