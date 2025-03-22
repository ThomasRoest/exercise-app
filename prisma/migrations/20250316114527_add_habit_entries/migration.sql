-- CreateTable
CREATE TABLE "habit_entries" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "habitId" TEXT NOT NULL,

    CONSTRAINT "habit_entries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "habit_entries" ADD CONSTRAINT "habit_entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habit_entries" ADD CONSTRAINT "habit_entries_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
