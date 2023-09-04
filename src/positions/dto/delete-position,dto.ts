import { PartialType } from '@nestjs/mapped-types';
import { CreatePositionDto } from './create-position.dto';
import { IsNotEmpty } from 'class-validator';

export class DeletePositionDTO extends PartialType(CreatePositionDto) {
  @IsNotEmpty()
  companyId: number;

  @IsNotEmpty()
  projectId: number;
}
