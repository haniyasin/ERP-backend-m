import { IsNotEmpty, ValidateNested } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateEmployeeDocumentDTO {
  @IsNotEmpty()
  name: string;

  document: Buffer;

  @ValidateNested()
  user: User;
}
