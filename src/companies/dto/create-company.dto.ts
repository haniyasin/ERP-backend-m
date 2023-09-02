import { IsNotEmpty, MaxLength, IsEmail, IsPositive, ValidateNested, MinLength } from "class-validator";
import { Department } from "src/departments/entities/departments.entity";
import { Role } from "src/roles/entities/roles.entity";
import { PrimaryGeneratedColumn, Unique } from "typeorm";

export class CompanyDTO {

    @IsNotEmpty()
    name: string;

    @MinLength(50, { message: "Description is too short"})
    description: string;

    @IsNotEmpty()
    contacts: string[];

    @IsPositive({ message: "Employee size can't be negative" })
    employeeSize: number;

    openPositions: null
}