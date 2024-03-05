/*
  Warnings:

  - You are about to alter the column `value` on the `readings` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `readings` MODIFY `value` DOUBLE NOT NULL;
