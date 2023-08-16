import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { User } from "src/users/user.entity";

export class RoleDTO {

    @IsNotEmpty()
    @MinLength(1, {message: 'Must be between 1 and 30 characters'})
    @MaxLength(30, {message: 'Must be between 1 and 30 characters'})
    name: string;

    users: User[];
}