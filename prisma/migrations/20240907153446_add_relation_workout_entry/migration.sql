-- AddForeignKey
ALTER TABLE "workout_entries" ADD CONSTRAINT "workout_entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
