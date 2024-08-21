/*
  Warnings:

  - Changed the type of `plan` on the `clients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ClientPlanType" AS ENUM ('MONTHLY', 'BIMONTHLY', 'QUARTERLY', 'HALF_YEARLY', 'ANNUAL');

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "plan",
ADD COLUMN     "plan" "ClientPlanType" NOT NULL;

-- DropEnum
DROP TYPE "ClientPlanTYpe";
