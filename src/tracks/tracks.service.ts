import { Injectable } from '@nestjs/common';
import { InMemoryTracksDB } from './db/in-memory-tracks.db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InMemoryAlbumsDB } from 'src/albums/db/in-memory-albums.db';
import { InMemoryArtistsDB } from 'src/artists/db/in-memory-artists.db';
import { InMemoryFavoritesDB } from 'src/favorites/db/in-memory-favorites.db';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = await this.prisma.track.create({
      data: {
        ...createTrackDto,
        artistId: !createTrackDto.artistId ? null : createTrackDto.artistId,
        albumId: !createTrackDto.albumId ? null : createTrackDto.albumId,
      },
    });
    return newTrack;
  }

  async findAll() {
    const tracks = await this.prisma.track.findMany();
    return tracks;
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUniqueOrThrow({
      where: { id },
    });
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const updTrack = await this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
    return updTrack;
  }

  async remove(id: string) {
    await this.prisma.track.delete({
      where: { id },
    });
  }
}
