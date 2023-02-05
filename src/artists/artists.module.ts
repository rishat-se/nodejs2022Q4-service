import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryArtistsDB } from './db/in-memory-artists.db';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryArtistsDB],
  exports: [InMemoryArtistsDB],
})
export class ArtistsModule {}
