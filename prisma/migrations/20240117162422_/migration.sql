/*
  Warnings:

  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `student_room_no_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_regd_no_fkey`;

-- DropTable
DROP TABLE `student`;

-- CreateTable
CREATE TABLE `user` (
    `regd_no` VARCHAR(191) NOT NULL,
    `roll_no` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL DEFAULT '1000',
    `balance` INTEGER NOT NULL,
    `room_no` ENUM('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'S13') NOT NULL,
    `class` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'DISABLED') NOT NULL,
    `photo` LONGBLOB NULL,
    `role` ENUM('STUDENT', 'PHOTOCOPY', 'ACCOUNTANT', 'TEACHER_ADMIN', 'CENTRAL_ADMIN') NOT NULL,

    UNIQUE INDEX `user_roll_no_key`(`roll_no`),
    PRIMARY KEY (`regd_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_room_no_fkey` FOREIGN KEY (`room_no`) REFERENCES `rooms`(`room_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_regd_no_fkey` FOREIGN KEY (`regd_no`) REFERENCES `user`(`regd_no`) ON DELETE RESTRICT ON UPDATE CASCADE;
