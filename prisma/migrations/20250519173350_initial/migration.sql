-- CreateEnum
CREATE TYPE "HealthStatus" AS ENUM ('Healthy', 'Sick', 'Critical');

-- CreateTable
CREATE TABLE "Records" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "status" "HealthStatus" NOT NULL,
    "last_pdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Records_pkey" PRIMARY KEY ("id")
);
