/*
  Warnings:

  - You are about to drop the column `createdAt` on the `referral` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `referral` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `referral` table. All the data in the column will be lost.
  - Added the required column `friend_email` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `friend_name` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Referral_email_key` ON `referral`;

-- AlterTable
ALTER TABLE `referral` DROP COLUMN `createdAt`,
    DROP COLUMN `email`,
    DROP COLUMN `phoneNumber`,
    ADD COLUMN `friend_email` VARCHAR(191) NOT NULL,
    ADD COLUMN `friend_name` VARCHAR(191) NOT NULL;
