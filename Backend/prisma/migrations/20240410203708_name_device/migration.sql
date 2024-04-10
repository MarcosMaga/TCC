/*
  Warnings:

  - Added the required column `deviceName` to the `Devices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `devices` ADD COLUMN `deviceName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `readings` ADD COLUMN `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
