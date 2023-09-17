import {
  Bind,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CompaniesDocumentsService } from './company.documents.service';
import { CompaniesDocuments } from './entitites/company-document.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompaniesDocumentsDTO } from './dto/company.document.dto';
import { RolesName } from 'src/roles/constants';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('companiesDocuments')
export class CompaniesDocumentsController {
  constructor(private companiesDocumentsService: CompaniesDocumentsService) {}

  @Post('addDocument')
  @Roles(RolesName.ADMIN, RolesName.BDM)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('document'))
  @Bind(UploadedFile())
  async addDoc(
    @UploadedFile() document: Express.Multer.File,
    @Body() companiesDocumentsDTO: CompaniesDocumentsDTO,
  ): Promise<CompaniesDocuments> {
    return await this.companiesDocumentsService.addDoc(
      companiesDocumentsDTO,
      document,
    );
  }

  @Get()
  @Roles(RolesName.ADMIN, RolesName.BDM)
  @UseGuards(RolesGuard)
  async getDocumentById(documentId: number): Promise<CompaniesDocuments> {
    return await this.companiesDocumentsService.getDoc(documentId);
  }
}
