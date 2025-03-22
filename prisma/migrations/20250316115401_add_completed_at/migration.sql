/*
  Warnings:

  - Added the required column `completedAt` to the `habit_entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "habit_entries" ADD COLUMN     "completedAt" TIMESTAMP(3) NOT NULL;
