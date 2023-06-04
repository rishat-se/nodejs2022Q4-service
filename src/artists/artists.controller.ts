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
  Put,
  HttpCode,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.artistsService.findOne(id);
    } catch (err) {
      if (err instanceof Error && err.message === 'entity not found') {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      } else {
        throw err;
      }
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    try {
      return this.artistsService.update(id, updateArtistDto);
    } catch (err) {
      if (err instanceof Error && err.message === 'entity not found') {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      } else {
        throw err;
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      this.artistsService.remove(id);
    } catch (err) {
      if (err instanceof Error && err.message === 'entity not found') {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      } else {
        throw err;
      }
    }
  }
}
