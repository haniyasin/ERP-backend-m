import { PartialType } from '@nestjs/mapped-types';
import { CreatePositionDto } from './create-position.dto';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class EditPositionDto extends PartialType(CreatePositionDto) {
  @IsNotEmpty()
  @MaxLength(30, { message: 'Name exceeds limit' })
  name: string;

  // @IsNotEmpty()
  // @MaxLength(30, { message: 'Project name exceeds limit' })
  // project: string;

  @IsNotEmpty()
  description: string;
}
