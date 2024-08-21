/*
  Warnings:

  - The `prospection` column on the `clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `is_active` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_payment` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClientPlanTYpe" AS ENUM ('MONTHLY', 'BIMONTHLY', 'QUARTERLY', 'HALF_YEARLY', 'ANNUAL');

-- CreateEnum
CREATE TYPE "ClientProspectionType" AS ENUM ('GOOGLE', 'INSTAGRAM', 'YOUTUBE', 'INDICATION', 'OTHER');

-- DropIndex
DROP INDEX "clients_document_key";

-- DropIndex
DROP INDEX "clients_email_key";

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "is_active" BOOLEAN NOT NULL,
ADD COLUMN     "last_payment" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "observations" TEXT,
ADD COLUMN     "plan" "ClientPlanTYpe" NOT NULL,
DROP COLUMN "prospection",
ADD COLUMN     "prospection" "ClientProspectionType";
