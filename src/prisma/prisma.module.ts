import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  // imports: [
  //     forwardRef(() => FavoritesModule),
  //     forwardRef(() => AlbumsModule),
  //     forwardRef(() => ArtistsModule),
  //   ],
  //   controllers: [TracksController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
