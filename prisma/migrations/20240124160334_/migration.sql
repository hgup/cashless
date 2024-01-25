-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `particulars` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `room_leaders` (
    `regd_no` VARCHAR(191) NOT NULL,
    `room_no` ENUM('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'S13') NOT NULL,

    PRIMARY KEY (`regd_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriptions` (
    `id` VARCHAR(191) NOT NULL,
    `room_no` ENUM('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'S13') NOT NULL,
    `type` ENUM('THE_HINDU', 'ECONOMIC_TIMES') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscription_details` (
    `id` ENUM('THE_HINDU', 'ECONOMIC_TIMES') NOT NULL,
    `amount` INTEGER NOT NULL,
    `department` ENUM('NEWSPAPER', 'PHOTOCOPY') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `room_leaders` ADD CONSTRAINT `room_leaders_regd_no_fkey` FOREIGN KEY (`regd_no`) REFERENCES `users`(`regd_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_leaders` ADD CONSTRAINT `room_leaders_room_no_fkey` FOREIGN KEY (`room_no`) REFERENCES `rooms`(`room_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_room_no_fkey` FOREIGN KEY (`room_no`) REFERENCES `rooms`(`room_no`) ON DELETE RESTRICT ON UPDATE CASCADE;
