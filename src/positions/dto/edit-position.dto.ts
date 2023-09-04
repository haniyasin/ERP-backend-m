import { PartialType } from '@nestjs/mapped-types';
import { CreatePositionDto } from './create-position.dto';
import { IsNotEmpty, MaxLength, ValidateNested } from 'class-validator';
import { Projects } from 'src/projects/entities/project.entity';
import { Company } from 'src/companies/entities/company.entity';

export class EditPositionDto extends PartialType(CreatePositionDto) {
  @IsNotEmpty()
  @MaxLength(30, { message: 'Name exceeds limit' })
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  isVacant: boolean;

  @IsNotEmpty()
  @ValidateNested()
  project: Projects;

  @IsNotEmpty()
  @ValidateNested()
  company: Company;
}
