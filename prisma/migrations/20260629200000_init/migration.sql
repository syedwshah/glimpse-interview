-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "InterestLevel" AS ENUM ('Low', 'Medium', 'High');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('New', 'Closed', 'Qualified', 'Contacted');

-- CreateEnum
CREATE TYPE "LeadSource" AS ENUM ('Referral', 'Website', 'Cold Call', 'Event');

-- CreateTable
CREATE TABLE "Lead" (
    "leadId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "source" "LeadSource" NOT NULL,
    "interestLevel" "InterestLevel" NOT NULL,
    "status" "LeadStatus" NOT NULL,
    "assignedSalesperson" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("leadId")
);

-- CreateIndex
CREATE INDEX "Lead_source_idx" ON "Lead"("source");

-- CreateIndex
CREATE INDEX "Lead_interestLevel_idx" ON "Lead"("interestLevel");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_assignedSalesperson_idx" ON "Lead"("assignedSalesperson");

-- CreateIndex
CREATE INDEX "Lead_name_idx" ON "Lead"("name");
