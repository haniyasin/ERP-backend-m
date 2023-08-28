import { Department } from 'src/departments/departments.entity';
import { Role } from 'src/roles/roles.entity';
import {
  IsNotEmpty,
  IsEmail,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateSalaryDTO } from 'src/salary/dto/create.salary.dto';

export class CreateUserDTO {
  @IsNotEmpty()
  @MaxLength(30, { message: 'Full name exceeds limit' })
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(30, { message: 'Title exceeds limit' })
  title: string;

  @IsNotEmpty()
  startingDate: Date;

  @IsNotEmpty()
  isContractor: boolean;

  @IsNotEmpty()
  salary: CreateSalaryDTO;

  @ValidateNested()
  departments: Department[];

  @ValidateNested()
  role: Role;
}
