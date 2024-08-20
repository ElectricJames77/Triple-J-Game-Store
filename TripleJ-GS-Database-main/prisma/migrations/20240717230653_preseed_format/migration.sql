/*
  Warnings:

  - You are about to drop the column `CAST(totalRating AS REAL) / ratingsCount` on the `Game` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Genre" ADD VALUE 'Music';

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "CAST(totalRating AS REAL) / ratingsCount";
