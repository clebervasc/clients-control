/*
  Warnings:

  - You are about to drop the column `conextions` on the `clients` table. All the data in the column will be lost.
  - Added the required column `connections` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "conextions",
ADD COLUMN     "connections" INTEGER NOT NULL;
