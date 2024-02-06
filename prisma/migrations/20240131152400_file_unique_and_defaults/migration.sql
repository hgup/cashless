/*
  Warnings:

  - A unique constraint covering the columns `[file]` on the table `photocopy_register` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `photocopy_register_file_key` ON `photocopy_register`(`file`);
