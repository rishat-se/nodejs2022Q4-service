import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpException,
  HttpStatus,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersInterceptor } from 'src/users/users.interceptor';
import { Prisma } from '@prisma/client';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
@UseInterceptors(UsersInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @SetMetadata('allowAnonymous', true)
  async signup(@Body() createAuthDto: CreateUserDto) {
    return await this.authService.signup(createAuthDto);
  }

  @Post('login')
  @SetMetadata('allowAnonymous', true)
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.login(loginUserDto);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new HttpException('user not found', HttpStatus.FORBIDDEN);
        }
      }
      if (err instanceof Error && err.message === 'password is wrong') {
        throw new HttpException('password is wrong', HttpStatus.FORBIDDEN);
      }
      throw err;
    }
  }

  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      return await this.authService.refresh(refreshTokenDto.refreshToken);
    } catch (err) {
      // if (err instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (err.code === 'P2025') {
      //     throw new HttpException('user not found', HttpStatus.FORBIDDEN);
      //   }
      // }
      // if (err instanceof Error && err.message === 'password is wrong') {
      //   throw new HttpException('password is wrong', HttpStatus.FORBIDDEN);
      // }
      throw err;
    }
  }
}
