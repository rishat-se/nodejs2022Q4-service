import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { CRYPT_SALT } from 'src/common/constants';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(
      createUserDto.password,
      Number(CRYPT_SALT),
    );
    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: passwordHash,
        version: 1,
        createdAt: String(Date.now()),
        updatedAt: String(Date.now()),
      },
    });
    return plainToClass(User, newUser);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => plainToClass(User, user));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
    return plainToClass(User, user);
  }

  async update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error('entity not found');

    //    if (user.password !== updateUserDto.oldPassword)
    console.log(updateUserDto.oldPassword, user.password);
    if (!(await bcrypt.compare(updateUserDto.oldPassword, user.password)))
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

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
