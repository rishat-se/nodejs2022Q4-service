import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [UsersModule, ArtistsModule, FavoritesModule, TracksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
