/*
  Warnings:

  - You are about to drop the column `googleId` on the `Habit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "googleId";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "googleId" TEXT;
