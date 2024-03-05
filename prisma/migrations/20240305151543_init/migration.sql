-- CreateTable
CREATE TABLE `users` (
    `regd_no` VARCHAR(191) NOT NULL,
    `roll_no` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL DEFAULT '1000',
    `balance` INTEGER NOT NULL,
    `room_no` ENUM('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'S13', 'NA') NULL,
    `class` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'DISABLED') NOT NULL,
    `photo` VARCHAR(191) NOT NULL DEFAULT '/images/profile_pics/profile.png',
    `role` ENUM('STUDENT', 'PHOTOCOPY', 'ACCOUNTANT', 'TEACHER_ADMIN', 'CENTRAL_ADMIN') NOT NULL,

    UNIQUE INDEX `users_roll_no_key`(`roll_no`),
    PRIMARY KEY (`regd_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `room_no` ENUM('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'S13', 'NA') NOT NULL,

    PRIMARY KEY (`room_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_leaders` (
    `regd_no` VARCHAR(191) NOT NULL,
    `room_no` ENUM('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'S13', 'NA') NOT NULL,

    PRIMARY KEY (`regd_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `regd_no` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `particulars` VARCHAR(191) NULL,
    `department` ENUM('NEWSPAPER', 'PHOTOCOPY', 'TRAVEL', 'CASH', 'OTHER') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriptions` (
    `room_no` ENUM('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'S13', 'NA') NOT NULL,
    `type` ENUM('THE_HINDU', 'ECONOMIC_TIMES') NOT NULL,

    PRIMARY KEY (`room_no`, `type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscription_details` (
    `id` ENUM('THE_HINDU', 'ECONOMIC_TIMES') NOT NULL,
    `amount` INTEGER NOT NULL,
    `department` ENUM('NEWSPAPER', 'PHOTOCOPY', 'TRAVEL', 'CASH', 'OTHER') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photocopy_register` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `regd_no` VARCHAR(191) NOT NULL,
    `order_placed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `print_type` ENUM('PRINTOUT', 'PHOTOCOPY') NOT NULL DEFAULT 'PHOTOCOPY',
    `orientation` ENUM('VERTICAL', 'HORIZONTAL', 'AS_IT_IS', 'BEST_FIT') NOT NULL DEFAULT 'AS_IT_IS',
    `page_layout` ENUM('MINI', 'MICRO', 'HANDOUT', 'AS_IT_IS') NOT NULL DEFAULT 'AS_IT_IS',
    `sides` ENUM('SINGLE', 'BACK_TO_BACK') NOT NULL DEFAULT 'BACK_TO_BACK',
    `pages` VARCHAR(191) NULL,
    `num_of_copies` INTEGER NOT NULL DEFAULT 1,
    `particulars` VARCHAR(191) NULL,
    `file` VARCHAR(191) NOT NULL,
    `file_pages` INTEGER NOT NULL DEFAULT 0,
    `call_number` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'PRINTED', 'REJECTED', 'COLLECTED', 'PAID') NOT NULL DEFAULT 'PENDING',
    `collected_at` DATETIME(3) NULL,
    `notes` VARCHAR(191) NULL,
    `cost` INTEGER NULL,
    `mode_of_pay` ENUM('CASHLESS', 'CASH') NULL,
    `paid_at` DATETIME(3) NULL,
    `cashless_tid` VARCHAR(191) NULL,

    UNIQUE INDEX `photocopy_register_file_key`(`file`),
    UNIQUE INDEX `photocopy_register_cashless_tid_key`(`cashless_tid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `from` ENUM('WARDEN', 'DIRECTOR', 'PHOTOCOPY') NOT NULL,
    `to` VARCHAR(191) NOT NULL,
    `dismissed` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_room_no_fkey` FOREIGN KEY (`room_no`) REFERENCES `rooms`(`room_no`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_leaders` ADD CONSTRAINT `room_leaders_regd_no_fkey` FOREIGN KEY (`regd_no`) REFERENCES `users`(`regd_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_leaders` ADD CONSTRAINT `room_leaders_room_no_fkey` FOREIGN KEY (`room_no`) REFERENCES `rooms`(`room_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_regd_no_fkey` FOREIGN KEY (`regd_no`) REFERENCES `users`(`regd_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_room_no_fkey` FOREIGN KEY (`room_no`) REFERENCES `rooms`(`room_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_type_fkey` FOREIGN KEY (`type`) REFERENCES `subscription_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photocopy_register` ADD CONSTRAINT `photocopy_register_regd_no_fkey` FOREIGN KEY (`regd_no`) REFERENCES `users`(`regd_no`) ON DELETE RESTRICT ON UPDATE CASCADE;
