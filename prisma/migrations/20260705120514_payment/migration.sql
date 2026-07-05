/*
  Warnings:

  - You are about to drop the `test` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'free',
ADD COLUMN     "razorpaySubscriptionId" TEXT,
ADD COLUMN     "subscriptionRenewsAt" TIMESTAMP(3),
ADD COLUMN     "subscriptionStatus" TEXT;

-- DropTable
DROP TABLE "test";

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);
