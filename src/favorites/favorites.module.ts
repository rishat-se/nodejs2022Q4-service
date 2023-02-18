import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { InMemoryFavoritesDB } from './db/in-memory-favorites.db';
// import { ArtistsModule } from 'src/artists/artists.module';
// import { TracksModule } from 'src/tracks/tracks.module';
// import { AlbumsModule } from 'src/albums/albums.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    // forwardRef(() => ArtistsModule),
    // forwardRef(() => TracksModule),
    // forwardRef(() => AlbumsModule),
    PrismaModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, InMemoryFavoritesDB, PrismaService],
  exports: [InMemoryFavoritesDB],
})
export class FavoritesModule {}
