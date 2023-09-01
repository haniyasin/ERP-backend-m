import { Bind, Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CompaniesDocumentsService } from "./companies.documents.service";
import { CompaniesDocuments } from "./companies.documents.entity";
import { Public } from "src/decorators/public.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { CompaniesDocumentsDTO } from "./companies.documents.dto";

@Controller('companiesDocuments')
export class CompaniesDocumentsController {
    constructor(private companiesDocumentsService: CompaniesDocumentsService) {}

    @Public()
    @Post('addDocument')
    @UseInterceptors(FileInterceptor('document'))
    @Bind(UploadedFile())
    async addDoc(
      @UploadedFile() document: Express.Multer.File,
      @Body() companiesDocumentsDTO: CompaniesDocumentsDTO
    ): Promise<CompaniesDocuments> {
      return await this.companiesDocumentsService.addDoc(companiesDocumentsDTO, document);
    }

    @Public()
    @Get()
    async getDocumentById(documentId: number): Promise<CompaniesDocuments> {
      return await this.companiesDocumentsService.getDoc(documentId);
    }

}