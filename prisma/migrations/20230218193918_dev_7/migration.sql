-- DropForeignKey
ALTER TABLE "FavsTracks" DROP CONSTRAINT "FavsTracks_trackId_fkey";

-- AddForeignKey
ALTER TABLE "FavsTracks" ADD CONSTRAINT "FavsTracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
