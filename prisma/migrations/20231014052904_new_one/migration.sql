/*
  Warnings:

  - The primary key for the `bookings` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "date" SET DATA TYPE TEXT,
ADD CONSTRAINT "bookings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "bookings_id_seq";
