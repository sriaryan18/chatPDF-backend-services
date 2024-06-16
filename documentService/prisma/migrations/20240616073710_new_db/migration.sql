/*
  Warnings:

  - Added the required column `userID` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "userID" TEXT NOT NULL;
