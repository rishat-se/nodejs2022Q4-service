import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { InMemoryFavoritesDB } from './db/in-memory-favorites.db';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, InMemoryFavoritesDB],
  exports: [InMemoryFavoritesDB],
})
export class FavoritesModule {}
