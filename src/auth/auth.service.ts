import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './entities/payload.entity';
import {
  CRYPT_SALT,
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
  TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME,
} from 'src/common/constants';
import { Tokens } from './entities/tokens.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
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

  refresh(refreshToken: string) {
    let decode: Payload;
    try {
      decode = this.validateRefreshToken(refreshToken);
    } catch (err) {
      throw new HttpException('invalid refresh token', HttpStatus.FORBIDDEN);
    }
    const payload = { userId: decode.userId, login: decode.login };
    return this.createRefreshAccessToken(payload);
  }

  createRefreshAccessToken(payload: Payload): Tokens {
    const accessToken = this.jwtService.sign(payload, {
      secret: JWT_SECRET_KEY,
      expiresIn: TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: JWT_SECRET_REFRESH_KEY,
      expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
    });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string) {
    return this.jwtService.verify(token, {
      secret: JWT_SECRET_KEY,
    });
  }

  validateRefreshToken(token: string) {
    return this.jwtService.verify(token, {
      secret: JWT_SECRET_REFRESH_KEY,
    });
  }
}
