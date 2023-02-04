import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UsersDb } from '../interfaces/users-db.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryUserDb implements UsersDb {
  //private users: User[];

  private users: User[] = [
    {
      id: 'userId',
      login: 'john',
      password: 'ajshnenw',
      version: 0,
      createdAt: 111111111,
      updatedAt: 222222222,
    },
  ];

  create(createUserDto: CreateUserDto) {
    const user: User = {
      id: uuidv4(),
      ...createUserDto,
      version: 0,
      createdAt: Date.now(),
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((key) => key.id === id);
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = this.users.find((key) => key.id === id);
    return { ...user, ...updateUserDto };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
