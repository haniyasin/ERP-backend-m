import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompaniesDocumentsService } from "./company.documents.service";
import { CompaniesDocuments } from "./entitites/company-document.entity";
import { CompaniesDocumentsController } from "./company-documents.controller";

@Module({
    imports: [TypeOrmModule.forFeature([CompaniesDocuments])],
    providers: [CompaniesDocumentsService],
    controllers: [CompaniesDocumentsController]
  })
  export class CompaniesDocumentsModule {}