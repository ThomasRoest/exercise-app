-- CreateEnum
CREATE TYPE "Feeling" AS ENUM ('GOOD', 'OKAY', 'BAD');

-- AlterTable
ALTER TABLE "workouts" ADD COLUMN "feeling" "Feeling";
