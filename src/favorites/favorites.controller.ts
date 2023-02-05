import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('artist/:id')
  create(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.favoritesService.addArtist(id);
    } catch (err) {
      // if (err instanceof Error && err.message === 'id already exists') {
      //   throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      if (err instanceof Error && err.message === 'entity not found') {
        throw new HttpException(
          'user not found',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      } else {
        throw err;
      }
    }
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    return this.favoritesService.update(+id, updateFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }
}
