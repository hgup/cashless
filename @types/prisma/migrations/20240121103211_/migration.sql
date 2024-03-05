/*
  Warnings:

  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `photo` on the `users` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `image`,
    MODIFY `photo` VARCHAR(191) NULL DEFAULT '/images/profile_pics/profile.png';
