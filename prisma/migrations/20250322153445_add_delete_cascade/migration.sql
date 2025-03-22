-- DropForeignKey
ALTER TABLE "habit_entries" DROP CONSTRAINT "habit_entries_habitId_fkey";

-- AddForeignKey
ALTER TABLE "habit_entries" ADD CONSTRAINT "habit_entries_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habits"("id") ON DELETE CASCADE ON UPDATE CASCADE;
