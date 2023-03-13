import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { FavoritesService } from './favorites.service';

@ApiBearerAuth()
@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('artist/:id')
  @ApiResponse({
    status: 400,
    description: 'invalid id',
  })
  @ApiResponse({
    status: 422,
    description: 'artist not found',
  })
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    try {
      return await this.favoritesService.addArtist(id);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
          throw new HttpException(
            'artist not found',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        if (err.code === 'P2002') {
          return;
        }
      }
      throw err;
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiResponse({
    status: 400,
    description: 'invalid id',
  })
  @ApiResponse({
    status: 404,
    description: 'artist not found',
  })
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    try {
      await this.favoritesService.removeArtist(id);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new HttpException('artist not found', HttpStatus.NOT_FOUND);
        }
      }
      throw err;
    }
  }

  @Post('track/:id')
  @ApiResponse({
    status: 400,
    description: 'invalid id',
  })
  @ApiResponse({
    status: 422,
    description: 'track not found',
  })
  async addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.favoritesService.addTrack(id);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
          throw new HttpException(
            'track not found',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        if (err.code === 'P2002') {
          return;
        }
      }
      throw err;
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiResponse({
    status: 400,
    description: 'invalid id',
  })
  @ApiResponse({
    status: 404,
    description: 'track not found',
  })
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    try {
      await this.favoritesService.removeTrack(id);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new HttpException('track not found', HttpStatus.NOT_FOUND);
        }
      }
      throw err;
    }
  }

  @Post('album/:id')
  @ApiResponse({
    status: 400,
    description: 'invalid id',
  })
  @ApiResponse({
    status: 422,
    description: 'track not found',
  })
  async addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.favoritesService.addAlbum(id);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
          throw new HttpException(
            'album not found',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        if (err.code === 'P2002') {
          return;
        }
      }
      throw err;
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiResponse({
    status: 400,
    description: 'invalid id',
  })
  @ApiResponse({
    status: 404,
    description: 'album not found',
  })
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    try {
      await this.favoritesService.removeAlbum(id);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new HttpException('album not found', HttpStatus.NOT_FOUND);
        }
      }
      throw err;
    }
  }
}
