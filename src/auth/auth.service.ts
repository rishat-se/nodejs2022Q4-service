import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Payload } from './entities/payload.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(
      createUserDto.password,
      Number(process.env.CRYPT_SALT),
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

  async login(loginUserDto: LoginUserDto) {
    //find user
    const user = await this.prisma.user.findFirstOrThrow({
      where: { login: loginUserDto.login },
    });
    //check user password
    if (!(await bcrypt.compare(loginUserDto.password, user.password)))
      throw new Error('password is wrong');

    const payload = { userId: user.id, login: user.login };

    return this.createRefreshAccessToken(payload);
  }

  async refresh(refreshTokenDto: string) {
    const decode: Payload = this.jwtService.verify(refreshTokenDto, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });
    const payload = { userId: decode.userId, login: decode.login };
    console.log(payload);
    return this.createRefreshAccessToken(payload);
  }

  createRefreshAccessToken(payload: Payload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
    return { accessToken, refreshToken };
  }
}
