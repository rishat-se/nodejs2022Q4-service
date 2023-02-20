-- DropForeignKey
ALTER TABLE "FavsAlbums" DROP CONSTRAINT "FavsAlbums_albumId_fkey";

-- DropForeignKey
ALTER TABLE "FavsArtists" DROP CONSTRAINT "FavsArtists_artistId_fkey";

-- AddForeignKey
ALTER TABLE "FavsArtists" ADD CONSTRAINT "FavsArtists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavsAlbums" ADD CONSTRAINT "FavsAlbums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;
