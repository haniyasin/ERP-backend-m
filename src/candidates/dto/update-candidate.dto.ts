import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidateDto } from './create-candidate.dto';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {
  @IsNotEmpty()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  appliedOn: string;

  acceptedOn: string;

  @IsNotEmpty()
  status: string;

  cv: Buffer;
}
