/*
  Warnings:

  - Made the column `print_type` on table `photocopy_register` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orientation` on table `photocopy_register` required. This step will fail if there are existing NULL values in that column.
  - Made the column `page_layout` on table `photocopy_register` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `photocopy_register` ADD COLUMN `num_of_copies` INTEGER NOT NULL DEFAULT 1,
    MODIFY `print_type` ENUM('PRINTOUT', 'PHOTOCOPY') NOT NULL DEFAULT 'PHOTOCOPY',
    MODIFY `orientation` ENUM('VERTICAL', 'HORIZONTAL', 'AS_IT_IS', 'BEST_FIT') NOT NULL DEFAULT 'AS_IT_IS',
    MODIFY `page_layout` ENUM('MINI', 'MICRO', 'HANDOUT', 'AS_IT_IS') NOT NULL DEFAULT 'AS_IT_IS',
    MODIFY `sides` ENUM('SINGLE', 'BACK_TO_BACK') NOT NULL DEFAULT 'BACK_TO_BACK';
