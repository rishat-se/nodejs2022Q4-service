import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  BadRequestException,
  NotFoundException,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    try {
      const users = this.usersService.findAll();
      console.log(users);
      return users;
    } catch {}
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.usersService.findOne(id);
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
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    try {
      return this.usersService.update(id, updateUserDto);
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
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      this.usersService.remove(id);
    } catch (err) {
      if (err instanceof Error && err.message === 'entity not found') {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      } else {
        throw err;
      }
    }
  }
}
