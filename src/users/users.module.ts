import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUsersDB } from './db/in-memory-users.db';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports: [ArtistsModule],
  controllers: [UsersController],
  providers: [UsersService, InMemoryUsersDB],
})
export class UsersModule {}
