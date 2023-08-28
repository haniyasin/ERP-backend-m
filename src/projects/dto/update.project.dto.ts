import { IsNotEmpty } from 'class-validator';

export class UpdateProjectDTO {
  @IsNotEmpty()
  userId: number;
}
