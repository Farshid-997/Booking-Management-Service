/*
  Warnings:

  - You are about to drop the column `address` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `customerAddress` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "address",
ADD COLUMN     "customerAddress" TEXT NOT NULL;
