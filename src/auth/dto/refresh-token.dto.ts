import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Tokens } from '../entities/tokens.entity';

export class RefreshTokenDto extends PickType(Tokens, ['refreshToken']) {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
