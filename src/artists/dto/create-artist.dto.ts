import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 150)
  name: string;

  //  @IsOptional()
  @IsBoolean()
  grammy?: boolean;
}
