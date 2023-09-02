import { IsNotEmpty, ValidateNested } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { BonusType } from '../entitites/bonus.entity';

export class CreateBonusDTO {
  @IsNotEmpty()
  type: BonusType;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  amount: number;

  document: Buffer;

  @ValidateNested()
  user: User;
}
