import "server-only";
import { auth } from "@/auth";
import prisma from "@/prisma/db";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }
  const data = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    name: data.name,
  };
});
