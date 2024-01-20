-- CreateTable
CREATE TABLE `student` (
    `regd_no` VARCHAR(191) NOT NULL,
    `roll_no` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL DEFAULT '1000',
    `balance` INTEGER NOT NULL,
    `room_no` ENUM('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'S13') NOT NULL,
    `class` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'DISABLED') NOT NULL,
    `photo` LONGBLOB NOT NULL,

    UNIQUE INDEX `student_roll_no_key`(`roll_no`),
    PRIMARY KEY (`regd_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `room_no` ENUM('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'S13') NOT NULL,

    PRIMARY KEY (`room_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `regd_no` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_room_no_fkey` FOREIGN KEY (`room_no`) REFERENCES `rooms`(`room_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_regd_no_fkey` FOREIGN KEY (`regd_no`) REFERENCES `student`(`regd_no`) ON DELETE RESTRICT ON UPDATE CASCADE;
