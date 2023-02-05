import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
