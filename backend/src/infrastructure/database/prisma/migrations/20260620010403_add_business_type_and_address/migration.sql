/*
  Warnings:

  - Added the required column `address` to the `BusinessModels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `BusinessModels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessModels" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
