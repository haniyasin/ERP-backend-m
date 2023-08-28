import { IsNotEmpty, IsEmail } from 'class-validator';

export class DeleteUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  reason: string;

  document: Buffer;
}
