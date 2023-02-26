import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdatePasswordDto } from '../users/dto/update-password.dto';
import { UsersInterceptor } from 'src/users/users.interceptor';

@Controller('auth')
@UseInterceptors(UsersInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createAuthDto: CreateUserDto) {
    return await this.authService.signup(createAuthDto);
  }
}
