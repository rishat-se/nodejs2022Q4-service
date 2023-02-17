import { Injectable } from '@nestjs/common';
import { InMemoryUsersDB } from './db/in-memory-users.db';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  //  constructor(private usersDB: InMemoryUsersDB) {}
  constructor(private prisma: PrismaService) {}

  // create(createUserDto: CreateUserDto) {
  //   const newUser: User = {
  //     id: uuidv4(),
  //     ...createUserDto,
  //     version: 1,
  //     createdAt: Date.now(),
  //     updatedAt: Date.now(),
  //   };
  //   this.usersDB.create(newUser);
  //   return newUser;
  // }

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        version: 1,
        createdAt: String(Date.now()),
        updatedAt: String(Date.now()),
      },
    });
    return plainToClass(User, newUser);
  }

  // findAll() {
  //   return this.usersDB.findAll();
  // }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => plainToClass(User, user));
  }

  // findOne(id: string) {
  //   const user = this.usersDB.findOne(id);
  //   if (!user) throw new Error('entity not found');
  //   return user;
  // }

  async findOne(id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
    return plainToClass(User, user);
  }

  // update(id: string, updateUserDto: UpdatePasswordDto) {
  //   const user = this.usersDB.findOne(id);
  //   if (!user) throw new Error('entity not found');
  //   if (user.password !== updateUserDto.oldPassword)
  //     throw new Error('old password is wrong');
  //   const updUser = { ...user, password: updateUserDto.newPassword };
  //   updUser.version++;
  //   updUser.updatedAt = Date.now();
  //   this.usersDB.update(updUser);
  //   return updUser;
  // }

  async update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error('entity not found');
    if (user.password !== updateUserDto.oldPassword)
      throw new Error('old password is wrong');
    const updUser = { ...user, password: updateUserDto.newPassword };
    updUser.version++;
    updUser.updatedAt = String(Date.now());
    await this.prisma.user.update({
      where: { id },
      data: updUser,
    });
    return plainToClass(User, updUser);
  }

  // remove(id: string) {
  //   this.usersDB.remove(id);
  // }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
