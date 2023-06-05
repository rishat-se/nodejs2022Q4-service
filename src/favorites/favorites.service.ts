import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Favorites } from './entities/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const favorites: Favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };

    const [artists, albums, tracks] = await Promise.all([
      this.prisma.favsArtists.findMany({
        select: {
          artist: true,
        },
      }),
      this.prisma.favsAlbums.findMany({
        select: {
          album: true,
        },
      }),
      this.prisma.favsTracks.findMany({
        select: {
          track: true,
        },
      }),
    ]);

    favorites.artists = artists.map((item) => item.artist);
    favorites.albums = albums.map((item) => item.album);
    favorites.tracks = tracks.map((item) => item.track);

    return favorites;
  }

  async addArtist(id: string) {
    await this.prisma.favsArtists.create({
      data: { artistId: id },
    });
  }

  async removeArtist(id: string) {
    await this.prisma.favsArtists.delete({
      where: { artistId: id },
    });
  }

  async addTrack(id: string) {
    await this.prisma.favsTracks.create({
      data: { trackId: id },
    });
  }

  async removeTrack(id: string) {
    await this.prisma.favsTracks.delete({
      where: { trackId: id },
    });
  }

  async addAlbum(id: string) {
    await this.prisma.favsAlbums.create({
      data: { albumId: id },
    });
  }

  async removeAlbum(id: string) {
    await this.prisma.favsAlbums.delete({
      where: { albumId: id },
    });
  }
}
