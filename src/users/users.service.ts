import { Injectable } from '@nestjs/common';
import { InMemoryArtistsDb } from 'src/artists/db/in-memory-artists.db';
import { InMemoryUserDb } from './db/in-memory-users.db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private usersDb: InMemoryUserDb,
    private artistsDb: InMemoryArtistsDb,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      ...createUserDto,
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.usersDb.create(newUser);
    return newUser;
  }

  findAll() {
    return this.usersDb.findAll();
  }

  findOne(id: string) {
    return this.usersDb.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // const user = this.users.find((key) => key.id === id);
    // return { ...user, ...updateUserDto };

    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
