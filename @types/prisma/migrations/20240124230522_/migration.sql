-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_type_fkey` FOREIGN KEY (`type`) REFERENCES `subscription_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
