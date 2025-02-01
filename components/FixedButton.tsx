import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const FixedLinkButton = ({
  href,
  label = "Add new",
}: {
  href: string;
  label?: string;
}) => {
  return (
    <div className="fixed bg-slate-200 bottom-20 right-1 text-right p-2 rounded-full">
      <Button asChild className="rounded-full flex gap-2 bg-blue-800 active:bg-blue-900 hover:bg-blue-950">
        <Link href={href}>
          {label} <Plus />
        </Link>
      </Button>
    </div>
  );
};
