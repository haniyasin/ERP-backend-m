import { IsNotEmpty } from 'class-validator';

export class CreateReportDTO {
  @IsNotEmpty()
  name: string;

  document: Buffer;
}
