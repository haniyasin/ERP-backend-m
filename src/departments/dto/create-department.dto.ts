import { IsNotEmpty } from 'class-validator';

export class CreateDepartmentDTO {
  @IsNotEmpty()
  name: string;
}
