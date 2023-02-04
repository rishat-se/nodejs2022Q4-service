import { Injectable } from '@nestjs/common';
import { InMemoryArtistsDb } from 'src/artists/db/in-memory-artists.db';
import { InMemoryUserDb } from './db/in-memory-users.db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private usersDb: InMemoryUserDb,
    private artistsDb: InMemoryArtistsDb,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return { users: this.usersDb.findAll(), artists: this.artistsDb.findAll() };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
