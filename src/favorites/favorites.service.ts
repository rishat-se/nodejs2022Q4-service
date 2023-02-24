import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const favorites: { artists: Artist[]; albums: Album[]; tracks: Track[] } = {
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
