import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  SetMetadata,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersInterceptor } from './users.interceptor';
import { Prisma } from '@prisma/client';

@Controller('user')
@UseInterceptors(UsersInterceptor)
@SetMetadata('autheticated', true)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    //    throw new Error('Ups');
    // Promise.reject('simple rejected promise');
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }
      }
      throw err;
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (err) {
      if (err instanceof Error && err.message === 'entity not found') {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      } else if (
        err instanceof Error &&
        err.message === 'old password is wrong'
      ) {
        throw new HttpException('old password is wrong', HttpStatus.FORBIDDEN);
      } else {
        throw err;
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      await this.usersService.remove(id);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }
      }
      throw err;
    }
  }
}
