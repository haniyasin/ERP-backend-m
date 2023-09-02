import { IsNotEmpty, ValidateNested } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { LeaveType } from '../entities/leave.entity';

export class CreateLeaveDTO {
  @IsNotEmpty()
  type: LeaveType;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  document: Buffer;

  @ValidateNested()
  user: User;
}
