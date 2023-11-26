/*
  Warnings:

  - Made the column `address` on table `bookings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "address" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "address" SET NOT NULL;
