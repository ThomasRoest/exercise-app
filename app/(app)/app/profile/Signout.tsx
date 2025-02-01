"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export const Signout = () => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Button onClick={() => signOut()}>
      Signout <LogOut className="ml-2" />
    </Button>
  );
};
