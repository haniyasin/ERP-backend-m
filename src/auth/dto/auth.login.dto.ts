import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class loginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(10, { message: 'Invalid Login Credentials' })
  @MaxLength(16, { message: 'Invalid Login Credentials' })
  password: string;
}
