import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryArtistsDb } from './db/in-memory-artists.db';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryArtistsDb],
  exports: [InMemoryArtistsDb],
})
export class ArtistsModule {}
