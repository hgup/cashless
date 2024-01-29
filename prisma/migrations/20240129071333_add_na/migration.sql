/*
  Warnings:

  - The primary key for the `rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `subscriptions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `room_leaders` DROP FOREIGN KEY `room_leaders_room_no_fkey`;

-- DropForeignKey
ALTER TABLE `subscriptions` DROP FOREIGN KEY `subscriptions_room_no_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_room_no_fkey`;

-- AlterTable
ALTER TABLE `room_leaders` MODIFY `room_no` ENUM('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'S13', 'NA') NOT NULL;

-- AlterTable
ALTER TABLE `rooms` DROP PRIMARY KEY,
    MODIFY `room_no` ENUM('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'S13', 'NA') NOT NULL,
    ADD PRIMARY KEY (`room_no`);

-- AlterTable
ALTER TABLE `subscriptions` DROP PRIMARY KEY,
    MODIFY `room_no` ENUM('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'S13', 'NA') NOT NULL,
    ADD PRIMARY KEY (`room_no`, `type`);

-- AlterTable
ALTER TABLE `users` MODIFY `room_no` ENUM('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'S13', 'NA') NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_room_no_fkey` FOREIGN KEY (`room_no`) REFERENCES `rooms`(`room_no`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_leaders` ADD CONSTRAINT `room_leaders_room_no_fkey` FOREIGN KEY (`room_no`) REFERENCES `rooms`(`room_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_room_no_fkey` FOREIGN KEY (`room_no`) REFERENCES `rooms`(`room_no`) ON DELETE RESTRICT ON UPDATE CASCADE;
