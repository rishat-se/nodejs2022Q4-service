import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = await this.prisma.artist.create({
      data: createArtistDto,
    });
    return newArtist;
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUniqueOrThrow({
      where: { id },
    });
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const updArtist = await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
    return updArtist;
  }

  async remove(id: string) {
    await this.prisma.artist.delete({
      where: { id },
    });
  }
}
