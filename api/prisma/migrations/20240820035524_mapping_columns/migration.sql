/*
  Warnings:

  - You are about to drop the column `activeDate` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `expirationDate` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `isRecurring` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `active_date` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiration_date` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_recurring` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_providerId_key";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "activeDate",
DROP COLUMN "expirationDate",
DROP COLUMN "isRecurring",
DROP COLUMN "paymentMethod",
ADD COLUMN     "active_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "expiration_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_recurring" BOOLEAN NOT NULL,
ADD COLUMN     "payment_method" "client_payment_type" NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "providerId",
ADD COLUMN     "provider_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_provider_id_key" ON "users"("provider_id");
