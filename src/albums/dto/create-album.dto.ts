import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { version } from 'os';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID('4')
  artistId: string | null; // refers to Artist
}
