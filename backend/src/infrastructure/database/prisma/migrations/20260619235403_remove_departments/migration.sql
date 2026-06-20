/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Cities` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `Cities` table. All the data in the column will be lost.
  - You are about to drop the `Departments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cities" DROP CONSTRAINT "Cities_departmentId_fkey";

-- AlterTable
ALTER TABLE "Cities" DROP COLUMN "createdAt",
DROP COLUMN "departmentId";

-- DropTable
DROP TABLE "Departments";
