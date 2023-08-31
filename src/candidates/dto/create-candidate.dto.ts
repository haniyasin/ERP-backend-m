import { IsNotEmpty, IsPositive, ValidateNested } from "class-validator";
import { Position } from "src/positions/entities/position.entity";

export class CreateCandidateDto {
    
    @IsNotEmpty()
    name: string; 
    
    @IsNotEmpty()
    appliedOn: string;

    acceptedOn: string;

    @IsNotEmpty()
    status: string;

    cv: Buffer;

    @ValidateNested()
    position: Position;
}
