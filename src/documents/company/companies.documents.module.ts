import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompaniesDocumentsService } from "./companies.documents.service";
import { CompaniesDocuments } from "./entitites/companies.documents.entity";
import { CompaniesDocumentsController } from "./companies.documents.controller";

@Module({
    imports: [TypeOrmModule.forFeature([CompaniesDocuments])],
    providers: [CompaniesDocumentsService],
    controllers: [CompaniesDocumentsController]
  })
  export class CompaniesDocumentsModule {}