/*
  Warnings:

  - Made the column `userId` on table `workout_entries` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "workout_entries" ALTER COLUMN "userId" SET NOT NULL;
