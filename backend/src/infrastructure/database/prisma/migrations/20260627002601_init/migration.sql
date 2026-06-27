-- CreateTable
CREATE TABLE "Cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT DEFAULT '',
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "needsOnBoarding" BOOLEAN NOT NULL DEFAULT false,
    "bussinessId" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bussiness" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Bussiness_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_bussinessId_fkey" FOREIGN KEY ("bussinessId") REFERENCES "Bussiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bussiness" ADD CONSTRAINT "Bussiness_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "Cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
