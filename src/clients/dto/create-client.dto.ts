import { IsNotEmpty } from 'class-validator';

export class CreateClientDTO {
  @IsNotEmpty()
  name: string;
}
