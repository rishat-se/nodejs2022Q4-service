import { Injectable } from '@nestjs/common';
import { InMemoryUsersDB } from './db/in-memory-users.db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(private usersDB: InMemoryUsersDB) {}

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      ...createUserDto,
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.usersDB.create(newUser);
    return newUser;
  }

  findAll() {
    return this.usersDB.findAll();
  }

  findOne(id: string) {
    const user = this.usersDB.findOne(id);
    if (!user) throw new Error('entity not found');
    return user;
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = this.usersDB.findOne(id);
    if (!user) throw new Error('entity not found');
    if (user.password !== updateUserDto.oldPassword)
      throw new Error('old password is wrong');
    const updUser = { ...user, password: updateUserDto.newPassword };
    updUser.version++;
    updUser.updatedAt = Date.now();
    this.usersDB.update(updUser);
    return updUser;
  }

  remove(id: string) {
    this.usersDB.remove(id);
  }
}
