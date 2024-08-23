/*
  Warnings:

  - The `prospection` column on the `clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[message_type]` on the table `messages` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `plan` on the `clients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `message_type` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "message_type" AS ENUM ('BEFORE_EXPIRATION', 'EXPIRATION', 'AFTER_EXPIRATION');

-- CreateEnum
CREATE TYPE "client_plan_type" AS ENUM ('MONTHLY', 'BIMONTHLY', 'QUARTERLY', 'HALF_YEARLY', 'ANNUAL');

-- CreateEnum
CREATE TYPE "client_propspection_type" AS ENUM ('GOOGLE', 'INSTAGRAM', 'YOUTUBE', 'INDICATION', 'OTHER');

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "prospection",
ADD COLUMN     "prospection" "client_propspection_type",
DROP COLUMN "plan",
ADD COLUMN     "plan" "client_plan_type" NOT NULL;

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "message_type" "message_type" NOT NULL;

-- DropEnum
DROP TYPE "ClientPlanType";

-- DropEnum
DROP TYPE "ClientProspectionType";

-- CreateIndex
CREATE UNIQUE INDEX "messages_message_type_key" ON "messages"("message_type");
