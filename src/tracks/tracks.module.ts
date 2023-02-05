import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { InMemoryTracksDB } from './db/in-memory-tracks.db';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
  ],
  controllers: [TracksController],
  providers: [TracksService, InMemoryTracksDB],
  exports: [InMemoryTracksDB],
})
export class TracksModule {}
