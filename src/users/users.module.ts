import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUsersDB } from './db/in-memory-users.db';
import { ArtistsModule } from 'src/artists/artists.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ArtistsModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, InMemoryUsersDB, PrismaService],
})
export class UsersModule {}
