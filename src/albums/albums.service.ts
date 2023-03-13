import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = await this.prisma.album.create({
      data: {
        ...createAlbumDto,
        artistId: !createAlbumDto.artistId ? null : createAlbumDto.artistId,
      },
    });
    return newAlbum;
  }

  async findAll(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.prisma.album.findUniqueOrThrow({
      where: { id },
    });
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const updAlbum = await this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });
    return updAlbum;
  }

  async remove(id: string) {
    await this.prisma.album.delete({
      where: { id },
    });
  }
}
