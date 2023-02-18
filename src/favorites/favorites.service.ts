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
    //retrieve all artists which are present in favorites
    favorites.artists = (
      await this.prisma.favsArtists.findMany({
        select: {
          artist: true,
        },
      })
    ).map((item) => item.artist);
    //retrieve all albums which are present in favorites
    favorites.albums = (
      await this.prisma.favsAlbums.findMany({
        select: {
          album: true,
        },
      })
    ).map((item) => item.album);
    //retrieve all tracks which are present in favorites
    favorites.tracks = (
      await this.prisma.favsTracks.findMany({
        select: {
          track: true,
        },
      })
    ).map((item) => item.track);
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
