import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
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
