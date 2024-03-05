-- AlterTable
ALTER TABLE `photocopy_register` ADD COLUMN `cost` INTEGER NULL,
    ADD COLUMN `mode_of_pay` ENUM('CASHLESS', 'CASH') NULL;
