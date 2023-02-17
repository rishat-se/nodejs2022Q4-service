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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Prisma } from '@prisma/client';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  //  @Header('content-type', 'application/json')
  async create(@Body() createTrackDto: CreateTrackDto) {
    try {
      return await this.tracksService.create(createTrackDto);
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
    return await this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.tracksService.findOne(id);
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
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return await this.tracksService.update(id, updateTrackDto);
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
      await this.tracksService.remove(id);
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
