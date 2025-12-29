import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default async function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="text-center">
        <Dumbbell className="h-12 w-12 text-zinc-800 dark:text-zinc-200 mx-auto mb-6" />
        <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100 mb-8">
          Exercise Tracker
        </h1>
        <Button asChild size="lg">
          <Link href="/app">Signin</Link>
        </Button>
      </div>
    </div>
  );
}
