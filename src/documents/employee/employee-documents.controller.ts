import {
  Bind,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RolesName } from 'src/roles/constants';
import { EmployeeDocument } from './entities/employee-document.entity';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { EmployeeDocumentService } from './employee-documents.service';
import { CreateEmployeeDocumentDTO } from './dtos/create-employee-document.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('employee/documents')
export class EmployeeDocumentController {
  constructor(private employeeDocumentService: EmployeeDocumentService) {}

  @Get(':id')
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  async getAll(
    @Param() user: { id: number },
  ): Promise<EmployeeDocument[] | null> {
    return await this.employeeDocumentService.getAllEmployeeDocuments(user.id);
  }

  @Post()
  @Roles(RolesName.ADMIN, RolesName.HR)
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('document'))
  @Bind(UploadedFile())
  async createEmployeeDocument(
    @UploadedFile() document: Express.Multer.File,
    @Body() createEmployeeDocumentDTO: CreateEmployeeDocumentDTO,
  ): Promise<EmployeeDocument> {
    return await this.employeeDocumentService.createNewEmployeeDocument(
      document,
      createEmployeeDocumentDTO,
    );
  }
}
