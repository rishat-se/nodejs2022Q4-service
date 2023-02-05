import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { InMemoryFavoritesDB } from './db/in-memory-favorites.db';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports: [ArtistsModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, InMemoryFavoritesDB],
})
export class FavoritesModule {}
