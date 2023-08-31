import { IsNotEmpty, IsPositive, MaxLength } from "class-validator";

export class CreatePositionDto {

    @IsNotEmpty()
    @MaxLength(30, { message: "Name exceeds limit"})
    name: string;

    @IsNotEmpty()
    @MaxLength(30, { message: "Project name exceeds limit"})
    project: string;

    @IsNotEmpty()
    description: string;
}
