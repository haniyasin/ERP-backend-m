import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePositionDto {
  @IsNotEmpty()
  @MaxLength(30, { message: 'Name exceeds limit' })
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  projectId: number;

  @IsNotEmpty()
  companyId: number;
}
