import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { InMemoryTracksDB } from './db/in-memory-tracks.db';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [TracksController],
  providers: [TracksService, InMemoryTracksDB, PrismaService],
  exports: [InMemoryTracksDB],
})
export class TracksModule {}
