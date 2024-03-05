-- AlterTable
ALTER TABLE `subscription_details` MODIFY `department` ENUM('NEWSPAPER', 'PHOTOCOPY', 'TRAVEL', 'OTHER') NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `department` ENUM('NEWSPAPER', 'PHOTOCOPY', 'TRAVEL', 'OTHER') NULL;

-- CreateTable
CREATE TABLE `photocopy_register` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `regd_no` VARCHAR(191) NOT NULL,
    `order_placed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `print_type` ENUM('PRINTOUT', 'PHOTOCOPY') NULL,
    `orientation` ENUM('VERTICAL', 'HORIZONTAL', 'AS_IT_IS', 'BEST_FIT') NULL,
    `page_layout` ENUM('MINI', 'MICRO', 'HANDOUT', 'AS_IT_IS') NULL,
    `sides` ENUM('SINGLE', 'BACK_TO_BACK') NOT NULL,
    `pages` VARCHAR(191) NULL,
    `file` VARCHAR(191) NOT NULL,
    `call_number` VARCHAR(191) NULL,
    `particulars` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'PRINTED', 'COLLECTED', 'PAID') NOT NULL DEFAULT 'PENDING',
    `collected_at` DATETIME(3) NULL,
    `paid_at` DATETIME(3) NULL,

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
ALTER TABLE `photocopy_register` ADD CONSTRAINT `photocopy_register_regd_no_fkey` FOREIGN KEY (`regd_no`) REFERENCES `users`(`regd_no`) ON DELETE RESTRICT ON UPDATE CASCADE;
