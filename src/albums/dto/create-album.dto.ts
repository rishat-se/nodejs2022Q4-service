import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 150)
  name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(2030)
  year: number;

  @IsOptional()
  @IsUUID('4')
  artistId: string | null; // refers to Artist
}
