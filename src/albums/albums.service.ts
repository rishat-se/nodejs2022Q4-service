import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = await this.prisma.album.create({
      data: {
        ...createAlbumDto,
        artistId: !createAlbumDto.artistId ? null : createAlbumDto.artistId,
      },
    });
    return newAlbum;
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.album.findUniqueOrThrow({
      where: { id },
    });
    return artist;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const updArtist = await this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });
    return updArtist;
  }

  async remove(id: string) {
    await this.prisma.album.delete({
      where: { id },
    });
  }
}
