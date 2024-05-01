-- CreateTable
CREATE TABLE `settings` (
    `userId` VARCHAR(191) NOT NULL,
    `goal` INTEGER NULL,

    UNIQUE INDEX `settings_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `settings` ADD CONSTRAINT `settings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
