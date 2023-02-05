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
  Header,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  //  @Header('content-type', 'application/json')
  create(@Body() createTrackDto: CreateTrackDto) {
    try {
      return this.tracksService.create(createTrackDto);
    } catch (err) {
      if (err instanceof Error && err.message === 'field is incorrect') {
        throw new HttpException('field is incorrect', HttpStatus.BAD_REQUEST);
      } else {
        throw err;
      }
    }
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.tracksService.findOne(id);
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
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return this.tracksService.update(id, updateTrackDto);
    } catch (err) {
      if (err instanceof Error && err.message === 'entity not found') {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      } else if (err instanceof Error && err.message === 'field is incorrect') {
        throw new HttpException('field is incorrect', HttpStatus.BAD_REQUEST);
      } else {
        throw err;
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      this.tracksService.remove(id);
    } catch (err) {
      if (err instanceof Error && err.message === 'entity not found') {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      } else {
        throw err;
      }
    }
  }
}
