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
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.favoritesService.addArtist(id);
    } catch (err) {
      if (err instanceof Error && err.message === 'entity not found') {
        throw new HttpException(
          'artist not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      } else {
        throw err;
      }
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      this.favoritesService.removeArtist(id);
    } catch (err) {
      if (err instanceof Error && err.message === 'entity not found') {
        throw new HttpException('artist not found', HttpStatus.NOT_FOUND);
      } else {
        throw err;
      }
    }
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.favoritesService.addTrack(id);
    } catch (err) {
      if (err instanceof Error && err.message === 'entity not found') {
        throw new HttpException(
          'track not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      } else {
        throw err;
      }
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      this.favoritesService.removeTrack(id);
    } catch (err) {
      if (err instanceof Error && err.message === 'entity not found') {
        throw new HttpException('track not found', HttpStatus.NOT_FOUND);
      } else {
        throw err;
      }
    }
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.favoritesService.addAlbum(id);
    } catch (err) {
      if (err instanceof Error && err.message === 'entity not found') {
        throw new HttpException(
          'album not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      } else {
        throw err;
      }
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      this.favoritesService.removeAlbum(id);
    } catch (err) {
      if (err instanceof Error && err.message === 'entity not found') {
        throw new HttpException('album not found', HttpStatus.NOT_FOUND);
      } else {
        throw err;
      }
    }
  }
}
