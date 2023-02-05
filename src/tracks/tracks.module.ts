import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { InMemoryTracksDB } from './db/in-memory-tracks.db';

@Module({
  controllers: [TracksController],
  providers: [TracksService, InMemoryTracksDB],
  exports: [InMemoryTracksDB],
})
export class TracksModule {}
