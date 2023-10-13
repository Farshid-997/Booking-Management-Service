/*
  Warnings:

  - You are about to alter the column `price` on the `services` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `category` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER;
