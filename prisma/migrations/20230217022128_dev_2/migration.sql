-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_artistId_fkey";

-- AlterTable
ALTER TABLE "Album" ALTER COLUMN "artistId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" VARCHAR(20) NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "version" INTEGER,
    "createdAt" INTEGER,
    "updatedAt" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavsArtists" (
    "artistId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FavsAlbums" (
    "albumId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FavsTracks" (
    "trackId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FavsArtists_artistId_key" ON "FavsArtists"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "FavsAlbums_albumId_key" ON "FavsAlbums"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "FavsTracks_trackId_key" ON "FavsTracks"("trackId");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavsArtists" ADD CONSTRAINT "FavsArtists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavsAlbums" ADD CONSTRAINT "FavsAlbums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavsTracks" ADD CONSTRAINT "FavsTracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
