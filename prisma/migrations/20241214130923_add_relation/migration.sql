-- AddForeignKey
ALTER TABLE "workout_entries" ADD CONSTRAINT "workout_entries_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE SET NULL ON UPDATE CASCADE;
