import {
  IsNotEmpty,
  IsOptional,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Company } from 'src/companies/entities/company.entity';
import { Projects } from 'src/projects/entities/project.entity';

export class CreatePositionDto {
  @IsNotEmpty()
  @MaxLength(30, { message: 'Name exceeds limit' })
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  isVacant: boolean;

  @IsNotEmpty()
  @ValidateNested()
  project: Projects;

  @IsNotEmpty()
  @ValidateNested()
  company: Company;
}
