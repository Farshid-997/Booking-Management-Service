-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "address" DROP NOT NULL;
