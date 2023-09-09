import { IsNotEmpty } from 'class-validator';

export class EditReportDTO {
  @IsNotEmpty()
  name: string;

  document: Buffer;
}
