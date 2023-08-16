import { IsNotEmpty, ValidateNested } from 'class-validator';
import { User } from "src/users/user.entity";
import { LeaveType } from '../leave.entity';

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