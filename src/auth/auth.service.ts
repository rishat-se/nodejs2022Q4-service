import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdatePasswordDto } from '../users/dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async signup(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return newUser;
  }
}
