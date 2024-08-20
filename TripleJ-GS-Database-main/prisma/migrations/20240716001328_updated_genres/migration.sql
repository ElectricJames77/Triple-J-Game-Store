/*
  Warnings:

  - The values [Action,Simulation,Casual,Sports,Platformer,MMORPG,FPS] on the enum `Genre` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Genre_new" AS ENUM ('Adventure', 'Arcade', 'card_and_board_game', 'Fighting', 'hack_and_slash_beat_em_up', 'Indie', 'MOBA', 'Pinball', 'Platform', 'point_and_click', 'Puzzle', 'Quiz', 'Racing', 'RTS', 'RPG', 'Shooter', 'Simulator', 'Sport', 'Strategy', 'Tactical', 'TBS', 'visual_novel');
ALTER TABLE "Game" ALTER COLUMN "genre" TYPE "Genre_new" USING ("genre"::text::"Genre_new");
ALTER TYPE "Genre" RENAME TO "Genre_old";
ALTER TYPE "Genre_new" RENAME TO "Genre";
DROP TYPE "Genre_old";
COMMIT;
