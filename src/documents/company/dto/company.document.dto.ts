import { IsNotEmpty, IsNumber } from "class-validator";
import { Company } from "src/companies/entities/company.entity";

export class CompaniesDocumentsDTO {
    
    @IsNotEmpty()
    name: string;

    document: Buffer;
}