/*
  Warnings:

  - You are about to drop the column `userID` on the `Document` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "userID",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;
