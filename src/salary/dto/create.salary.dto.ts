import { IsNotEmpty, ValidateNested } from 'class-validator';
import { User } from 'src/users/user.entity';

export class CreateSalaryDTO {
  @IsNotEmpty({ message: 'Salary Start Date can not be empty!' })
  startDate: Date;

  @IsNotEmpty({ message: 'Gross Salary can not be empty!' })
  gross: number;

  @IsNotEmpty({ message: 'NET Salary Date can not be empty!' })
  net: number;

  document: Buffer;

  @ValidateNested({ message: 'Property must be nested as an Object!' })
  user: User;
}
