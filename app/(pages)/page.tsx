import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="text-center">
      <Button asChild>
        <Link href="/app">Get started</Link>
      </Button>
    </div>
  );
}
