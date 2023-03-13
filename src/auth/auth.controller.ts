import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
  SetMetadata,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersInterceptor } from 'src/users/users.interceptor';
import { Prisma } from '@prisma/client';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Tokens } from './entities/tokens.entity';
import { AllowAnonymous } from 'src/common/allow-anonymous.decorator';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(UsersInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiResponse({
    status: 400,
    description: 'no login or password, or they are not a strings',
  })
  @AllowAnonymous(true)
  //  @SetMetadata('allowAnonymous', true)
  async signup(@Body() createAuthDto: CreateUserDto) {
    return await this.authService.signup(createAuthDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiResponse({
    status: 400,
    description: 'no login or password, or they are not a strings',
  })
  @ApiResponse({
    status: 403,
    description: '  no user with such login, password doesnt match actual one',
  })
  @AllowAnonymous(true)
  //  @SetMetadata('allowAnonymous', true)
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
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiResponse({
    status: 400,
    description: 'no refreshToken in body',
  })
  @ApiResponse({
    status: 403,
    description: 'refresh token is invalid or expired',
  })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      return this.authService.refresh(refreshTokenDto.refreshToken);
    } catch (err) {
      throw err;
    }
  }
}
