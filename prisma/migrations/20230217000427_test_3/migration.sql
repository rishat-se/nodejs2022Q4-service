/*
  Warnings:

  - You are about to drop the `Albums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Artists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Albums";

-- DropTable
DROP TABLE "Artists";

-- CreateTable
CREATE TABLE "Album" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "year" INTEGER,
    "artistId" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "grammy" BOOLEAN,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);
