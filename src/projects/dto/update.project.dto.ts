import { IsNotEmpty, ValidateNested } from 'class-validator';
import { User } from 'src/users/user.entity';

export class UpdateProjectDTO {
  @IsNotEmpty()
  userId: number;
}
