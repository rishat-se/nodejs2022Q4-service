import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 150)
  name: string;

  @IsOptional()
  @IsUUID('4')
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsUUID('4')
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  duration: number; // integer numbe
}
