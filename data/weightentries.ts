import prisma from "@/prisma/db";
import { getCurrentUser } from "./users";

export const getUserWeightEntries = async () => {
    const user = await getCurrentUser();
    if (!user) {
      return null;
    }

    return await prisma.weightEntry.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            weight: true,
            unit: true,
            note: true,
            createdAt: true,
            userId: true,
        },
    });
  };