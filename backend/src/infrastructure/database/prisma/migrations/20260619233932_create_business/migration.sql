-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "businessModelId" TEXT,
ADD COLUMN     "needsOnBoarding" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "BusinessModels" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "BusinessModels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_businessModelId_fkey" FOREIGN KEY ("businessModelId") REFERENCES "BusinessModels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessModels" ADD CONSTRAINT "BusinessModels_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "Cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
