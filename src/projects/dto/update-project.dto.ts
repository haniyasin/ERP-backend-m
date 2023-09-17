import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Company } from 'src/companies/entities/company.entity';

export class UpdateProjectDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  isActive: boolean;

  @ValidateNested()
  company: Company;
}
