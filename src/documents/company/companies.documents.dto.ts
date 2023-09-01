import { IsNotEmpty, IsNumber } from "class-validator";
import { Company } from "src/companies/company.entity";

export class CompaniesDocumentsDTO {
    
    @IsNotEmpty()
    name: string;

    document: Buffer;
}