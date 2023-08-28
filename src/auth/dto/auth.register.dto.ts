import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class registerDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(10, { message: 'Invalid password length' })
  @MaxLength(16, { message: 'Invalid password length' })
  password: string;
}
