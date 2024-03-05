/*
  Warnings:

  - Made the column `photo` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `photo` VARCHAR(191) NOT NULL DEFAULT '/images/profile_pics/profile.png';
