import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggingModule } from './logging/logging.module';
import { LoggingInterceptor } from './logging.interceptor';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomExceptionFilter } from './exception-filter.filter';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    FavoritesModule,
    TracksModule,
    AlbumsModule,
    PrismaModule,
    LoggingModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

//  implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggingMiddleware).forRoutes('*');
//   }
// }
