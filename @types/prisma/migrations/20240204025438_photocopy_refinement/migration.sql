/*
  Warnings:

  - A unique constraint covering the columns `[cashless_tid]` on the table `photocopy_register` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `photocopy_register` ADD COLUMN `cashless_tid` VARCHAR(191) NULL,
    ADD COLUMN `notes` VARCHAR(191) NULL,
    MODIFY `status` ENUM('PENDING', 'PRINTED', 'REJECTED', 'COLLECTED', 'PAID') NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX `photocopy_register_cashless_tid_key` ON `photocopy_register`(`cashless_tid`);
