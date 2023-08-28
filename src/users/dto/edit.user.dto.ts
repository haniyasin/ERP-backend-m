import { Department } from 'src/departments/departments.entity';
import {
  IsNotEmpty,
  IsEmail,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class EditUserDTO {
  @IsNotEmpty()
  @MaxLength(30, { message: 'Full name exceeds limit' })
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  startingDate: Date;

  @IsNotEmpty()
  isContractor: boolean;

  @ValidateNested()
  departments: Department[];
}
