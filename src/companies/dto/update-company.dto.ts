import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class UpdateCompanyDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(50, { message: 'Description is too short' })
  description: string;

  @IsNotEmpty()
  contacts: string;

  @IsNotEmpty()
  @IsNumber()
  employeeSize: number;
}
