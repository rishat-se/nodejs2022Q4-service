import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryAlbumsDB } from './db/in-memory-albums.db';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryAlbumsDB],
  exports: [InMemoryAlbumsDB],
})
export class AlbumsModule {}
