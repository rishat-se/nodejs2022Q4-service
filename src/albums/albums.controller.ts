import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  HttpCode,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    try {
      return await this.albumsService.create(createAlbumDto);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
          throw new HttpException('field is incorrect', HttpStatus.BAD_REQUEST);
        }
      }
      throw err;

      // if (err instanceof Error && err.message === 'field is incorrect') {
      //   throw new HttpException('field is incorrect', HttpStatus.BAD_REQUEST);
      // } else {
      //   throw err;
      // }
    }
  }

  @Get()
  async findAll() {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.albumsService.findOne(id);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }
      }
      throw err;

      // if (err instanceof Error && err.message === 'entity not found') {
      //   throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      // } else {
      //   throw err;
      // }
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      return await this.albumsService.update(id, updateAlbumDto);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
          throw new HttpException('field is incorrect', HttpStatus.BAD_REQUEST);
        }
        if (err.code === 'P2025') {
          throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }
      }
      throw err;

      // if (err instanceof Error && err.message === 'entity not found') {
      //   throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      // } else if (err instanceof Error && err.message === 'field is incorrect') {
      //   throw new HttpException('field is incorrect', HttpStatus.BAD_REQUEST);
      // } else {
      //   throw err;
      // }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      await this.albumsService.remove(id);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }
      }
      throw err;

      // if (err instanceof Error && err.message === 'entity not found') {
      //   throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      // } else {
      //   throw err;
      // }
    }
  }
}
