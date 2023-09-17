import { IsNotEmpty, IsPositive, MinLength } from 'class-validator';

export class CreateCompanyDTO {
  @IsNotEmpty()
  name: string;

  @MinLength(50, { message: 'Description is too short' })
  description: string;

  @IsNotEmpty()
  contacts: string;

  @IsPositive({ message: "Employee size can't be negative" })
  employeeSize: number;
}
