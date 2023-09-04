import { IsNotEmpty } from 'class-validator';

export class UpdateClientDTO {
  @IsNotEmpty()
  name: string;
}
