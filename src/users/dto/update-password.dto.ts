import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  oldPassword: string; // previous password

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  newPassword: string; // new password
}
